// import connectDB from "@/config/database";
import { connectDB } from "@/config/database";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import SubCategory from "@/models/subcategory.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || ""; // Valeur de 'search'
  const category = searchParams.get("category")?.split(",") || []; // Tableau de catégories
  const color = searchParams.get("color")?.split(",") || [];
  const size = searchParams.get("size")?.split(",") || [];

  const query: {
    // name: { $regex: string; $options: string };
    category?: { $in: string[] };
    color?: { $in: string[] };
    size?: { $in: string[] };
  } = {};

  console.log("🚀 ~ GET ~ query:", query);

  // if (search) {
  //   query.name = { $regex: search, $options: "i" }; // Rechercher par nom
  // }
  if (category.length > 0) {
    query.category = { $in: category }; // Filtrer par catégories sélectionnées
  }
  if (color) {
    query.color = { $in: color }; // Filtrer par couleur
  }
  if (size) {
    query.size = { $in: size }; // Filtrer par taille
  }

  console.log(Object.keys(query).length === 0);

  const categoriesToFind = ["Men", "Women"];

  try {
    await connectDB();
    const products = await Product.find(
      {}
      // Object.keys(query).length === 0 ? {} : query
    )
      .sort({ createdAt: -1 })
      .lean();
    // console.log("🚀 ~ GET ~ products:POPO", products);
    // const products = await Product.find(
    //   Object.keys(query).length === 0 ? {} : query
    // )
    //   .sort({ createdAt: -1 })
    //   .lean();
    // console.log("🚀 ~ GET ~ products:POPO", products);

    if (!products) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    let categories = await Category.find().lean();
    // let categories = await Category.find({
    //   name: { $in: categoriesToFind },
    // }).lean();
    console.log("🚀 ~ GET ~ categories:", categories);

    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "No categories found" }),
        { status: 400 }
      );
    }

    let subCategories = await SubCategory.find()
      .populate({
        path: "parent",
        model: Category,
      })
      .lean();

    if (!subCategories) {
      return new NextResponse(
        JSON.stringify({ message: "No subCategories found" }),
        { status: 400 }
      );
    }

    const sizes = await Product.find().distinct("subProducts.sizes.size");
    if (!sizes) {
      return new NextResponse(JSON.stringify({ message: "No sizes found" }), {
        status: 400,
      });
    }
    return new NextResponse(
      JSON.stringify({ products, categories, subCategories, sizes }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
