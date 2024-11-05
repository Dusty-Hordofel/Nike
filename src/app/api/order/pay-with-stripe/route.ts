import { auth } from "@/auth";
import { connectDB } from "@/config/database";
// import { stripe } from "@/lib/stripe/stripe"; // Vous avez déjà initialisé stripe ici
import Cart from "@/models/cart.model";
import Order from "@/models/order.model";
import PaymentMethod from "@/models/payment-method.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

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

    const paymentMethodDoc = await PaymentMethod.findOne({ isActive: true });
    if (!paymentMethodDoc) {
      return NextResponse.json(
        { success: false, error: true, message: "Payment method not found" },
        { status: 404 }
      );
    }

    // Appeler verifyAndAttachPaymentMethod et récupérer les valeurs retournées
    // const { updatedPaymentMethods, isNowAttached, isAlreadyAttached } =
    await verifyAndAttachPaymentMethod(
      customerId,
      paymentMethodDoc.paymentMethodId
    );

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodDoc.paymentMethodId,
      },
    });

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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "USD",
      description: "Nike Store",
      customer: customerId,
      payment_method: paymentMethodDoc.paymentMethodId,
      off_session: true,
      confirm: true,
      receipt_email: dbUser.email,
    });

    if (paymentIntent.status !== "succeeded")
      Response.json(
        {
          success: false,
          error: true,
          message: "Le paiement a échoué. Veuillez essayer à nouveau.",
        },
        { status: 404 }
      );

    newOrder.isPaid = true;
    newOrder.paidAt = new Date();
    newOrder.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      email: paymentIntent.receipt_email || "",
    };
    await newOrder.save();

    // await Cart.findOneAndDelete({ user: dbUser._id });

    return NextResponse.json({
      success: true,
      error: false,
      message: "Votre commande et votre paiement ont été traités avec succès.",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        success: false,
        error: true,
        message:
          "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
});

async function createPaymentIntent(
  amount: number,
  currency: string,
  description: string,
  customerId: string,
  paymentMethodId: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: description,
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    console.log("PaymentIntent créé avec succès:", paymentIntent.id);
    return paymentIntent;
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error);
    throw error;
  }
}

async function verifyAndAttachPaymentMethod(
  customerId: string,
  paymentMethodId: string
) {
  try {
    const existingPaymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    const isAlreadyAttached = existingPaymentMethods.data.some(
      (pm) => pm.id === paymentMethodId
    );

    let updatedPaymentMethods;
    let isNowAttached = false;

    if (!isAlreadyAttached) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      updatedPaymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });

      isNowAttached = updatedPaymentMethods.data.some(
        (pm) => pm.id === paymentMethodId
      );

      if (!isNowAttached) {
        throw new Error("Échec de l'attachement de la méthode de paiement.");
      }
    } else {
      console.log("La méthode de paiement est déjà attachée.");
    }

    return { updatedPaymentMethods, isNowAttached, isAlreadyAttached };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification et de l'attachement de la méthode de paiement:",
      error
    );
    throw error;
  }
}

async function handlePayment(
  amount: number,
  currency: string,
  description: string,
  customerId: string,
  paymentMethodId: string
) {
  try {
    const { updatedPaymentMethods, isNowAttached } =
      await verifyAndAttachPaymentMethod(customerId, paymentMethodId);

    console.log("Méthodes de paiement mises à jour:", updatedPaymentMethods);
    console.log(
      "La méthode de paiement est-elle maintenant attachée?",
      isNowAttached
    );

    if (isNowAttached) {
      const paymentIntent = await createPaymentIntent(
        amount,
        currency,
        description,
        customerId,
        paymentMethodId
      );

      if (paymentIntent.status === "succeeded") {
        console.log("Paiement réussi");
      } else if (paymentIntent.status === "requires_action") {
        console.log(
          "Le paiement nécessite une action supplémentaire (3D Secure, etc.)"
        );
      } else {
        console.log(
          "Le paiement est en attente ou a échoué:",
          paymentIntent.status
        );
      }
    }
  } catch (error) {
    console.error("Erreur lors du processus de paiement:", error);
  }
}
