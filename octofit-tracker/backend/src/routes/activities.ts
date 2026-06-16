import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Activity.find().populate('user');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Activity.findById(req.params.id).populate('user');
  if (!item) return res.status(404).json({ error: 'Activity not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const a = new Activity(req.body);
    await a.save();
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.put('/:id', async (req, res) => {
  const item = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Activity not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
