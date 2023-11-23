import prisma from "../db";
import {session} from "./getSession"


export const addProduct = async (formData: Iterable<readonly [PropertyKey, any]>) => {
  const { title, image, description, price, stock, createdAt, createdBy } =
    Object.fromEntries(formData);

  try {
    await prisma.product.create({
      data: {
        title,
        price,
        stock,
        image,
        createdAt,
        createdBy: session?.user?.username || session?.user?.email,
        description,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }
};
