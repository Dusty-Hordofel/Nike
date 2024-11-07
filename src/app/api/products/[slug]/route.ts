import { SubProduct } from "@/@types/admin/admin.products.interface";
import { connectDB } from "@/config/database";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  console.log("🚀 ~ slug:SLUG", slug);
  const { searchParams } = new URL(request.url);
  const color = searchParams.get("color");
  console.log("🚀 ~ color:", color);
  // const size = Number(searchParams.get("size")) || 0;

  try {
    await connectDB();
    let product = await Product.findOne({ slug });
    console.log("🚀 ~ product:PROD", product);

    if (!product) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 }
      );
    }

    const subProduct = product.subProducts.filter(
      (subProduct: SubProduct) =>
        subProduct.color.name.toLocaleLowerCase() === color
    );
    console.log("🚀 ~ subProduct:SUBO", subProduct);

    const newProduct = {
      _id: product._id,
      slug: product.slug,
      color: color,
      name: product.name,
      description: product.description,
      images: subProduct.images,
      category: product.category,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      shipping: product.shipping,
      colors: product.subProducts.map(
        (subProduct: SubProduct) => subProduct.color
      ),
    };

    console.log("🚀 ~ subProduct:SUBPRO", subProduct);

    return NextResponse.json(
      { product: newProduct },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { error: true, success: false, message: error.message },
      { status: 500 }
    );
  }
}
