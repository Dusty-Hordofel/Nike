import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import SubCategory from "@/models/subcategory.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

export const POST =
  // auth(
  async (request: any) => {
    try {
      const { name, parent, image } = await request.json();
      connectDB();
      const subCategory = await SubCategory.findOne({ name });

      if (subCategory) {
        return createErrorResponse(
          null,
          `subCategory ${name} already exist, Try a different name.`,
          409
        );
      }

      const newSubCategory = new SubCategory({
        name,
        image: image || undefined,
        parent,
        slug: slugify(name),
      });
      await newSubCategory.save();

      return createSuccessResponse(
        null,
        `SubCategory ${name} has been created successfully.`,
        201
      );
    } catch (error: any) {
      return createErrorResponse(null, error.message, 500);
    }
  };
// );

export const GET = auth(async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const parent = searchParams.get("parent");

    let query = {};

    if (parent) {
      query = { parent };
    }

    const subCategories = await SubCategory.find(query)
      .sort({ updatedAt: -1 })
      .populate("parent", "name")
      .select("-__v -createdAt -updatedAt");

    if (!subCategories || subCategories.length === 0) {
      return createErrorResponse(
        { subCategories: [] },
        "No SubCategories found",
        200
      );
    }

    return createSuccessResponse({ subCategories }, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});

export const PUT = auth(async (request: any) => {
  try {
    const { id, name, image, parent } = await request.json();

    if (!ObjectId.isValid(id)) {
      return createErrorResponse(null, "Invalid MongoDB ID", 400);
    }

    connectDB();

    await SubCategory.findByIdAndUpdate(id, { name, image, parent });

    return createSuccessResponse(
      null,
      "Subcategory has been updated successfuly",
      200
    );
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});

export const DELETE = auth(async (request: any) => {
  try {
    const { id } = await request.json();

    if (!ObjectId.isValid(id)) {
      return createErrorResponse(null, "Invalid MongoDB ID", 400);
    }

    await connectDB();

    const deleteSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deleteSubCategory) {
      return createErrorResponse(null, "SubCategory not found`", 404);
    }

    return createSuccessResponse(
      null,
      "SubCategory has been deleted successfully",
      200
    );
  } catch (error: any) {
    return createErrorResponse(
      null,
      "An error occurred while deleting the SubCategory",
      500
    );
  }
});
