import { pool } from '../db';
import { NotaDireccion } from '../types';

interface NotaRow {
  id: number;
  autor: string;
  mensaje: string;
  creado_en: Date;
}

/** Trae las últimas notas de dirección, más reciente primero. */
export async function listarNotas(limite = 5): Promise<NotaDireccion[]> {
  const { rows } = await pool.query<NotaRow>(
    'SELECT id, autor, mensaje, creado_en FROM notas_direccion ORDER BY creado_en DESC LIMIT $1',
    [limite]
  );
  return rows.map((r) => ({
    id: r.id,
    autor: r.autor,
    mensaje: r.mensaje,
    creadoEn: r.creado_en,
  }));
}

export async function crearNota(autor: string, mensaje: string): Promise<void> {
  await pool.query('INSERT INTO notas_direccion (autor, mensaje) VALUES ($1, $2)', [autor, mensaje]);
}
