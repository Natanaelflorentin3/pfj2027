import { AgendaItem, DiaCalendario } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAgendaTable(agenda: AgendaItem[]): string {
  const filas = agenda
    .map(
      (item) => `
        <tr>
          <td>
            <span class="agenda-time">${escapeHtml(item.hora)}</span>
            <span class="agenda-desc">${escapeHtml(item.descripcion)}</span>
          </td>
          <td>${escapeHtml(item.consejeros)}</td>
          <td>${escapeHtml(item.coordinadoresAuxiliares)}</td>
          <td>${escapeHtml(item.coordinadores)}</td>
          <td>${escapeHtml(item.matrimonioDirector)}</td>
        </tr>`
    )
    .join('');

  return `
    <div class="table-wrap agenda-table-wrap">
      <table class="table table--agenda">
        <thead>
          <tr>
            <th>Hora, descripción de la reunión</th>
            <th>Consejeros</th>
            <th>Coordinadores auxiliares</th>
            <th>Coordinadores</th>
            <th>Matrimonio director de sesión</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>`;
}

function renderDia(dia: DiaCalendario): string {
  const pdfBlock = dia.pdf
    ? `<a class="pdf-btn" href="${dia.pdf}" target="_blank" rel="noopener">📄 Ver actividades del día</a>`
    : `<span class="pdf-btn pdf-btn--pending">📄 PDF pendiente de subir</span>`;

  const detalleBlock = dia.agenda && dia.agenda.length
    ? `
      <details class="day-details">
        <summary class="day-details-toggle">Ver agenda completa del día</summary>
        ${renderAgendaTable(dia.agenda)}
      </details>`
    : dia.actividades && dia.actividades.length
    ? `
      <details class="day-details">
        <summary class="day-details-toggle">Ver todas las actividades</summary>
        <ul class="day-activities">
          ${dia.actividades.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
        </ul>
      </details>`
    : '';

  return `
    <div class="day-card">
      <div class="day-card-head">
        <span class="day-label">${escapeHtml(dia.label)}</span>
        <span class="day-date">${dia.fecha ? escapeHtml(dia.fecha) : 'Fecha a confirmar'}</span>
      </div>
      ${dia.resumen ? `<p class="day-summary">${escapeHtml(dia.resumen)}</p>` : ''}
      ${dia.vestimenta ? `<span class="day-tag">👕 ${escapeHtml(dia.vestimenta)}</span>` : ''}
      ${detalleBlock}
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
