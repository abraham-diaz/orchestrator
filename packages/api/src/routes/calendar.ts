import { Router } from 'express';
import * as calendarService from '../services/calendar.service.js';

const router = Router();

router.get('/eventos', async (_req, res) => {
  try {
    const eventos = await calendarService.getEventos();
    res.json(eventos);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.get('/eventos-teams', async (_req, res) => {
  try {
    const eventos = await calendarService.getEventosTeams();
    res.json(eventos);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.post('/eventos', async (req, res) => {
  try {
    const result = await calendarService.createEvento(req.body);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.put('/eventos/:id', async (req, res) => {
  try {
    const result = await calendarService.updateEvento(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.delete('/eventos/:id', async (req, res) => {
  try {
    const result = await calendarService.deleteEvento(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

export default router;
