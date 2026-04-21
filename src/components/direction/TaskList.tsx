'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Direction } from '@/types';
import TaskRow from './TaskRow';
import TaskModal from '@/components/modals/TaskModal';

export default function TaskList({ direction }: { direction: Direction }) {
  const [showAdd, setShowAdd] = useState(false);

  const lastEnd =
    direction.tasks.length > 0 ? direction.tasks[direction.tasks.length - 1].endDate : undefined;

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
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <Plus size={13} /> Add Task
          </button>
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
                  <th className="px-3 py-2.5">Start</th>
                  <th className="px-3 py-2.5">End</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Assignee</th>
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
