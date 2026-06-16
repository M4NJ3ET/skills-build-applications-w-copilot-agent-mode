"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const items = await activity_1.default.find().populate('user');
    res.json(items);
});
router.get('/:id', async (req, res) => {
    const item = await activity_1.default.findById(req.params.id).populate('user');
    if (!item)
        return res.status(404).json({ error: 'Activity not found' });
    res.json(item);
});
router.post('/', async (req, res) => {
    try {
        const a = new activity_1.default(req.body);
        await a.save();
        res.status(201).json(a);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
router.put('/:id', async (req, res) => {
    const item = await activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item)
        return res.status(404).json({ error: 'Activity not found' });
    res.json(item);
});
router.delete('/:id', async (req, res) => {
    await activity_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
exports.default = router;
