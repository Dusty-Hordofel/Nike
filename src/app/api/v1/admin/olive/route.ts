import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/config/database";
import slugify from "slugify";
import SubCategory from "@/models/SubCategory";

// export const GET =
//   // auth(

//   async (request: any) => {
//     try {
//       // connectDB();

//       // const { searchParams } = new URL(request.url);
//       // const parent = searchParams.get("parent");
//       // console.log("🚀 ~ GET ~ parent:", parent);

//       // const subCategories = await SubCategory.find({})
//       //   .sort({ updatedAt: -1 })
//       //   .populate("parent", "name") // Populate avec seulement le champ 'name' de la catégorie parente
//       //   .select("-__v -createdAt -updatedAt");

//       // if (!subCategories) {
//       //   return Response.json(
//       //     {
//       //       success: false,
//       //       error: true,
//       //       message: `No Categories found`,
//       //     },
//       //     { status: 400 }
//       //   );
//       // }

//       return Response.json(
//         {
//           success: true,
//           error: false,
//           // subCategories,
//           test: "olive",
//         },
//         { status: 200 }
//       );
//     } catch (error: any) {
//       return new Response(
//         JSON.stringify({ success: false, error: true, message: error.message }),
//         { status: 500 }
//       );
//     }
//   };
// // );

export const GET =
  // auth(

  async (request: Request) => {
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
  };
// );
