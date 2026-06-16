import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_tracker";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker backend is running." });
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB at", MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
