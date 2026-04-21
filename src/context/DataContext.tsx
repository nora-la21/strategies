'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DashboardData, Direction, Task } from '@/types';
import { getSeedData } from '@/lib/seed';
import { v4 as uuidv4 } from 'uuid';

const SCHEMA_VERSION = 2;
const DOC_REF = () => doc(db, 'dashboard', 'main');

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
  const [error, setError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  // Write to Firestore — JSON round-trip strips undefined values which Firestore rejects
  const persist = useCallback(async (next: DashboardData) => {
    setData(next); // optimistic update
    try {
      const clean = JSON.parse(JSON.stringify(next));
      await setDoc(DOC_REF(), clean);
    } catch (e) {
      console.error('Firestore write failed', e);
    }
  }, []);

  useEffect(() => {
    let initialised = false;
    const timeout = setTimeout(() => setTimedOut(true), 15000);

    // Subscribe to real-time updates
    const unsub = onSnapshot(
      DOC_REF(),
      async (snap) => {
        clearTimeout(timeout);
        if (snap.exists()) {
          const stored = snap.data() as DashboardData;
          if (stored.schemaVersion === SCHEMA_VERSION) {
            setData(stored);
            initialised = true;
            return;
          }
        }
        // First load or schema mismatch → seed
        if (!initialised) {
          initialised = true;
          const seed = { ...getSeedData(), schemaVersion: SCHEMA_VERSION };
          const clean = JSON.parse(JSON.stringify(seed));
          await setDoc(DOC_REF(), clean);
          setData(seed);
        }
      },
      (err) => {
        clearTimeout(timeout);
        console.error('Firestore snapshot error', err);
        setError(`Firestore error: ${err.code} — ${err.message}`);
      }
    );

    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const addDirection = useCallback(
    (dir: Omit<Direction, 'id' | 'tasks'>): Direction => {
      if (!data) throw new Error('Data not loaded');
      const newDir: Direction = { ...dir, id: uuidv4(), tasks: [] };
      persist({ ...data, lastUpdated: new Date().toISOString(), directions: [...data.directions, newDir] });
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
    const seed = { ...getSeedData(), schemaVersion: SCHEMA_VERSION };
    persist(seed);
  }, [persist]);

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gray-50 p-8 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-sm text-gray-500">
          Make sure Firestore Database is created in your Firebase console (test mode).
        </p>
        <button onClick={() => window.location.reload()} className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-8 text-center">
        {!timedOut ? (
          <>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <p className="text-sm text-gray-500">Connecting to database…</p>
          </>
        ) : (
          <>
            <p className="text-red-600 font-medium">Could not reach Firestore after 15 seconds.</p>
            <div className="text-sm text-gray-500 space-y-1 max-w-md">
              <p>Check the browser console (F12 → Console) for the exact error, then try:</p>
              <ol className="text-left list-decimal list-inside space-y-1 mt-2">
                <li>Firebase console → Firestore Database → confirm it shows <strong>Active</strong></li>
                <li>Rules tab → confirm the rule allows reads until May 2026</li>
                <li>Hard-refresh the page (Ctrl+Shift+R)</li>
              </ol>
            </div>
            <button onClick={() => window.location.reload()} className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              Retry
            </button>
          </>
        )}
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
