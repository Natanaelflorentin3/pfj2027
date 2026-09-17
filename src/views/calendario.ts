import { DiaCalendario } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderDia(dia: DiaCalendario): string {
  const pdfBlock = dia.pdf
    ? `<a class="pdf-btn" href="${dia.pdf}" target="_blank" rel="noopener">📄 Ver actividades del día</a>`
    : `<span class="pdf-btn pdf-btn--pending">📄 PDF pendiente de subir</span>`;

  return `
    <div class="day-card">
      <div class="day-card-head">
        <span class="day-label">${escapeHtml(dia.label)}</span>
        <span class="day-date">${dia.fecha ? escapeHtml(dia.fecha) : 'Fecha a confirmar'}</span>
      </div>
      ${dia.resumen ? `<p class="day-summary">${escapeHtml(dia.resumen)}</p>` : ''}
      ${pdfBlock}
    </div>`;
}

export function renderCalendario(dias: DiaCalendario[]): string {
  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Calendario semanal</p>
      <h1>Los 5 días del PFJ</h1>
      <p class="subtitle">Un vistazo rápido a cada día, con el PDF de actividades correspondiente debajo.</p>
    </div>
  </header>

  <main class="wrap">
    <section>
      <div class="calendar-grid">
        ${dias.map(renderDia).join('')}
      </div>
      <p class="section-sub" style="margin-top:18px;">Para agregar o actualizar un día tenemos que editar!<code>src/data/calendario.ts</code>. Los PDFs van en.. <code>public/files/</code>.</p>
    </section>
  </main>`;
}
