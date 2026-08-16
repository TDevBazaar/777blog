# Roadmap de Lumen

## Fase 1 — Fundación estática (completada)

- [x] Scaffold Next.js 16 + Tailwind v4 + TypeScript
- [x] Sistema de diseño Sacred Minimalist (tokens, tipografías, modo oscuro)
- [x] Header/Footer con navegación y formulario de búsqueda
- [x] Página de inicio (héroe, categorías, artículos recientes, newsletter)
- [x] Versículo del día (32 versículos RVR1960, ciclo diario)
- [x] Blog con 6 artículos + categorías + TOC + JSON-LD
- [x] Herramientas: buscador de versículos, generador de oraciones, quiz bíblico, planes de lectura, calculadora, favoritos (localStorage)
- [x] Estudio bíblico: lector 3 columnas (6 capítulos con notas)
- [x] Multi-traducción en el lector: 8 versiones (es/en/pt) desde XML de «Open Bibles», con atribución CC
- [x] Biblioteca: 66 libros + 14 personajes
- [x] Búsqueda global
- [x] Páginas: acerca, contacto, privacidad
- [x] SEO: metadatos, sitemap, robots, manifest, favicon, JSON-LD

## Fase 2 — Contenido y dinamismo (siguiente)

- [ ] Completar los 1189 capítulos de la Biblia en el lector de estudio
- [ ] Completar los 32 temas del versículo del día (objetivo: 365)
- [ ] Expandir artículos a 30+ con categorías completas
- [ ] Ampliar personajes a 50+ (jueces, reyes, profetas menores)
- [ ] Notas de estudio en todos los capítulos publicados
- [ ] Búsqueda con indexación completa y búsqueda por cita («Jn 3:16»)
- [ ] Página de planes de lectura públicos (7 días, 30 días, cronológico)

## Fase 3 — Backend y comunidad

- [ ] Migrar contenido a PostgreSQL + Prisma (ver `base-de-datos.md`)
- [ ] Formulario de contacto operativo (Resend/Formspree)
- [ ] Newsletter real con confirmación de email
- [ ] Autenticación (Google + email) — NextAuth
- [ ] Favoritos sincronizados entre dispositivos
- [ ] Progreso de lectura por usuario
- [ ] Comentarios moderados en artículos
- [ ] Devocional diario con suscripción por email

## Fase 4 — Crecimiento y monetización

- [ ] Slots publicitarios (ver `monetizacion.md`)
- [ ] Donaciones / membresía opcional sin contenido de pago
- [ ] App PWA instalable completa (service worker offline)
- [x] Multi-traducción (es/en/pt) en el lector de estudio — pendiente: interfaz multilingüe completa
- [ ] Podcast / devocionales en audio
- [ ] Redes sociales activas (Pinterest, Facebook, Telegram)

## Prioridades sugeridas

1. **Fase 2**: completar datos (capítulos, versículos) — el SEO del sitio depende del volumen de páginas.
2. **Fase 3 ítem 2**: contacto funcional — requisito mínimo para lanzar.
3. **Fase 4 ítem 1**: publicidad — ingresos tempranos sin degradar la experiencia.
