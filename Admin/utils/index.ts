
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import { Admin } from '@/types';
import prisma from './db';


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
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "AdminPassword",
        // },
      },
      async authorize(credentials, req) {
        // Get data from DB using prisma client
        const adminData :Admin | null = await prisma.admin.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (adminData  && credentials?.email === adminData.email) {
          const admin = {
            id: adminData.id?.toString() || '', // Convert number to string
            username: adminData.username,
            email: adminData.email,
            // Include other properties as needed
          };
      
          return admin;
        } else {
          return null;
        }
      },
    }),
  ],
};
