import express from 'express';
import path from 'path';
import { areas, eventInfo } from './data/objectives';
import { diasCalendario } from './data/calendario';
import { consejeros } from './data/consejeros';
import { pdfsImportantes } from './data/pdfs';
import { renderLayout } from './views/layout';
import { renderHome } from './views/home';
import { renderCalendario } from './views/calendario';
import { renderConsejeros } from './views/consejeros';
import { renderPdfs } from './views/pdfs';
import { participantes } from './data/participantes';
import { renderParticipantes } from './views/participantes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Archivos estáticos (CSS, JS del cliente, PDFs)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  const html = renderLayout({
    active: 'objetivos',
    pageTitle: 'Objetivos de Logística',
    pageDescription: 'Seguimiento de objetivos del área de Logística del PFJ 2027.',
    eventInfo,
    bodyHtml: renderHome({
      eventInfo,
      areas,
      // Actualizá esta fecha a mano cada vez que cambien los datos.
      lastUpdated: '18 de septiembre de 2026',
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

app.listen(PORT, () => {
  console.log(`Servidor de Logística PFJ 2027 corriendo en http://localhost:${PORT}`);
});
