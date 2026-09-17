import { PdfDoc } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPdf(doc: PdfDoc): string {
  const action = doc.archivo
    ? `<a class="pdf-btn" href="${doc.archivo}" target="_blank" rel="noopener">📄 Abrir PDF</a>`
    : `<span class="pdf-btn pdf-btn--pending">📄 Pendiente de subir</span>`;

  return `
    <div class="pdf-row">
      <div class="pdf-row-info">
        <span class="pdf-category">${escapeHtml(doc.categoria)}</span>
        <span class="pdf-title">${escapeHtml(doc.titulo)}</span>
        ${doc.descripcion ? `<span class="pdf-desc">${escapeHtml(doc.descripcion)}</span>` : ''}
      </div>
      ${action}
    </div>`;
}

export function renderPdfs(pdfs: PdfDoc[]): string {
  const lista = pdfs.length
    ? `<div class="pdf-list">${pdfs.map(renderPdf).join('')}</div>`
    : `<p class="empty-state">Todavía no hay PDFs cargados .los cargo en ---> <code>src/data/pdfs.ts</code>.</p>`;

  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Documentos</p>
      <h1>PDFs importantes</h1>
      <p class="subtitle">Reglamentos, autorizaciones y demás documentos del PFJ, todos en un mismo lugar! .</p>
    </div>
  </header>

  <main class="wrap">
    <section>
      ${lista}
      <p class="section-sub" style="margin-top:18px;">Para sumar un documento, lo tengo que agregar en <code>src/data/pdfs.ts</code> y subí el archivo a <code>public/files/</code>.</p>
    </section>
  </main>`;
}
