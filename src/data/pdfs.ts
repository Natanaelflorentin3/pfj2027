import { PdfDoc } from '../types';

/**
 * Todos los PDFs importantes del PFJ en un solo lugar (reglamentos,
 * autorizaciones, listados, etc. — además de los PDFs diarios que van
 * en el Calendario Semanal).
 *
 * Para subir un archivo: ponelo en public/files/ y completá "archivo"
 * con esa ruta, ej: archivo: '/files/reglamento-general.pdf'
 */
export const pdfsImportantes: PdfDoc[] = [
  {
    id: 'reglamento-general',
    titulo: 'Reglamento general del PFJ',
    categoria: 'General',
    descripcion: 'Normas generales para jóvenes y consejeros durante el evento.',
    archivo: null,
  },
  {
    id: 'autorizacion-padres',
    titulo: 'Autorización de padres/tutores',
    categoria: 'General',
    descripcion: 'Formulario de consentimiento para menores de edad.',
    archivo: null,
  },
];
