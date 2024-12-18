import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import Order from "@/models/order.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";
import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

type PaymentResult = {
  id: string;
  status: string;
  email_address?: string;
};

type Order = {
  isPaid?: boolean;
  paidAt?: Date; // Utilisation de Date pour représenter les dates
  paymentResult?: PaymentResult;
};

export const POST = auth(async (request: Request) => {
  const {
    products,
    shippingAddress,
    paymentMethod,
    total,
    totalBeforeDiscount,
    couponApplied,
  } = await request.json();

  try {
    return createSuccessResponse(null, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});
