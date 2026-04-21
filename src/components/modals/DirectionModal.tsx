'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ColorPicker from '@/components/ui/ColorPicker';
import { useData } from '@/context/DataContext';
import { Direction } from '@/types';

interface Props {
  direction?: Direction;
  onClose: () => void;
}

export default function DirectionModal({ direction, onClose }: Props) {
  const { addDirection, updateDirection } = useData();
  const [name, setName] = useState(direction?.name ?? '');
  const [color, setColor] = useState(direction?.color ?? '#6366f1');
  const [description, setDescription] = useState(direction?.description ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (direction) {
      updateDirection(direction.id, { name: name.trim(), color, description: description.trim() });
    } else {
      addDirection({ name: name.trim(), color, description: description.trim() });
    }
    onClose();
  };

  return (
    <Modal title={direction ? 'Edit Direction' : 'Add Direction'} onClose={onClose} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Direction name"
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <ColorPicker value={color} onChange={setColor} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Brief description..."
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {direction ? 'Save Changes' : 'Add Direction'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
