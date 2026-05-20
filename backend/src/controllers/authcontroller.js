import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Transporter } from "../config/transporter.js";
import { sendNotificationforlogin } from "../utils/notification.js";
import dotenv from "dotenv";
dotenv.config();


const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtp = async(email,otp) => {
  console.log("in sendOtp ",email,otp)
 await Transporter.sendMail({
    from: process.env.APP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
 })
}

export const sendotpoapi =async (req,res) =>{
  try {
    console.log("otp hit");
    const { email } = req.body;
    console.log("email",email);
    if(!email){
      return res.status(400).json({ message: "Email is required" });
    }
    console.log("after email check")
    const existingUser = await User.findOne({ email ,isVerified:true });
    console.log("existingUser",existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.log("after existing user check")
    const OTP = generateOtp();
    let  hashedotp = await bcrypt.hash(OTP,10);
    console.log("otp",OTP);
    
  
      await User.findOneAndUpdate(
        {email},
        {
          email,
          otp:hashedotp,
          otpExpire:Date.now() + 10 * 60 * 1000,
          isVerified:false,
          otpVerified:true
        },{
          upsert : true,
          returnDocument: "after",
        }
      )
    console.log("after upsert")
    await sendOtp(email, OTP);
    console.log("otp sent successfully");
    res.status(200).json({ message: "OTP sent successfully" ,otp:OTP});
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
    if (!existingUser) {
      return res.status(400).json({ message: "generate otp first " });
    }
        // check otp expiry
    if (existingUser.otpExpire < Date.now()) {

      // delete expired temp user
      await User.deleteOne({ email });

      return res.status(400).json({
        message: "OTP expired. Please resend OTP",
      });
    }
    if(existingUser.otpVerified==false){
      return res.status(400).json({message:"otp not send , send it first "})
    }
    const isOtpCorrect = await bcrypt.compare(
      otp,
      existingUser.otp
    );

    if (!isOtpCorrect) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    existingUser.name = name;
    existingUser.password = hashedpassword;
    existingUser.isVerified = true;
    existingUser.otp = undefined;
    existingUser.otpExpire = undefined;
    existingUser.otpVerified = false;

    await existingUser.save();
    res.status(201).json({ message: "User registered successfully", user: existingUser });
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