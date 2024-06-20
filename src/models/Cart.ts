import mongoose, { Document, Schema, Model, model, Types } from "mongoose";

const { ObjectId } = Schema;

// Définir l'interface pour le produit dans le panier
interface ICartProduct {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  size: string;
  // style?: {
  //   style: string;
  //   color: string;
  //   image: string;
  // };
  quantity: number;
  color: {
    color: string;
    image: string;
  };
  price: number;
}

// Définir l'interface pour le panier
interface ICart extends Document {
  products: ICartProduct[];
  cartTotal: number;
  totalAfterDiscount?: number;
  user: mongoose.Types.ObjectId;
}

// Définir le schéma Mongoose pour le produit dans le panier
const cartProductSchema = new Schema<ICartProduct>({
  product: { type: ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  size: { type: String, required: true },
  // style: {
  //   style: String,
  //   color: String,
  //   image: String,
  // },
  quantity: { type: Number, required: true },
  color: {
    color: { type: String, required: true },
    image: { type: String, required: true },
  },
  price: { type: Number, required: true },
});

// Définir le schéma Mongoose pour le panier
const cartSchema = new Schema<ICart>(
  {
    products: [cartProductSchema],
    cartTotal: { type: Number, required: true },
    totalAfterDiscount: Number,
    user: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Définir et exporter le modèle Mongoose
const Cart: Model<ICart> =
  mongoose.models.Cart || model<ICart>("Cart", cartSchema);

export default Cart;
