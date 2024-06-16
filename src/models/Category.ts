import mongoose, { Document, Schema, Model, model } from "mongoose";

// Interface TypeScript pour représenter les données d'une catégorie
interface ICategory extends Document {
  name: string;
  slug: string;
}

// Définition du schéma Mongoose pour une catégorie
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Must be at least 2 characters"],
      maxlength: [32, "Must be at most 32 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Définir et exporter le modèle Mongoose
const Category: Model<ICategory> =
  mongoose.models.Category || model<ICategory>("Category", categorySchema);

export default Category;
