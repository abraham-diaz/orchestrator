import type { Evento, EventoTeams } from '../types';
import EventCard from './EventCard';

interface CalendarWidgetProps {
  eventos: Evento[];
  eventosTeams: EventoTeams[];
}

export default function CalendarWidget({ eventos, eventosTeams }: CalendarWidgetProps) {
  const allEvents = [
    ...eventos.map(e => ({ ...e, _type: 'local' as const, _sortDate: e.fecha })),
    ...eventosTeams.map(e => ({ ...e, _type: 'teams' as const, _sortDate: e.fecha })),
  ].sort((a, b) => a._sortDate.localeCompare(b._sortDate));

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Calendario</h2>
      {allEvents.length === 0 ? (
        <p className="text-sm text-gray-500">No hay eventos</p>
      ) : (
        <div className="space-y-2">
          {allEvents.map((evento) => (
            <EventCard
              key={`${evento._type}-${evento.id}`}
              evento={evento}
              type={evento._type}
            />
          ))}
        </div>
      )}
    </div>
  );
}
