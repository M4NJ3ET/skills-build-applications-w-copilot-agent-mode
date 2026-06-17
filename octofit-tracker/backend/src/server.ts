import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import workoutsRouter from "./routes/workouts";
import leaderboardRouter from "./routes/leaderboard";
import { connectDatabase } from "./config/database";

const app = express();
export const PORT = 8000;
export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      CODESPACE_NAME ? `https://${CODESPACE_NAME}-5173.app.github.dev` : null,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
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
    await connectDatabase();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on ${BASE_URL}`);
  });
}

if (require.main === module) {
  startServer();
}
