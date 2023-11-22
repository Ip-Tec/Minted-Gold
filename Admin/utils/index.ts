import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { AdminType, UserType } from "@/types";
import prisma from "./db";
import { generateKey, sendKeyToAdmin } from "./mail";
import nodemailer from "nodemailer"; // Import nodemailer

export const options: NextAuthOptions = {
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
          name: "Credentials Keys",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "Username",
            },
            email: {
              label: "Email",
              type: "email",
              placeholder: "admin@metedgold.com",
            },
            password: {
              label: "Password",
              type: "password",
              placeholder: "AdminPassword",
            },
          },
      async authorize(credentials, req) {
        // Check if the user is an admin
        const adminData: AdminType | null = await prisma.admin.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (adminData && credentials?.email === adminData.email) {
          // User is an admin
          const admin = {
            id: adminData.id?.toString() || "",
            username: adminData.username,
            email: adminData.email,
            admin: true, // Use correct property name (admid -> admin)
          };

          // Generate and send a key to the admin's email
          // Implement a function to generate a key
          const key = generateKey(admin.email); 
          // Implement a function to send the key
          sendKeyToAdmin(admin.email, await key); 

          // Redirect the admin to the input key page
          return { ...admin, keyRedirect: true };
        } else {
          // User is not an admin, check if it's a regular user
          const userData: UserType | null = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          if (userData && credentials?.email === userData.email) {
            // User is a regular user
            const user = {
              id: userData.id?.toString() || "",
              username: userData.firstName,
              email: userData.email,
              admin: false,
            };

            // Redirect the regular user to a different page
            return { ...user, userRedirect: true };
          } else {
            // User is neither an admin nor a regular user
            return null;
          }
        }
      },
    }),
  ],
};
