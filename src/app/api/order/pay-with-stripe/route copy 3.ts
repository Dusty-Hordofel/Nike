import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import { stripe } from "@/lib/stripe";
import Order from "@/models/Order";
import PaymentMethod from "@/models/PaymentMethod";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

// export const stripe = new Stripe(
//   "sk_test_51NZaglAJF88lxObTvUS00OhlIuefFG16bfLlymCGOiEhA9A7kAjp9Z8d18PM1yZtYJUHfsWJn4lL4TsPpqPsO5BS00BE5U4Fy4" ??
//     "",
//   {
//     apiVersion: "2024-06-20",
//     typescript: true,
//   }
// );
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
//   apiVersion: "2024-06-20",
//   typescript: true,
// });

type PaymentResult = {
  id: string;
  status: string;
  // email_address?: string;
};

type Order = {
  isPaid?: boolean;
  paidAt?: Date; // Utilisation de Date pour représenter les dates
  // paymentResult?: PaymentResult;
};

export const POST = auth(async (req) => {

  if (!req.auth) {
    return Response.json(
      { error: true, message: "unauthorized" },
      {
        status: 401,
      }
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
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          error: false,
          message: "Unauthorized User",
        }),
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      products,
      shippingAddress,
      couponApplied,
      totalBeforeDiscount,
      total,
      paymentMethod,
      user: dbUser._id,
    });

    if (!newOrder)
      Response.json(
        { success: false, error: true, message: "Order created successfully" },
        { status: 404 }
      );

    const payment_method = await PaymentMethod.findOne({ isActive: true });
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "USD",
      description: "Nike Store",
      payment_method: payment_method.paymentMethodId,
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`, // Spécifiez l'URL de retour après le paiement
    });

    if (payment.status !== "succeeded")
      Response.json(
        { success: false, error: true, message: "Le payment n'a pas abouti" },
        { status: 404 }
      );

      if (newOrder) {
        newOrder.isPaid = true;
        newOrder.paidAt = new Date();
        newOrder.paymentResult = {
          id: payment.id,
          status: payment.status,
          // email_address: payment.email_address,
        };
       await newOrder.save();

  return Response.json({
        success: true,
        error: false,
        
      });

  } catch (error:any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});
