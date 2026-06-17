"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.CODESPACE_NAME = exports.PORT = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
exports.PORT = 8000;
exports.CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.BASE_URL = exports.CODESPACE_NAME
    ? `https://${exports.CODESPACE_NAME}-8000.app.github.dev`
    : "http://localhost:8000";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ message: "OctoFit Tracker backend is running.", baseUrl: exports.BASE_URL });
});
app.use("/api/users", users_1.default);
app.use("/api/teams", teams_1.default);
app.use("/api/activities", activities_1.default);
app.use("/api/workouts", workouts_1.default);
app.use("/api/leaderboard", leaderboard_1.default);
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MongoDB at", MONGO_URI);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
    app.listen(exports.PORT, () => {
        console.log(`Backend listening on ${exports.BASE_URL}`);
    });
}
if (require.main === module) {
    startServer();
}
