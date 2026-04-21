'use client';

import 'gantt-task-react/dist/index.css';
import { Gantt, ViewMode } from 'gantt-task-react';
import { GanttTask } from '@/types';
import { toISO } from '@/lib/dateUtils';

interface Props {
  tasks: GanttTask[];
  onDateChange?: (taskId: string, start: string, end: string) => void;
  viewMode?: ViewMode;
}

export default function GanttInner({ tasks, onDateChange, viewMode = ViewMode.Week }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-gray-400">
        No tasks to display
      </div>
    );
  }

  return (
    <div className="gantt-wrapper overflow-x-auto">
      <Gantt
        tasks={tasks as never}
        viewMode={viewMode}
        listCellWidth=""
        columnWidth={viewMode === ViewMode.Day ? 40 : viewMode === ViewMode.Week ? 60 : 120}
        onDateChange={
          onDateChange
            ? (task: { id: string; start: Date; end: Date }) =>
                onDateChange(task.id, toISO(task.start), toISO(task.end))
            : undefined
        }
        todayColor="rgba(99,102,241,0.08)"
        barCornerRadius={4}
        headerHeight={50}
        rowHeight={36}
        fontSize="13px"
      />
    </div>
  );
}
