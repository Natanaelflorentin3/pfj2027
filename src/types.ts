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
  totalCount: number;
}

export interface AreaStats {
  total: number;
  pending: number;
  progress: number;
  done: number;
  pct: number;
}

export type NavKey = 'objetivos' | 'calendario' | 'consejeros' | 'participantes' | 'pdfs';

/** Un día del PFJ dentro del calendario semanal. */
export interface DiaCalendario {
  id: string;
  /** Ej: "Día 1" */
  label: string;
  /** Ej: "Miércoles 6 de enero" — dejar undefined hasta tener la fecha confirmada */
  fecha?: string;
  /** Resumen corto de lo que pasa ese día (opcional, además del PDF) */
  resumen?: string;
  /** Ruta del PDF con las actividades del día, ej: "/pdfs/dia-1.pdf". null = todavía no se subió. */
  pdf: string | null;
}

export type EstadoConsejero = 'confirmado' | 'a-confirmar';

export interface Consejero {
  id: string;
  nombre: string;
  apellido: string;
  genero: 'Masculino' | 'Femenino';
  estado: EstadoConsejero;
  barrio: string;
}

export type EstadoParticipante = 'aprobado' | 'pendiente';

export interface Participante {
  id: string;
  nombre: string;
  apellido: string;
  genero: 'Masculino' | 'Femenino';
  estado: EstadoParticipante;
  barrio: string;
  telefonoEmergencia: string;
  fichaMedica: string;

}


export interface PdfDoc {
  id: string;
  titulo: string;
  categoria: string;
  descripcion?: string;
  /** Ruta pública del archivo, ej: "/pdfs/reglamento.pdf". null = todavía no se subió. */
  archivo: string | null;
}



