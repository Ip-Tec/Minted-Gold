// User Model
import prisma from "@/utils/db";
import { Prisma as PC } from "@prisma/client";
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
            } as PC.UserWhereInput,
        });

        const users = await prisma.user.findMany({
            where: {
                username: { contains: regex },
            } as PC.UserWhereInput,
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
export const fetchProducts = async (
    q: string,
    page: any
): Promise<{
    count: number | string;
    products: Omit<ProductProp, "ccc">[];
}> => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 2;

    try {
        const count = await prisma.product.count({
            where: {
                title: { contains: regex } as unknown,
            } as PC.ProductWhereInput,
        });

        const products = await prisma.product.findMany({
            where: {
                title: { contains: regex } as unknown,
            } as PC.ProductWhereInput,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (page - 1),
        });

        console.log({ count, products });
        return { count: count || 0, products };
    } catch (err) {
        console.log(err);
        return { count: 0, products: [] };
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

// DUMMY DATA
export const cards = [
    {
        id: 1,
        title: "Total Users",
        number: 10.928,
        change: 12,
    },
    {
        id: 2,
        title: "Stock",
        number: 8.236,
        change: -2,
    },
    {
        id: 3,
        title: "Revenue",
        number: 6.642,
        change: 18,
    },
];
