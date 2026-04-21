'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Direction } from '@/types';
import { toGroupedGanttTasks } from '@/lib/ganttAdapter';
import { ViewMode } from 'gantt-task-react';

const GanttInner = dynamic(() => import('@/components/direction/GanttInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-48 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
    </div>
  ),
});

const VIEW_MODES: { label: string; value: ViewMode }[] = [
  { label: 'Day', value: ViewMode.Day },
  { label: 'Week', value: ViewMode.Week },
  { label: 'Month', value: ViewMode.Month },
];

export default function CombinedGantt({ directions }: { directions: Direction[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const tasks = toGroupedGanttTasks(directions);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Combined Timeline</h3>
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
      <GanttInner tasks={tasks} viewMode={viewMode} />
    </div>
  );
}
