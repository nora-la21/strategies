'use client';

import { use, useState } from 'react';
import { useData } from '@/context/DataContext';
import DirectionHeader from '@/components/direction/DirectionHeader';
import DirectionGantt from '@/components/direction/DirectionGantt';
import MetricsPanel from '@/components/direction/MetricsPanel';
import TaskList from '@/components/direction/TaskList';
import { toGanttTasks } from '@/lib/ganttAdapter';
import { ViewMode } from 'gantt-task-react';

const VIEW_MODES: { label: string; value: ViewMode }[] = [
  { label: 'Day', value: ViewMode.Day },
  { label: 'Week', value: ViewMode.Week },
  { label: 'Month', value: ViewMode.Month },
];

export default function DirectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, updateTask } = useData();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);

  const direction = data.directions.find((d) => d.id === id);

  if (!direction) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Direction not found</p>
          <a href="/" className="mt-2 text-sm text-indigo-600 hover:underline">
            Back to overview
          </a>
        </div>
      </div>
    );
  }

  const ganttTasks = toGanttTasks(direction);

  const handleDateChange = (taskId: string, start: string, end: string) => {
    const task = direction.tasks.find((t) => t.id === taskId);
    if (task) updateTask(direction.id, { ...task, startDate: start, endDate: end });
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <DirectionHeader direction={direction} />

      <MetricsPanel direction={direction} />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Timeline</h3>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {VIEW_MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => setViewMode(m.value)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === m.value
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <DirectionGantt
          tasks={ganttTasks}
          onDateChange={handleDateChange}
          viewMode={viewMode}
        />
      </div>

      <TaskList direction={direction} />
    </div>
  );
}
