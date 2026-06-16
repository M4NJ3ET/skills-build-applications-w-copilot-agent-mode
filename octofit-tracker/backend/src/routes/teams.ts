import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members');
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.post('/', async (req, res) => {
  try {
    const t = new Team(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
