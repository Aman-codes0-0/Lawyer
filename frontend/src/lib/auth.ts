import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@lexprime.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded admin for simplicity, in production you'd use prisma to find the user
        // and bcrypt to verify the password.
        if (
          credentials?.email === "admin@lexprime.com" &&
          credentials?.password === "admin123"
        ) {
          return { id: "1", name: "Admin", email: "admin@lexprime.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
