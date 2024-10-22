import mongoose, { Schema, Document, Types } from "mongoose";

import {
  ProductDocument,
  Review,
  SubProduct,
} from "@/@types/admin/admin.products.interface";

const ReviewSchema: Schema<Review> = new Schema<Review>({
  reviewBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },
  images: [String],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const subProductColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hexCode: {
    type: String,
    required: true,
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Validation pour le code hexadécimal
    default: "#000000",
  },
  image: {
    type: String,
    default: "https://default_image_url.com/default_image.jpg",
  },
  // imageUrl: {
  //   type: String, // URL de l'image représentant la couleur
  //   required: false, // Pas forcément obligatoire, selon les besoins
  // },
});

const SubProductSchema: Schema<SubProduct> = new Schema<SubProduct>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true, // Mongoose générera automatiquement cet ID
  },
  images: [
    {
      public_url: {
        type: String,
        default: "https://default_image_url.com/default_image.jpg",
      },
      url: {
        type: String,
        default: "https://default_image_url.com/default_image.jpg",
      },
      public_id: {
        type: String,
      },
    },
  ],
  description_images: [String],
  color: subProductColorSchema,
  // {
  //   // color: {
  //   //   type: String,
  //   //   default: "#000000", // Valeur par défaut pour la couleur (noir)
  //   // },

  //   image: {
  //     type: String,
  //     default: "https://default_image_url.com/default_image.jpg",
  //   },
  // },
  price: {
    type: Number,
    default: 0,
  },
  sizes: [
    {
      size: String,
      qty: Number,
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
});
export enum Brand {
  NikeSportswear = "Nike Sportswear",
  Jordan = "Jordan",
  NikeByYou = "Nike By You",
  NikeLab = "NikeLab",
  ACG = "ACG",
  NikePro = "Nike Pro",
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    productType: {
      type: String,
      enum: ["clothing", "shoes", "accessories"],
      required: [true, "Le type de produit est requis."],
    },
    brand: {
      type: String,
      enum: Object.values(Brand),
      required: [true, "Brand is required"],
    },
    subCategories: [{ type: Schema.Types.ObjectId, ref: "subCategory" }],
    details: [{ name: String, value: String }],
    questions: [{ question: String, answer: String }],
    reviews: [ReviewSchema],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    // adultGender: {
    //   type: String,
    //   enum: ["male", "female", "unisex"],
    //   required: [true, "Adult gender is required"],
    // },
    // kids: {
    //   type: Boolean,
    //   default: false,
    // },
    // kidsGender: {
    //   type: String,
    //   enum: ["boy", "girl", "unisex"],
    //   required: function () {
    //     return this.kids; // Gender for kids is required if kids is true
    //   },
    // },

    featured: {
      type: Boolean,
      default: false,
    },
    subProducts: [SubProductSchema],
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
