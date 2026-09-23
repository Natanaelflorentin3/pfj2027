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

export type NavKey = 'objetivos' | 'calendario' | 'consejeros' | 'participantes' | 'pdfs' | 'comentarios' | 'predio';

/** Un día del PFJ dentro del calendario semanal. */
export interface DiaCalendario {
  id: string;
  /** Ej: "Día 1" */
  label: string;
  /** Ej: "Miércoles 6 de enero" — dejar undefined hasta tener la fecha confirmada */
  fecha?: string;
  /** Resumen corto de lo que pasa ese día (opcional, además del PDF) */
  resumen?: string;
  /** Vestimenta del día según el Manual del Personal, ej: "Camiseta del personal de FSY" */
  vestimenta?: string;
  /** Lista detallada de actividades del día (fallback simple si todavía no hay "agenda" completa) */
  actividades?: string[];
  /** Agenda hora por hora del día, tal cual el Manual del Personal PFJ. Si está presente, se muestra esta tabla en vez de "actividades". */
  agenda?: AgendaItem[];
  /** Ruta del PDF con las actividades del día, ej: "/pdfs/dia-1.pdf". null = todavía no se subió. */
  pdf: string | null;
}

/** Una fila de la agenda hora por hora de un día del PFJ (Manual del Personal). */
export interface AgendaItem {
  /** Ej: "7:30-8:20 h" */
  hora: string;
  descripcion: string;
  consejeros: string;
  coordinadoresAuxiliares: string;
  coordinadores: string;
  matrimonioDirector: string;
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

/** Un comentario dejado por alguien del equipo, guardado en la base de datos. */
export interface Comentario {
  id: number;
  nombre: string;
  mensaje: string;
  creadoEn: Date;
}

/** Información general del predio donde se hace el PFJ. */
export interface PredioInfo {
  nombre: string;
  direccion: string;
  mapsUrl: string;
  /** Ej: "43 hectáreas" (fuente: Wikipedia, a confirmar en la recorrida) */
  superficie?: string;
}

export type EstadoEspacio = 'apto' | 'requiere-adaptacion' | 'no-recomendado' | 'a-confirmar';

/** Un espacio del predio (comedor, gimnasio, salón, etc.) y si nos sirve para las actividades. */
export interface EspacioPredio {
  id: string;
  nombre: string;
  icono: string;
  usoPrevisto: string;
  /** Texto libre: "~200 personas", "Grande (sin cuantificar)", "A confirmar", etc. */
  capacidad: string;
  estado: EstadoEspacio;
  notas?: string;
}



