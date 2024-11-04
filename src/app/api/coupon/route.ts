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
      return new Response(
        JSON.stringify({
          error: "This Coupon name already exists, try with a different name.",
        }),
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
        success: "Coupon created successfully !",
        // coupons: await Coupon.find({}),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }), { status: 500 };
  }
}
