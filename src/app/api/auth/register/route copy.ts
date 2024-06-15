import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import { UserFormData, UserSchema } from "@/lib/validations/auth";
import { z } from "zod";
// import validator from "validator";

// 1. With Zod
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const validatedFields = UserSchema.parse(body);
  console.log("🚀 ~ POST ~ validatedField:", validatedFields);

  try {
    await connectDB();

    const user = await User.findOne({
      email: body.email,
    });

    if (user) {
      return new Response(
        JSON.stringify({ message: "The email address already exists." }),
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return new Response(
        JSON.stringify({ message: "Password must be atleast 6 characters." }),
        { status: 400 }
      );
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedFields.password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      ...validatedFields,
      password: hashedPassword,
    });

    console.log("🚀 ~ POST ~ newUser:", newUser);

    await newUser.save();

    // Return the created user (without password)
    const { password, ...userWithoutPassword } = newUser.toObject();

    return new Response(
      JSON.stringify({
        user: userWithoutPassword,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return new Response(
        JSON.stringify({
          errors: formattedErrors,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
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
