import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Workout.find().populate('createdBy');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Workout.findById(req.params.id).populate('createdBy');
  if (!item) return res.status(404).json({ error: 'Workout not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const w = new Workout(req.body);
    await w.save();
    res.status(201).json(w);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.put('/:id', async (req, res) => {
  const item = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Workout not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
