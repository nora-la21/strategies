interface DateInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  min?: string;
  max?: string;
}

export default function DateInput({ label, value, onChange, required, min, max }: DateInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        max={max}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
