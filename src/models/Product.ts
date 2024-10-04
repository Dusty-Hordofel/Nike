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

export interface ISubProduct {
  images: [{ public_url: string; url: string }];
  description_images: string[];
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
  sold: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  // brand?: string;
  slug: string;
  category: Types.ObjectId;
  subCategories: Types.ObjectId[];
  details?: { name: string; value: string }[];
  questions?: { question: string; answer: string }[];
  reviews?: IReview[];
  refundPolicy: string;
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
    subProducts: [
      {
        images: [],
        description_images: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
