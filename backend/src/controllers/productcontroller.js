import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price,category,gender, description, stock, images, ratings } = req.body;
    const newproduct = await Product.create({
      name,
      price,
      category,
      gender,
      description,
      stock,
      images,
      ratings
    });
    res.status(201).json({ message: "Product created successfully", product: newproduct });
  } catch (error) {
    res.status(500).json({ message: "Create product failed", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    // TOD
    const {
      keyword,
      minPrice,
      maxPrice,
      category,
      gender,
      rating,
      page = 1,
      limit = 10,
      sort = "latest"
    } = req.query;
    let filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (category) {
      filter.category = category;
    }
    if (gender) {
      filter.gender = gender;
    }
    if (rating) {
      filter.ratings = { $gte: Number(rating) };
    }

    let sortOption = {};
    if (sort === "latest") {
      sortOption.createdAt = -1;
    } else if (sort === "priceasc") {
      sortOption.price = 1;
    } else if (sort === "pricedesc") {
      sortOption.price = -1;
    } else if (sort === "rating") {
      sortOption.ratings = -1;
    }
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.status(200).json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Fetch products failed", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Fetch product failed", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, gender, description, stock, images, ratings } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, category, gender, description, stock, images, ratings },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};