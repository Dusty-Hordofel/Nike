import mongoose, { Document, Schema, Model, model } from "mongoose";

// Interface TypeScript pour représenter les données d'une catégorie
interface ICategory extends Document {
  name: string;
  slug: string;
  image: string;
}

// Définition du schéma Mongoose pour une catégorie
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Must be at least 2 characters"],
      maxlength: [32, "Must be at most 32 characters"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dgsc66scx/image/upload/fl_preserve_transparency/v1718098586/nike/nike_banner.jpg?_s=public-apps", // Remplacez par l'URL de votre image par défaut
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
