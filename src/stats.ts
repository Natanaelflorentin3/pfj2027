import { Area, AreaStats } from './types';

export function computeStats(objectives: { status: string }[]): AreaStats {
  const total = objectives.length;
  const pending = objectives.filter((o) => o.status === 'pending').length;
  const progress = objectives.filter((o) => o.status === 'progress').length;
  const done = objectives.filter((o) => o.status === 'done').length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { total, pending, progress, done, pct };
}

export function computeOverallStats(areas: Area[]): AreaStats {
  const all = areas.flatMap((a) => a.objectives);
  return computeStats(all);
}
