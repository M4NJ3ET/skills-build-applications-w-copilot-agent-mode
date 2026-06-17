import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const WorkoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number, durationSeconds: Number }],
  durationMinutes: { type: Number, default: 0 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export const Workout = model('Workout', WorkoutSchema);
export default Workout;
