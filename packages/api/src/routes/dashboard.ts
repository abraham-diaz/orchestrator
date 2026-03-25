import { Router } from 'express';
import * as calendarService from '../services/calendar.service.js';
import * as todoService from '../services/todo.service.js';
import type { DashboardData } from '../types/dashboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const data: DashboardData = {
    eventos: [],
    eventosTeams: [],
    todos: [],
    errors: [],
  };

  const results = await Promise.allSettled([
    calendarService.getEventos(),
    calendarService.getEventosTeams(),
    todoService.getTodos(),
  ]);

  if (results[0].status === 'fulfilled') {
    data.eventos = results[0].value;
  } else {
    data.errors.push(`Calendar: ${results[0].reason}`);
  }

  if (results[1].status === 'fulfilled') {
    data.eventosTeams = results[1].value;
  } else {
    data.errors.push(`Teams: ${results[1].reason}`);
  }

  if (results[2].status === 'fulfilled') {
    data.todos = results[2].value;
  } else {
    data.errors.push(`Todos: ${results[2].reason}`);
  }

  res.json(data);
});

export default router;
