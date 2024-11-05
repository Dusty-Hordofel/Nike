import { connectDB } from "@/config/database";
import Coupon from "@/models/coupon.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { coupon, startDate, endDate, discount } = await req.json();

  try {
    //add User session after find him on database
    await connectDB();

    const test = await Coupon.findOne({ coupon });
    if (test) {
      return NextResponse.json(
        {
          error: true,
          success: false,
          message:
            "This Coupon name already exists, try with a different name.",
        },
        { status: 400 }
      );
    }

    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    return NextResponse.json(
      {
        error: false,
        success: true,
        mesage: "Coupon created successfully !",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
