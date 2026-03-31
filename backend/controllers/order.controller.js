import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { generatePaymentIntent } from "../utils/generatePaymentIntent.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "Admin")
      return res.status(403).json({ message: "Admins cannot place orders" });

    const { fullname, orderItems, address, city, postalCode, country, state } =
      req.body;
    if (
      !fullname ||
      !orderItems ||
      orderItems.length === 0 ||
      !address ||
      !city ||
      !postalCode ||
      !country ||
      !state
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let totalPrice = 0;
    const products = [];
    for (let item of orderItems) {
      if (item.quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be greater than zero" });
      }
      const product = await Product.findById(item.productId);
      if (item.quantity > product.stock) {
        return res
          .status(400)
          .json({
            message: `Only ${product.stock} items available for ${product.name}`,
          });
      }

      totalPrice += product.price * item.quantity;
      products.push({ product, quantity: item.quantity });
    }
    let shippingPrice = 0;
    if (totalPrice < 200) {
      shippingPrice = 99;
    }

    const taxPrice = totalPrice * 0.18;
    const finalPrice = totalPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: userId,
      fullname,
      orderItems: products,
      shippingInfo: {
        address,
        city,
        postalCode,
        state,
        country,
      },
      pricing: {
        itemsPrice: totalPrice,
        taxPrice,
        shippingPrice,
        totalPrice: finalPrice,
      },
    });
    await user.myOrders.push(order._id);
    await user.save();

    const paymentResponse = await generatePaymentIntent(order._id, finalPrice);

    if (!paymentResponse.success) {
      return next(new ErrorHandler("Payment failed. Try again.", 500));
    }

    return res.status(200).json({
      products,
      totalPrice,
      shippingPrice,
      taxPrice,
      finalPrice,
      paymentResponse,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderById = async (req, res) => { 
  try {
    const orderId = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = await Order.findById(orderId)
      .populate("user", "name  profilePicture")
      .populate(
        "orderItems.product",
        "name price images desciption ratingd category gender",
      )
      .populate("paymentId", "paymentType paymentStatus");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (user.role !== "Admin" && !user.myOrders.includes(orderId)) {
      return res.status(403).json({ message: "You are not the owner of this order" });
    }
    res.status(200).json({order});
  } catch (error) {
    console.error("Error fetching order:", error);    
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Only admins can access all orders" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const order = await Order.find()
      .populate("user", "name  profilePicture")
      .populate(
        "orderItems.product",
        "name price images desciption ratingd category gender",
      )
      .populate("paymentId", "paymentType paymentStatus").skip(skip).limit(limit);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "You are not the owner of this order" });
    }
    res.status(200).json({ order });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const myOrders = async (req, res) => { 
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.role === "Admin") {
      return res.status(403).json({ message: "Admins cannot have orders" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const order = await Order.find({user:userId})
      .populate("user", "name  profilePicture")
      .populate(
        "orderItems.product",
        "name price images desciption ratingd category gender",
      )
      .populate("paymentId", "paymentType paymentStatus").skip(skip).limit(limit);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });

  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateOrderStatus = async (req, res) => { 
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const userId = req.userId;
    const order = await Order.findById(orderId);
    if(!status || !["Processing", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Only admins can update order status" });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully",order });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}