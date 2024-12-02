import bcrypt from "bcryptjs";

import { connectDB } from "@/config/database";
import { z } from "zod";
import User from "@/models/user.model";
import { RegisterSchema } from "@/schemas/user/auth.schema";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    connectDB();
    const validatedFields = RegisterSchema.parse(body);

    const existingUser = await User.findOne({
      email: validatedFields.email,
    });

    if (existingUser) {
      return createErrorResponse(
        null,
        "The email address already exists.",
        400
      );
    }

    // if (validatedFields.password.length < 6) {
    //   return new Response(
    //     JSON.stringify({
    //       sucess: false,
    //       message: "Password must be atleast 6 characters.",
    //     }),
    //     { status: 400 }
    //   );
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedFields.password, salt);

    const newUser = new User({
      ...validatedFields,
      password: hashedPassword,
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();

    return createSuccessResponse(
      {
        user: userWithoutPassword,
      },
      "successResponse",
      201
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return new Response(
        JSON.stringify({
          success: false,
          messages: formattedErrors,
        }),
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(null, error.message, 422);
    }

    if (error instanceof Error) {
      return createErrorResponse(null, error.message, 500);
    }

    return createErrorResponse(null, "Something went wrong", 500);
  }
}

// Without Zod
// export async function POST(req: Request, res: Response) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const {
//       lastName,
//       firstName,
//       email,
//       password,
//       genderPreference,
//     }: UserFormData = body;
//     if (!lastName || !firstName || !email || !password || !genderPreference) {
//       return new Response(
//         JSON.stringify({
//           message: "Please fill in all fields.",
//         }),
//         { status: 400 }
//       );
//     }

//     if (!validator.isEmail(email)) {
//       return new Response(
//         JSON.stringify({
//           message: "Please Add a valid email address.",
//         }),
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({
//       email: email,
//     });

//     if (user) {
//       return new Response(
//         JSON.stringify({ message: "The email address already exists." }),
//         { status: 400 }
//       );
//     }

//     if (password.length < 6) {
//       return new Response(
//         JSON.stringify({ message: "Password must be atleast 6 characters." }),
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newuser = new User({
//       firstName,
//       genderPreference,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     await newuser.save();

//     return new Response(
//       JSON.stringify({
//         message: "Register success! Please activate your account to start.",
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: (error as Error).message },
//       { status: 400 }
//     );
//   }
// }
