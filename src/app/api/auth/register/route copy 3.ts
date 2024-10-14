import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/database";
import { UserSchema } from "@/lib/validations/auth/auth-schema";
import { z } from "zod";
import User from "@/models/User";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    // Connect to MongoDB
    connectDB();

    // Validate request body using Zod
    const validatedFields = UserSchema.parse(body);

    // Check if user with email already exists
    const existingUser = await User.findOne({
      email: validatedFields.email,
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "The email address already exists.",
        }),
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedFields.password, salt);

    // Create a new user with validated fields and hashed password
    const newUser = new User({
      ...validatedFields,
      password: hashedPassword,
    });

    // Save new user to database
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
  } catch (error: any) {
    console.error(error);

    // Handle Zod validation errors
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

    // Handle other errors
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Something went wrong",
      }),
      { status: 500 }
    );
  }
}
