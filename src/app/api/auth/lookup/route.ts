import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import { EmailSchema } from "@/schemas/user/auth.schema";

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
