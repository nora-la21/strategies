'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutDashboard, Plus } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useState, Suspense } from 'react';
import DirectionModal from '@/components/modals/DirectionModal';

function SidebarInner() {
  const { data } = useData();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = searchParams.get('id');
  const [showAddDir, setShowAddDir] = useState(false);

  return (
    <>
      <aside className="flex h-full w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm leading-tight">
            Marketing<br />Dashboard
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={16} />
            Overview
          </Link>

          <div className="pt-3 pb-1 px-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Directions
            </span>
          </div>

          {data.directions.map((dir) => {
            const isActive = pathname.startsWith('/direction') && activeId === dir.id;
            return (
              <Link
                key={dir.id}
                href={`/direction/?id=${dir.id}`}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dir.color }}
                />
                <span className="truncate">{dir.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            onClick={() => setShowAddDir(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <Plus size={16} />
            Add Direction
          </button>
        </div>
      </aside>

      {showAddDir && <DirectionModal onClose={() => setShowAddDir(false)} />}
    </>
  );
}

export default function Sidebar() {
  return (
    <Suspense>
      <SidebarInner />
    </Suspense>
  );
}
