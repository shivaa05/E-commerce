import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.log("ERROR IN CONNECTING DATABASE", error);
  }
};

export default connectDb;
