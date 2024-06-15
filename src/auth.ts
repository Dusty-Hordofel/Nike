import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { LogInSchema } from "./lib/validations/auth";
import bcrypt from "bcrypt";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LogInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await User.findOne({ email });
          console.log("🚀 ~ authorize: ~ user:", user);

          // étape normalement vérifier avec lookup
          if (!user) {
            throw new Error("Aucun utilisateur trouvé avec cet email");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error(
              "Mot de passe incorrect. Veuillez réessayer avec le bon mot de passe"
            );
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger }) {
      console.log("🚀 ~ jwt ~ trigger:", trigger);
      return token;
      // fetch user
      // if(!token.sub) return token;

      // const exisitingUser = await getUserById(token.sub);

      // if(!exisitingUser) return token;

      // token.role = exisitingUser.role;
      // return token;
    },
    session: async ({ session, user, trigger, token }) => {
      console.log("🚀 ~ session: ~ token:", token);
      console.log("🚀 ~ session: ~ session:", session);
      return session;
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
