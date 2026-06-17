/**
 * Seed the octofit_db database with test data
 */
import mongoose from "mongoose";
import User from "../models/user";
import Team from "../models/team";
import Activity from "../models/activity";
import Workout from "../models/workout";
import Leaderboard from "../models/leaderboard";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to", MONGO_URI);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const teamA = new Team({ name: "Team A" });
  const teamB = new Team({ name: "Team B" });
  await teamA.save();
  await teamB.save();

  // Create users
  const alice = new User({ name: "Alice", email: "alice@example.com", team: teamA._id });
  const bob = new User({ name: "Bob", email: "bob@example.com", team: teamA._id });
  const carol = new User({ name: "Carol", email: "carol@example.com", team: teamB._id });
  await alice.save();
  await bob.save();
  await carol.save();

  // Add members to teams
  teamA.members = [alice._id, bob._id];
  teamB.members = [carol._id];
  await teamA.save();
  await teamB.save();

  // Activities
  const act1 = new Activity({ user: alice._id, type: "running", durationMinutes: 30, calories: 300 });
  const act2 = new Activity({ user: bob._id, type: "cycling", durationMinutes: 45, calories: 400 });
  const act3 = new Activity({ user: carol._id, type: "yoga", durationMinutes: 60, calories: 200 });
  await act1.save();
  await act2.save();
  await act3.save();

  // Workouts
  const w1 = new Workout({
    title: "Quick HIIT",
    description: "Short high-intensity workout",
    exercises: [{ name: "Burpees", reps: 10, sets: 3 }],
    durationMinutes: 20,
    createdBy: alice._id,
  });
  const w2 = new Workout({
    title: "Morning Yoga",
    description: "Gentle flow",
    exercises: [{ name: "Sun Salutation", reps: 5, sets: 2 }],
    durationMinutes: 30,
    createdBy: carol._id,
  });
  await w1.save();
  await w2.save();

  // Leaderboard
  const lb1 = new Leaderboard({ team: teamA._id, score: 700 });
  const lb2 = new Leaderboard({ team: teamB._id, score: 200 });
  await lb1.save();
  await lb2.save();

  console.log("Seed complete:");
  console.log("Users:", (await User.find()).length);
  console.log("Teams:", (await Team.find()).length);
  console.log("Activities:", (await Activity.find()).length);
  console.log("Workouts:", (await Workout.find()).length);
  console.log("Leaderboard entries:", (await Leaderboard.find()).length);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
