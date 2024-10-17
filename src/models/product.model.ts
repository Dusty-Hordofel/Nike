import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview extends Document {
  reviewBy: Types.ObjectId;
  rating: number;
  review: string;
  size?: string;
  style?: {
    color: string;
    image: string;
  };
  fit?: string;
  images: string[];
  likes: Types.ObjectId[];
}

export interface ISubProduct extends Document {
  _id: Types.ObjectId; // Ajout de l'identifiant unique
  images: [{ public_url: string; url: string }];
  description_images?: string[];
  color: {
    color: string;
    image: string;
  };
  price: number;
  sizes: {
    size: string;
    qty: number;
  }[];
  discount: number;
  sold?: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  slug?: string;
  category: string | Types.ObjectId;
  subCategories: string[] | Types.ObjectId[];
  details?: { name: string; value: string }[];
  questions?: { question: string; answer: string }[];
  reviews?: IReview[];
  refundPolicy?: string;
  rating?: number;
  numReviews?: number;
  shipping: number;
  productType: string;
  subProducts: ISubProduct[];
}

const ReviewSchema: Schema<IReview> = new Schema<IReview>({
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

const SubProductSchema: Schema<ISubProduct> = new Schema<ISubProduct>({
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
  color: {
    color: {
      type: String,
      default: "#000000", // Valeur par défaut pour la couleur (noir)
    },
    image: {
      type: String,
      default: "https://default_image_url.com/default_image.jpg",
    },
  },
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

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
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
    subProducts: [SubProductSchema],
  },
  {
    timestamps: true,
  }
);

// // Méthode pour supprimer un sous-produit par son ID
// ProductSchema.methods.removeSubProductById = async function (
//   subProductId: Types.ObjectId
// ) {
//   this.subProducts = this.subProducts.filter(
//     (subProduct: ISubProduct) => !subProduct._id.equals(subProductId)
//   );
//   await this.save();
// };

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
