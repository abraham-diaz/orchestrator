import { config } from '../config.js';
import type { Todo } from '../types/todo.js';

const BASE = config.todoApiUrl;

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE}/api/todos`);
  if (!res.ok) throw new Error(`Todo API error: ${res.status}`);
  return res.json();
}

export async function createTodo(text: string): Promise<Todo> {
  const res = await fetch(`${BASE}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Todo API error: ${res.status}`);
  return res.json();
}

export async function toggleTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE}/api/todos/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error(`Todo API error: ${res.status}`);
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE}/api/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Todo API error: ${res.status}`);
}
