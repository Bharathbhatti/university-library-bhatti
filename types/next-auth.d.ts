import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string; // Add role here
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string; // Add role here
    };
  }

  interface JWT {
    id: string;
    name: string;
    role: string; // Add role here
  }
}
