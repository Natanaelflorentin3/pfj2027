export type Status = 'pending' | 'progress' | 'done';

export interface Objective {
  id: string;
  name: string;
  status: Status;
  responsible?: string;
  dueDate?: string;
}

export interface Area {
  id: string;
  name: string;
  icon: string;
  objectives: Objective[];
}

export interface EventInfo {
  title: string;
  motto: string;
  verse: string;
  location: string;
  locationConfirmed: boolean;
  date: string;
  youthCount: number;
 
}

export interface AreaStats {
  total: number;
  pending: number;
  progress: number;
  done: number;
  pct: number;
}
