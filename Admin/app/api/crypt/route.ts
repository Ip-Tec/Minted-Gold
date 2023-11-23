"use server";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let isServer = true;

export const crypt = async () => {
  let BC = await bcrypt;
  return BC;
};
// export const isServerEnvironment = isServer;
export const mail = async () => {
  let NM = await nodemailer;
  return NM;
};
