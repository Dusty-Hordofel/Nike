// import User from "@/models/User";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/database";
import { UserFormData, UserSchema } from "@/lib/validations/auth";
import { z } from "zod";
import User from "@/models/User";
// import validator from "validator";

// 1. With Zod
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    connectDB();
    const validatedFields = UserSchema.parse(body);
    console.log("🚀 ~ POST ~ email:", validatedFields.email);
    // console.log("🚀 ~ POST ~ validatedField:", validatedFields);

    const existingUser = await User.findOne({
      email: validatedFields.email,
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          sucess: false,
          message: "The email address already exists.",
        }),
        { status: 400 }
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

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedFields.password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      ...body,
      // ...validatedFields,
      password: hashedPassword,
    });

    await newUser.save();

    // Return the created user (without password)
    const { password, ...userWithoutPassword } = newUser.toObject();

    return new Response(
      JSON.stringify({
        success: true,
        user: userWithoutPassword,
      }),
      { status: 201 }
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
          //  errors: formattedErrors,
        }),
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        { status: 422 }
      );
    }

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        { status: 500 }
      );
    }

    return new Response("Something went wrong", { status: 500 });
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
