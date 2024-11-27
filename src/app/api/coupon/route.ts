import { connectDB } from "@/config/database";
import Coupon from "@/models/coupon.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { coupon, startDate, endDate, discount } = await req.json();

  try {
    await connectDB();

    const test = await Coupon.findOne({ coupon });
    if (test) {
      return createErrorResponse(
        null,
        "This Coupon name already exists, try with a different name.",
        400
      );
    }

    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    return createSuccessResponse({}, "Coupon created successfully !", 201);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
}
