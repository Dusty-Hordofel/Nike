import mongoose, { Document, Schema, Model, model } from "mongoose";

// TypeScript interface for displaying order data
interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    name: string;
    image: string;
    size: string;
    qty: number;
    color: {
      color: string;
      image: string;
    };
    price: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    email: string;
  };
  total: number;
  totalBeforeDiscount?: number;
  couponApplied?: string;
  shippingPrice: number;
  taxPrice?: number;
  isPaid: boolean;
  status:
    | "Not Processed"
    | "Processing"
    | "Dispatched"
    | "Cancelled"
    | "Completed";
  paidAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema definition for a command
const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: String,
      status: String,
      email: String,
    },
    total: {
      type: Number,
      required: true,
    },
    totalBeforeDiscount: {
      type: Number,
    },
    couponApplied: {
      type: String,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Defining and exporting the Mongoose model
const Order: Model<IOrder> =
  mongoose.models.Order || model<IOrder>("Order", orderSchema);

export default Order;
