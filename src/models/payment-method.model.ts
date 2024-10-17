// models/PaymentMethod.ts
import mongoose, { Document, Schema } from "mongoose";

// Définir une interface pour le document de la méthode de paiement
interface IPaymentMethod extends Document {
  userId: mongoose.Types.ObjectId;
  paymentMethodId: string;
  createdAt: Date;
}

// Définir le schéma pour les méthodes de paiement
const PaymentMethodSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethodId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false, // La carte est inactive par défaut
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Créer un modèle basé sur le schéma
const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model<IPaymentMethod>("PaymentMethod", PaymentMethodSchema);

export default PaymentMethod;
