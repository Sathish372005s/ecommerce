import crypto from "crypto";

import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";
import Cart from "../models/card.model.js";

export const razorpayWebhook = async (req, res) => {
  try {
    const secret =
      process.env.RAZORPAY_WEBHOOK_SECRET ||
      process.env.RAZORPAY_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Webhook secret is not configured"
      });
    }

    const razorpaySignature = req.headers["x-razorpay-signature"];
    if (!razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay signature header"
      });
    }

    const rawBody = req.rawBody
      ? req.rawBody.toString()
      : JSON.stringify(req.body);

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature"
      });
    }

    const event = req.body;

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;
      if (!paymentEntity) {
        return res.status(400).json({
          success: false,
          message: "Invalid Razorpay webhook payload"
        });
      }

      const razorpayOrderId = paymentEntity.order_id;
      const payment = await Payment.findOne({
        razorpay_order_id: razorpayOrderId
      });

      if (!payment) {
        return res.sendStatus(404);
      }

      payment.status = "success";
      payment.transactionId = paymentEntity.id;
      payment.razorpay_payment_id = paymentEntity.id;
      payment.razorpay_signature = razorpaySignature;
      await payment.save();

      const order = await Order.findById(payment.order);
      if (order) {
        order.paymentStatus = "paid";
        order.paymentId = paymentEntity.id;
        await order.save();

        await Cart.findOneAndUpdate(
          { user: order.user },
          { items: [] }
        );
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

      