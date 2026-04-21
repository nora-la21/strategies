const COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444',
  '#8b5cf6', '#f97316', '#0ea5e9', '#64748b',
  '#ec4899', '#14b8a6', '#84cc16', '#f43f5e',
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${
            value === c ? 'ring-2 ring-offset-2 ring-gray-700 scale-110' : ''
          }`}
          style={{ backgroundColor: c }}
          title={c}
        />
      ))}
    </div>
  );
}
