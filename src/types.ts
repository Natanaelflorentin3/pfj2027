export type Status = 'pending' | 'progress' | 'done';

export interface Objective {
  id: string;
  name: string;
  status: Status;
  responsible?: string;
  dueDate?: string;
}

/** Color de acento visual para distinguir cada área en el dashboard (solo estético). */
export type AreaColor = 'sky' | 'red' | 'emerald' | 'amber' | 'indigo' | 'orange' | 'cyan' | 'navy';

export interface Area {
  id: string;
  name: string;
  icon: string;
  objectives: Objective[];
  /** Color de acento para la tarjeta del área en el dashboard. Si no se define, usa 'navy'. */
  color?: AreaColor;
}

/** Estado de un hito dentro del avance logístico global del evento. */
export type EstadoHito = 'listo' | 'en-curso' | 'pendiente';

/** Un hito grande del cronograma de preparación (no una tarea puntual). */
export interface Hito {
  id: string;
  titulo: string;
  estado: EstadoHito;
  /** Detalle corto, ej: "Abiertas el 27 de septiembre" */
  detalle?: string;
}

/** Un vencimiento o entrega crítica próxima, cargado manualmente a medida que se definen. */
export interface Vencimiento {
  id: string;
  titulo: string;
  /** Nombre del área relacionada, ej: "Transporte" */
  area: string;
  /** Texto libre, ej: "Vence en 48 hs", "Vence el viernes" */
  vence: string;
  responsable?: string;
}

/** Una nota o recordatorio interno del matrimonio director, guardado en la base de datos. */
export interface NotaDireccion {
  id: number;
  autor: string;
  mensaje: string;
  creadoEn: Date;
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
  /** Estaca a la que pertenece. Ej: "San Nicolás". Opcional hasta confirmar. */
  estaca?: string;
  /** Rol especial dentro del personal, ej: "Consejera coordinadora de sesión". La mayoría no tiene uno. */
  rol?: string;
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



