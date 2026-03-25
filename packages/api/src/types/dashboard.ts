import type { Evento, EventoTeams } from './calendar.js';
import type { Todo } from './todo.js';

export interface DashboardData {
  eventos: Evento[];
  eventosTeams: EventoTeams[];
  todos: Todo[];
  errors: string[];
}
