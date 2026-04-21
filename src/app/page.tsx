'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import DirectionCard from '@/components/overview/DirectionCard';
import CombinedGantt from '@/components/overview/CombinedGantt';
import DirectionModal from '@/components/modals/DirectionModal';
import { Plus, RotateCcw } from 'lucide-react';
import { ANCHOR_DATES } from '@/lib/seed';
import { formatDisplay } from '@/lib/dateUtils';

export default function OverviewPage() {
  const { data, resetToSeed } = useData();
  const [showAddDir, setShowAddDir] = useState(false);

  const totalTasks = data.directions.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = data.directions.reduce(
    (s, d) => s + d.tasks.filter((t) => t.status === 'done').length,
    0
  );
  const overallPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <>
      <div className="p-6 space-y-6 max-w-screen-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
            <p className="mt-0.5 text-sm text-gray-500">Content plan: Apr 21 → Jul 2, 2026</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm('Reset all data to original seed? This cannot be undone.')) resetToSeed();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              title="Reset to original data"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setShowAddDir(true)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus size={15} /> Add Direction
            </button>
          </div>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard label="Directions" value={String(data.directions.length)} />
          <SummaryCard label="Total Tasks" value={String(totalTasks)} />
          <SummaryCard label="Done" value={String(doneTasks)} />
          <SummaryCard label="Overall Progress" value={`${overallPct}%`} highlight />
        </div>

        {/* Anchor dates */}
        <div className="flex flex-wrap gap-2">
          {ANCHOR_DATES.map((a) => (
            <div
              key={a.date}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span className="font-medium">{a.label}</span>
              <span className="text-slate-500">{formatDisplay(a.date)}</span>
            </div>
          ))}
        </div>

        {/* Direction cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.directions.map((dir) => (
            <DirectionCard key={dir.id} direction={dir} />
          ))}
        </div>

        {/* Combined Gantt */}
        <CombinedGantt directions={data.directions} />
      </div>

      {showAddDir && <DirectionModal onClose={() => setShowAddDir(false)} />}
    </>
  );
}

function SummaryCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        highlight ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-white'
      }`}
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-0.5 text-2xl font-bold ${highlight ? 'text-indigo-700' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
}
