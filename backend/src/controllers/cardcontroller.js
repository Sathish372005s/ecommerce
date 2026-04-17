import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";
import User from "../models/usermodel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    res.status(201).json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Fetch cart failed", error });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const afterRemove = Cart.filter((item) => item._id.toString() !== id);
    cart.items = afterRemove;
    await cart.save();
    res.status(200).json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Remove failed", error });
  }
};