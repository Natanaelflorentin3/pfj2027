import { DiaCalendario } from '../types';

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
    pdf: null,
  },
  {
    id: 'dia-2',
    label: 'Día 2',
    fecha: undefined,
    resumen: 'Estudio del Evangelio, clases, ensayo del programa musical, preparación del estandarte y baile de FSY.',
    vestimenta: 'Camiseta del personal de FSY',
    pdf: null,
  },
  {
    id: 'dia-3',
    label: 'Día 3',
    fecha: undefined,
    resumen: 'Estudio del Evangelio, clases, ensayo del programa musical, noche de juegos y noche de comida favorita.',
    vestimenta: 'Camiseta del personal de FSY',
    pdf: null,
  },
  {
    id: 'dia-4',
    label: 'Día 4',
    fecha: undefined,
    resumen: 'Devocionales separados de Jóvenes y Señoritas, espectáculo de variedades, programa musical vespertino y reunión de testimonios.',
    vestimenta: 'Ropa de domingo',
    pdf: null,
  },
  {
    id: 'dia-5',
    label: 'Día 5',
    fecha: undefined,
    resumen: 'Repaso del establecimiento de metas, actividad de la Guía Para la Fortaleza de la Juventud, presentación de fotos, baile y mensaje final "Llévatelo a casa".',
    vestimenta: 'Camiseta del personal de FSY',
    pdf: null,
  },
];
