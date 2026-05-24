import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },
    amount: Number,
    paymentMethod: {
      type: String, // Razorpay, Card, UPI
      enum: ["online", "cod"],
    },
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created"
    },
    transactionId: {
      type: String
    },
    razorpay_order_id: {
      type: String
    },
    razorpay_payment_id: {
      type: String
    },
    razorpay_signature: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);