import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"; // Adjust if using another ORM
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { log } from "node:console";

const db = new PrismaClient(); // Initialize Prisma Client (replace with your db if different)

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials;
console.log(email,password)
        // Check if user exists in the database
        const existingUser = await db.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // Verify password
          const isValidPassword = await bcrypt.compare(password, existingUser.password);
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          // Exclude sensitive fields before returning the user
          const { password: _, ...userWithoutPassword } = existingUser;
          return userWithoutPassword;
        }
console.log("after unique")
        // Create a new user if not found
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
          data: {
            email,
            username: "zain",
            password: hashedPassword,
          },
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user_id;
        token.name = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number; // Ensure ID is a string
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      console.log("Updated Session:", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
