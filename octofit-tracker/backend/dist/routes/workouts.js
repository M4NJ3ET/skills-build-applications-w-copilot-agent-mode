"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const items = await workout_1.default.find().populate('createdBy');
    res.json(items);
});
router.get('/:id', async (req, res) => {
    const item = await workout_1.default.findById(req.params.id).populate('createdBy');
    if (!item)
        return res.status(404).json({ error: 'Workout not found' });
    res.json(item);
});
router.post('/', async (req, res) => {
    try {
        const w = new workout_1.default(req.body);
        await w.save();
        res.status(201).json(w);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
router.put('/:id', async (req, res) => {
    const item = await workout_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item)
        return res.status(404).json({ error: 'Workout not found' });
    res.json(item);
});
router.delete('/:id', async (req, res) => {
    await workout_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
exports.default = router;
