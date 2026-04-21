'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Direction, DirectionMetrics } from '@/types';
import { computeMetrics } from '@/lib/metrics';
import { Clock, CheckCircle2, ListTodo, CalendarDays } from 'lucide-react';

interface Props {
  direction: Direction;
}

const STATUS_COLORS: Record<string, string> = {
  'To Do': '#e5e7eb',
  'In Progress': '#93c5fd',
  Done: '#6ee7b7',
};

export default function MetricsPanel({ direction }: Props) {
  const m: DirectionMetrics = computeMetrics(direction);

  const barData = [
    { name: 'To Do', count: direction.tasks.filter((t) => t.status === 'todo').length },
    { name: 'In Progress', count: direction.tasks.filter((t) => t.status === 'in_progress').length },
    { name: 'Done', count: direction.tasks.filter((t) => t.status === 'done').length },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Metrics</h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5">
        <KpiCard
          icon={<CheckCircle2 size={16} className="text-green-500" />}
          label="Completion"
          value={`${m.completionPct}%`}
        />
        <KpiCard
          icon={<ListTodo size={16} className="text-indigo-500" />}
          label="Tasks done"
          value={`${m.tasksDone} / ${m.tasksTotal}`}
        />
        <KpiCard
          icon={<Clock size={16} className="text-blue-500" />}
          label="Timeline"
          value={`${m.timelineProgressPct}%`}
        />
        <KpiCard
          icon={<CalendarDays size={16} className="text-orange-500" />}
          label="Days left"
          value={`${m.daysRemaining}d`}
        />
      </div>

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {barData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#d1d5db'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-gray-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <span className="text-xl font-bold text-gray-900">{value}</span>
    </div>
  );
}
