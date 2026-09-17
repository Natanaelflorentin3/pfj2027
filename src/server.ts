import express from 'express';
import path from 'path';
import { areas, eventInfo } from './data/objectives';
import { renderPage } from './views/template';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Archivos estáticos (CSS, JS del cliente)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) => {
  const html = renderPage({
    eventInfo,
    areas,
    // Actualizá esta fecha a mano cada vez que cambien los datos,
    // o reemplazala por new Date().toLocaleDateString('es-AR', {...}) si preferís que sea automática.
    lastUpdated: '17 de septiembre de 2026',
  });
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Servidor de Logística PFJ 2027 corriendo en http://localhost:${PORT}`);
});
