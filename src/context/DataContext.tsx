'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DashboardData, Direction, Task } from '@/types';
import { readStorage, writeStorage } from '@/hooks/useLocalStorage';
import { getSeedData } from '@/lib/seed';
import { v4 as uuidv4 } from 'uuid';

interface DataContextValue {
  data: DashboardData;
  addDirection: (dir: Omit<Direction, 'id' | 'tasks'>) => Direction;
  updateDirection: (id: string, updates: Partial<Omit<Direction, 'id' | 'tasks'>>) => void;
  deleteDirection: (id: string) => void;
  addTask: (directionId: string, task: Omit<Task, 'id'>) => Task;
  updateTask: (directionId: string, task: Task) => void;
  deleteTask: (directionId: string, taskId: string) => void;
  resetToSeed: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const stored = readStorage();
    // Reseed if missing, empty, or schema changed (e.g. old data had random UUIDs)
    const SCHEMA_VERSION = 2;
    if (stored && stored.directions.length > 0 && stored.schemaVersion === SCHEMA_VERSION) {
      setData(stored);
    } else {
      const seed = { ...getSeedData(), schemaVersion: SCHEMA_VERSION };
      writeStorage(seed);
      setData(seed);
    }
  }, []);

  const persist = useCallback((next: DashboardData) => {
    setData(next);
    writeStorage(next);
  }, []);

  const addDirection = useCallback(
    (dir: Omit<Direction, 'id' | 'tasks'>): Direction => {
      if (!data) throw new Error('Data not loaded');
      const newDir: Direction = { ...dir, id: uuidv4(), tasks: [] };
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: [...data.directions, newDir],
      });
      return newDir;
    },
    [data, persist]
  );

  const updateDirection = useCallback(
    (id: string, updates: Partial<Omit<Direction, 'id' | 'tasks'>>) => {
      if (!data) return;
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: data.directions.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      });
    },
    [data, persist]
  );

  const deleteDirection = useCallback(
    (id: string) => {
      if (!data) return;
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: data.directions.filter((d) => d.id !== id),
      });
    },
    [data, persist]
  );

  const addTask = useCallback(
    (directionId: string, task: Omit<Task, 'id'>): Task => {
      if (!data) throw new Error('Data not loaded');
      const newTask: Task = { ...task, id: uuidv4() };
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: data.directions.map((d) =>
          d.id === directionId ? { ...d, tasks: [...d.tasks, newTask] } : d
        ),
      });
      return newTask;
    },
    [data, persist]
  );

  const updateTask = useCallback(
    (directionId: string, task: Task) => {
      if (!data) return;
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: data.directions.map((d) =>
          d.id === directionId
            ? { ...d, tasks: d.tasks.map((t) => (t.id === task.id ? task : t)) }
            : d
        ),
      });
    },
    [data, persist]
  );

  const deleteTask = useCallback(
    (directionId: string, taskId: string) => {
      if (!data) return;
      persist({
        ...data,
        lastUpdated: new Date().toISOString(),
        directions: data.directions.map((d) =>
          d.id === directionId ? { ...d, tasks: d.tasks.filter((t) => t.id !== taskId) } : d
        ),
      });
    },
    [data, persist]
  );

  const resetToSeed = useCallback(() => {
    const seed = { ...getSeedData(), schemaVersion: 2 };
    persist(seed);
  }, [persist]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <DataContext.Provider
      value={{ data, addDirection, updateDirection, deleteDirection, addTask, updateTask, deleteTask, resetToSeed }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
