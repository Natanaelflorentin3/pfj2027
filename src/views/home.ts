import { Area, EventInfo, Hito, NotaDireccion, Objective, Vencimiento } from '../types';
import { computeOverallStats, computeStats } from '../stats';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Fecha de inicio real del PFJ 2027 (lunes 4 de enero), para la cuenta regresiva del hero. */
const INICIO_PFJ = new Date('2027-01-04T00:00:00-03:00').getTime();

function diasHastaElEvento(): number {
  return Math.max(0, Math.ceil((INICIO_PFJ - Date.now()) / (1000 * 60 * 60 * 24)));
}

function formatFecha(fecha: Date): string {
  return new Date(fecha).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Responsables únicos de un área, a partir de sus objetivos (sin inventar coordinadores). */
function responsablesDeArea(area: Area): string {
  const nombres = Array.from(new Set(area.objectives.map((o) => o.responsible).filter((n): n is string => Boolean(n))));
  return nombres.length ? nombres.join(' y ') : 'Equipo a definir';
}

const TASK_ICON: Record<Objective['status'], string> = { pending: '○', progress: '↻', done: '✓' };
const TASK_LABEL: Record<Objective['status'], string> = { pending: 'Pendiente', progress: 'En curso', done: 'Hecho' };

function renderTask(o: Objective): string {
  return `
    <li class="task-item task-item--${o.status}">
      <div class="task-item-label">
        <span class="task-check">${TASK_ICON[o.status]}</span>
        <span class="task-name">${escapeHtml(o.name)}</span>
      </div>
      <span class="status status--${o.status}">${TASK_LABEL[o.status]}</span>
    </li>`;
}

function renderAreaCard(area: Area): string {
  const stats = computeStats(area.objectives);
  const estadoArea = stats.total === 0 || stats.pct === 100 ? 'done' : stats.progress > 0 ? 'progress' : 'pending';
  const tareas = area.objectives.length
    ? `<ul class="task-list">${area.objectives.map(renderTask).join('')}</ul>`
    : `<p class="area-no-tasks">Todavía no hay tareas cargadas para esta área.</p>`;

  const searchText = [area.name, ...area.objectives.map((o) => o.name)].join(' ').toLowerCase();

  return `
    <article class="area-card" data-color="${area.color || 'navy'}" data-state="${estadoArea}" data-search="${escapeHtml(searchText)}">
      <div class="area-card-head">
        <div class="area-card-id">
          <div class="area-icon">${area.icon}</div>
          <div>
            <h3>${escapeHtml(area.name)}</h3>
            <p class="area-coordinador">${escapeHtml(responsablesDeArea(area))}</p>
          </div>
        </div>
        <span class="area-pct">${stats.pct}%</span>
      </div>
      <div>
        <div class="area-progress-track"><div class="area-progress-fill" style="width:${stats.pct}%"></div></div>
        <div class="area-progress-caption">
          <span>${stats.done} de ${stats.total} tarea${stats.total === 1 ? '' : 's'} completada${stats.done === 1 ? '' : 's'}</span>
          <span>${stats.pending} pendiente${stats.pending === 1 ? '' : 's'}</span>
        </div>
      </div>
      ${tareas}
    </article>`;
}

function renderHito(h: Hito): string {
  const iconMap: Record<Hito['estado'], string> = { listo: '✓', 'en-curso': '↻', pendiente: '•' };
  const labelMap: Record<Hito['estado'], string> = { listo: 'Listo', 'en-curso': 'En curso', pendiente: 'Pendiente' };
  return `
    <div class="hito-card hito-card--${h.estado}">
      <span class="hito-icon">${iconMap[h.estado]}</span>
      <div>
        <p class="hito-label">${labelMap[h.estado]}</p>
        <p class="hito-titulo">${escapeHtml(h.titulo)}</p>
        ${h.detalle ? `<p class="hito-detalle">${escapeHtml(h.detalle)}</p>` : ''}
      </div>
    </div>`;
}

function renderVencimiento(v: Vencimiento): string {
  return `
    <div class="vencimiento-item">
      <div>
        <p class="vencimiento-titulo">${escapeHtml(v.titulo)}</p>
        <p class="vencimiento-meta">Área de ${escapeHtml(v.area)}${v.responsable ? ` · ${escapeHtml(v.responsable)}` : ''}</p>
      </div>
      <span class="vencimiento-vence">${escapeHtml(v.vence)}</span>
    </div>`;
}

function renderNota(n: NotaDireccion): string {
  return `
    <div class="nota-card">
      <p class="nota-mensaje">"${escapeHtml(n.mensaje)}"</p>
      <div class="nota-meta">
        <span>Publicado por ${escapeHtml(n.autor)}</span>
        <span>${escapeHtml(formatFecha(n.creadoEn))}</span>
      </div>
    </div>`;
}

export interface HomeModel {
  eventInfo: EventInfo;
  areas: Area[];
  hitos: Hito[];
  vencimientos: Vencimiento[];
  notas: NotaDireccion[];
  dbDisponible: boolean;
  lastUpdated: string;
}

export function renderHome(model: HomeModel): string {
  const { eventInfo, areas, hitos, vencimientos, notas, dbDisponible, lastUpdated } = model;
  const overall = computeOverallStats(areas);
  const dias = diasHastaElEvento();

  const areasGrid = areas.length
    ? `<div class="areas-grid" id="areas-grid">${areas.map(renderAreaCard).join('')}</div>`
    : `<p class="empty-state">Todavía no hay áreas cargadas.</p>`;

  const hitosRow = hitos.length ? `<div class="hitos-row">${hitos.map(renderHito).join('')}</div>` : '';

  const vencimientosBody = vencimientos.length
    ? vencimientos.map(renderVencimiento).join('')
    : `<p class="empty-state">No hay vencimientos cargados por ahora.</p>`;

  const notasBody = !dbDisponible
    ? `<p class="empty-state" style="margin-top:0;">Conectá la base de datos para poder guardar notas (ver <code>DATABASE_URL</code> en el README).</p>`
    : notas.length
      ? notas.map(renderNota).join('')
      : `<p class="empty-state" style="margin-top:0;">Todavía no hay notas.</p>`;

  const notasForm = dbDisponible
    ? `
      <form class="nota-form" method="POST" action="/notas">
        <div class="nota-form-row">
          <input type="text" name="autor" maxlength="60" placeholder="Tu nombre" required />
          <input type="text" name="mensaje" maxlength="500" placeholder="Escribí una nota rápida aquí..." required />
        </div>
        <button type="submit">Publicar</button>
      </form>`
    : '';

  return `
  <section class="wrap" style="padding-top:20px;">
    <div class="dash-hero">
      <div class="dash-hero-glow" aria-hidden="true"></div>
      <div class="dash-hero-inner">
        <div class="dash-hero-main">
          <span class="dash-eyebrow-row"><span class="dot-ping"></span> ${escapeHtml(eventInfo.title)} · Cuenta regresiva: ${dias} día${dias === 1 ? '' : 's'}</span>
          <h1>Panel de Coordinación Logística</h1>
          <p class="dash-hero-welcome">Matrimonio director de Logística · para uso del matrimonio director general, y co-directores.</p>
          <div class="dash-scripture">
            <p class="quote">«${escapeHtml(eventInfo.motto)}» <span class="verse-ref">— ${escapeHtml(eventInfo.verse)}</span></p>
          </div>
          <div class="chips">
            <span class="chip">📍 <b>${escapeHtml(eventInfo.location)}</b>${eventInfo.locationConfirmed ? '' : ' — sede a confirmar'}</span>
            <span class="chip">🗓️ <b>${escapeHtml(eventInfo.date)}</b></span>
            <span class="chip">👥 <b>~${escapeHtml(eventInfo.youthCount)}</b> jóvenes de 14–18</span>
            <span class="chip">👥 <b>~${escapeHtml(eventInfo.totalCount)}</b> total de participantes</span>
          </div>
        </div>
        <svg class="dash-hero-art" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="160" cy="115" fill="var(--color-gold)" r="42" opacity="0.92"></circle>
          <path d="M160 38V52M160 178V192M83 115H97M223 115H237M106 61L116 71M204 159L214 169M106 169L116 159M204 61L214 71" opacity="0.5" stroke="var(--color-gold-soft)" stroke-linecap="round" stroke-width="2.5"></path>
          <path d="M40 240L125 118C128 114 133 114 136 118L195 200L220 162C223 158 228 158 231 162L285 240H40Z" fill="var(--color-blue)" opacity="0.5"></path>
          <path d="M20 245L105 142C108 138 113 138 116 142L165 202L205 148C208 144 213 144 216 148L295 245H20Z" fill="var(--color-sky)" opacity="0.4"></path>
          <line opacity="0.4" stroke="var(--color-sky)" stroke-width="2" x1="20" x2="300" y1="245" y2="245"></line>
        </svg>
      </div>
    </div>

    <section class="stats-row" aria-label="Resumen general de objetivos" style="margin-top:20px;">
      <div class="stat-tile stat-tile--total stat-tile--iconed">
        <div class="stat-tile-top"><span class="stat-label">Objetivos totales</span><span class="stat-icon">🚩</span></div>
        <span class="stat-value">${overall.total}</span>
        <p class="stat-tile-caption">Metas operativas registradas</p>
      </div>
      <div class="stat-tile stat-tile--pending stat-tile--iconed">
        <div class="stat-tile-top"><span class="stat-label">Pendientes</span><span class="stat-icon">⏳</span></div>
        <span class="stat-value">${overall.pending}</span>
        <p class="stat-tile-caption">Todavía no iniciadas</p>
      </div>
      <div class="stat-tile stat-tile--progress stat-tile--iconed">
        <div class="stat-tile-top"><span class="stat-label">En curso</span><span class="stat-icon">🔄</span></div>
        <span class="stat-value">${overall.progress}</span>
        <p class="stat-tile-caption">En ejecución ahora</p>
      </div>
      <div class="stat-tile stat-tile--done stat-tile--iconed">
        <div class="stat-tile-top"><span class="stat-label">Hechos</span><span class="stat-icon">✅</span></div>
        <span class="stat-value">${overall.done}</span>
        <p class="stat-tile-caption">Concluidas</p>
      </div>
    </section>

    <div class="global-progress-card">
      <div class="global-progress-head">
        <div>
          <h2><span class="dot-gold"></span> Avance Logístico Global del Evento</h2>
          <p>Índice de preparación integral para la recepción de compañías y consejeros.</p>
        </div>
      </div>
      <div class="global-progress-meta">
        <span class="label-strong">${overall.pct}% completado</span>
        <span class="label-muted">Meta final: 100% (4 de enero de 2027)</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${overall.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso general">
        <div class="progress-fill" style="width:${overall.pct}%"></div>
      </div>
      ${hitosRow}
    </div>

    <div class="areas-controls">
      <div class="filter-tabs" id="area-filter-tabs">
        <button type="button" class="filter-tab is-active" data-filter="all">Todas las áreas (${areas.length})</button>
        <button type="button" class="filter-tab" data-filter="progress">En curso</button>
        <button type="button" class="filter-tab" data-filter="pending">Sin empezar</button>
      </div>
      <div class="search-bar" style="margin-top:0;">
        <input type="search" class="search-input" id="area-search-input" placeholder="Buscar tarea o área..." aria-label="Buscar tarea o área" />
      </div>
    </div>

    ${areasGrid}
    <p class="empty-state" id="areas-empty-state" style="display:none;">No encontramos tareas o áreas con ese criterio.</p>

    <div class="dash-bottom-grid">
      <div class="panel-card">
        <div class="panel-head">
          <div class="panel-head-id">
            <span class="panel-icon">⏰</span>
            <div>
              <h3>Próximos Vencimientos Críticos</h3>
              <p>Entregables y contratos a formalizar</p>
            </div>
          </div>
          ${vencimientos.length ? `<span class="panel-badge">${vencimientos.length} alerta${vencimientos.length === 1 ? '' : 's'}</span>` : ''}
        </div>
        ${vencimientosBody}
      </div>

      <div class="panel-card">
        <div class="panel-head">
          <div class="panel-head-id">
            <span class="notas-monogram">N&amp;J</span>
            <h3>Notas de Dirección</h3>
          </div>
          <span class="panel-badge">Uso interno</span>
        </div>
        ${notasBody}
        ${notasForm}
      </div>
    </div>

    <footer class="page-footer">
      <span>Última actualización: ${escapeHtml(lastUpdated)}</span>
    </footer>
  </section>`;
}
