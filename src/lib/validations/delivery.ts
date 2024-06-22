import { z } from "zod";

export const DeliveryInfoSchema = z.object({
  lastName: z.string().min(2, "Required"),
  firstName: z.string().min(2, { message: "Le prénom est requis." }),
  address: z.string().min(10, { message: "Saisis une adresse valide." }),
  companyInfo: z.string().optional(),
  postalCode: z.string().min(5, { message: "Postal code is required" }),
  city: z.string().min(5, { message: "City is required" }),
  region: z.string().optional(),
  //   region: z.string().min(5, { message: "Region is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(8, { message: "Phone number is required" }),
});

export type DeliveryInfoFormData = z.infer<typeof DeliveryInfoSchema>;
