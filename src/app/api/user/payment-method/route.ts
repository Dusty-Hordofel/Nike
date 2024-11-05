import Cart from "@/models/cart.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import PaymentMethod from "@/models/payment-method.model";
import { z } from "zod";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Schéma de validation pour les données entrantes
const paymentMethodSchema = z.object({
  paymentMethodId: z
    .string()
    .min(1, "PaymentMethodId is required")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Must contain only letters, numbers, and underscores"
    ), // Assure que la chaîne ne contient que des lettres,des chiffres et underscores,
});

export const POST = auth(async (req) => {
  console.log("🚀 ~ GET ~ req:", req.auth?.user._id);

  if (!req.auth) {
    return Response.json(
      { error: true, message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  const { paymentMethodId } = await req.json();

  // Validation des données
  const parsed = paymentMethodSchema.safeParse({ paymentMethodId });
  if (!parsed.success) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: true,
        message: parsed.error.message,
      }),
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Unauthorized User",
        }),
        { status: 400 }
      );
    }

    await PaymentMethod.updateMany(
      { userId: dbUser._id },
      { $set: { isActive: false } }
    );

    const newPaymentMethod = await new PaymentMethod({
      userId: dbUser._id,
      paymentMethodId,
      isActive: true,
    });

    await newPaymentMethod.save();

    if (!newPaymentMethod) {
      return Response.json(
        { success: false, error: true, message: "Payment method not saved" },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        error: false,
        message: "Payment method saved successfully",
        //   data: {
        paymentMethodId,
        //   },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
});

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json(
      { error: true, message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Unauthorized User",
        }),
        { status: 400 }
      );
    }

    const savedPaymentMethodIds = await PaymentMethod.find({ userId: dbUser });
    if (!savedPaymentMethodIds)
      return Response.json(
        { success: false, error: true, message: "No payment method found" },
        {
          status: 500,
        }
      );

    const cardsWithLast4 = await Promise.all(
      savedPaymentMethodIds.map(async (savedPaymentMethodId) => {
        const paymentMethodId = savedPaymentMethodId.paymentMethodId;

        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentMethodId
        );

        const last4 = paymentMethod.card?.last4 || "Unknown";
        const brand = paymentMethod.card?.brand || "Unknown";

        return {
          id: savedPaymentMethodId._id,
          paymentMethodId,
          isActive: savedPaymentMethodId.isActive,
          last4,
          brand,
        };
      })
    );

    return Response.json(
      {
        success: true,
        error: false,
        cardsWithLast4,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async (req) => {
  // Check if the user is authenticated
  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Parse the request body to extract the paymentMethodId
  const { paymentMethodId } = await req.json();

  if (!paymentMethodId) {
    return NextResponse.json(
      { success: false, error: true, message: "Payment method ID is required" },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectDB();

    // Retrieve the authenticated user from the database
    const dbUser = await User.findOne({ _id: req.auth.user._id });

    if (!dbUser) {
      return NextResponse.json(
        { error: true, message: "Unauthorized User" },
        { status: 400 }
      );
    }

    // try {
    //   await stripe.paymentMethods.detach(paymentMethodId);
    // } catch (error: any) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: true,
    //       message: "Failed to remove payment method from Stripe",
    //       details: error.message,
    //     },
    //     { status: 500 }
    //   );
    // }// before that we have to attach client when saving cart

    const deletedPaymentMethod = await PaymentMethod.findOneAndDelete({
      userId: dbUser._id,
      paymentMethodId,
    });

    if (!deletedPaymentMethod) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Payment method not found in the database",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "Payment method deleted successfully",
        paymentMethodId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
});
