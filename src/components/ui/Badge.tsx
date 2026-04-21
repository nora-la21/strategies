import { TaskStatus } from '@/types';

const config: Record<TaskStatus, { label: string; className: string }> = {
  todo: { label: 'To Do', className: 'bg-gray-100 text-gray-600' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', className: 'bg-green-100 text-green-700' },
};

export default function Badge({ status }: { status: TaskStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
