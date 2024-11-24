import { connectDB } from "@/config/database";
import { productService } from "@/services/server/mongodb";
import { subProductService } from "@/services/server/mongodb/subproduct.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size") || "";

  try {
    await connectDB();
    let product = await productService.getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 }
      );
    }

    const subProduct = await subProductService.getSubProduct(
      product,
      selectedColor as string
    );

    const priceAfterDiscount =
      subProductService.getPriceAfterDiscount(subProduct);

    const priceBeforeDiscount =
      subProductService.getPriceBeforeDiscount(subProduct);

    const quantity = subProductService.getQuantity(subProduct, selectedSize);

    const colors = subProductService.getColors(product);

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
