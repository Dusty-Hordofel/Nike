import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import Category from "@/models/Category";
import slugify from "slugify";

export const POST =
  // auth(
  async (request: any) => {
    try {
      const { name, image } = await request.json();
      console.log("🚀 ~ image:IM", image);
      connectDB();
      const category = await Category.findOne({ name });

      if (category) {
        return Response.json(
          {
            success: false,
            error: true,
            message: `Category ${name} already exist, Try a different name.`,
          },
          { status: 400 }
        );
      }

      const newCategory = new Category({ name, image, slug: slugify(name) });
      await newCategory.save();

      return Response.json(
        {
          success: true,
          error: false,
          message: `Category ${name} has been created successfully.`,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, error: true, message: error.message }),
        { status: 500 }
      );
    }
  };
// );

export const GET = auth(async () => {
  try {
    connectDB();
    const categories = await Category.find({}).sort({ updatedAt: -1 });

    if (!categories) {
      return Response.json(
        {
          success: false,
          error: true,
          message: `No Categories found`,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        error: false,
        categories,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: true, message: error.message }),
      { status: 500 }
    );
  }
});

export const PUT = auth(async (request: any) => {
  try {
    const { id, name } = await request.json();

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

    await Category.findByIdAndUpdate(id, { name });

    return Response.json(
      {
        success: true,
        error: false,
        message: "Category has been updated successfuly",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: true, message: error.message }),
      {
        status: 500,
      }
    );
  }
});

export const DELETE = auth(async (request: any) => {
  try {
    const { id } = await request.json();

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

    await connectDB();

    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: `Category not found`,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "Category has been deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "An error occurred while deleting the category",
        details: error.message,
      }),
      { status: 500 }
    );
  }
});
