import { auth } from "@/auth";
import { currentRole, currentUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params: { userId } }: { params: { userId: string } }
// ) {
//   //   const role = await currentRole();
//   //   console.log("🚀 ~ role:", role);

//   const user = await currentUser();
//   console.log("🚀 ~ user:", user);

//   return new NextResponse(
//     JSON.stringify({ success: true, error: false, message: "MOKILI" }),
//     {
//       status: 200,
//     }
//   );
// }

export const GET = auth(async (req: any) => {
  //   const role = await currentRole();
  // auth
  console.log(req);

  console.log("PESA MAKAMBO", req.auth);
  return new NextResponse(
    JSON.stringify({
      success: true,
      error: false,
      message: "MOKILI",
      auth: req.auth,
    }),
    {
      status: 200,
    }
  );
});
