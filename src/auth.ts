import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/database/mongodb";
import { LogInSchema } from "./schemas/user/auth.schema";
import bcrypt from "bcryptjs";

import User from "./models/user.model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (credentials == null) return null;

        const validatedFields = LogInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await User.findOne({ email });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger }) {
      console.log("🚀 ~ jwt ~ token:", token);
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture,
          //   role: token.role || "user",
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
