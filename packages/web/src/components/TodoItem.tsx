import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-3">
      <button
        onClick={() => onToggle(todo.id)}
        className={`h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-gray-600 hover:border-gray-400'
        }`}
      >
        {todo.completed && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span className={`flex-1 text-sm ${todo.completed ? 'text-gray-500 line-through' : ''}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-600 hover:text-red-400 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
