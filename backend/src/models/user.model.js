import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    phone: {
      type: String
    },
    address: [
      {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: {
          type: String,
          default: "India"
        }
      }
    ],
    fcmToken: {
      type: String // for push notifications
    },
    otp: String,
    otpExpire: Date,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);