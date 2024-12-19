import  { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number; // Add custom fields here
      username?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    user_id: number; // Add custom user_id here
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number; // Add custom fields here
  }
}
