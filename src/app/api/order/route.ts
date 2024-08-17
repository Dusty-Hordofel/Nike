import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import { stripe } from "@/lib/stripe";
import Order from "@/models/Order";

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
  email_address?: string;
};

type Order = {
  isPaid?: boolean;
  paidAt?: Date; // Utilisation de Date pour représenter les dates
  paymentResult?: PaymentResult;
};

export const POST =
  // auth(
  async (request: any) => {
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = await request.json();

    try {
      return Response.json({ success: true, error: false });
    } catch (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    // return Response.json({ message: "olive" }, { status: 500 });
  };
// );
