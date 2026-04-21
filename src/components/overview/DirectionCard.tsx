import Link from 'next/link';
import { Direction } from '@/types';
import { computeMetrics } from '@/lib/metrics';
import ProgressRing from '@/components/ui/ProgressRing';
import { CalendarDays, ListTodo } from 'lucide-react';
import { formatDisplay } from '@/lib/dateUtils';

export default function DirectionCard({ direction }: { direction: Direction }) {
  const m = computeMetrics(direction);

  const lastEndDate =
    direction.tasks.length > 0
      ? direction.tasks.reduce((max, t) => (t.endDate > max ? t.endDate : max), direction.tasks[0].endDate)
      : null;

  return (
    <Link href={`/direction/${direction.id}`} className="group block">
      <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md hover:border-gray-300">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: direction.color }} />
              <h3 className="truncate text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                {direction.name}
              </h3>
            </div>
            {direction.description && (
              <p className="mt-1 text-xs text-gray-400 line-clamp-2">{direction.description}</p>
            )}
          </div>
          <ProgressRing pct={m.completionPct} color={direction.color} size={52} />
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <ListTodo size={12} />
            <span>
              {m.tasksDone}/{m.tasksTotal} tasks
            </span>
          </div>
          {lastEndDate && (
            <div className="flex items-center gap-1">
              <CalendarDays size={12} />
              <span>ends {formatDisplay(lastEndDate)}</span>
            </div>
          )}
        </div>

        <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{ width: `${m.completionPct}%`, backgroundColor: direction.color }}
          />
        </div>
      </div>
    </Link>
  );
}
