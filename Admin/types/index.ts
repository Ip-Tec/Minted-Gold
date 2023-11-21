import { MouseEventHandler } from "react";
import { User, Product, Admin } from '@prisma/client';

export type UserType = User;
export type AdminType = Admin;
export type ProductType = Product;

export interface LoginCredentials {
    email?: string;
    username?: string;
    pass_key?: string;
    secrit_key?: string;
    password?: string | Buffer | undefined;
}
export interface CustomConnection {
    isConnected?: boolean;
}
export interface AdminProp {
    founded?: any;
    password?: string | undefined;
    username?: string;
    email?: string;
    provider?: string;
    id?: string | number;
}

export interface ProductProp {
    id: string | number;
    stock?: string;
    image?: string;
    title: string;
    createdAt?: Date;
    description: string;
    price: number | string;
    ccc?: number | string;
}
export interface searchProp {
    q?: string;
    page?: string | number;
    product?: ProductProp;
}

