import { auth } from "@/auth";

export const GET = auth(async (req) => {
  console.log("🚀 ~ GET ~ req:", req.auth);
  console.log("🚀 ~ GET ~ req:", req.auth?.user._id);

  return Response.json({ message: "User has been updated" });
});
