import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ["phants", "shirts", "shoes","accessories","shoes","watches","bags","jewelry","innerwear","swimwear","sunglasses","hats","belts","socks","slippers"],
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true
    },
    description: {
      type: String
    },
    stock: {
      type: Number,
      default: 0
    },
    images: [
      {
        type: String
      }
    ],
    ratings: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);