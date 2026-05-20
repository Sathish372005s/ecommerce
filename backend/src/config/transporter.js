import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

export const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});