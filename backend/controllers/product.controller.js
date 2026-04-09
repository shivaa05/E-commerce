import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admins can create products",
      });
    }

    const { name, description, price, category, stock, gender } = req.body;

    if (!name || !description || !price || !category || !stock || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let uploadedImages = [];
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const image of images) {
        const url = await uploadOnCloudinary(image.tempFilePath);

        uploadedImages.push(url);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      images: uploadedImages,
      stock,
      gender,
      created_by: userId,
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log("error in createProduct", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const limit = 12;
    const page = parseInt(req.query.page) || 1;
    const products = await Product.find().limit(limit).skip((page - 1) * limit);
    res.status(200).json({ products });

  } catch (error) {
    console.log("error in getAllProducts", error);
    res.status(500).json({ message: error.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log("error in getProductById", error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.created_by.toString() !== userId.toString() && user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admins or the creator can delete this product" });
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("error in deleteProduct", error);
    res.status(500).json({ message: error.message });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (userId.toString() !== product.created_by.toString() && user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admins or the creator can update this product" });
    }

    const { name, description, price, category, stock, gender } = req.body;
    if(name) product.name = name;
    if(description) product.description = description;
    if(price) product.price = price;
    if(category) product.category = category;
    if(stock) product.stock = stock;
    if(gender) product.gender = gender;

    await product.save();
    return res.status(200).json({ message: "Product updated successfully", product });

  } catch (error) {
    console.log("error in updateProduct", error);
    res.status(500).json({ message: error.message });
  }
}
