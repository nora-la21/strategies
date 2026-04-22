'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Direction } from '@/types';
import { ANCHOR_DATES } from '@/lib/seed';
import { daysBetween, formatDisplay } from '@/lib/dateUtils';

const PROJECT_START = '2026-04-21';
const PROJECT_END = '2026-07-03'; // one day past last task for right padding
const TOTAL_DAYS = daysBetween(PROJECT_START, PROJECT_END);

function pct(dateStr: string): number {
  return Math.max(0, Math.min(100, (daysBetween(PROJECT_START, dateStr) / TOTAL_DAYS) * 100));
}

function spanPct(start: string, end: string): number {
  return Math.max(0.5, pct(end) - pct(start));
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function taskColor(hex: string, status: string): string {
  if (status === 'done') return hex;
  if (status === 'in_progress') return hexToRgba(hex, 0.75);
  return hexToRgba(hex, 0.45);
}

// Build month tick marks
function monthTicks() {
  const ticks: { label: string; pct: number }[] = [];
  const start = new Date('2026-04-21');
  const end = new Date('2026-07-03');
  const cur = new Date(start.getFullYear(), start.getMonth(), 1);
  cur.setMonth(cur.getMonth() + 1); // start from first full month
  while (cur <= end) {
    const iso = cur.toISOString().slice(0, 10);
    ticks.push({
      label: cur.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
      pct: pct(iso),
    });
    cur.setMonth(cur.getMonth() + 1);
  }
  return ticks;
}

const MONTH_TICKS = monthTicks();

const TODAY_PCT = (() => {
  const today = new Date().toISOString().slice(0, 10);
  if (today < PROJECT_START) return 0;
  if (today > PROJECT_END) return 100;
  return pct(today);
})();

interface Props {
  directions: Direction[];
}

export default function CombinedGantt({ directions }: Props) {
  const [hovered, setHovered] = useState<{ text: string; x: number; y: number } | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Combined Timeline</h3>

      <div className="relative select-none" onMouseLeave={() => setHovered(null)}>
        {/* Month header */}
        <div className="relative h-6 mb-1">
          {MONTH_TICKS.map((t) => (
            <div
              key={t.label}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${t.pct}%` }}
            >
              <div className="h-2 w-px bg-gray-300" />
              <span className="text-[10px] text-gray-400 whitespace-nowrap -translate-x-1/2">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {directions.map((dir) => {
            const done = dir.tasks.filter((t) => t.status === 'done').length;
            const pctDone = dir.tasks.length ? Math.round((done / dir.tasks.length) * 100) : 0;

            return (
              <Link
                key={dir.id}
                href={`/direction/?id=${dir.id}`}
                className="group flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-50 transition-colors"
              >
                {/* Label */}
                <div className="w-44 shrink-0 flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: dir.color }}
                  />
                  <span className="text-xs text-gray-700 truncate group-hover:text-indigo-700 transition-colors">
                    {dir.name}
                  </span>
                </div>

                {/* Bar track */}
                <div className="relative flex-1 h-5">
                  {/* Track background */}
                  <div className="absolute inset-0 rounded-full bg-gray-100" />

                  {/* Anchor date lines */}
                  {ANCHOR_DATES.map((a) => (
                    <div
                      key={a.date}
                      className="absolute top-0 bottom-0 w-px bg-slate-300 z-10"
                      style={{ left: `${pct(a.date)}%` }}
                    />
                  ))}

                  {/* Today line */}
                  {TODAY_PCT > 0 && TODAY_PCT < 100 && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-indigo-400 z-20"
                      style={{ left: `${TODAY_PCT}%` }}
                    />
                  )}

                  {/* Task bars */}
                  {dir.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="absolute top-1 bottom-1 rounded-sm cursor-pointer z-10"
                      style={{
                        left: `${pct(task.startDate)}%`,
                        width: `${spanPct(task.startDate, task.endDate)}%`,
                        backgroundColor: taskColor(dir.color, task.status),
                      }}
                      onMouseEnter={(e) => {
                        const rect = (e.currentTarget.closest('.relative.flex-1') as HTMLElement)?.getBoundingClientRect();
                        const barRect = e.currentTarget.getBoundingClientRect();
                        setHovered({
                          text: `${task.name} · ${formatDisplay(task.startDate)} → ${formatDisplay(task.endDate)}`,
                          x: barRect.left - (rect?.left ?? 0) + barRect.width / 2,
                          y: -8,
                        });
                      }}
                      onMouseLeave={() => setHovered(null)}
                    />
                  ))}
                </div>

                {/* % label */}
                <span className="w-8 shrink-0 text-right text-xs text-gray-400">{pctDone}%</span>
              </Link>
            );
          })}
        </div>

        {/* Anchor date labels below */}
        <div className="relative h-6 mt-2 ml-[11.5rem]">
          {ANCHOR_DATES.map((a) => (
            <div
              key={a.date}
              className="absolute flex flex-col items-center"
              style={{ left: `calc(${pct(a.date)}% * ((100% - 3.5rem) / 100%))` }}
            >
              <div className="h-1.5 w-px bg-slate-300" />
              <span className="text-[9px] text-slate-500 whitespace-nowrap -translate-x-1/2 bg-white px-0.5">
                {a.label}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10px] text-gray-400 border-t border-gray-100 pt-3">
          <span className="text-gray-400 font-medium">Bar shade = status:</span>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-8 rounded-sm" style={{ backgroundColor: 'rgba(99,102,241,0.45)' }} />
            <span>To do</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-8 rounded-sm" style={{ backgroundColor: 'rgba(99,102,241,0.75)' }} />
            <span>In progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-8 rounded-sm" style={{ backgroundColor: '#6366f1' }} />
            <span>Done</span>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <div className="h-3.5 w-0.5 bg-indigo-400" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-px bg-slate-300" />
            <span>Key date</span>
          </div>
        </div>

        {/* Floating tooltip */}
        {hovered && (
          <div
            className="pointer-events-none absolute z-30 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow-lg whitespace-nowrap -translate-x-1/2 -translate-y-full"
            style={{ left: `calc(11.5rem + ${hovered.x}px)`, top: `${hovered.y}px` }}
          >
            {hovered.text}
          </div>
        )}
      </div>
    </div>
  );
}
