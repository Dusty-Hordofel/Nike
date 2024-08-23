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
  async (...request: any) => {
    // console.log("🚀 ~ GET ~ req:", req.auth);
    const [req, { params }] = request;
    console.log("🚀 ~ POST ~ params:", params);
    console.log("🚀 ~ POST ~ params:", process.env.STRIPE_SECRET_KEY);

    // return Response.json({ payment: process.env.STRIPE_SECRET_KEY });

    try {
      // const { orderID } = await req.json()
      const { amount, id } = await req.json();

      const payment = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "USD",
        description: "M74JJI Store",
        payment_method: id,
        confirm: true,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`, // Spécifiez l'URL de retour après le paiement
      });

      // const order = await Order.findById(order_id);
      const order: Order = {};

      if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
          id: payment.id,
          status: payment.status,
          // email_address: payment.email_address,
        };
        // await order.save();
        return Response.json({
          success: true,
          error: false,
          order,
        });
      } else {
        Response.json(
          { success: false, error: true, message: "Order not found" },
          { status: 404 }
        );
      }

      console.log("🚀 ~ POST ~ payment:", payment);

      return Response.json({ payment, amount, id });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 200 });
    }

    //   return new Response(null, { status: 500 })
  };
// );
