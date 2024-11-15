import { connectDB } from "@/config/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import User, { Wishlist } from "@/models/user.model";
import Product from "@/models/product.model";
import { SubProduct } from "@/@types/admin/admin.products.interface";
// import Product from "@/models/product.model";

export const POST = async (
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) => {
  if (!ObjectId.isValid(userId)) {
    return NextResponse.json(
      { success: false, error: true, message: "Invalid user ID" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const { slug, color } = await request.json();
    console.log("🚀 ~ color:LOF", color);

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ _id: new ObjectId(userId) });
    // console.log("🚀 ~ user:", user);

    if (!user) {
      return NextResponse.json(
        { success: false, error: false, message: "User not found" },
        { status: 404 }
      );
    }

    const existingWishlistItem = await user.wishlist.find(
      (w: { slug: string; color: string; addedAt: any }) =>
        w.slug == slug && w.color == color
    );
    console.log("🚀 ~ existingWishlistItem:EX", existingWishlistItem);

    if (existingWishlistItem) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Product already in wishlist",
        },
        { status: 409 }
      );
    }

    await user.updateOne({
      $push: {
        wishlist: {
          slug,
          color,
          addedAt: new Date(),
        },
      },
    });

    console.log("🚀 ~ user:USER", user);

    return NextResponse.json(
      {
        success: true,
        error: false,
        slug,
        color,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const user = await User.findOne({ _id: new ObjectId(userId) });

    const productsInWishlist = await Promise.all(
      user.wishlist.map(async (item: Wishlist) => {
        const product = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${
            item.slug
          }/variants?color=${item.color.toLocaleLowerCase()}`
        ).then((res) => res.json());

        return product;
      })
    );
    if (productsInWishlist.length > 0) {
      return NextResponse.json(
        {
          success: true,
          error: false,
          productsInWishlist,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        error: false,
        productsInWishlist: [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
};
