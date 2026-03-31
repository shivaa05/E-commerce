import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";

export const stripeWebhook = async(req, res) => { 
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.log("Error in Stripe webhook:", error);
    return res.status(400).send(`Webhook Error: ${error.message || "Unknown error"}`);
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent_client_secret = event.data.object.client_secret;

    try {
      // Finding and updating the order with the corresponding client secret
      const payment = await Payment.findOneAndUpdate({
        paymentIntentId: paymentIntent_client_secret,
      }, {
        paymentStatus: "Paid",
        paidAt: new Date(),
      }, { new: true }).populate("order");

      if (!payment) {
        throw new Error("Payment record not found for the given client secret");
      }

      // Reducing stock for each product in the order
      const order = await Order.findById(payment.order).populate("orderItems.product");
      const orderItems = order.orderItems;

      for (const item of orderItems) {
        const product = await Product.findById(item.product._id);

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        product.stock -= item.quantity;
        await product.save();
      }
    } catch (error) {
      console.log("Error processing payment_intent.succeeded event:", error);
      return res.status(500).send(`Error processing event: ${error.message || "Unknown error"}`);
    }
  }
  res.status(200).send({ received: true });
}