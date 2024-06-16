import mongoose, { Document, Schema, Model, model } from "mongoose";

// TypeScript interface for displaying sub-category data
interface ISubCategory extends Document {
  name: string;
  slug: string;
  parent: mongoose.Types.ObjectId;
}

// Mongoose schema definition for a sub-category
const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "must be at least 2 characters"],
      maxlength: [32, "must be at most 32 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Defining and exporting the Mongoose model
const SubCategory: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  model<ISubCategory>("SubCategory", subCategorySchema);

export default SubCategory;
