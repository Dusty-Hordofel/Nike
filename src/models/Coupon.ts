import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
  coupon: string;
  startDate: string;
  endDate: string;
  discount: number;
}

const couponSchema: Schema<ICoupon> = new Schema(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
