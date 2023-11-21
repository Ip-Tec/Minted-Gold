import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log('Connected to Prisma database');

  // Use the prisma client to interact with the database
  // ...

//   await prisma.$disconnect();
//   console.log('Disconnected from Prisma database');
}

main();
