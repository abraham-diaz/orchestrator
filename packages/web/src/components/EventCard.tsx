import type { Evento, EventoTeams } from '../types';

interface EventCardProps {
  evento: Evento | EventoTeams;
  type: 'local' | 'teams';
}

export default function EventCard({ evento, type }: EventCardProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-sm">{evento.titulo}</h3>
        <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${
          type === 'teams' ? 'bg-blue-900 text-blue-300' : 'bg-emerald-900 text-emerald-300'
        }`}>
          {type === 'teams' ? 'Teams' : ('tipo' in evento && evento.tipo) || 'Local'}
        </span>
      </div>
      <p className="mt-1 text-xs text-gray-400">
        {evento.fecha}{evento.hora ? ` - ${evento.hora}` : ''}
      </p>
      {evento.descripcion && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{evento.descripcion}</p>
      )}
      {'ubicacion' in evento && evento.ubicacion && (
        <p className="mt-1 text-xs text-gray-500">{evento.ubicacion}</p>
      )}
    </div>
  );
}
