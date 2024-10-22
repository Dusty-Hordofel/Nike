import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import Color from "@/models/color.model";

const colors = [
  { name: "Noir", hexCode: "#000000" },
  { name: "Blanc", hexCode: "#FFFFFF" },
  { name: "Bleu Marine", hexCode: "#000080" },
  { name: "Rouge", hexCode: "#FF0000" },
  { name: "Gris", hexCode: "#808080" },
  { name: "Vert Militaire", hexCode: "#4B5320" },
  { name: "Beige", hexCode: "#F5F5DC" },
  { name: "Bleu Turquoise", hexCode: "#40E0D0" },
  { name: "Marron", hexCode: "#8B4513" },
  { name: "Rose", hexCode: "#FFC0CB" },
];

export const GET = auth(async () => {
  try {
    // Connexion à la base de données
    connectDB();

    // Obtenir les couleurs existantes dans la base de données
    const existingColors = await Color.find({
      hexCode: { $in: colors.map((color) => color.hexCode) },
    });

    // Filtrer les couleurs déjà présentes
    const existingHexCodes = existingColors.map((color) => color.hexCode);
    const newColors = colors.filter(
      (color) => !existingHexCodes.includes(color.hexCode)
    );

    // Insérer les nouvelles couleurs
    if (newColors.length > 0) {
      const insertedColors = await Color.insertMany(newColors, {
        ordered: false,
      });
      return Response.json(
        {
          message: "Nouvelles couleurs insérées avec succès",
          insertedColors,
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "Toutes les couleurs existent déjà." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion des couleurs :", error);
    return Response.json({ message: "Erreur serveur", error }, { status: 500 });
  }
});
