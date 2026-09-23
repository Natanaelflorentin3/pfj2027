import { Consejero } from '../types';

/**
 * Lista de consejeros que van a asistir. Agregá uno por línea así:
 *
 * { id: 'nombre-apellido', nombre: 'Juan', apellido: 'Pérez', genero: 'Masculino', estado: 'confirmado', barrio: 'San Martín', estaca: 'Rosario' },
 *
 * estado puede ser 'confirmado' o 'a-confirmar'.
 * estaca y rol son opcionales: rol solo lo tienen los consejeros con una función especial,
 * como "Consejero/a coordinador/a de sesión".
 */
export const consejeros: Consejero[] = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', genero: 'Masculino', estado: 'confirmado', barrio: 'San martin' },
  { id: '2', nombre: 'María', apellido: 'Gómez', genero: 'Femenino', estado: 'a-confirmar' , barrio: 'Saladillo'},
  {
    id: 'agustina-altamirano',
    nombre: 'Agustina',
    apellido: 'Altamirano',
    genero: 'Femenino',
    estado: 'confirmado',
    barrio: 'Villa Constitución',
    estaca: 'San Nicolás',
    rol: 'Consejera coordinadora de sesión',
  },


{
    id: 'Mateo-Hansen',
    nombre: 'Mateo',
    apellido: 'Hansen',
    genero: 'Masculino',
    estado: 'confirmado',
    barrio: 'Independencia',
    estaca: 'Rosario',
    rol: 'Consejero coordinador de sesión',
  }
];