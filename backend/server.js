import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import connectDb from "./utils/db.js";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import adminRouter from "./routes/admin.route.js";
import orderRouter from "./routes/order.route.js";
import { stripeWebhook } from "./controllers/payment.controller.js";
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  }),
);

// Stripe webhook endpoint
app.post("/api/v1/payment/webhook", express.raw({ type: "application/json" }),stripeWebhook);

// routers
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 3001;

async function server() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("ERROR IN APP", error);
  }
}

server();
