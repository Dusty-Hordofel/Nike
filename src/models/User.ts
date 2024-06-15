import mongoose, { Schema, Document, Model } from "mongoose";

interface Address {
  country: string;
  province: string;
  city: string;
  postalCode: string;
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  password: string;
  shoppingPreference?: "homme" | "femme";
  emailVerified?: boolean;
  phone?: string;
  role?: string;
  address?: Address;
  terms: boolean;
  marketingOption?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema = new Schema<Address>({
  country: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const userSchema = new Schema<User>(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgsc66scx/image/upload/v1712483523/Asset_5_icflwx.png",
    },
    password: { type: String, required: true, minlength: 6 },
    shoppingPreference: {
      type: String,
      enum: ["homme", "femme"],
      // required: true,
    },
    emailVerified: { type: Boolean, default: false },
    phone: { type: String },
    role: { type: String, default: "user" },
    address: {
      type: addressSchema,
      // required: true
    },
    marketingOption: {
      type: Boolean,
      default: false,
    },
    terms: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
