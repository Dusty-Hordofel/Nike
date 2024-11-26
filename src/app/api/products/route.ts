import { connectDB } from "@/config/database";
import {
  brandService,
  categoryService,
  colorService,
  productService,
  sizeService,
  subcategoryService,
} from "@/services/server/mongodb";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const products = await productService.getProducts();

    if (!products) {
      return createErrorResponse({ products: [] }, "Product not found", 200);
      // return createErrorResponse(null, "Product not found", 400);
    }

    let categories = await categoryService.getCategories();

    if (!categories) {
      return createErrorResponse(
        { categories: [] },
        "No categories found",
        200
      );
      // return createErrorResponse(
      //   null,
      //   "No categories found",
      //   400
      // );
    }

    let subCategories = await subcategoryService.getSubCategories();

    if (!subCategories) {
      return createErrorResponse(
        { subCategories: [] },
        "No subcategories found",
        200
      );
      // return createErrorResponse(
      //   null,
      //   "No subcategories found",
      //   400
      // );
    }

    const sizes = await sizeService.getSizes();

    if (!sizes) {
      return createErrorResponse({ sizes: [] }, "No sizes found", 200);
      // return createErrorResponse(null, "No sizes found", 400);
    }

    const colors = await colorService.getColors();

    if (!colors) {
      return createErrorResponse({ colors: [] }, "No colors found", 200);
      // return createErrorResponse(null, "No colors found", 400);
    }

    const brands = await brandService.getBrands();

    if (!brands) {
      return createErrorResponse({ brands: [] }, "No brands found", 200);
      // return createErrorResponse(null, "No brands found", 400);
    }

    return createSuccessResponse(
      {
        products,
        categories,
        subCategories,
        sizes,
        colors,
        brands,
      },
      "successResponse",
      201
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
