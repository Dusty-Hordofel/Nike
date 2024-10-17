// models/Address.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Address extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  companyInfo: string;
  active: boolean;
}

const addressSchema = new Schema<Address>({
  lastName: { type: String, required: true, minlength: 2 },
  firstName: { type: String, required: true, minlength: 2 },
  country: { type: String, required: true },
  region: { type: String, required: true },
  address: { type: String, required: true, minlength: 10 },
  phoneNumber: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  companyInfo: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
});

const AddressModel = mongoose.model<Address>("Address", addressSchema);
export default AddressModel;
