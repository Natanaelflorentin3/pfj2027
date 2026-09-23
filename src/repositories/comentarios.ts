import { pool } from '../db';
import { Comentario } from '../types';

interface ComentarioRow {
  id: number;
  nombre: string;
  mensaje: string;
  creado_en: Date;
}

export async function listarComentarios(): Promise<Comentario[]> {
  const { rows } = await pool.query<ComentarioRow>(
    'SELECT id, nombre, mensaje, creado_en FROM comentarios ORDER BY creado_en DESC'
  );
  return rows.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    mensaje: r.mensaje,
    creadoEn: r.creado_en,
  }));
}

export async function crearComentario(nombre: string, mensaje: string): Promise<void> {
  await pool.query('INSERT INTO comentarios (nombre, mensaje) VALUES ($1, $2)', [nombre, mensaje]);
}
