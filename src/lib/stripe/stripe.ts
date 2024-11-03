import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
// }

export const stripe = new Stripe(
  "sk_test_51NZaglAJF88lxObTvUS00OhlIuefFG16bfLlymCGOiEhA9A7kAjp9Z8d18PM1yZtYJUHfsWJn4lL4TsPpqPsO5BS00BE5U4Fy4" ??
    "",
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
//   apiVersion: "2024-06-20",
//   typescript: true,
// });
