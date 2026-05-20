import Cart from "../models/card.model.js";
import Product from "../models/product.model.js";

export const addtocart = async (req, res) => {
  try {

    const { productId, quantity, size } = req.body;

    if (!size) {
      return res.status(400).json({
        message: "Size is required",
      });
    }

    const userId = req.user.id;

    // Run both queries in parallel
    const [product, cartData] = await Promise.all([
      Product.findById(productId),
      Cart.findOne({ user: userId }),
    ]);

    // Check product exists
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = cartData;

    // Create cart if not exists
    if (!cart) {

      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            size,
            price: product.price,
            quantity: quantity || 1,
          },
        ],
      });

      return res.status(201).json({
        message: "Cart created",
        cart,
      });
    }

    // Check if product already exists
    const existingProduct = cart.items.find(
      (item) => item.product.equals(productId) && item.size === size
    );

    // Increase quantity
    if (existingProduct) {

      existingProduct.quantity += quantity || 1;

    } else {

      // Add new product
      cart.items.push({
        product: productId,
        size,
        price: product.price,
        quantity: quantity || 1,
      });
    }

    // Save updated cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      message: "Add to cart failed",
      error: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {

    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.product",
        select: "name price images category",
      })
      .lean();

    // Cart not found
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Fetch cart failed",
      error: error.message,
    });
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
    const afterRemove = cart.items.filter((item) => item._id.toString() !== id);
    cart.items = afterRemove;
    await cart.save();
    res.status(200).json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Remove failed", error });
  }
};