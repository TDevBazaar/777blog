# Plan de Monetización de Lumen

## Principios

1. **La Palabra nunca debe costar**: el contenido bíblico (versículos, capítulos, herramientas) es y será siempre gratuito.
2. **Sin interrupciones destructivas**: sin popups, sin autoplay, sin anuncios que bloqueen la lectura.
3. **Transparencia**: los anuncios se etiquetan claramente como tales.
4. **El contenido propio (artículos editoriales) es la unidad monetizable**, no el texto bíblico.

## Flujos de ingresos por prioridad

### 1. Publicidad programática (Google AdSense / Ezoic / Mediavine)

- **Criterio de elegibilidad**: AdSense exige ~15-25 páginas de contenido único de calidad. Lumen lo cumple tras la Fase 2 (66 páginas de libros + 1189 capítulos + artículos).
- **Ubicaciones propuestas** (arquitectura de slots ya prevista en el diseño):
  - `ad-in-content` — 300×250 o responsive, tras el 2º bloque de un artículo (máx. 1)
  - `ad-sidebar` — 300×600 vertical, en sidebar de escritorio
  - `ad-footer-cta` — banner 728×90 sobre el footer en páginas de listado
  - `ad-bible-mobile` — 320×100 entre capítulos en el lector (solo móvil)
- **Restricciones de AdSense aplicables a sitios religiosos**: no se permiten anuncios de alcohol, tabaco, juegos de azar ni contenido político; Google filtra automáticamente por categoría sensible.

### 2. Donaciones (ko-fi / PayPal / Stripe)

- Botón discreto «Apoya Lumen» en el footer y en la página de inicio.
- Sin incentivos: la donación es un acto de gratitud, no una compra.

### 3. Membresía opcional (no-paywall)

- Contenido gratuito al 100%; la membresía desbloquea **comodidades**:
  - Temas personalizados (papel antiguo, sepia)
  - Descarga PDF de planes de lectura
  - Sincronización de favoritos en la nube
  - Soporte prioritario por email
- Precio sugerido: $3–5/mes o $30/año (varía según país).

### 4. Afiliados (secundario)

- Libros de estudio bíblico, Biblias de regalo y devocionales impresos vía enlaces afiliados (Amazon afiliados es).
- Solo productos que el equipo realmente recomienda; siempre con disclaimer.

## Arquitectura técnica para publicidad

- Crear un componente `<AdSlot variant="in-content|sidebar|footer" />` que:
  1. Renderiza el div contenedor con `data-ad-slot`.
  2. Carga `adsbygoogle` una sola vez (`next/script` con `strategy="afterInteractive"`).
  3. Se desactiva con `process.env.NEXT_PUBLIC_ADS_ENABLED !== "true"` para desarrollo.
- No insertar jamás un slot dentro de la vista del capítulo bíblico en tablet/desktop (solo móvil y solo entre capítulos).
- Medir con Google Analytics 4 + Search Console para optimizar RPM por página.

## Métricas objetivo (6 meses)

| Métrica | Meta |
|---------|------|
| Páginas vistas/mes | 50.000 |
| Sesiones orgánicas/mes | 20.000 |
| RPM medio | $5–12 |
| Ingresos mensuales | $250–600 (ad + donaciones) |

## Consideraciones legales

- Actualizar `privacidad.md` con la política de cookies cuando se active AdSense (consentimiento CMP si aplica a usuarios UE).
- Mantener `sitemap.xml` y `robots.txt` al día para maximizar el rastreo de páginas monetizables.
