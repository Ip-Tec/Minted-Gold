import NextAuth from "next-auth";
import { options } from "@/utils";

const handel = NextAuth(options);

export { handel as GET, handel as POST };
