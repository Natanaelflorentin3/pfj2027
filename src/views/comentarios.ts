import { Comentario } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

function renderComentario(c: Comentario): string {
  return `
    <div class="comment-card">
      <div class="comment-head">
        <span class="comment-author">${escapeHtml(c.nombre)}</span>
        <span class="comment-date">${escapeHtml(formatFecha(c.creadoEn))}</span>
      </div>
      <p class="comment-body">${escapeHtml(c.mensaje)}</p>
    </div>`;
}

export interface ComentariosPageModel {
  comentarios: Comentario[];
  error?: string;
  dbDisponible: boolean;
}

export function renderComentarios(model: ComentariosPageModel): string {
  const { comentarios, error, dbDisponible } = model;

  const lista = comentarios.length
    ? `<div class="comment-list">${comentarios.map(renderComentario).join('')}</div>`
    : `<p class="empty-state">Todavía no hay comentarios. ¡Sé el primero en escribir uno!</p>`;

  const formulario = dbDisponible
    ? `
      <form class="comment-form" method="POST" action="/comentarios">
        <div class="comment-form-row">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required maxlength="60" placeholder="Tu nombre" />
        </div>
        <div class="comment-form-row">
          <label for="mensaje">Comentario</label>
          <textarea id="mensaje" name="mensaje" required maxlength="500" rows="3" placeholder="Escribí tu duda, sugerencia o aviso..."></textarea>
        </div>
        ${error ? `<p class="form-error">${escapeHtml(error)}</p>` : ''}
        <button type="submit" class="btn-primary">Publicar comentario</button>
      </form>`
    : `<p class="empty-state">La sección de comentarios todavía no está conectada a la base de datos (ver <code>DATABASE_URL</code> en el README).</p>`;

  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Comentarios</p>
      <h1>Comentarios</h1>
      <p class="subtitle">Dudas, sugerencias o avisos de cualquiera que use esta página — quedan visibles para todo el equipo.</p>
    </div>
  </header>

  <main class="wrap">
    <section class="comment-form-section">
      ${formulario}
    </section>

    <section style="margin-top:28px;">
      ${lista}
    </section>
  </main>`;
}
