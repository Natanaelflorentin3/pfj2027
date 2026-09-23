import { EventInfo, NavKey } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: 'objetivos', label: 'Objetivos', href: '/' },
  { key: 'calendario', label: 'Calendario semanal', href: '/calendario' },
  { key: 'consejeros', label: 'Consejeros', href: '/consejeros' },
  { key: 'participantes', label: 'Participantes', href: '/participantes' },
  { key: 'pdfs', label: 'PDFs importantes', href: '/pdfs' },
  { key: 'predio', label: 'Predio', href: '/predio' },
  { key: 'comentarios', label: 'Comentarios', href: '/comentarios' },
];

function renderNav(active: NavKey): string {
  const links = NAV_ITEMS.map(
    (item) => `<a href="${item.href}" class="navlink${item.key === active ? ' navlink--active' : ''}">${item.label}</a>`
  ).join('');

  return `
    <nav class="topnav">
      <div class="wrap topnav-inner">
        <span class="brand">PFJ 2027 <span class="brand-sep">·</span> Logística</span>
        <div class="navlinks">${links}</div>
        <button type="button" class="theme-toggle theme-toggle--nav" id="themeToggle" aria-label="Cambiar tema claro/oscuro">🌓</button>
      </div>
    </nav>`;
}

export interface LayoutModel {
  active: NavKey;
  pageTitle: string;
  pageDescription: string;
  eventInfo: EventInfo;
  bodyHtml: string;
}

export function renderLayout(model: LayoutModel): string {
  const { active, pageTitle, pageDescription, eventInfo, bodyHtml } = model;

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageTitle)} · ${escapeHtml(eventInfo.title)}</title>
  <meta name="description" content="${escapeHtml(pageDescription)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/variables.css" />
  <link rel="stylesheet" href="/css/base.css" />
  <link rel="stylesheet" href="/css/components.css" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('pfj-theme');
        if (saved) document.documentElement.setAttribute('data-theme', saved);
      } catch (e) {}
    })();
  </script>
</head>
<body>
  ${renderNav(active)}
  ${bodyHtml}
  <script src="/js/theme.js" defer></script>
  <script src="/js/table-filter.js" defer></script>
</body>
</html>`;
}
