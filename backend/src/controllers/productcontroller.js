import Product from "../models/product.model.js";
import streamifier from "streamifier";
import Cart from "../models/card.model.js";

export const createProduct = async (req, res) => {
  console.log("product controller ",req.files,req.body);
  try {
    const { name, price, category, gender, description, sizes, ratings } = req.body;
    if (!name || !price || !category || !gender || !description || !sizes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // sizes will come as a JSON string from FormData
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const images = req.files.map((file) => file.path);
    
    const newproduct = await Product.create({
      name,
      price,
      category,
      gender,
      description,
      sizes : parsedSizes,
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
      limit = 6,
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
    const { name, price, category, gender, description, sizes, ratings } = req.body;
    
    let updateData = { name, price, category, gender, description, ratings };
    
    if (sizes) {
      updateData.sizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    }
    
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    } else if (req.body.images) {
      updateData.images = req.body.images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
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

export const getproductsbycategory = async(req,res)=>{
  try {
    const {category} = req.params;
    const products = await Product.find({category});
    if (!products){
      return res.status(404).json({message:"Products not found"});
    }

    res.status(200).json({category,categoryProducts:products});
  } catch (error) {
    res.status(500).json({message:"Fetch products failed",error});
  }
}

