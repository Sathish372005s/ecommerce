import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Transporter } from "../config/transporter.js";
import { sendNotificationforlogin } from "../utils/notification.js";


const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtp = async(email,otp) => {
 await Transporter.sendMail({
    from: process.env.APP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
 })
}

export const sendotpoapi =async (req,res) =>{
  try {
    const { email } = req.body;
    const OTP = generateOtp();
    await sendOtp(email, OTP);
    await User.findOneAndUpdate({ email }, { otp: OTP, otpExpire: Date.now() + 3 * 60 * 1000 }); // OTP valid for 3 minutes
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser =await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    if(existingUser.otp !==otp){
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if(existingUser.otpExpire < Date.now()){
      return res.status(400).json({ message: "OTP expired" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newUser = await User.create({
      name,
      email,
      password:hashedpassword,
      isVerified:true,
      otp:undefined,
    })
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Register failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    if (existinguser.fcmToken) {
      await sendNotificationforlogin(
        existinguser.fcmToken,
        "Login successful! Welcome back 🚀"
      );
    }

    res.status(200).json({ message: "Login successful", user: existinguser ,token});
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const logout = async (req, res) => {
  try {

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};