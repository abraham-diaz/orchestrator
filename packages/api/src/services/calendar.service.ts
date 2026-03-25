import { config } from '../config.js';
import type { Evento, EventoTeams, EventoCreate } from '../types/calendar.js';

const BASE = config.calendarApiUrl;

export async function getEventos(): Promise<Evento[]> {
  const res = await fetch(`${BASE}/eventos`);
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export async function getEventosTeams(): Promise<EventoTeams[]> {
  const res = await fetch(`${BASE}/eventos-teams`);
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export async function createEvento(data: EventoCreate): Promise<{ id: number }> {
  const res = await fetch(`${BASE}/eventos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export async function updateEvento(id: string, data: Partial<EventoCreate>): Promise<{ cambios: number }> {
  const res = await fetch(`${BASE}/eventos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}

export async function deleteEvento(id: string): Promise<{ cambios: number }> {
  const res = await fetch(`${BASE}/eventos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Calendar API error: ${res.status}`);
  return res.json();
}
