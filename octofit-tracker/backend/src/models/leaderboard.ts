import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const LeaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, default: 0 },
  rank: { type: Number }
});

export const Leaderboard = model('Leaderboard', LeaderboardSchema);
export default Leaderboard;
