export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  assignee?: string;
  notes?: string;
}

export interface Direction {
  id: string;
  name: string;
  color: string;
  description?: string;
  tasks: Task[];
}

export interface DashboardData {
  directions: Direction[];
  lastUpdated: string;
  schemaVersion?: number;
}

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: 'task' | 'milestone' | 'project';
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  hideChildren?: boolean;
}

export interface DirectionMetrics {
  completionPct: number;
  tasksDone: number;
  tasksTotal: number;
  timelineProgressPct: number;
  daysRemaining: number;
}
