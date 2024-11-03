import mongoose, { Document, Schema } from "mongoose";

// Interface définissant le type pour une couleur
export interface Color extends Document {
  name: string;
  hexCode: string;
  image?: string;
}

export interface ColorDocument extends Color, Document {}

// Schéma Mongoose pour les couleurs
const ColorSchema = new mongoose.Schema<ColorDocument>({
  name: {
    type: String,
    required: true,
    trim: true, // Supprime les espaces superflus
  },
  hexCode: {
    type: String,
    required: true,
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Validation pour le format hexadécimal
    default: "#000000", // Couleur par défaut: noir
  },
});

// Création et export du modèle Mongoose
const Color = mongoose.model<ColorDocument>("Color", ColorSchema);
export default Color;
