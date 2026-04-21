'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import DateInput from '@/components/ui/DateInput';
import { useData } from '@/context/DataContext';
import { Task, TaskStatus } from '@/types';

interface Props {
  directionId: string;
  task?: Task;
  defaultStart?: string;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export default function TaskModal({ directionId, task, defaultStart, onClose }: Props) {
  const { addTask, updateTask } = useData();
  const [name, setName] = useState(task?.name ?? '');
  const [startDate, setStartDate] = useState(task?.startDate ?? defaultStart ?? '');
  const [endDate, setEndDate] = useState(task?.endDate ?? '');
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo');
  const [assignee, setAssignee] = useState(task?.assignee ?? '');
  const [notes, setNotes] = useState(task?.notes ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startDate || !endDate) return;
    if (endDate < startDate) {
      setError('End date must be on or after start date');
      return;
    }
    setError('');
    const payload = {
      name: name.trim(),
      startDate,
      endDate,
      status,
      assignee: assignee.trim() || undefined,
      notes: notes.trim() || undefined,
    };
    if (task) {
      updateTask(directionId, { ...task, ...payload });
    } else {
      addTask(directionId, payload);
    }
    onClose();
  };

  return (
    <Modal title={task ? 'Edit Task' : 'Add Task'} onClose={onClose} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Task name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DateInput label="Start date" value={startDate} onChange={setStartDate} required />
          <DateInput label="End date" value={endDate} onChange={setEndDate} required min={startDate} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Assignee (optional)</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="e.g. Sasha, Team"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Additional notes..."
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {task ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
