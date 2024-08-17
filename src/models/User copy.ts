// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface Address {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   country: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   region: string;
//   companyInfo: string;
//   active: boolean;
// }

// export interface User extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   image?: string;
//   password: string;
//   shoppingPreference?: "homme" | "femme";
//   emailVerified?: boolean;
//   phoneNumber?: string;
//   role?: string;
//   addresses?: Address[];
//   terms: boolean;
//   marketingOption?: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const addressSchema = new Schema<Address>({
//   lastName: { type: String, required: true, minlength: 2 },
//   firstName: { type: String, required: true, minlength: 2 },
//   country: { type: String, required: true },
//   region: { type: String, required: true },
//   address: { type: String, required: true, minlength: 10 },
//   phoneNumber: { type: String, required: true, minlength: 8 },
//   email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
//   companyInfo: { type: String },
//   city: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   active: { type: Boolean, required: true, default: false },
// });

// const userSchema = new Schema<User>(
//   {
//     lastName: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     email: { type: String, required: true, unique: true },
//     image: {
//       type: String,
//       default:
//         "https://res.cloudinary.com/dgsc66scx/image/upload/v1712483523/Asset_5_icflwx.png",
//     },
//     password: { type: String, required: true, minlength: 6 },
//     shoppingPreference: {
//       type: String,
//       enum: ["homme", "femme"],
//       // required: true,
//     },
//     emailVerified: { type: Boolean, default: false },
//     // phoneNumber: { type: String, required: false },
//     role: { type: String, default: "user" },
//     // addresses: { type: [addressSchema], required: true },
//     marketingOption: {
//       type: Boolean,
//       default: false,
//     },
//     terms: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

// export default User;
