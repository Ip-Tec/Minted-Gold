// Action User Model
import { initAuth } from "../auth";
import prisma from "@/utils/db";
import { crypt } from "@/app/api/crypt/route";

const { signIn } = initAuth();

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    const salt = await crypt.genSalt(10);
    let hashedPassword = await crypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Use the hashedPassword here
        phone,
        address,
        isAdmin,
        isActive,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.user.update({
      where: { id: Number(id) },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};

// Action Product Model

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    await prisma.product.create({
      data: {
        title,
        desc,
        price,
        stock,
        color,
        size,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await prisma.product.update({
      where: { id: Number(id) },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
};

// Auth Model

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};
