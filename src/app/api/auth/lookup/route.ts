// import connectDB from "@/config/database";
import connectDB from "@/config/database";
import { EmailSchema } from "@/lib/validations/auth";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedField = EmailSchema.safeParse(body);
    console.log("🚀 ~ POST ~ validatedField:", validatedField);

    if (!validatedField.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please Add a valid email address.",
        }),
        { status: 400 }
      );
    }

    const { email } = body;
    const user = await User.findOne({
      email,
    });

    console.log("🚀 ~ POST ~ user:", user);
    console.log("🚀 ~ POST ~ user:", user.email);

    if (user) {
      return new Response(
        JSON.stringify({
          sucess: true,
          email: user.email,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Email not associated with an account.",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong",
      }),
      { status: 400 }
    );
  }
}
