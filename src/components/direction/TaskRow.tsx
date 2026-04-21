'use client';

import { useState } from 'react';
import { CalendarDays, ChevronDown, ChevronRight, Pencil, Trash2, User } from 'lucide-react';
import { Task, TaskStatus } from '@/types';
import { useData } from '@/context/DataContext';
import Badge from '@/components/ui/Badge';
import TaskModal from '@/components/modals/TaskModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { formatDisplay } from '@/lib/dateUtils';

const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

function nextStatus(s: TaskStatus): TaskStatus {
  const idx = STATUSES.indexOf(s);
  return STATUSES[(idx + 1) % STATUSES.length];
}

interface Props {
  task: Task;
  directionId: string;
  color: string;
  visibleCols: Set<string>;
}

export default function TaskRow({ task, directionId, color, visibleCols }: Props) {
  const { updateTask, deleteTask } = useData();
  const [showDates, setShowDates] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const cycleStatus = () => updateTask(directionId, { ...task, status: nextStatus(task.status) });

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
        {/* Task name + date expand */}
        <td className="py-3 pl-4 pr-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-sm text-gray-900 font-medium">{task.name}</span>
            <button
              onClick={() => setShowDates((v) => !v)}
              title={showDates ? 'Hide dates' : 'Show dates'}
              className="ml-0.5 flex items-center gap-0.5 rounded px-1 py-0.5 text-gray-300 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            >
              <CalendarDays size={11} />
              {showDates ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            </button>
          </div>
          {showDates && (
            <div className="mt-1.5 ml-4 flex items-center gap-1.5 text-xs text-gray-500">
              <CalendarDays size={11} className="text-gray-400 shrink-0" />
              <span>{formatDisplay(task.startDate)}</span>
              <span className="text-gray-300">→</span>
              <span>{formatDisplay(task.endDate)}</span>
            </div>
          )}
          {task.notes && <p className="mt-0.5 ml-4 text-xs text-gray-400">{task.notes}</p>}
        </td>

        {visibleCols.has('status') && (
          <td className="px-3 py-3">
            <button onClick={cycleStatus} className="hover:opacity-75 transition-opacity">
              <Badge status={task.status} />
            </button>
          </td>
        )}
        {visibleCols.has('assignee') && (
          <td className="px-3 py-3">
            {task.assignee && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User size={12} />
                {task.assignee}
              </div>
            )}
          </td>
        )}
        <td className="px-3 py-3">
          <div className="flex gap-1">
            <button
              onClick={() => setShowEdit(true)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>

      {showEdit && (
        <TaskModal directionId={directionId} task={task} onClose={() => setShowEdit(false)} />
      )}
      {showConfirm && (
        <ConfirmModal
          title="Delete Task"
          message={`Delete "${task.name}"?`}
          onConfirm={() => deleteTask(directionId, task.id)}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
