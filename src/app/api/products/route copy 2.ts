// import connectDB from "@/config/database";
import { connectDB } from "@/config/database";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import SubCategory from "@/models/subcategory.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || ""; // Valeur de 'search'
  const categories =
    searchParams.get("category")?.split(",").filter(Boolean) || []; // Tableau de catégories
  const colors = searchParams.get("color")?.split(",").filter(Boolean) || [];
  const sizes = searchParams.get("size")?.split(",").filter(Boolean) || [];
  console.log("🚀 ~ GET ~ sizes:SIZES", sizes);
  console.log("🚀 ~ GET ~ categories:CAT", categories);

  // const query: {
  //   category?: { $in: string[] };
  //   subProducts?: {
  //     $elemMatch?: {
  //       sizes?: {
  //         size?: { $in: string[] };
  //       };
  //       color?: { $in: string[] };
  //     };
  //   };
  // } = {};

  const query: {
    category?: { $in: string[] };
    subProducts?: {
      $elemMatch?: {
        sizes?: {
          $elemMatch?: {
            size?: { $in: string[] };
          };
        };
        color?: { $in: string[] };
      };
    };
  } = {};

  // if (search) {
  //   query.name = { $regex: search, $options: "i" }; // Rechercher par nom
  // }
  if (categories.length > 0) {
    query.category = { $in: categories }; // Filtrer par catégories sélectionnées
  }
  // if (color.length > 0) {
  //   query.color = { $in: color }; // Filtrer par couleur
  // }

  // if (sizes.length > 0) {
  //   // Vérifie d'abord si `subProducts` existe, sinon l'initialise
  //   if (!query.subProducts) {
  //     query.subProducts = {};
  //   }
  //   query.subProducts.sizes = { $in: sizes };
  // }

  // if (sizes.length > 0) {
  //   // Vérifie d'abord si `subProducts` existe, sinon l'initialise
  //   if (!query.subProducts) {
  //     query.subProducts = {};
  //   }
  //   // Utilisation de $elemMatch pour filtrer les tailles dans les sous-produits
  //   query.subProducts = {
  //     $elemMatch: {
  //       sizes: { $elemMatch: { size: { $in: sizes } } }
  //     }
  //   };
  // }

  if (sizes.length > 0) {
    query.subProducts = {
      $elemMatch: {
        sizes: {
          $elemMatch: {
            size: { $in: sizes },
          },
        },
      },
    };
  }
  console.log("🚀 ~ GET ~ query:TALA", query);

  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    const tolo = await Product.find(query).sort({ createdAt: -1 }).lean();
    console.log("🚀 ~ GET ~ products:TEST", tolo);

    if (!products) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    if (!tolo) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    const filteredProducts = products
      .map((product) => {
        return {
          ...product,
          subProducts: product.subProducts.filter((subProduct: any) =>
            subProduct.sizes.some((sizeObj: any) =>
              sizes.includes(sizeObj.size)
            )
          ),
        };
      })
      .filter((product) => product.subProducts.length > 0); // Garder uniquement les produits ayant des sous-produits
    console.log("🚀 ~ GET ~ filteredProducts:", filteredProducts);

    let categories = await Category.find().lean();

    // let categories = await Category.find({
    //   name: { $in: categoriesToFind },
    // }).lean();
    // console.log("🚀 ~ GET ~ categories:", categories);

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
      JSON.stringify({ tolo, products, categories, subCategories, sizes }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
