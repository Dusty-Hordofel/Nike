import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import Color from "@/models/color.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

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
    connectDB();

    const existingColors = await Color.find({
      hexCode: { $in: colors.map((color) => color.hexCode) },
    });

    const existingHexCodes = existingColors.map((color) => color.hexCode);
    const newColors = colors.filter(
      (color) => !existingHexCodes.includes(color.hexCode)
    );

    if (newColors.length > 0) {
      const insertedColors = await Color.insertMany(newColors, {
        ordered: false,
      });

      return createSuccessResponse(
        { insertedColors },
        "New colors successfully inserted",
        200
      );
    } else {
      return createErrorResponse(null, "All the colors already exist.", 409);
    }
  } catch (error: any) {
    console.error("Erreur lors de l'insertion des couleurs :", error);
    return createErrorResponse(null, error.message, 500);
  }
});
