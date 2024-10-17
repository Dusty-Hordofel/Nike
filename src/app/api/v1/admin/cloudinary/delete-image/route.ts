import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import Product from "@/models/product.model";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

// Configurer Cloudinary avec vos clés API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, //CLOUDINARY_API_KEY
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE =
  // auth(
  async (request: Request) => {
    try {
      await connectDB();

      const { public_id } = await request.json();

      if (!public_id) {
        return Response.json(
          {
            success: true,
            error: false,
            message: `Le public_id est manquant.`,
          },
          { status: 400 }
        );
      }

      // Supprimer l'image sur Cloudinary
      const result = await cloudinary.uploader.destroy(public_id);
      console.log("🚀 ~ result:RESULT", result);

      if (result.result === "ok") {
        return Response.json({ message: "Image supprimée avec succès." });
      } else {
        return Response.json(
          { message: "Impossible de supprimer l'image." },
          { status: 400 }
        );
      }
    } catch (error: any) {
      return Response.json(
        { success: false, error: true, message: error.message },
        { status: 500 }
      );
    }
  };
//   )
