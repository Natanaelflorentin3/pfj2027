# Logística PFJ 2027

Sitio con el seguimiento de objetivos del área de Logística del PFJ 2027
(colectivos, seguridad, primeros auxilios, camisetas y kits), pensado para
compartir con el matrimonio director general y los matrimonios co-directores.

Backend en **Express + TypeScript**. La página se genera en el servidor a
partir de los datos de `src/data/objectives.ts`, y el CSS está separado en
varios archivos dentro de `public/css/`.

## Estructura del proyecto

```
pfj-logistica/
├── src/
│   ├── server.ts            # Servidor Express (punto de entrada)
│   ├── types.ts             # Tipos compartidos (Objective, Area, EventInfo...)
│   ├── stats.ts             # Cálculo de progreso general y por área
│   ├── data/
│   │   └── objectives.ts    # ← ACÁ SE EDITA el contenido (áreas, objetivos, estado)
│   └── views/
│       └── template.ts      # Genera el HTML de la página a partir de los datos
├── public/
│   ├── css/
│   │   ├── variables.css    # Paleta de colores y tokens (claro/oscuro)
│   │   ├── base.css         # Reset y tipografía base
│   │   └── components.css   # Hero, tarjetas, chips, barra de progreso, etc.
│   └── js/
│       └── theme.js         # Botón de tema claro/oscuro
├── package.json
├── tsconfig.json
└── render.yaml               # Configuración lista para Render
```

## Cómo editar el contenido

Todo lo que se ve en la página sale de **`src/data/objectives.ts`**. Para
actualizar el avance, edite ese archivo:

```ts
{ id: 'transporte-1', name: 'Definir cantidad de unidades y proveedor', status: 'pending' }
```

- `status`: `'pending'` (pendiente), `'progress'` (en curso) o `'done'` (hecho)
- `responsible`: nombre del matrimonio o persona responsable (opcional)
- `dueDate`: fecha límite como texto, ej. `'15 de octubre'` (opcional)

Los contadores y la barra de progreso de arriba se recalculan solos.

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

## Próximos pasos posibles

- Guardar los objetivos en una base de datos (por ejemplo PostgreSQL, como en
  el curso de FUNVAL) para poder editarlos desde un formulario en vez de
  tocar código.
- Agregar un login simple para que cada matrimonio co-director pueda marcar
  sus propios objetivos como "en curso" o "hecho".
- Sumar las demás áreas del PFJ (Sesión, etc.) si en algún momento quieren
  centralizar todo en un solo sitio.
