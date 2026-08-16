# AGENTS.md — Lumen

Proyecto: **Lumen · Estudio Bíblico** — plataforma cristiana en español (Next.js 16 App Router, TypeScript, Tailwind CSS v4, React 19). Estático (SSG), sin backend.

## Comandos

```bash
npm run dev      # Desarrollo (Turbopack)
npm run build    # Build producción + typecheck
npm run start    # Servir build (usar -p <puerto>)
npm run lint     # ESLint
npm run convert:bibles  # Regenera public/biblia/{traduccion}/*.json desde bdatos/ (XML)
```

## Convenciones obligatorias

- **Idioma**: todo el contenido de UI y textos del sitio va en **español**. Comentarios en código: ninguno (no añadir comentarios salvo que se pidan).
- **`params` y `searchParams` son Promises** (Next 16): las páginas dinámicas deben ser `async` y usar `const { slug } = await params;`. NUNCA destructurar la Promise directamente — rompe el SSG (genera 404 en build).
- **`generateStaticParams`** en toda ruta dinámica (`/blog/[slug]`, `/biblioteca/libros/[slug]`, `/biblioteca/personajes/[slug]`, `/herramientas/[slug]`, `/blog/categoria/[slug]`).
- **`generateMetadata`** en cada página: title, description, `alternates.canonical`. Páginas con searchParams usan `searchParams: Promise<...>`.
- **Todo el sitio es SSG**: sin rutas dinámicas. Los filtros de listados (`/biblioteca`, `/blog`, `/busqueda`) se implementan con componentes client (nunca con `searchParams` en la página, porque vuelven la ruta dinámica y degradan el SEO). `/busqueda` lee `?q=` desde `window.location` en cliente.
- **Link de next/link** para navegación interna (ESLint `no-html-link-for-pages`); `<a>` solo para enlaces externos o anclas (`#id`).
- Componentes interactivos: prefijo `"use client"` y ubicarse en `src/components/`. Los server components no usan hooks.
- **Nada de `setState` síncrono dentro de `useEffect`** (regla `react-hooks/set-state-in-effect`). Patrón válido: `requestAnimationFrame` (ver `ThemeToggle.tsx`).
- Tipos estrictos: el contenido vive en `src/lib/data/*.ts` con tipos exportados (`Versiculo`, `Libro`, `Articulo`, `Personaje`, `Capitulo`, `Herramienta`).

## Estructura

- `src/lib/site.ts` — nombre, URL canónica (`site.url`), email, redes, navLinks.
- `src/lib/data/` — todo el contenido estático + helpers (`getVersiculoDelDia`, `getLibro`, `getCapitulo`, `getArticulo`, `getPersonaje`…). `traducciones.ts` cataloga las versiones bíblicas del lector.
- `public/biblia/{traduccion}/{slug}.json` — texto bíblico completo por traducción (rvr1960, rv1909, bes, vbl, pddpt, web, kjv, almeida). Las notas de estudio (`capitulos.ts`) solo se muestran con RVR1960.
- `src/app/` — rutas: `/` (inicio), `/estudio`, `/versiculo-del-dia`, `/blog`, `/blog/[slug]`, `/blog/categoria/[slug]`, `/herramientas`, `/herramientas/[slug]`, `/biblioteca`, `/biblioteca/libros/[slug]`, `/biblioteca/personajes`, `/biblioteca/personajes/[slug]`, `/busqueda`, `/acerca`, `/contacto`, `/privacidad`, `sitemap.ts`, `robots.ts`.
- `src/components/` — Header, Footer, Logo, ThemeToggle, Breadcrumbs, ShareButtons, ScriptureCard, ArticleCard, NewsletterForm + subcarpetas `tools/`, `estudio/`, `busqueda/`, `biblioteca/`.
- `public/images/` — SVG de artículos/categorías; `public/icon.svg`, `icon-192.png`, `icon-512.png`, `og.png`, `manifest.webmanifest`.

## Sistema de diseño (Sacred Minimalist)

- Tokens CSS en `src/app/globals.css` bajo `:root` (claro) y `.dark` (oscuro), clase `dark` en `<html>`.
- Fuentes: Playfair Display (`font-display`) + Geist (`font-body`) vía `next/font`.
- Clases de utilidad propietarias: `ambient-shadow-sm/md`, `sacred-border`, `verse-num`, `no-scrollbar`, `drop-cap`, `highlight-gold`.
- Tipografía por escala: `text-display-lg`, `text-headline-md`, `text-verse-text`, `text-body-lg/md`, `text-label-md`, `text-caption` (definidas en `@theme`).

## Verificación antes de terminar

1. `npm run lint` — cero errores.
2. `npm run build` — debe listar todas las rutas SSG sin páginas 404 fallidas.
3. Prueba manual: `npm run start -p 3100` y curl a las rutas dinámicas (devuelven 200 con contenido real).
