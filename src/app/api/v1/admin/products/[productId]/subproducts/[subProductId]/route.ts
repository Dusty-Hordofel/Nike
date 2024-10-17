import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import Product from "@/models/product.model";
import { ObjectId } from "mongodb";
import { deleteImageFromCloudinary } from "@/services/admin/images.service";

export const DELETE = auth(async (request: Request) => {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const productId = pathSegments[5];
  const subProductId = pathSegments[7];

  try {
    const { subProductIndex } = await request.json();

    if (!ObjectId.isValid(productId)) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(productId);

    await Promise.all(
      product.subProducts[subProductIndex].images.map(
        async ({ public_id }: { public_id: string }) => {
          if (public_id) deleteImageFromCloudinary(public_id);
        }
      )
    );

    // Recherche et suppression du sous-produit dans le produit
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { subProducts: { _id: subProductId } },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return Response.json(
        {
          success: false,
          error: true,
          message: `Product not found`,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        error: false,
        message: "subProduct has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "An error occurred while deleting the subProduct",
        details: error.message,
      },
      { status: 500 }
    );
  }
});
