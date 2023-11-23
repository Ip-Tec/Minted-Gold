import { options } from "@/utils";
import { getServerSession } from "next-auth";

export const session = async () => {
  const US = await getServerSession(options);
  return US;
};
