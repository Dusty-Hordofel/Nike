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
