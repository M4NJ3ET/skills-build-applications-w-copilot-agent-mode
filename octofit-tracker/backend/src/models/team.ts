import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export const Team = model('Team', TeamSchema);
export default Team;
