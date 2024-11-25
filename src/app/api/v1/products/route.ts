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

export async function GET() {
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
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
}

// import { connectDB } from "@/config/database";
// import {
//   brandService,
//   categoryService,
//   colorService,
//   productService,
//   sizeService,
//   subcategoryService,
// } from "@/services/server/mongodb";

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
//     const products = await productService.getProducts();

//     if (!products) {
//       return new NextResponse(
//         JSON.stringify({ message: "No products found" }),
//         { status: 400 }
//       );
//     }

//     let categories = await categoryService.getCategories();

//     if (!categories) {
//       return new NextResponse(
//         JSON.stringify({ message: "No categories found" }),
//         { status: 400 }
//       );
//     }

//     let subCategories = await subcategoryService.getSubCategories();

//     if (!subCategories) {
//       return new NextResponse(
//         JSON.stringify({ message: "No subCategories found" }),
//         { status: 400 }
//       );
//     }

//     const sizes = await sizeService.getSizes();

//     if (!sizes) {
//       return new NextResponse(JSON.stringify({ message: "No sizes found" }), {
//         status: 400,
//       });
//     }

//     const colors = await colorService.getColors();

//     if (!colors) {
//       return new NextResponse(JSON.stringify({ message: "No colors found" }), {
//         status: 400,
//       });
//     }

//     const brands = await brandService.getBrands();

//     if (!brands) {
//       return new NextResponse(JSON.stringify({ message: "No brands found" }), {
//         status: 400,
//       });
//     }

//     return new NextResponse(
//       JSON.stringify({
//         products,
//         categories,
//         subCategories,
//         sizes,
//         colors,
//         brands,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error }), { status: 500 });
//   }
// }
