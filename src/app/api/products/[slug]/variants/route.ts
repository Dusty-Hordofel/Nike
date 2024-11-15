import { SubProduct } from "@/@types/admin/admin.products.interface";
import { connectDB } from "@/config/database";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size") || "";

  try {
    await connectDB();
    let product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 }
      );
    }

    const subProduct = product.subProducts.find(
      (subProduct: SubProduct) =>
        subProduct.color.name.toLocaleLowerCase() === selectedColor
    );
    console.log("🚀 ~ subProduct:SUBO", subProduct);

    // priceAfterDiscount
    const priceAfterDiscount =
      subProduct.discount > 0
        ? (subProduct.price - subProduct.price / subProduct.discount).toFixed(2)
        : subProduct.price;

    // priceBeforeDiscount
    const priceBeforeDiscount = subProduct.price;

    // quantity
    const quantity = selectedSize
      ? subProduct.sizes.find(
          (item: { size: string; qty: number; _id: string }) =>
            item.size.toLocaleLowerCase() === selectedSize
        ).qty
      : subProduct.sizes[0].qty;

    // colors
    const colors = product.subProducts.map(
      (subProduct: SubProduct) => subProduct.color
    );

    const newProduct = {
      _id: product._id,
      // productID: product._id,
      subProductID: subProduct._id,
      slug: product.slug,
      color: selectedColor,
      name: product.name,
      description: product.description,
      images: subProduct.images,
      category: product.category,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      shipping: product.shipping,
      colors,
      priceAfterDiscount: priceAfterDiscount,
      priceBeforeDiscount: priceBeforeDiscount,
      quantity,
    };

    return NextResponse.json(
      { product: newProduct },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: true, success: false, message: error.message },
      { status: 500 }
    );
  }
}
