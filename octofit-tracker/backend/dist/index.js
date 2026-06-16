"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ message: "OctoFit Tracker backend is running." });
});
// Mount API routes under /api
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/workouts', workouts_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.listen(PORT, async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MongoDB at", MONGO_URI);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
    console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
