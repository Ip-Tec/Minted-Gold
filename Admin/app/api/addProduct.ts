// pages/api/addProduct.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db";
import { session } from "../../utils/model/getSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;

    try {
      const imageFileNames = formData.image.map((file: { name: any; }) => file.name);

      await prisma.product.create({
        data: {
          title: formData.title,
          price: formData.price,
          stock: formData.stock,
          image: imageFileNames,
          createdAt: formData.createdAt,
          createdBy: session?.user?.username || session?.user?.email,
          description: formData.description,
        },
      });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
