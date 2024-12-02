import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import { EmailSchema } from "@/schemas/user/auth.schema";
import { createErrorResponse } from "@/utils/api-response.utils";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedField = EmailSchema.safeParse(body);

    if (!validatedField.success) {
      return createErrorResponse(
        null,
        "Please Add a valid email address.",
        400
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
      return createErrorResponse(
        null,
        "Email not associated with an account.",
        400
      );
    }
  } catch (error) {
    return createErrorResponse(null, "Something went wrong", 400);
  }
}
