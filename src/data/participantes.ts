import { Participante } from '../types';

export const participantes: Participante[] = [];
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

export const consejeros: Participante[] = [
  { id: '1', nombre: 'lionel', apellido: 'Messi', genero: 'Masculino', estado: 'pendiente', barrio: 'San martin',telefonoEmergencia: '123456789', fichaMedica: 'Ninguna' },
  { id: '2', nombre: 'Maríana', apellido: 'Volkotski', genero: 'Femenino', estado: 'pendiente' , barrio: 'Saladillo',telefonoEmergencia: '987654321', fichaMedica: 'Alergia a la penicilina y  Diabetico' },
];