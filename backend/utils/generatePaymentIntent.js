import Stripe from "stripe";
import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";

export const generatePaymentIntent = async (orderId, amount) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  if(!orderId || !amount) {
    throw new Error("Order ID and amount are required to generate payment intent");
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paise
      currency: "inr",
    });

    const payment = await Payment.create({
      order: orderId,
      paymentType: "Online",
      paymentStatus: "Pending",
      paymentIntentId: paymentIntent.id,
      amount,
    });
    await Order.findByIdAndUpdate(orderId, { paymentId: payment._id });
    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error generating payment intent:", error);
    throw new Error("Failed to generate payment intent");
  }
};
