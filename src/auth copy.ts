// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./lib/mongodb";
// import { logInSchema } from "./lib/validations/auth";
// import bcrypt from "bcrypt";
// import User from "./models/User";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     Credentials({
//       authorize: async (credentials) => {
//         if (credentials == null) return null;

//         const validatedFields = logInSchema.safeParse(credentials);
//         console.log("🚀 ~ authorize: ~ validatedFields:", validatedFields);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;

//           const user = await User.findOne({ email });
//           console.log("🚀 ~ authorize: ~ user:", user);

//           if (user && user.password) {
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch)
//               return {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//               };
//           }
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     sion: async ({ session, user, trigger, token }: any) => {
//       console.log("🚀 ~ session: ~ session:", session);
//       //   session.user.id = token.sub;
//       //   session.user.role = token.role;
//       //   if (trigger === "update") {
//       //     session.user.name = user.name;
//       //   }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
// });
