import { Direction, GanttTask, Task } from '@/types';
import { ANCHOR_DATES } from './seed';

function taskProgress(status: string): number {
  if (status === 'done') return 100;
  if (status === 'in_progress') return 50;
  return 0;
}

export function toGanttTasks(direction: Direction): GanttTask[] {
  return direction.tasks.map((task: Task) => ({
    id: task.id,
    name: task.name,
    start: new Date(task.startDate + 'T00:00:00'),
    end: new Date(task.endDate + 'T23:59:59'),
    progress: taskProgress(task.status),
    type: 'task' as const,
    styles: {
      backgroundColor: direction.color + 'cc',
      backgroundSelectedColor: direction.color,
      progressColor: direction.color,
      progressSelectedColor: direction.color + 'dd',
    },
  }));
}

export function toGroupedGanttTasks(directions: Direction[]): GanttTask[] {
  const result: GanttTask[] = [];

  // Milestone row for anchor dates
  const milestoneProject: GanttTask = {
    id: 'milestones',
    name: 'Key Dates',
    start: new Date('2026-04-21T00:00:00'),
    end: new Date('2026-07-02T23:59:59'),
    progress: 0,
    type: 'project',
    hideChildren: false,
    styles: { backgroundColor: '#94a3b8', progressColor: '#94a3b8' },
  };
  result.push(milestoneProject);

  for (const anchor of ANCHOR_DATES) {
    result.push({
      id: `milestone-${anchor.date}`,
      name: anchor.label,
      start: new Date(anchor.date + 'T00:00:00'),
      end: new Date(anchor.date + 'T23:59:59'),
      progress: 0,
      type: 'milestone',
      isDisabled: true,
      project: 'milestones',
      styles: { backgroundColor: '#1e293b', progressColor: '#1e293b' },
    });
  }

  for (const dir of directions) {
    if (dir.tasks.length === 0) continue;

    const starts = dir.tasks.map((t) => +new Date(t.startDate + 'T00:00:00'));
    const ends = dir.tasks.map((t) => +new Date(t.endDate + 'T23:59:59'));
    const done = dir.tasks.filter((t) => t.status === 'done').length;
    const progress = dir.tasks.length > 0 ? Math.round((done / dir.tasks.length) * 100) : 0;

    result.push({
      id: dir.id,
      name: dir.name,
      start: new Date(Math.min(...starts)),
      end: new Date(Math.max(...ends)),
      progress,
      type: 'project',
      hideChildren: false,
      styles: { backgroundColor: dir.color + '88', progressColor: dir.color },
    });

    for (const task of dir.tasks) {
      result.push({
        id: task.id,
        name: task.name,
        start: new Date(task.startDate + 'T00:00:00'),
        end: new Date(task.endDate + 'T23:59:59'),
        progress: taskProgress(task.status),
        type: 'task',
        project: dir.id,
        styles: {
          backgroundColor: dir.color + 'aa',
          backgroundSelectedColor: dir.color,
          progressColor: dir.color,
          progressSelectedColor: dir.color + 'dd',
        },
      });
    }
  }

  return result;
}
