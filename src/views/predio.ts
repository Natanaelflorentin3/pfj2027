import { EspacioPredio, EstadoEspacio, PredioInfo } from '../types';

function escapeHtml(input: string | number): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ESTADO_LABEL: Record<EstadoEspacio, string> = {
  apto: 'Apto',
  'requiere-adaptacion': 'Requiere adaptación',
  'no-recomendado': 'No recomendado',
  'a-confirmar': 'A confirmar',
};

const ESTADO_STATUS_CLASS: Record<EstadoEspacio, string> = {
  apto: 'status--done',
  'requiere-adaptacion': 'status--warn',
  'no-recomendado': 'status--warn',
  'a-confirmar': 'status--pending',
};

function renderEspacio(espacio: EspacioPredio): string {
  return `
    <div class="predio-card">
      <div class="predio-card-head">
        <span class="predio-card-icon">${espacio.icono}</span>
        <div class="predio-card-title">
          <span class="predio-card-name">${escapeHtml(espacio.nombre)}</span>
          <span class="status ${ESTADO_STATUS_CLASS[espacio.estado]}">${ESTADO_LABEL[espacio.estado]}</span>
        </div>
      </div>
      <p class="predio-card-uso"><strong>Uso previsto:</strong> ${escapeHtml(espacio.usoPrevisto)}</p>
      <p class="predio-card-cap"><strong>Capacidad:</strong> ${escapeHtml(espacio.capacidad)}</p>
      ${espacio.notas ? `<p class="predio-card-notas">${escapeHtml(espacio.notas)}</p>` : ''}
    </div>`;
}

export interface PredioPageModel {
  predio: PredioInfo;
  espacios: EspacioPredio[];
}

export function renderPredio(model: PredioPageModel): string {
  const { predio, espacios } = model;

  const aptos = espacios.filter((e) => e.estado === 'apto').length;
  const conProblema = espacios.filter((e) => e.estado === 'requiere-adaptacion' || e.estado === 'no-recomendado').length;
  const aConfirmar = espacios.filter((e) => e.estado === 'a-confirmar').length;

  return `
  <header class="page-header">
    <div class="wrap">
      <p class="eyebrow">Logística · Predio</p>
      <h1>${escapeHtml(predio.nombre)}</h1>
      <p class="subtitle">${escapeHtml(predio.direccion)}${predio.superficie ? ` · ${escapeHtml(predio.superficie)}` : ''} · <a class="predio-maps-link" href="${predio.mapsUrl}" target="_blank" rel="noopener">Ver en Google Maps ↗</a></p>
    </div>
  </header>

  <main class="wrap">
    <section class="stats-row" aria-label="Resumen de espacios del predio" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-tile stat-tile--done"><span class="stat-value">${aptos}</span><span class="stat-label">Aptos</span></div>
      <div class="stat-tile stat-tile--warn"><span class="stat-value">${conProblema}</span><span class="stat-label">Con problema</span></div>
      <div class="stat-tile stat-tile--pending"><span class="stat-value">${aConfirmar}</span><span class="stat-label">A confirmar</span></div>
    </section>

    <div class="banner banner--warn">
      <span class="dot"></span>
      <p><strong>Cuidado de momento con la capacidad:</strong> el comedor (el espacio más grande) entra ~200 personas, pero entre jóvenes y personal somos ~250 en total. Sumado a que el gimnasio tiene mucho eco y los salones no tienen aire acondicionado (en enero, con ~40°C, es un problema real), hay que definir bien qué actividades se hacen todos juntos y cuáles conviene dividir en compañías o por franjas horarias.</p>
    </div>

    <section style="margin-top:28px;">
      <p class="section-title">Espacios del predio</p>
      <p class="section-sub">Vamos completando esto a medida que hagamos la recorrida. Para agregar o actualizar un espacio,tengo que editar --><code>src/data/predio.ts</code>.</p>

      <div class="predio-grid">
        ${espacios.map(renderEspacio).join('')}
      </div>
    </section>
  </main>`;
}
