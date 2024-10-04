// import { Product } from "@/models/Product";
import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import Product from "@/models/Product";

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
