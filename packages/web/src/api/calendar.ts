import { fetchJSON } from './client';
import type { Evento } from '../types';

export function createEvento(data: { titulo: string; fecha: string; descripcion?: string }): Promise<{ id: number }> {
  return fetchJSON('/api/calendar/eventos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteEvento(id: number): Promise<{ cambios: number }> {
  return fetchJSON(`/api/calendar/eventos/${id}`, { method: 'DELETE' });
}
