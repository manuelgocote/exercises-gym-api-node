import mongoose from "mongoose";

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gymdb");
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};