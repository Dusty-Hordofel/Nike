import { connectDB } from "@/config/database";
import {
  brandService,
  categoryService,
  colorService,
  productService,
  sizeService,
  subcategoryService,
} from "@/services/server/mongodb";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const products = await productService.getProducts();

    if (!products) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    let categories = await categoryService.getCategories();

    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "No categories found" }),
        { status: 400 }
      );
    }

    let subCategories = await subcategoryService.getSubCategories();

    if (!subCategories) {
      return new NextResponse(
        JSON.stringify({ message: "No subCategories found" }),
        { status: 400 }
      );
    }

    const sizes = await sizeService.getSizes();

    if (!sizes) {
      return new NextResponse(JSON.stringify({ message: "No sizes found" }), {
        status: 400,
      });
    }

    const colors = await colorService.getColors();

    if (!colors) {
      return new NextResponse(JSON.stringify({ message: "No colors found" }), {
        status: 400,
      });
    }

    const brands = await brandService.getBrands();

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
