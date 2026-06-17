import mongoose from "mongoose";

export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB at", MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export { mongoose };
