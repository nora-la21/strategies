import { Direction, DirectionMetrics } from '@/types';

export function computeMetrics(dir: Direction): DirectionMetrics {
  const total = dir.tasks.length;
  const done = dir.tasks.filter((t) => t.status === 'done').length;

  if (total === 0) {
    return { completionPct: 0, tasksDone: 0, tasksTotal: 0, timelineProgressPct: 0, daysRemaining: 0 };
  }

  const allStarts = dir.tasks.map((t) => +new Date(t.startDate + 'T00:00:00'));
  const allEnds = dir.tasks.map((t) => +new Date(t.endDate + 'T23:59:59'));
  const spanStart = Math.min(...allStarts);
  const spanEnd = Math.max(...allEnds);
  const now = Date.now();

  const span = spanEnd - spanStart;
  const timelinePct = span > 0 ? Math.min(100, Math.max(0, ((now - spanStart) / span) * 100)) : 0;
  const msPerDay = 86_400_000;
  const daysRemaining = Math.max(0, Math.round((spanEnd - now) / msPerDay));

  return {
    completionPct: Math.round((done / total) * 100),
    tasksDone: done,
    tasksTotal: total,
    timelineProgressPct: Math.round(timelinePct),
    daysRemaining,
  };
}
