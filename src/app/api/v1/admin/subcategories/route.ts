import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import SubCategory from "@/models/SubCategory";

export const POST =
  // auth(
  async (request: any) => {
    try {
      const { name, parent, image } = await request.json();
      console.log("🚀 ~ image:IM", image);
      connectDB();
      const subCategory = await SubCategory.findOne({ name });

      if (subCategory) {
        return Response.json(
          {
            success: false,
            error: true,
            message: `subCategory ${name} already exist, Try a different name.`,
          },
          { status: 400 }
        );
      }

      const newSubCategory = new SubCategory({
        name,
        image: image || undefined,
        parent,
        slug: slugify(name),
      });
      await newSubCategory.save();

      return Response.json(
        {
          success: true,
          error: false,
          message: `SubCategory ${name} has been created successfully.`,
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
    const subCategories = await SubCategory.find({}).sort({ updatedAt: -1 });

    if (!subCategories) {
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
        subCategories,
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
    const { id, name, image, parent } = await request.json();
    console.log("🚀 ~ PUT ~ id:ID", id);

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

    await SubCategory.findByIdAndUpdate(id, { name, image, parent });

    return Response.json(
      {
        success: true,
        error: false,
        message: "Subcategory has been updated successfuly",
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

    const deleteSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deleteSubCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: `SubCategory not found`,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "SubCategory has been deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "An error occurred while deleting the SubCategory",
        details: error.message,
      }),
      { status: 500 }
    );
  }
});
