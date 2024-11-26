import { connectDB } from "@/config/database";
import { v2 as cloudinary } from "cloudinary";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

// Configure Cloudinary with your API keys
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
        return createErrorResponse(null, "The public_id is missing.", 400);
      }

      const result = await cloudinary.uploader.destroy(public_id);

      if (result.result === "ok") {
        return createSuccessResponse(null, "Image successfully deleted.", 200);
      } else {
        return createErrorResponse(null, "Unable to delete image.", 400);
      }
    } catch (error: any) {
      return createErrorResponse(null, error.message, 500);
    }
  };
//   )
