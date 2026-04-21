'use client';

import { useEffect, useRef, useState } from 'react';
import { Columns2, Plus } from 'lucide-react';
import { Direction } from '@/types';
import TaskRow from './TaskRow';
import TaskModal from '@/components/modals/TaskModal';

type ColumnKey = 'status' | 'assignee';

const ALL_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'status', label: 'Status' },
  { key: 'assignee', label: 'Assignee' },
];

const DEFAULT_VISIBLE = new Set<ColumnKey>(['status', 'assignee']);

export default function TaskList({ direction }: { direction: Direction }) {
  const [showAdd, setShowAdd] = useState(false);
  const [visible, setVisible] = useState<Set<ColumnKey>>(DEFAULT_VISIBLE);
  const [showColPicker, setShowColPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const lastEnd =
    direction.tasks.length > 0 ? direction.tasks[direction.tasks.length - 1].endDate : undefined;

  const toggle = (key: ColumnKey) =>
    setVisible((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  useEffect(() => {
    if (!showColPicker) return;
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowColPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showColPicker]);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <h3 className="text-sm font-semibold text-gray-700">
            Tasks{' '}
            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {direction.tasks.length}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setShowColPicker((v) => !v)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  showColPicker
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                title="Show/hide columns"
              >
                <Columns2 size={13} /> Columns
              </button>
              {showColPicker && (
                <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Columns
                  </p>
                  <div className="px-3 pb-1 text-[10px] text-gray-400 border-b border-gray-100 mb-1">
                    Dates: click 🗓 on each task
                  </div>
                  {ALL_COLUMNS.map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-1.5 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={visible.has(key)}
                        onChange={() => toggle(key)}
                        className="h-3.5 w-3.5 rounded accent-indigo-600"
                      />
                      <span className="text-xs text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus size={13} /> Add Task
            </button>
          </div>
        </div>

        {direction.tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <ListIcon />
            <p className="mt-2 text-sm">No tasks yet</p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-3 text-sm text-indigo-600 hover:underline"
            >
              Add your first task
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  <th className="py-2.5 pl-4 pr-3">Task</th>
                  {visible.has('status') && <th className="px-3 py-2.5">Status</th>}
                  {visible.has('assignee') && <th className="px-3 py-2.5">Assignee</th>}
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {direction.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    directionId={direction.id}
                    color={direction.color}
                    visibleCols={visible}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && (
        <TaskModal
          directionId={direction.id}
          defaultStart={lastEnd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
}

function ListIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}
