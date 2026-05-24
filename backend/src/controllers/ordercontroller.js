import razorpay from "../config/razorpay.js";
import Product from "../models/product.model.js";
import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";
import Cart from "../models/card.model.js";



export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      shippingAddress,
      phone
    } = req.body;
    const cartitems = await Cart.findOne({ user: userId }).populate("items.product");
    if(!cartitems || cartitems.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const totalAmount = cartitems.items.reduce(
      (acc, item) => {
        return acc + item.price * item.quantity;
      },
      0
    );
    const order = await Order.create({
      user: userId,
      items: cartitems.items,
      totalAmount,
      shippingAddress,
      phone,
      paymentStatus: "pending",
      orderStatus: "processing"
    });
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString()
    })
    const payment = await Payment.create({
      user: userId,
      order: order._id,
      amount: totalAmount,
      paymentMethod: "online",
      status: "created",
      razorpay_order_id:
        razorpayOrder.id
    });
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();
     res.status(201).json({
      success: true,
      order,
      razorpayOrderId:
        razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    });
  } catch (error) {
    res.status(500).json({ message: "Create order failed", error });
  }
};

export const createCODOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      shippingAddress,
      phone
    } = req.body;
    const cartitems = await Cart.findOne({ user: userId }).populate("items.product");
    if(!cartitems || cartitems.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const totalAmount = cartitems.items.reduce(
      (acc, item) => {
        return acc + item.price * item.quantity;
      },
      0
    );
    const order = await Order.create({
      user: userId,
      items: cartitems.items,
      totalAmount,
      shippingAddress,
      phone,
      paymentStatus: "pending",
      orderStatus: "processing"
    });
    await Payment.create({
        user: userId,
        order: order._id,
        amount: totalAmount,
        paymentMethod:
          "cod",
        status: "created"
      });
      cartitems.items = [];
      await cartitems.save();
     res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Create COD order failed", error: error.message });
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product").sort({ createdAt: -1 });
    res.json({success:true,orders})
  } catch (error) {
    res.status(500).json({success:false, message: "Fetch orders failed", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.product").sort({ createdAt: -1 });
    res.json({success:true,orders})
  } catch (error) {
    res.status(500).json({ message: "Fetch all orders failed", error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user").populate("items.product");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch order failed", error });
  }
};



export const cancelOrder =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found"
        });
      }

      order.orderStatus =
        "cancelled";

      await order.save();

      res.json({
        success: true,
        message:
          "Order cancelled"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

};

export const changestatus = async (req, res) => {
  try {
    const {status}=req.body
    const order = await Order.findById(req.params.id);
    if(!order){
      res.json({success:false, message:"Order not found"});
    }
    order.orderStatus = status;
    await order.save();
    res.json({success:true, message:"Order status updated"});
  } catch (error) {
    res.status(500).json({success:false, message:"Failed to update order status", error});
  }
}
