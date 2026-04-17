import nodemailer from "nodemailer";

export const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  auth:{
    user:process.env.APP_USER,
    pass:process.env.APP_PASS
  }
 })