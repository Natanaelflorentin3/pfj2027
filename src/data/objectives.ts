import { Area, EventInfo } from '../types';

/**
 * Toda la información de este archivo es la que se muestra en la web.
 * Para actualizar el estado de un objetivo, cambiá su "status" a
 * 'pending' | 'progress' | 'done', y completá responsible / dueDate
 * cuando ya estén definidos.
 */

export const eventInfo: EventInfo = {
  title: 'PFJ 2027',
  motto: 'Regocíjate en Cristo',
  verse: 'Filipenses 4:4',
  location: 'Rosario, Argentina',
  locationConfirmed: false,
  date: 'Enero 2027',
  youthCount: 200,
  totalCount: 250,
};

export const areas: Area[] = [
  {
    id: 'transporte',
    name: 'Colectivos / Transporte',
    icon: '🚌',
    objectives: [
      { id: 'transporte-1', name: 'Definir cantidad de unidades y proveedor', status: 'pending' },
      { id: 'transporte-2', name: 'Coordinar rutas y horarios de traslado', status: 'pending' },
    ],
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    icon: '🛡️',
    objectives: [
      { id: 'seguridad-1', name: 'Armar plan de seguridad y control de acceso al predio', status: 'pending' },
    ],
  },
  {
    id: 'primeros-auxilios',
    name: 'Primeros auxilios',
    icon: '⛑️',
    objectives: [
      { id: 'pa-1', name: 'Definir posta médica, insumos y cobertura', status: 'pending' },
    ],
  },
  {
    id: 'camisetas',
    name: 'Camisetas',
    icon: '👕',
    objectives: [
      { id: 'camisetas-1', name: 'Definir diseño, talles y cantidades', status: 'pending' },
      { id: 'camisetas-2', name: 'Cotizar proveedor y confirmar presupuesto', status: 'pending' },
    ],
  },
  {
    id: 'kits',
    name: 'Kits',
    icon: '🎒',
    objectives: [
      { id: 'kits-1', name: 'Definir contenido del kit y armar cantidades por compañía', status: 'pending' },
    ],
  },
];
