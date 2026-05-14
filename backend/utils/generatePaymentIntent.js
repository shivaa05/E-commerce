import Stripe from "stripe";
import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";

export const generatePaymentIntent = async (orderId, amount) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  if (!orderId || !amount) {
    throw new Error(
      "Order ID and amount are required to generate payment intent",
    );
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/cart`,
      client_reference_id: orderId.toString(),
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "E-Commerce Order",
            },
            unit_amount: Math.round(amount * 100), // Convert to paise
          },
          quantity: 1,
        },
      ],
    });

    const payment = await Payment.create({
      order: orderId,
      paymentType: "Online",
      paymentStatus: "Pending",
      paymentIntentId: session.id,
      amount,
    });
    await Order.findByIdAndUpdate(orderId, { paymentId: payment._id });

    // Returning URL for checkout redirect instead of clientSecret
    return { success: true, url: session.url };
  } catch (error) {
    console.error("Error generating checkout session:", error);
    throw new Error("Failed to generate checkout session");
  }
};
