import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";
import { deleteImageFromCloudinary } from "@/services/admin/images.service";

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

      return Response.json(
        {
          success: true,
          error: false,
          message: "Product created successfully",
          newProduct,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return Response.json(
        { success: false, error: true, message: error.message },
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

      return Response.json(
        {
          success: true,
          error: false,
          products,
        },
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
      return Response.json(
        { success: false, error: true, message: error.message },
        { status: 500 }
      );
    }
  };
// );

export const DELETE = auth(async (request: Request) => {
  try {
    const { id } = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(id);
    console.log("🚀 ~ DELETE ~ product:ID", product);

    const deleteImages = await Promise.all(
      product.subProducts.map((subProduct: any) => {
        return Promise.all(
          subProduct.images.map(
            async ({ public_id }: { public_id: string }) => {
              if (public_id) deleteImageFromCloudinary(public_id);
            }
          )
        );
      })
    );
    console.log("🚀 ~ DELETE ~ deleted:DELETED", deleteImages);

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return Response.json(
        {
          success: false,
          error: true,
          message: `Product not found`,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        error: false,
        message: "Product has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "An error occurred while deleting the product",
        details: error.message,
      },
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
      return Response.json(
        {
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        },
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
    return Response.json(
      { success: false, error: true, message: error.message },
      {
        status: 500,
      }
    );
  }
});
