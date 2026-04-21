'use client';

import dynamic from 'next/dynamic';
import { GanttTask } from '@/types';
import { ViewMode } from 'gantt-task-react';

const GanttInner = dynamic(() => import('./GanttInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
    </div>
  ),
});

interface Props {
  tasks: GanttTask[];
  onDateChange?: (taskId: string, start: string, end: string) => void;
  viewMode?: ViewMode;
}

export default function DirectionGantt(props: Props) {
  return <GanttInner {...props} />;
}
