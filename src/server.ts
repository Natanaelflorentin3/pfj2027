import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { areas, eventInfo } from './data/objectives';
import { diasCalendario } from './data/calendario';
import { consejeros } from './data/consejeros';
import { pdfsImportantes } from './data/pdfs';
import { predioInfo, espaciosPredio } from './data/predio';
import { ensureSchema } from './db';
import { crearComentario, listarComentarios } from './repositories/comentarios';
import { renderLayout } from './views/layout';
import { renderHome } from './views/home';
import { renderCalendario } from './views/calendario';
import { renderConsejeros } from './views/consejeros';
import { renderPdfs } from './views/pdfs';
import { renderPredio } from './views/predio';
import { renderComentarios } from './views/comentarios';
import { participantes } from './data/participantes';
import { renderParticipantes } from './views/participantes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DB_DISPONIBLE = Boolean(process.env.DATABASE_URL);

/**
 * "Última actualización" se calcula sola: toma la fecha en que se generó
 * el build (dist/data/objectives.js), que cambia cada vez que hacés un
 * deploy con cambios. Así no hay que editar una fecha a mano nunca más.
 */
function getLastUpdated(): string {
  try {
    const stats = fs.statSync(path.join(__dirname, 'data', 'objectives.js'));
    return stats.mtime.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return 'fecha desconocida';
  }
}

const lastUpdated = getLastUpdated();

// Archivos estáticos (CSS, JS del cliente, PDFs)
app.use(express.static(path.join(__dirname, '../public')));
// Para poder leer los campos del formulario de comentarios
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  const html = renderLayout({
    active: 'objetivos',
    pageTitle: 'Objetivos de Logística',
    pageDescription: 'Seguimiento de objetivos del área de Logística del PFJ 2027.',
    eventInfo,
    bodyHtml: renderHome({
      eventInfo,
      areas,
      lastUpdated,
    }),
  });
  res.send(html);
});

app.get('/calendario', (_req, res) => {
  const html = renderLayout({
    active: 'calendario',
    pageTitle: 'Calendario semanal',
    pageDescription: 'Los 5 días del PFJ 2027 con sus actividades.',
    eventInfo,
    bodyHtml: renderCalendario(diasCalendario),
  });
  res.send(html);
});

app.get('/consejeros', (_req, res) => {
  const html = renderLayout({
    active: 'consejeros',
    pageTitle: 'Consejeros',
    pageDescription: 'Consejeros que asisten al PFJ 2027, con su estado de confirmación.',
    eventInfo,
    bodyHtml: renderConsejeros(consejeros),
  });
  res.send(html);
});

app.get('/participantes', (_req, res) => {
  const html = renderLayout({
    active: 'participantes',
    pageTitle: 'Participantes',
    pageDescription: 'Jóvenes participantes del PFJ 2027, con su estado de aprobación.',
    eventInfo,
    bodyHtml: renderParticipantes(participantes),
  });
  res.send(html);
});

app.get('/pdfs', (_req, res) => {
  const html = renderLayout({
    active: 'pdfs',
    pageTitle: 'PDFs importantes',
    pageDescription: 'Reglamentos, autorizaciones y demás documentos del PFJ 2027.',
    eventInfo,
    bodyHtml: renderPdfs(pdfsImportantes),
  });
  res.send(html);
});

app.get('/predio', (_req, res) => {
  const html = renderLayout({
    active: 'predio',
    pageTitle: 'Predio',
    pageDescription: 'El predio donde se hace el PFJ 2027 y la capacidad de sus espacios.',
    eventInfo,
    bodyHtml: renderPredio({ predio: predioInfo, espacios: espaciosPredio }),
  });
  res.send(html);
});

app.get('/comentarios', async (_req, res) => {
  let comentarios: Awaited<ReturnType<typeof listarComentarios>> = [];
  let error: string | undefined;

  if (DB_DISPONIBLE) {
    try {
      comentarios = await listarComentarios();
    } catch (err) {
      console.error('Error al leer comentarios:', err);
      error = 'No se pudieron cargar los comentarios. Probá de nuevo en un rato.';
    }
  }

  const html = renderLayout({
    active: 'comentarios',
    pageTitle: 'Comentarios',
    pageDescription: 'Comentarios del equipo sobre la organización del PFJ 2027.',
    eventInfo,
    bodyHtml: renderComentarios({ comentarios, error, dbDisponible: DB_DISPONIBLE }),
  });
  res.send(html);
});

app.post('/comentarios', async (req, res) => {
  const nombre = String(req.body?.nombre || '').trim();
  const mensaje = String(req.body?.mensaje || '').trim();

  if (!DB_DISPONIBLE) {
    return res.redirect('/comentarios');
  }

  if (!nombre || !mensaje) {
    const comentarios = await listarComentarios().catch(() => []);
    const html = renderLayout({
      active: 'comentarios',
      pageTitle: 'Comentarios',
      pageDescription: 'Comentarios del equipo sobre la organización del PFJ 2027.',
      eventInfo,
      bodyHtml: renderComentarios({
        comentarios,
        error: 'Completá tu nombre y el comentario antes de publicar.',
        dbDisponible: DB_DISPONIBLE,
      }),
    });
    return res.status(400).send(html);
  }

  try {
    await crearComentario(nombre.slice(0, 60), mensaje.slice(0, 500));
  } catch (err) {
    console.error('Error al guardar comentario:', err);
  }

  // Patrón Post/Redirect/Get: evita que al recargar la página se reenvíe el formulario.
  res.redirect('/comentarios');
});

ensureSchema()
  .catch((err) => console.error('No se pudo preparar la tabla de comentarios:', err))
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Servidor de Logística PFJ 2027 corriendo en http://localhost:${PORT}`);
    });
  });
