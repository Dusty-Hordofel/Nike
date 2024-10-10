import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";

export const POST =
  // auth(
  async (request: Request) => {
    try {
      await connectDB();

      const {
        name,
        description,
        productType,
        category,
        subCategories,
        shipping,
        subProducts,
      } = await request.json();
      console.dir("🚀 ~ subProducts:SUB", subProducts.images);

      const newProduct = new Product({
        name: name,
        description: description,
        category,
        subCategories,
        productType,
        // details: req.body.details,
        // questions: req.body.questions,
        shipping: shipping || undefined,
        slug: slugify(name),
        subProducts,
      });

      await newProduct.save();

      console.log("🚀 ~ newProduct:NEW", newProduct);

      return new Response(
        JSON.stringify({
          success: true,
          error: false,
          message: "Product created successfully",
          newProduct,
        }),
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

export const GET =
  // auth(
  async () => {
    try {
      connectDB();
      const products = await Product.find({})
        .sort({ updatedAt: -1 })
        .select("-__v -createdAt -updatedAt");

      if (!products) {
        return Response.json(
          {
            success: true,
            error: false,
            message: `No products found`,
            products: [],
          },
          { status: 200 }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          error: false,
          products,
        }),
        { status: 200 }
      );

      // return Response.json(
      //   {
      //     success: true,
      //     error: false,
      //     products,
      //   },
      //   { status: 201 }
      // );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, error: true, message: error.message }),
        { status: 500 }
      );
    }
  };
// );

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

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: `Product not found`,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "Product has been deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "An error occurred while deleting the product",
        details: error.message,
      }),
      { status: 500 }
    );
  }
});

export const PUT = auth(async (request: any) => {
  try {
    const body = await request.json();
    // const { id, name, image, parent } = await request.json();
    console.log("🚀 ~ PUT ~ id:ID", body.id);

    if (!ObjectId.isValid(body.id)) {
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

    await Product.findByIdAndUpdate(body.id, { ...body });

    return Response.json(
      {
        success: true,
        error: false,
        message: "Product has been updated successfuly",
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
