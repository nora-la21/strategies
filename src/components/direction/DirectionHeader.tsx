'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Direction } from '@/types';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import DirectionModal from '@/components/modals/DirectionModal';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function DirectionHeader({ direction }: { direction: Direction }) {
  const { deleteDirection } = useData();
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteDirection(direction.id);
    router.push('/');
  };

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full shrink-0" style={{ backgroundColor: direction.color }} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{direction.name}</h1>
            {direction.description && (
              <p className="mt-0.5 text-sm text-gray-500">{direction.description}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {showEdit && <DirectionModal direction={direction} onClose={() => setShowEdit(false)} />}
      {showConfirm && (
        <ConfirmModal
          title="Delete Direction"
          message={`Are you sure you want to delete "${direction.name}" and all its tasks? This cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
