"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.default.find().populate('members');
    res.json(teams);
});
router.get('/:id', async (req, res) => {
    const team = await team_1.default.findById(req.params.id).populate('members');
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    res.json(team);
});
router.post('/', async (req, res) => {
    try {
        const t = new team_1.default(req.body);
        await t.save();
        res.status(201).json(t);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
router.put('/:id', async (req, res) => {
    const team = await team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    res.json(team);
});
router.delete('/:id', async (req, res) => {
    await team_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
exports.default = router;
