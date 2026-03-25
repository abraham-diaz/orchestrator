import { useDashboard } from '../hooks/useDashboard';
import CalendarWidget from './CalendarWidget';
import TodoWidget from './TodoWidget';

export default function Dashboard() {
  const { data, loading, error, refresh } = useDashboard();

  if (loading && !data) {
    return <p className="text-gray-400">Cargando...</p>;
  }

  if (error && !data) {
    return (
      <div className="text-red-400">
        <p>Error: {error}</p>
        <button onClick={refresh} className="mt-2 text-sm text-blue-400 hover:underline">
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      {data.errors.length > 0 && (
        <div className="mb-4 rounded-lg border border-yellow-800 bg-yellow-900/30 p-3">
          <p className="text-sm text-yellow-400">Algunos servicios no respondieron:</p>
          {data.errors.map((err, i) => (
            <p key={i} className="text-xs text-yellow-500">{err}</p>
          ))}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <CalendarWidget eventos={data.eventos} eventosTeams={data.eventosTeams} />
        <TodoWidget todos={data.todos} onRefresh={refresh} />
      </div>
    </div>
  );
}
