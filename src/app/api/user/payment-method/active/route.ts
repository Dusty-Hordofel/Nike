import { isValidObjectId } from "@/lib/utils";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import PaymentMethod from "@/models/PaymentMethod";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

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

export const PUT = auth(async (...request: any) => {
  const [req, { params }] = request;
  console.log("🚀 ~ GET ~ req:", req.auth?.user._id);

  if (!req.auth) {
    return Response.json(
      { error: true, message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  // const [req, { params }] = request;

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

    const paymentMethod = await PaymentMethod.findOneAndUpdate({
      userId: dbUser._id,
      paymentMethodId,
      isActive: true,
    });

    await paymentMethod.save();

    if (!paymentMethod) {
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

    const activePaymentMethod = await PaymentMethod.findOne({
      userId: dbUser._id,
      isActive: true,
    });

    if (!activePaymentMethod) {
      return Response.json(
        { success: false, error: true, message: "Payment method not found" },
        {
          status: 500,
        }
      );
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(
      activePaymentMethod.paymentMethodId
    );

    const last4 = paymentMethod.card?.last4 || "Unknown";
    const brand = paymentMethod.card?.brand || "Unknown";
    const expMonth = paymentMethod.card?.exp_month || "Unknown";
    const expYear = paymentMethod.card?.exp_year || "Unknown";

    return Response.json(
      {
        success: true,
        error: false,
        message: "Payment method found successfully",
        activeCardInformation: {
          paymentMethodId: activePaymentMethod.paymentMethodId,
          last4,
          brand,
          expMonth,
          expYear,
        },
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
