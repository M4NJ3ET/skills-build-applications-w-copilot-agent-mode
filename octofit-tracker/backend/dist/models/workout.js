"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    exercises: [{ name: String, reps: Number, sets: Number, durationSeconds: Number }],
    durationMinutes: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
exports.Workout = model('Workout', WorkoutSchema);
exports.default = exports.Workout;
