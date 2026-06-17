"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const workout_1 = __importDefault(require("./models/workout"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected to', MONGO_URI);
    // Clear existing data
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
    ]);
    // Create teams
    const teamA = new team_1.default({ name: 'Team A' });
    const teamB = new team_1.default({ name: 'Team B' });
    await teamA.save();
    await teamB.save();
    // Create users
    const alice = new user_1.default({ name: 'Alice', email: 'alice@example.com', team: teamA._id });
    const bob = new user_1.default({ name: 'Bob', email: 'bob@example.com', team: teamA._id });
    const carol = new user_1.default({ name: 'Carol', email: 'carol@example.com', team: teamB._id });
    await alice.save();
    await bob.save();
    await carol.save();
    // Add members to teams
    teamA.members = [alice._id, bob._id];
    teamB.members = [carol._id];
    await teamA.save();
    await teamB.save();
    // Activities
    const act1 = new activity_1.default({ user: alice._id, type: 'running', durationMinutes: 30, calories: 300 });
    const act2 = new activity_1.default({ user: bob._id, type: 'cycling', durationMinutes: 45, calories: 400 });
    const act3 = new activity_1.default({ user: carol._id, type: 'yoga', durationMinutes: 60, calories: 200 });
    await act1.save();
    await act2.save();
    await act3.save();
    // Workouts
    const w1 = new workout_1.default({ title: 'Quick HIIT', description: 'Short high-intensity workout', exercises: [{ name: 'Burpees', reps: 10, sets: 3 }], durationMinutes: 20, createdBy: alice._id });
    const w2 = new workout_1.default({ title: 'Morning Yoga', description: 'Gentle flow', exercises: [{ name: 'Sun Salutation', reps: 5, sets: 2 }], durationMinutes: 30, createdBy: carol._id });
    await w1.save();
    await w2.save();
    // Leaderboard
    const lb1 = new leaderboard_1.default({ team: teamA._id, score: 700 });
    const lb2 = new leaderboard_1.default({ team: teamB._id, score: 200 });
    await lb1.save();
    await lb2.save();
    console.log('Seed complete:');
    console.log('Users:', (await user_1.default.find()).length);
    console.log('Teams:', (await team_1.default.find()).length);
    console.log('Activities:', (await activity_1.default.find()).length);
    console.log('Workouts:', (await workout_1.default.find()).length);
    console.log('Leaderboard entries:', (await leaderboard_1.default.find()).length);
    await mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
