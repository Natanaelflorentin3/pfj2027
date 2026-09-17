import { Participante } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ESTADO_LABEL: Record<string, string> = {
  aprobado: 'Aprobado',
  pendiente: 'Pendiente',
};

function renderFila(p: Participante): string {
  return `
    <tr>
      <td>${escapeHtml(p.apellido)}, ${escapeHtml(p.nombre)}</td>
      <td>${escapeHtml(p.genero)}</td>
      <td>${escapeHtml(p.barrio)}</td>
      <td>${escapeHtml(p.telefonoEmergencia)}</td>
      <td>${escapeHtml(p.fichaMedica)}</td>
      <td><span class="status status--${p.estado === 'aprobado' ? 'done' : 'pending'}">${ESTADO_LABEL[p.estado]}</span></td>
    </tr>`;
}

export function renderParticipantes(participantes: Participante[]): string {
  const aprobados = participantes.filter((p) => p.estado === 'aprobado').length;
  const pendientes = participantes.length - aprobados;

  const tabla = participantes.length
    ? `
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Participante</th>
              <th>Género</th>
              <th>Barrio</th>
              <th>Tel. emergencia</th>
              <th>Ficha médica</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${participantes.map(renderFila).join('')}
          </tbody>
        </table>
      </div>`
    : `<p class="empty-state">Todavía no cargaste participantes. Agregalos en <code>src/data/participantes.ts</code>.</p>`;

  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Participantes</p>
      <h1>Jóvenes participantes</h1>
      <p class="subtitle">Jóvenes de 14 a 18 años inscriptos al PFJ, con su estado de aprobación.</p>
    </div>
  </header>

  <main class="wrap">
    <section class="stats-row" aria-label="Resumen de participantes" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-tile stat-tile--total"><span class="stat-value">${participantes.length}</span><span class="stat-label">Total</span></div>
      <div class="stat-tile stat-tile--done"><span class="stat-value">${aprobados}</span><span class="stat-label">Aprobados</span></div>
      <div class="stat-tile stat-tile--pending"><span class="stat-value">${pendientes}</span><span class="stat-label">Pendientes</span></div>
    </section>

    <section style="margin-top:32px;">
      ${tabla}
    </section>
  </main>`;
}