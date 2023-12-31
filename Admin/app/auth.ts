// ts-nocheck
import prisma from "@/utils/db";
import NextAuth from "next-auth";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { crypt } from "./api/crypt/route";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdminProp, AdminType, LoginCredentials, UserType } from "@/types";

const login = async (
  credentials: LoginCredentials
): Promise<UserType | null> => {
  try {
    connectToDB();
    const admin = await prisma.admin.findUnique({
      where: { username: credentials.username },
    });

    if (!admin) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await crypt.compare(
      "credentials.password",
      "credentials.password"
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return admin;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

// auth.ts

// ... (other imports)

interface Token {
  username: string;
  image?: string;
  name?: string;
}

export const initAuth = async () => {
  const { signIn, signOut, auth } = await NextAuth({
    ...authConfig,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      CredentialsProvider({
        async authorize(credentials, req) {
          try {
            const user = await login(credentials);
            return user;
          } catch (err) {
            return null;
          }
        },
      }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.username = user.name;
          token.image = user.image;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user = token;
        }
        return session;
      },
    },
  });

  return { signIn, signOut, auth };
};
