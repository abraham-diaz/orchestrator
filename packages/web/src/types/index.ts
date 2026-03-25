export interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  hora: string | null;
  descripcion: string;
  tipo?: string;
}

export interface EventoTeams {
  id: string;
  titulo: string;
  fecha: string;
  hora: string | null;
  fechaFin?: string;
  horaFin?: string;
  descripcion?: string;
  ubicacion?: string;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
}

export interface DashboardData {
  eventos: Evento[];
  eventosTeams: EventoTeams[];
  todos: Todo[];
  errors: string[];
}
