# Arquitectura de Lumen

## Visión general

Lumen es una plataforma cristiana de estudio bíblico en español construida con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** y **React 19**. En esta fase el sitio es **100% estático**: todo el contenido vive en módulos de datos TypeScript y se genera en build time (SSG).

## Pila tecnológica

| Capa | Tecnología | Uso |
|------|-----------|-----|
| Framework | Next.js 16.2.12 (App Router) | Enrutado, SSG, API routes futuras |
| UI | React 19, Tailwind CSS v4 | Componentes y sistema de diseño |
| Lenguaje | TypeScript 5 | Tipado de datos y props |
| Fuentes | Playfair Display + Geist (next/font) | Display y cuerpo |
| Datos | Módulos TS en `src/lib/data/` | Contenido estático |
| Despliegue | Vercel (recomendado) | Hosting, ISR, edge |

## Estructura de carpetas

```
src/
├── app/                    # Rutas (App Router)
│   ├── layout.tsx          # Root layout, metadatos, tema, fuentes
│   ├── page.tsx            # Inicio
│   ├── estudio/            # Lector bíblico 3 columnas
│   ├── versiculo-del-dia/  # Versículo del día
│   ├── blog/               # Artículos + categorías
│   ├── herramientas/       # Herramientas + detalle interactivo
│   ├── biblioteca/         # Libros y personajes
│   ├── busqueda/           # Búsqueda global
│   ├── acerca|contacto|privacidad/
│   ├── sitemap.ts          # Sitemap XML dinámico
│   └── robots.ts           # robots.txt
├── components/
│   ├── Header, Footer, Logo, ThemeToggle…
│   ├── tools/              # Componentes interactivos (client)
│   ├── estudio/            # Lector bíblico
│   └── busqueda/           # Resultados de búsqueda
└── lib/
    ├── site.ts             # Config del sitio (nombre, URL, redes)
    ├── jsonld.tsx          # Helper de Schema.org
    └── data/               # Contenido: versículos, libros, artículos…
```

## Decisiones clave

### Contenido estático (fase 1)
- Los 32 versículos, 66 libros, 6 artículos, 14 personajes, 6 capítulos y 12 herramientas viven en `src/lib/data/*.ts` con tipos estrictos.
- Cada módulo expone helpers (`getVersiculoDelDia`, `getLibro`, `getCapitulo`…) para consumo limpio desde las páginas.
- Generación estática con `generateStaticParams` en las rutas dinámicas (`/blog/[slug]`, `/biblioteca/libros/[slug]`, etc.).

### Tema claro/oscuro
- Estrategia de clase `dark` en `<html>` mediante script inline en `<head>` (evita FOUC), con `localStorage` (`lumen-theme`) y respeto a `prefers-color-scheme`.
- Tokens CSS duales en `globals.css` bajo `:root` y `.dark`.

### SEO
- Metadatos dinámicos por página (`generateMetadata`), Open Graph, Twitter Cards, canónicas, breadcrumbs visuales, JSON-LD (WebSite, Article, Book, Person) y sitemap/robots generados.
- Dominio canónico configurable en `src/lib/site.ts` (`site.url`).

## Rendimiento

- Todas las páginas son estáticas (SSG): 0 JS de servidor.
- Los componentes interactivos son `"use client"` aislados (herramientas, lector, búsqueda, favoritos).
- Imágenes SVG inline o estáticas en `public/images/`; `og.png` 1200×630 pregenerada.
- `next/font` con `display: swap` elimina CLS por fuentes.

## Preparación para producción

1. Cambiar `site.url` y `site.email` en `src/lib/site.ts`.
2. Conectar el formulario de contacto a un servicio (Formspree/Resend) — ver `docs/roadmap.md`.
3. Migrar el contenido a base de datos cuando se necesite dinamismo — ver `docs/base-de-datos.md`.
4. Implementar slots publicitarios — ver `docs/monetizacion.md`.

## Comandos

```bash
npm run dev     # Desarrollo
npm run build   # Build de producción
npm run start   # Servir build
npm run lint    # ESLint
```
