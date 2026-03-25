import { Router } from 'express';
import * as todoService from '../services/todo.service.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body.text);
    res.status(201).json(todo);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const todo = await todoService.toggleTodo(parseInt(req.params.id));
    res.json(todo);
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await todoService.deleteTodo(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(502).json({ error: (err as Error).message });
  }
});

export default router;
