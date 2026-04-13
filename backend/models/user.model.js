import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
    default: "User",
  },
  profilePicture: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  myOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
    },   quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ]
});

const User = mongoose.model("User", userSchema);
export default User;
