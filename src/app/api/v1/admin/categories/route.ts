import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import { categoryService } from "@/services/server/mongodb";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

export const POST = auth(async (request: any) => {
  try {
    const { name, image } = await request.json();

    connectDB();
    const category = await categoryService.getCategoryByName(name);

    if (category) {
      return createErrorResponse(
        null,
        `Category ${name} already exist, Try a different name.`,
        400
      );
    }
    await categoryService.createCategory({
      name,
      image: image || undefined,
      slug: slugify(name),
    });

    return createSuccessResponse(
      null,
      `Category ${name} has been created successfully.`,
      201
    );
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});

export const GET = auth(async () => {
  try {
    connectDB();
    const categories = await categoryService.getCategories();

    if (!categories) {
      return createErrorResponse(
        {
          categories: [],
        },
        "No Categories found",
        200
      );
    }

    return createSuccessResponse(
      { categories },
      "category created successfully",
      201
    );
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});

export const PUT = auth(async (request: any) => {
  try {
    const { id, name, image } = await request.json();

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        }),
        { status: 400 }
      );
    }

    connectDB();

    await categoryService.updateCategory(id, { name, image });

    return createSuccessResponse(
      null,
      "Category has been updated successfuly",
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

    const deleteCategory = await categoryService.deleteCategory(id);

    if (!deleteCategory) {
      return createErrorResponse(null, "Category not found", 404);
    }

    return createSuccessResponse(
      null,
      "Category has been deleted successfully",
      200
    );
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});
