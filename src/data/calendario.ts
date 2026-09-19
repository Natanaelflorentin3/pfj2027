import { AgendaItem, DiaCalendario } from '../types';

/**
 * Agenda hora por hora del Día 1, tal cual el Manual del Personal PFJ.
 * Para completar los demás días, pasame la tabla de ese día (foto o PDF)
 * y la cargo con el mismo formato.
 */
const agendaDia1: AgendaItem[] = [
  { hora: '7:30-8:20 h', descripcion: 'Desayuno del personal', consejeros: 'Asisten', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Asisten', matrimonioDirector: 'Asisten' },
  { hora: '8:00-8:25 h', descripcion: 'Reunión de coordinadores/coordinadores auxiliares', consejeros: '—', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Dirigen', matrimonioDirector: '—' },
  { hora: '8:30-9:15 h', descripcion: 'Reunión del personal', consejeros: 'Asisten', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Dirigen', matrimonioDirector: 'Ofrecen un mensaje de 5 minutos' },
  { hora: '9:15-10:00 h', descripcion: 'Planificación con los consejeros adjuntos', consejeros: 'Dirigen', coordinadoresAuxiliares: '—', coordinadores: '—', matrimonioDirector: '—' },
  { hora: '9:15-10:50 h', descripcion: 'Distribución de materiales y práctica de la orientación', consejeros: 'Ayudan', coordinadoresAuxiliares: 'Dirigen, si se les asigna', coordinadores: 'Supervisan', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '11:00-13:00 h', descripcion: 'Llegada', consejeros: 'Ayudan', coordinadoresAuxiliares: 'Dirigen, si se les asigna', coordinadores: 'Supervisan', matrimonioDirector: 'Asisten' },
  { hora: '13:15-13:30 h', descripcion: 'Revisión de las habitaciones (si corresponde)', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Ayudan, si es necesario', coordinadores: '—', matrimonioDirector: '—' },
  { hora: '13:30-14:20 h', descripcion: 'Reúnete con tu consejero', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten, si lo desean', coordinadores: '—', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '14:30-15:05 h', descripcion: 'Reúnete con tu compañía', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten, si lo desean', coordinadores: '—', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '15:05-15:15 h', descripcion: 'Nombre y verso cantado de la compañía', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten, si lo desean', coordinadores: '—', matrimonioDirector: '—' },
  { hora: '15:30-16:30 h', descripcion: 'Orientación', consejeros: 'Asisten', coordinadoresAuxiliares: 'Ayudan', coordinadores: 'Dirigen', matrimonioDirector: 'Ayudan' },
  { hora: '16:45-17:15 h', descripcion: 'Reunión de coordinadores/coordinadores auxiliares', consejeros: '—', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Dirigen', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '16:45-17:45 h', descripcion: 'Cena', consejeros: 'Asisten', coordinadoresAuxiliares: 'Supervisan, si se les asigna', coordinadores: 'Asisten', matrimonioDirector: 'Asisten' },
  { hora: '17:45 h', descripcion: 'Recuento de personas', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Reciben', coordinadores: 'Reciben', matrimonioDirector: '—' },
  { hora: '18:00-18:45 h', descripcion: 'Lección de la noche de hogar', consejeros: 'Asisten', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Dirigen', matrimonioDirector: 'Enseñan' },
  { hora: '19:00-20:00 h', descripcion: 'Juegos de la noche de hogar', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Asisten', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '20:00-20:45 h', descripcion: 'Establecimiento de metas en la noche de hogar', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten, si lo desean', coordinadores: '—', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '21:00 h', descripcion: 'Recuento de personas', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Reciben', coordinadores: 'Reciben', matrimonioDirector: '—' },
  { hora: '21:00-21:45 h', descripcion: 'Tiempo para meditar', consejeros: 'Supervisan', coordinadoresAuxiliares: '—', coordinadores: '—', matrimonioDirector: '—' },
  { hora: '21:45-22:15 h', descripcion: 'Reflexiona y repasa', consejeros: 'Dirigen', coordinadoresAuxiliares: 'Asisten, si lo desean', coordinadores: 'Asisten, si lo desean', matrimonioDirector: 'Asisten, si lo desean' },
  { hora: '22:30 h', descripcion: 'Apagar las luces', consejeros: 'Supervisan', coordinadoresAuxiliares: 'Ayudan', coordinadores: 'Ayudan', matrimonioDirector: '—' },
  { hora: '22:30 h', descripcion: 'Reunión de coordinadores/coordinadores auxiliares', consejeros: '—', coordinadoresAuxiliares: 'Asisten', coordinadores: 'Dirigen', matrimonioDirector: 'Asisten, si lo desean' },
];

/**
 * Los 5 días del PFJ. El resumen y la vestimenta salen del "Manual del
 * Personal PFJ" (agenda recomendada). Completá "fecha" cuando la sepan
 * confirmada, y "pdf" con la ruta del archivo una vez que lo subas a
 * public/files/ (ver README). Ejemplo: pdf: '/files/dia-1.pdf'
 */
export const diasCalendario: DiaCalendario[] = [
  {
    id: 'dia-1',
    label: 'Día 1',
    fecha: undefined,
    resumen: 'Llegada de los participantes, armado de compañías, orientación general y noche de hogar.',
    vestimenta: 'Camiseta del personal de FSY',
    actividades: [
      'Llegada y acreditación de los participantes',
      'Armado de compañías (grupos con sus consejeros)',
      'Orientación general y presentación de normas del PFJ',
      'Noche de hogar',
    ],
    agenda: agendaDia1,
    pdf: null,
  },
  {
    id: 'dia-2',
    label: 'Día 2',
    fecha: undefined,
    resumen: 'Estudio del Evangelio, clases, ensayo del programa musical, preparación del estandarte y baile de FSY.',
    vestimenta: 'Camiseta del personal de FSY',
    actividades: [
      'Estudio del Evangelio en compañías',
      'Clases y actividades formativas',
      'Ensayo del programa musical',
      'Preparación del estandarte de la compañía',
      'Baile de FSY',
    ],
    pdf: null,
  },
  {
    id: 'dia-3',
    label: 'Día 3',
    fecha: undefined,
    resumen: 'Estudio del Evangelio, clases, ensayo del programa musical, noche de juegos y noche de comida favorita.',
    vestimenta: 'Camiseta del personal de FSY',
    actividades: [
      'Estudio del Evangelio en compañías',
      'Clases y actividades formativas',
      'Ensayo del programa musical',
      'Noche de juegos',
      'Noche de la comida favorita',
    ],
    pdf: null,
  },
  {
    id: 'dia-4',
    label: 'Día 4',
    fecha: undefined,
    resumen: 'Devocionales separados de Jóvenes y Señoritas, espectáculo de variedades, programa musical vespertino y reunión de testimonios.',
    vestimenta: 'Ropa de domingo',
    actividades: [
      'Devocional separado de Jóvenes',
      'Devocional separado de Señoritas',
      'Espectáculo de variedades',
      'Programa musical vespertino',
      'Reunión de testimonios',
    ],
    pdf: null,
  },
  {
    id: 'dia-5',
    label: 'Día 5',
    fecha: undefined,
    resumen: 'Repaso del establecimiento de metas, actividad de la Guía Para la Fortaleza de la Juventud, presentación de fotos, baile y mensaje final "Llévatelo a casa".',
    vestimenta: 'Camiseta del personal de FSY',
    actividades: [
      'Repaso del establecimiento de metas',
      'Actividad de la Guía Para la Fortaleza de la Juventud',
      'Presentación de fotos del PFJ',
      'Baile final',
      'Mensaje final: "Llévatelo a casa"',
    ],
    pdf: null,
  },
];
