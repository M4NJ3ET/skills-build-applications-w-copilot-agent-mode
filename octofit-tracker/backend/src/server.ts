import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import workoutsRouter from "./routes/workouts";
import leaderboardRouter from "./routes/leaderboard";

const app = express();
export const PORT = 8000;
export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker backend is running.", baseUrl: BASE_URL });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/leaderboard", leaderboardRouter);

export async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB at", MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on ${BASE_URL}`);
  });
}

if (require.main === module) {
  startServer();
}
