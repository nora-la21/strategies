export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function toDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

export function toEndDate(dateStr: string): Date {
  return new Date(dateStr + 'T23:59:59');
}

export function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDisplay(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function daysBetween(startStr: string, endStr: string): number {
  const start = new Date(startStr + 'T12:00:00');
  const end = new Date(endStr + 'T12:00:00');
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}
