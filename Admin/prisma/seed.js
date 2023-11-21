// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed admins
    const admin1 = await prisma.admin.create({
      data: {
        name: 'Admin 1',
        username: 'admin1',
        email: 'admin1@example.com',
        provider: 'GitHub',
      },
    });

    const admin2 = await prisma.admin.create({
      data: {
        name: 'Admin 2',
        username: 'admin2',
        email: 'admin2@example.com',
        provider: 'Google',
      },
    });

    // Seed products
    const product1 = await prisma.product.create({
      data: {
        stock: 'In stock',
        image: 'product1.jpg',
        title: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
        createdAt: new Date(),
        adminUsername: admin1.username,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        stock: 'In stock',
        image: 'product2.jpg',
        title: 'Product 2',
        description: 'Description for Product 2',
        price: 29.99,
        createdAt: new Date(),
        adminUsername: admin2.username,
      },
    });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
