"use server"
import prisma from "../db";
import {session} from "./getSession"


export const addProduct = async (formData: any) => {
  const { title, description, price, stock, createdAt, createdBy } = formData;

  try {
    const imageFileNames = formData.image.map((file) => file.name);

    await prisma.product.create({
      data: {
        title,
        price,
        stock,
        image: imageFileNames, // Use the array of file names
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
