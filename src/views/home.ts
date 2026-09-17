import { Area, EventInfo, Objective, Status } from '../types';
import { computeOverallStats, computeStats } from '../stats';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STATUS_LABEL: Record<Status, string> = {
  pending: 'Pendiente',
  progress: 'En curso',
  done: 'Hecho',
};

function renderObjective(o: Objective): string {
  return `
    <li class="obj">
      <div class="obj-top">
        <span class="obj-name">${escapeHtml(o.name)}</span>
        <span class="status status--${o.status}">${STATUS_LABEL[o.status]}</span>
      </div>
      <div class="obj-meta">
        <span>👤 Responsable: ${escapeHtml(o.responsible || 'a definir')}</span>
        <span>📅 Fecha límite: ${escapeHtml(o.dueDate || 'a definir')}</span>
      </div>
    </li>`;
}

function renderArea(area: Area): string {
  const stats = computeStats(area.objectives);
  return `
    <div class="card">
      <div class="card-head">
        <span class="card-icon">${area.icon}</span>
        <h3>${escapeHtml(area.name)}</h3>
        <span class="card-count">${stats.total} objetivo${stats.total === 1 ? '' : 's'}</span>
      </div>
      <ul class="obj-list">
        ${area.objectives.map(renderObjective).join('')}
      </ul>
    </div>`;
}

function renderStatTile(label: string, value: number, modifier: string): string {
  return `
    <div class="stat-tile stat-tile--${modifier}">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${escapeHtml(label)}</span>
    </div>`;
}

export interface HomeModel {
  eventInfo: EventInfo;
  areas: Area[];
  lastUpdated: string;
}

export function renderHome(model: HomeModel): string {
  const { eventInfo, areas, lastUpdated } = model;
  const overall = computeOverallStats(areas);

  return `
  <header class="hero">
    <div class="hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 320" preserveAspectRatio="none" class="hero-art">
        <circle cx="600" cy="150" r="70" class="hero-sun" />
        <g class="hero-rays">
          <line x1="600" y1="30" x2="600" y2="60" />
          <line x1="600" y1="240" x2="600" y2="270" />
          <line x1="480" y1="150" x2="450" y2="150" />
          <line x1="750" y1="150" x2="720" y2="150" />
          <line x1="515" y1="65" x2="495" y2="45" />
          <line x1="685" y1="65" x2="705" y2="45" />
          <line x1="515" y1="235" x2="495" y2="255" />
          <line x1="685" y1="235" x2="705" y2="255" />
        </g>
        <path d="M0,260 L220,140 L360,220 L520,110 L680,230 L860,120 L1040,210 L1200,150 L1200,320 L0,320 Z" class="hero-mountain hero-mountain--back" />
        <path d="M0,300 L180,210 L340,270 L540,180 L740,280 L940,190 L1200,260 L1200,320 L0,320 Z" class="hero-mountain hero-mountain--front" />
      </svg>
    </div>

    <div class="wrap hero-content">
      <p class="motto-badge">✦ ${escapeHtml(eventInfo.motto)} · ${escapeHtml(eventInfo.verse)} ✦</p>
      <p class="eyebrow">Logística · ${escapeHtml(eventInfo.title)}</p>
      <h1>Seguimiento de objetivos — Logística</h1>
      <p class="subtitle">Matrimonio director de Logística · para uso del matrimonio director general, y co-directores  </p>

      <div class="chips">
        <span class="chip">📍 <b>${escapeHtml(eventInfo.location)}</b>${eventInfo.locationConfirmed ? '' : ' — sede a confirmar'}</span>
        <span class="chip">🗓️ <b>${escapeHtml(eventInfo.date)}</b></span>
        <span class="chip">👥 <b>~${escapeHtml(eventInfo.youthCount)}</b> jóvenes de 14–18</span>
        <span class="chip">👥 <b>~${escapeHtml(eventInfo.totalCount)}</b> total de participantes</span>
      </div>
    </div>
  </header>

  <main class="wrap">
    <section class="stats-row" aria-label="Resumen general de objetivos">
      ${renderStatTile('Objetivos totales', overall.total, 'total')}
      ${renderStatTile('Pendientes', overall.pending, 'pending')}
      ${renderStatTile('En curso', overall.progress, 'progress')}
      ${renderStatTile('Hechos', overall.done, 'done')}
    </section>

    <div class="progress-track" role="progressbar" aria-valuenow="${overall.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso general">
      <div class="progress-fill" style="width:${overall.pct}%"></div>
    </div>
    <p class="progress-caption">${overall.pct}% completado en general</p>

    <div class="banner">
      <span class="dot"></span>
   <p><strong>Próximo hito:</strong> Reunion viernes 17/09/2026 con el staff completo , sede ? fecha ? y alcance..</p>
     <p><strong>Próximo hito:</strong> a confirmar</p>
    </div>

    <section>
      <p class="section-title">Áreas a cargo de Logística</p>
      <p class="section-sub">Estado actual de cada frente. Los responsables y fechas se completan a medida que se definen en <code>src/data/objectives.ts</code>.</p>

      <div class="grid">
        ${areas.map(renderArea).join('')}
      </div>
    </section>

    <footer class="page-footer">
      <span>Última actualización: ${escapeHtml(lastUpdated)}</span>
    </footer>
  </main>`;
}
