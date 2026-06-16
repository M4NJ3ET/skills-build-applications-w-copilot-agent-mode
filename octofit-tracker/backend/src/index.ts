import express from "express";
import mongoose from "mongoose";
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker backend is running." });
});

// Mount API routes under /api
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB at", MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
