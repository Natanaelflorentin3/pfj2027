import { Consejero } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ESTADO_LABEL: Record<string, string> = {
  confirmado: 'Confirmado',
  'a-confirmar': 'A confirmar',
};

function renderFila(c: Consejero): string {
  return `
    <tr>
      <td>${escapeHtml(c.apellido)}, ${escapeHtml(c.nombre)}</td>
      <td>${escapeHtml(c.genero)}</td>
      <td>${escapeHtml(c.barrio)}</td>
      <td><span class="status status--${c.estado === 'confirmado' ? 'done' : 'pending'}">${ESTADO_LABEL[c.estado]}</span></td>
    </tr>`;
}

export function renderConsejeros(consejeros: Consejero[]): string {
  const confirmados = consejeros.filter((c) => c.estado === 'confirmado').length;
  const aConfirmar = consejeros.length - confirmados;

  const tabla = consejeros.length
    ? `
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Consejero</th>
              <th>Género</th>
               <th>Barrio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${consejeros.map(renderFila).join('')}
          </tbody>
        </table>
      </div>`
    : `<p class="empty-state">Todavía no confirmamos consejeros. los agregamos en <code>src/data/consejeros.ts</code>.</p>`;

  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Consejeros</p>
      <h1>Consejeros que asisten</h1>
      <p class="subtitle">Jóvenes adultos de 19 a 30 años ?.</p>
    </div>
  </header>

  <main class="wrap">
    <section class="stats-row" aria-label="Resumen de consejeros" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-tile stat-tile--total"><span class="stat-value">${consejeros.length}</span><span class="stat-label">Total</span></div>
      <div class="stat-tile stat-tile--done"><span class="stat-value">${confirmados}</span><span class="stat-label">Confirmados</span></div>
      <div class="stat-tile stat-tile--pending"><span class="stat-value">${aConfirmar}</span><span class="stat-label">A confirmar</span></div>
    </section>

    <section style="margin-top:32px;">
      ${tabla}
    </section>
  </main>`;
}
