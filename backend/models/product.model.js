import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  images: { type: [String], default: [] },
  gender: { type: String, enum: ["Male", "Female", "Unisex"], required: true },
  stock: { type: Number, required: true, min: 0 },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
