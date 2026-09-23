import { EspacioPredio, PredioInfo } from '../types';

export const predioInfo: PredioInfo = {
  nombre: 'Liceo Aeronáutico Militar (LAM) de Funes',
  direccion: 'Av. Fuerza Aérea 1901, S2132 Funes, Santa Fe',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Fuerza+A%C3%A9rea+1901,+S2132+Funes,+Santa+Fe',
  // Fuente: Wikipedia. Confirmar en la recorrida con los Mozzatti.
  superficie: '43 hectáreas',
};

/**
 * Espacios del predio y si nos sirven para las actividades del PFJ.
 * Vamos completando esto a medida que hagamos la recorrida con los Mozzatti.
 * "capacidad" es texto libre (no siempre hay un número exacto todavía).
 */
export const espaciosPredio: EspacioPredio[] = [
  {
    id: 'comedor',
    nombre: 'Comedor',
    icono: '🍽️',
    usoPrevisto: 'Actividades grupales grandes, comidas',
    capacidad: '~200 personas',
    estado: 'apto',
    notas:
      'Es el espacio más grande del predio. Ojo: entre los ~200 jóvenes y el personal (consejeros, coordinadores, matrimonios) somos ~250 en total, así que juntar a TODOS ahí a la vez queda muy justo.',
  },
  {
    id: 'gimnasio',
    nombre: 'Gimnasio cubierto',
    icono: '🏀',
    usoPrevisto: 'Actividades grupales / deportivas bajo techo',
    capacidad: 'Grande (sin cuantificar todavía)',
    estado: 'no-recomendado',
    notas: 'Tiene mucho eco. Complica cualquier actividad que dependa de audio: discursos, música, devocionales.',
  },
  {
    id: 'salones',
    nombre: 'Salones / aulas',
    icono: '🏫',
    usoPrevisto: 'Clases y actividades en compañías (grupos chicos)',
    capacidad: 'Grupos chicos/medianos (sin cuantificar)',
    estado: 'requiere-adaptacion',
    notas:
      'No tienen aire acondicionado. En enero, con ~40°C en Rosario, ni con ventiladores industriales es viable estar mucho tiempo ahí adentro — hay que pensar franjas horarias más frescas o ver si el predio tiene alguna sala con AC.',
  },
  {
    id: 'campo-deportes',
    nombre: 'Campo de deportes',
    icono: '⚽',
    usoPrevisto: 'Actividades al aire libre, juegos, recreación',
    capacidad: 'A confirmar',
    estado: 'a-confirmar',
    notas: 'Al aire libre — en enero con calor extremo conviene reservarlo para la mañana temprano o el atardecer.',
  },
  {
    id: 'anfiteatro',
    nombre: 'Anfiteatro',
    icono: '🎭',
    usoPrevisto: 'Programa musical, espectáculo de variedades',
    capacidad: 'A confirmar',
    estado: 'a-confirmar',
  },
  {
    id: 'biblioteca',
    nombre: 'Biblioteca',
    icono: '📚',
    usoPrevisto: 'Actividades chicas, tiempo tranquilo',
    capacidad: 'A confirmar',
    estado: 'a-confirmar',
  },
  {
    id: 'capilla',
    nombre: 'Capilla',
    icono: '🕊️',
    usoPrevisto: 'Devocionales, momentos de reflexión',
    capacidad: 'A confirmar',
    estado: 'a-confirmar',
  },
];
