import { useState } from 'react';
import type { Todo } from '../types';
import { createTodo, toggleTodo, deleteTodo } from '../api/todos';
import TodoItem from './TodoItem';

interface TodoWidgetProps {
  todos: Todo[];
  onRefresh: () => void;
}

export default function TodoWidget({ todos, onRefresh }: TodoWidgetProps) {
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || submitting) return;
    setSubmitting(true);
    try {
      await createTodo(newText.trim());
      setNewText('');
      onRefresh();
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: number) => {
    await toggleTodo(id);
    onRefresh();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    onRefresh();
  };

  const pending = todos.filter(t => !t.completed);
  const completed = todos.filter(t => t.completed);

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Tareas</h2>
      <form onSubmit={handleAdd} className="mb-3 flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting || !newText.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
        >
          Agregar
        </button>
      </form>
      <div className="space-y-2">
        {pending.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
        {completed.length > 0 && (
          <>
            <p className="pt-2 text-xs text-gray-500">Completadas ({completed.length})</p>
            {completed.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
