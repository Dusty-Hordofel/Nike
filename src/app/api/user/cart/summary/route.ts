import { auth } from "@/auth";

export const GET = auth(async (req) => {
  console.log("🚀 ~ GET ~ req:", req.auth);

  return Response.json({ message: "User has been updated" });
});
