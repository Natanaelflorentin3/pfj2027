import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // No frenamos el server: las páginas que no usan la base (Objetivos,
  // Calendario, etc.) siguen andando igual. Solo falla /comentarios.
  console.warn(
    'DATABASE_URL no está definida. La sección de Comentarios no va a funcionar hasta que la configures (ver README).'
  );
}

export const pool = new Pool({
  connectionString,
  // Render (y la mayoría de los hosts de Postgres) piden SSL para
  // conexiones externas. rejectUnauthorized: false evita problemas con
  // el certificado autofirmado que usan estos proveedores.
  ssl: connectionString && !connectionString.includes('localhost') ? { rejectUnauthorized: false } : undefined,
});

/** Crea la tabla de comentarios si todavía no existe. Se llama al arrancar el server. */
export async function ensureSchema(): Promise<void> {
  if (!connectionString) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS comentarios (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}
