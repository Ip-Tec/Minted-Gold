// app/lib/bata.ts
// User Model
import prisma from "@/utils/db";
// import { PrismaClient  as PC } from "@prisma/client";
import { ProductProp } from "@/types";

// Assuming `count` should default to 0 when it's not available
export const fetchUsers = async (
  q: string,
  page: any
): Promise<{ count: number; users: any[] }> => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

  try {
    const count = await prisma.user.count({
      where: {
        username: { contains: regex },
      },
    });

    const users = await prisma.user.findMany({
      where: {
        username: { contains: regex },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });

    return { count, users };
  } catch (err) {
    console.log(err);
    return { count: 0, users: [] };
  }
};

export const fetchUser = async (id: string): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// Product Model
// Import necessary dependencies// Function to fetch the latest products
export const fetchDisplayProducts = async (): Promise<{
  count: number;
  products: Omit<ProductProp, "ccc">[];
}> => {
  const ITEM_PER_PAGE = 2;

  try {
    // Fetch the count of products
    const count = await prisma.product.count();

    // Fetch the latest products, sorting them by a date field (replace 'createdAt' with your actual date field)
    const products = await prisma.product.findMany({
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (1 - 1), // Adjust the skip based on the current page
      orderBy: {
        createdAt: 'desc', // Replace 'createdAt' with your actual date field
      },
    });

    console.log({ count, products });

    return { count, products };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    // throw new Error("Failed to fetch products");
  }
};


export const fetchProducts = async (
  q: string,
  page: number
): Promise<{
  count: number;
  products: Omit<ProductProp, "ccc">[];
}> => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

  try {
    const count = await prisma.product.count({
      where: {
        title: {
          contains: regex.source, // Use regex.source to get the string
        },
      },
    });

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: regex.source,
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });

    console.log({ count, products });

    return { count, products };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProduct = async (id: string | number): Promise<any> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    console.log({ product });
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DATA
// app/lib/data.ts

export const fetchDashboardData = async (): Promise<{
    totalUsers: number;
    totalStock: number;
    totalRevenue: number;
  }> => {
    try {
      const totalUsers = await prisma.user.count();
      const totalStock = await prisma.product.aggregate({
        _sum: {
          stock: true,
        },
      });
      const totalRevenue = await prisma.product.aggregate({
        _sum: {
          price: true,
        },
      });
  
      console.log({ totalUsers, totalStock, totalRevenue });
  
      return {
        totalUsers: totalUsers || 0,
        totalStock: totalStock?._sum?.stock || 0,
        totalRevenue: totalRevenue?._sum?.price || 0,
      };
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    //   throw new Error(`Failed to fetch dashboard data: ${err.message}`);
    }
  };
  

export const cards = [
  {
    id: 1,
    title: "Total Users",
    // Call the fetchDashboardData function to get the total number of users
    number: (await fetchDashboardData())?.totalUsers,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    // Call the fetchDashboardData function to get the total stock
    number: (await fetchDashboardData())?.totalStock,
    change: -22,
  },
  {
    id: 3,
    title: "Revenue",
    // Call the fetchDashboardData function to get the total revenue
    number: (await fetchDashboardData())?.totalRevenue,
    change: 818,
  },
];
