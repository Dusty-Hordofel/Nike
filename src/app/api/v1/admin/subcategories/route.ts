import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import SubCategory from "@/models/subcategory.model";

export const POST =
  // auth(
  async (request: any) => {
    try {
      const { name, parent, image } = await request.json();
      console.log("🚀 ~ image:IM", image);
      connectDB();
      const subCategory = await SubCategory.findOne({ name });

      if (subCategory) {
        return Response.json(
          {
            success: false,
            error: true,
            message: `subCategory ${name} already exist, Try a different name.`,
          },
          { status: 400 }
        );
      }

      const newSubCategory = new SubCategory({
        name,
        image: image || undefined,
        parent,
        slug: slugify(name),
      });
      await newSubCategory.save();

      return Response.json(
        {
          success: true,
          error: false,
          message: `SubCategory ${name} has been created successfully.`,
        },
        { status: 201 }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, error: true, message: error.message }),
        { status: 500 }
      );
    }
  };
// );

// export const GET = auth(async (request: any) => {
//   try {
//     connectDB();
//     // const subCategories = await SubCategory.find({}).sort({ updatedAt: -1 });

//     const { searchParams } = new URL(request.url);
//     const parent = searchParams.get("parent");
//     console.log("🚀 ~ GET ~ parent:", parent);

//     const subCategories = await SubCategory.find({})
//       .sort({ updatedAt: -1 })
//       .populate("parent", "name") // Populate avec seulement le champ 'name' de la catégorie parente
//       .select("-__v -createdAt -updatedAt");

//     // const subCategories = await SubCategory.find({})
//     //   .populate({ path: "parent", model: "Category" })
//     //   .sort({ updatedAt: -1 });

//     if (!subCategories) {
//       return Response.json(
//         {
//           success: false,
//           error: true,
//           message: `No Categories found`,
//         },
//         { status: 200 }
//       );
//     }

//     return Response.json(
//       {
//         success: true,
//         error: false,
//         subCategories,
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({ success: false, error: true, message: error.message }),
//       { status: 500 }
//     );
//   }
// });

export const GET = auth(async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    console.log("🚀 ~ searchParams:SEARCHPARAMS", searchParams);
    const parent = searchParams.get("parent"); // Récupère le paramètre 'parent' si présent
    console.log("🚀 ~ parent:PARENT", parent);

    let query = {};

    if (parent) {
      query = { parent }; // Filtre par parent si l'ID est présent
    }

    const subCategories = await SubCategory.find(query)
      .sort({ updatedAt: -1 })
      .populate("parent", "name") // Populate avec seulement le champ 'name' de la catégorie parente
      .select("-__v -createdAt -updatedAt");

    if (!subCategories || subCategories.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          error: false,
          subCategories: [],
          message: `No SubCategories found`,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        subCategories,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: true, message: error.message }),
      { status: 500 }
    );
  }
});

export const PUT = auth(async (request: any) => {
  try {
    const { id, name, image, parent } = await request.json();
    console.log("🚀 ~ PUT ~ id:ID", id);

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        }),
        { status: 400 }
      );
    }

    connectDB();

    await SubCategory.findByIdAndUpdate(id, { name, image, parent });

    return Response.json(
      {
        success: true,
        error: false,
        message: "Subcategory has been updated successfuly",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: true, message: error.message }),
      {
        status: 500,
      }
    );
  }
});

export const DELETE = auth(async (request: any) => {
  try {
    const { id } = await request.json();

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: "Invalid MongoDB ID",
        }),
        { status: 400 }
      );
    }

    await connectDB();

    const deleteSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deleteSubCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          error: true,
          message: `SubCategory not found`,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "SubCategory has been deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "An error occurred while deleting the SubCategory",
        details: error.message,
      }),
      { status: 500 }
    );
  }
});
