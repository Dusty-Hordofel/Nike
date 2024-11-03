import { connectDB } from "@/config/database";
import Product, { ISubProduct } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const slug = body.slug;
  const style = body.style || 0;
  const size = body.size || 0;

  try {
    await connectDB();
    let product = await Product.findOne({ slug });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "No products found" }),
        { status: 400 }
      );
    }
    const subProduct = product.subProducts[style] as ISubProduct;
    const priceAfterDiscount =
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price;

    const priceBeforeDiscount = subProduct.sizes[size].price;
    const quantity = subProduct.sizes[size].qty;

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
        (subProduct: ISubProduct) => subProduct.color
      ),
      priceAfterDiscount: Number(priceAfterDiscount),
      priceBeforeDiscount: Number(priceBeforeDiscount),
      quantity,
    };

    return new NextResponse(JSON.stringify({ product: newProduct }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
