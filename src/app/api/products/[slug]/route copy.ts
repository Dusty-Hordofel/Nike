import { SubProduct } from "@/@types/admin/admin.products.interface";
import { connectDB } from "@/config/database";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const style = Number(searchParams.get("style")) || 0;
  // const size = Number(searchParams.get("size")) || 0;

  try {
    await connectDB();
    let product = await Product.findOne({ slug });
    console.log("🚀 ~ product:PROD", product);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }

    const subProduct = product.subProducts[style] as SubProduct;
    console.log("🚀 ~ subProduct:SUBPRO", subProduct);
    // const priceAfterDiscount =
    //   subProduct.discount > 0
    //     ? (
    //         subProduct.sizes[size].price -
    //         subProduct.sizes[size].price / subProduct.discount
    //       ).toFixed(2)
    //     : subProduct.sizes[size].price;

    // const priceBeforeDiscount = subProduct.sizes[size].price;
    // const quantity = subProduct.sizes[size].qty;

    const newProduct = {
      // subProduct,
      _id: product._id,
      slug: product.slug,
      style: Number(style),
      // sku: subProduct.sku,
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
      // priceAfterDiscount: Number(priceAfterDiscount),
      // priceBeforeDiscount: Number(priceBeforeDiscount),
      // quantity,
    };

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
