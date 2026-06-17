import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Leaderboard.find().populate('user team');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Leaderboard.findById(req.params.id).populate('user team');
  if (!item) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const l = new Leaderboard(req.body);
    await l.save();
    res.status(201).json(l);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.put('/:id', async (req, res) => {
  const item = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Leaderboard.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
