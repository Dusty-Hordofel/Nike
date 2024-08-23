import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import { stripe } from "@/lib/stripe"; // Vous avez déjà initialisé stripe ici
import Order from "@/models/Order";
import PaymentMethod from "@/models/PaymentMethod";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

type PaymentResult = {
  id: string;
  status: string;
  email?: string; // Modifiez si nécessaire
};

export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "unauthorized" },
      { status: 401 }
    );
  }

  const {
    products,
    shippingAddress,
    couponApplied,
    totalBeforeDiscount,
    total,
    paymentMethod,
  } = await req.json();

  try {
    // Connexion à la base de données
    await connectDB();

    // Vérifier l'existence de l'utilisateur
    const dbUser = await User.findById(req.auth?.user._id);
    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: true, message: "Unauthorized User" },
        { status: 400 }
      );
    }

    // Créer ou récupérer un client Stripe
    let customerId = dbUser.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: `${dbUser.firstName} ${dbUser.lastName}`,
      });
      customerId = customer.id;
      dbUser.stripeCustomerId = customerId;
      await dbUser.save();
    }

    // Récupérer la méthode de paiement active
    const paymentMethodDoc = await PaymentMethod.findOne({ isActive: true });

    if (!paymentMethodDoc) {
      return NextResponse.json(
        { success: false, error: true, message: "Payment method not found" },
        { status: 404 }
      );
    }

    // Vérifier si la méthode de paiement est déjà attachée au client
    const existingPaymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    const isAlreadyAttached = existingPaymentMethods.data.some(
      (pm) => pm.id === paymentMethodDoc.paymentMethodId
    );

    // Attacher la méthode de paiement au client si ce n'est pas déjà fait
    if (!isAlreadyAttached) {
      await stripe.paymentMethods.attach(paymentMethodDoc.paymentMethodId, {
        customer: customerId,
      });
    }

    // Mettre à jour la méthode de paiement principale du client
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodDoc.paymentMethodId,
      },
    });

    // Créer une nouvelle commande
    const newOrder = await Order.create({
      user: dbUser._id,
      products,
      shippingAddress,
      couponApplied,
      totalBeforeDiscount,
      total,
      paymentMethod: paymentMethodDoc.paymentMethodId,
    });

    if (!newOrder) {
      return NextResponse.json(
        { success: false, error: true, message: "Failed to create order" },
        { status: 500 }
      );
    }

    // Créer l'intention de paiement Stripe
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "USD",
      customer: customerId, // Associer le paiement au client
      payment_method: paymentMethodDoc.paymentMethodId,
      confirm: true,
      receipt_email: dbUser.email,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
    });

    // Vérifier si le paiement a réussi
    if (payment.status !== "succeeded") {
      return NextResponse.json(
        { success: false, error: true, message: "Payment failed" },
        { status: 400 }
      );
    }

    // Mettre à jour la commande après paiement réussi
    newOrder.isPaid = true;
    newOrder.paidAt = new Date();
    newOrder.paymentResult = {
      id: payment.id,
      status: payment.status,
      email: payment.receipt_email || "",
    };
    await newOrder.save();

    return NextResponse.json({ success: true, error: false });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
});
