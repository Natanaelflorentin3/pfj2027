import { Participante } from '../types';

/*
  id: string;
  nombre: string;
  apellido: string;
  genero: 'Masculino' | 'Femenino';
  estado: EstadoParticipante;
  barrio: string;
  telefonoEmergencia: string;
  fichaMedica: string;

*/

export const participantes: Participante[] = [
  { id: '1', nombre: 'Lionel', apellido: 'Messi', genero: 'Masculino', estado: 'pendiente', barrio: 'San Martín', telefonoEmergencia: '123456789', fichaMedica: 'Ninguna' },
  { id: '2', nombre: 'Mariana', apellido: 'Volkotski', genero: 'Femenino', estado: 'pendiente', barrio: 'Saladillo', telefonoEmergencia: '987654321', fichaMedica: 'Alergia a la penicilina y diabética' },
];