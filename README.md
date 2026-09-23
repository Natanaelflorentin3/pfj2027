# Logística PFJ 2027

Sitio con el seguimiento del área de Logística del PFJ 2027, pensado para
compartir con el matrimonio director general y los matrimonios co-directores.
Tiene 4 secciones con su propia URL, conectadas por una barra de navegación:

- **Objetivos** (`/`) — colectivos, seguridad, primeros auxilios, camisetas y kits
- **Calendario semanal** (`/calendario`) — los 5 días del PFJ, cada uno con su PDF de actividades
- **Consejeros** (`/consejeros`) — listado de consejeros con su estado (confirmado / a confirmar)
- **PDFs importantes** (`/pdfs`) — reglamentos, autorizaciones y demás documentos

Backend en **Express + TypeScript**. Cada página se genera en el servidor a
partir de los datos de `src/data/`, y el CSS está separado en varios archivos
dentro de `public/css/`.

## Estructura del proyecto

```
pfj-logistica/
├── src/
│   ├── server.ts             # Servidor Express y rutas (/, /calendario, /consejeros, /pdfs)
│   ├── types.ts              # Tipos compartidos
│   ├── stats.ts              # Cálculo de progreso general y por área
│   ├── data/                 # ← ACÁ SE EDITA el contenido
│   │   ├── objectives.ts     #   áreas y objetivos de Logística
│   │   ├── calendario.ts     #   los 5 días del PFJ y su PDF
│   │   ├── consejeros.ts     #   listado de consejeros
│   │   └── pdfs.ts           #   documentos importantes
│   └── views/
│       ├── layout.ts         # Molde común: <head>, nav bar, cierre de <body>
│       ├── home.ts           # Página de Objetivos (con el hero grande)
│       ├── calendario.ts     # Página de Calendario semanal
│       ├── consejeros.ts     # Página de Consejeros
│       └── pdfs.ts           # Página de PDFs importantes
├── public/
│   ├── css/
│   │   ├── variables.css     # Paleta de colores y tokens (claro/oscuro)
│   │   ├── base.css          # Reset y tipografía base
│   │   └── components.css    # Nav bar, hero, tarjetas, calendario, tabla, etc.
│   ├── js/
│   │   └── theme.js          # Botón de tema claro/oscuro
│   └── files/                # ← ACÁ VAN LOS PDFs (calendario, reglamentos, etc.)
├── package.json
├── tsconfig.json
└── render.yaml                # Configuración lista para Render
```

## Cómo editar el contenido

### Objetivos de Logística — `src/data/objectives.ts`

```ts
{ id: 'transporte-1', name: 'Definir cantidad de unidades y proveedor', status: 'pending' }
```

- `status`: `'pending'` (pendiente), `'progress'` (en curso) o `'done'` (hecho)
- `responsible` y `dueDate` son opcionales.

### Calendario semanal — `src/data/calendario.ts`

```ts
{ id: 'dia-1', label: 'Día 1', fecha: 'Miércoles 6 de enero', pdf: '/files/dia-1.pdf' }
```

Subí el PDF de cada día a `public/files/` con ese mismo nombre, y completá
`pdf` con la ruta. Mientras `pdf` sea `null`, la página muestra "PDF
pendiente de subir".

### Consejeros — `src/data/consejeros.ts`

```ts
{ id: 'juan-perez', nombre: 'Juan', apellido: 'Pérez', genero: 'Masculino', estado: 'confirmado' }
```

`estado` es `'confirmado'` o `'a-confirmar'`. Los contadores de arriba de la
tabla se recalculan solos.

### PDFs importantes — `src/data/pdfs.ts`

```ts
{ id: 'reglamento-general', titulo: 'Reglamento general del PFJ', categoria: 'General', archivo: '/files/reglamento-general.pdf' }
```

Mismo mecanismo: subís el archivo a `public/files/` y completás `archivo`
con la ruta.

## Desarrollo local

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. `npm run dev` reinicia solo al guardar cambios.

## Build de producción

```bash
npm run build   # compila TypeScript a dist/
npm start       # corre el servidor compilado
```

## Desplegar en Render

1. Subí este proyecto a un repositorio de GitHub (o GitLab).
2. En [Render](https://render.com), creá un **New → Web Service** y conectá el repo.
3. Configuración:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free está bien para empezar.
4. Render asigna automáticamente la variable `PORT`; el servidor ya la usa
   (`src/server.ts`), así que no hace falta tocar nada.
5. Cada vez que hagas `git push`, Render vuelve a desplegar solo.

También incluí un `render.yaml` por si preferís usar "Blueprints" de Render
para crear el servicio con un clic desde el repo.

## Comentarios (requiere base de datos)

La sección **Comentarios** (`/comentarios`) permite que cualquiera que use la
página deje un mensaje visible para todo el equipo. Se guarda en una base de
datos PostgreSQL, así que necesita la variable de entorno `DATABASE_URL`
apuntando a una base Postgres real. Si no está configurada, el servidor sigue
funcionando normalmente (todas las demás páginas andan igual), pero
`/comentarios` muestra un aviso de que la base no está conectada.

### Desarrollo local

1. Conseguí una base Postgres (por ejemplo, gratis en [Neon](https://neon.tech)
   o [Supabase](https://supabase.com), o una instalada localmente).
2. Copiá `.env.example` a `.env` y completá `DATABASE_URL` con tu cadena de
   conexión real. `.env` ya está en `.gitignore`, nunca se sube al repo.
3. Corré `npm run dev` — al arrancar, el servidor crea sola la tabla
   `comentarios` si todavía no existe (`ensureSchema()` en `src/db.ts`).

### En Render

1. En el dashboard de Render, agregá la variable de entorno `DATABASE_URL` al
   Web Service, con la cadena de conexión de tu base Postgres (de Render,
   Neon, Supabase, etc. — cualquiera sirve, solo tiene que ser accesible
   desde internet).
2. Volvé a desplegar (o esperá al próximo `git push`). El servidor crea la
   tabla sola la primera vez que arranca con `DATABASE_URL` configurada.

## Próximos pasos posibles

- Guardar todo (objetivos, consejeros, calendario) en una base de datos
  (por ejemplo PostgreSQL, como en el curso de FUNVAL) para poder editarlo
  desde un formulario en vez de tocar código.
- Agregar un login simple para que cada matrimonio co-director pueda marcar
  sus propios objetivos o confirmar consejeros sin pasar por vos.
- Sumar las demás áreas del PFJ (Sesión, etc.) si en algún momento quieren
  centralizar todo en un solo sitio.
