import { connectDB } from "@/config/database";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import SubCategory from "@/models/subcategory.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    if (!products) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    let categories = await Category.find().lean();

    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "No categories found" }),
        { status: 400 }
      );
    }

    console.log("🚀 ~ GET ~ categories:", categories);

    let subCategories = await SubCategory.find()
      .populate({
        path: "parent",
        model: Category,
      })
      .lean();
    console.log("🚀 ~ GET ~ subCategories:", subCategories);

    if (!subCategories) {
      return new NextResponse(
        JSON.stringify({ message: "No subCategories found" }),
        { status: 400 }
      );
    }

    const sizes = await Product.find().distinct("subProducts.sizes.size");
    console.log("🚀 ~ GET ~ sizes:", sizes);

    if (!sizes) {
      return new NextResponse(JSON.stringify({ message: "No sizes found" }), {
        status: 400,
      });
    }

    const colors = await Product.aggregate([
      { $unwind: "$subProducts" }, // Détache chaque sous-produit dans le pipeline
      { $unwind: "$subProducts.color" }, // Détache chaque couleur dans les sous-produits
      {
        $group: {
          _id: {
            name: "$subProducts.color.name",
            hexCode: "$subProducts.color.hexCode",
          },
          color: { $first: "$subProducts.color" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$color",
        },
      },
    ]);

    console.log("🚀 ~ GET ~ colors:COCO", colors);

    if (!colors) {
      return new NextResponse(JSON.stringify({ message: "No colors found" }), {
        status: 400,
      });
    }

    const brands = await Product.find().distinct("brand");
    if (!brands) {
      return new NextResponse(JSON.stringify({ message: "No brands found" }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({
        products,
        categories,
        subCategories,
        sizes,
        colors,
        brands,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
