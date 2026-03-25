import { fetchJSON } from './client';
import type { Todo } from '../types';

export function createTodo(text: string): Promise<Todo> {
  return fetchJSON('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

export function toggleTodo(id: number): Promise<Todo> {
  return fetchJSON(`/api/todos/${id}`, { method: 'PATCH' });
}

export function deleteTodo(id: number): Promise<void> {
  return fetchJSON(`/api/todos/${id}`, { method: 'DELETE' });
}
