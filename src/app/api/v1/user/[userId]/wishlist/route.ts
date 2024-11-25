import { connectDB } from "@/config/database";
import { ObjectId } from "mongodb";
import User, { Wishlist } from "@/models/user.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

export const POST = async (
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) => {
  if (!ObjectId.isValid(userId)) {
    return createErrorResponse(
      null,
      "Invalid ID format. Please provide a valid MongoDB ObjectId.",
      400
    );
  }

  try {
    await connectDB();

    const { slug, color } = await request.json();

    const user = await User.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return createErrorResponse(null, "User not found", 404);
    }

    const existingWishlistItem = await user.wishlist.find(
      (w: { slug: string; color: string; addedAt: any }) =>
        w.slug == slug && w.color == color
    );

    if (existingWishlistItem) {
      return createErrorResponse(null, "Product already in wishlist", 409);
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

    return createSuccessResponse({ slug, color }, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
};

export const GET = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
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
      return createSuccessResponse({ productsInWishlist }, "", 200);
    }

    return createSuccessResponse({ productsInWishlist: [] }, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
};
