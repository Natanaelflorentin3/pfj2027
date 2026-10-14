import { Hito } from '../types';

/**
 * Hitos grandes del cronograma de preparación del PFJ 2027 (no tareas puntuales,
 * esas están en objectives.ts). Agregá más a medida que se vayan definiendo
 * fechas concretas (llegada de kits, montaje técnico, etc.) y actualizá el
 * "estado" cuando corresponda.
 */
export const hitos: Hito[] = [
  {
    id: 'sede',
    titulo: 'Sede confirmada',
    estado: 'listo',
    detalle: 'Liceo Aeronáutico Militar (LAM) de Funes',
  },
  {
    id: 'inscripciones',
    titulo: 'Inscripciones abiertas',
    estado: 'en-curso',
    detalle: 'Abiertas desde el 27 de septiembre (jóvenes y JAS)',
  },
];
