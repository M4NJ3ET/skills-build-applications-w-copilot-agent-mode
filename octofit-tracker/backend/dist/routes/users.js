"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await user_1.default.find().populate('team');
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await user_1.default.findById(req.params.id).populate('team');
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
router.post('/', async (req, res) => {
    try {
        const u = new user_1.default(req.body);
        await u.save();
        res.status(201).json(u);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
router.put('/:id', async (req, res) => {
    const user = await user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
router.delete('/:id', async (req, res) => {
    await user_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
exports.default = router;
