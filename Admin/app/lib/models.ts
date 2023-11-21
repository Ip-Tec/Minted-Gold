// ./lib/models.ts

import { User as getUsers, Product as getProducts } from '@prisma/client';
import prisma from '@/utils/db';

export async function User(): Promise<getUsers[]> {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
}

export async function Product(): Promise<getProducts[]> {
  // Get products
  const products = await prisma.product.findMany();
  console.log(products);
  return products;
}
