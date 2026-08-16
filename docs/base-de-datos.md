# Esquema de Base de Datos (plan para fase 2)

La fase actual es estática (datos en TS). Este documento define el modelo de datos a migrar cuando el sitio necesite contenido dinámico, cuentas de usuario o comentarios.

## Texto bíblico multi-traducción (estado actual)

El texto completo vive en archivos estáticos `public/biblia/{traduccion}/{slug}.json` (un archivo por libro, ~32 MB en total, 8 traducciones × 66 libros). Formato por archivo:

```json
{ "slug": "juan", "nombre": "Juan", "traduccion": "rvr1960", "capitulos": [["verso1", "verso2", "…"]] }
```

- **Traducciones**: `rvr1960` (defecto, notas de estudio vinculadas), `rv1909`, `bes`, `vbl`, `pddpt` (español), `web`, `kjv` (inglés), `almeida` (portugués). Catálogo tipado en `src/lib/data/traducciones.ts` con licencia y atribución por versión.
- **Fuente**: colección «Open Bibles» (XML OSIS/USFX/Zefania) en `bdatos/` (no se sirve en producción). Conversión con `npm run convert:bibles` → `scripts/convert-bibles.mjs` (parsea los 3 formatos, filtra deuterocanónicos a los 66 libros canónicos, verifica conteos contra RVR1960).
- **Licencias**: la mayoría dominio público; `bes` es CC BY 4.0 y `vbl`/`pddpt` CC BY-SA 4.0 — atribución visible en el Footer.
- La UI del lector es client-side; cada archivo se sirve como estático (SSG intacto, sin rutas dinámicas).

### Migración a BD (fase 2)

La tabla `capitulos.versiculos` se amplía con una columna `traduccion` (enum) y los archivos JSON se convierten en seeds 1:1 por traducción.

## Stack recomendado

- **PostgreSQL + Prisma** en Vercel (Neon/Supabase) o PlanetScale (MySQL).
- El sitio mantiene SSG/ISR; la BD alimenta páginas vía `fetch` en build o API routes.

## Entidades

### libros
| columna | tipo | notas |
|---------|------|-------|
| id | uuid PK | |
| slug | varchar único | `genesis`, `juan`… |
| nombre | varchar | «Génesis» |
| abreviacion | varchar | «Gn» |
| testamento | enum | `AT` \| `NT` |
| genero | varchar | Pentateuco, Evangelios… |
| autor | varchar | |
| capitulos | int | |
| resumen | text | |
| orden | int | posición canónica |

### capitulos
| columna | tipo | notas |
|---------|------|-------|
| id | uuid PK | |
| libro_id | FK → libros | |
| numero | int | 1..N |
| titulo | varchar nullable | título temático |
| versiculos | jsonb | array de strings RVR1960 |

### notas_estudio
| columna | tipo |
|---------|------|
| id | uuid PK |
| capitulo_id | FK → capitulos |
| versiculos | varchar | «5:3-12» |
| titulo | varchar |
| texto | text |
| referencia | varchar nullable | versículo cruzado |

### versiculos_dia
| columna | tipo | notas |
|---------|------|-------|
| id | uuid PK | |
| fecha | date única | ciclo diario |
| texto | text | |
| referencia | varchar | |
| explicacion | text | |
| aplicacion | text | |
| tema | varchar | |

### articulos
| columna | tipo |
|---------|------|
| id | uuid PK |
| slug | varchar único |
| titulo | varchar |
| categoria | varchar |
| excerpt | text |
| contenido | jsonb | bloques tipados (parágrafo, cita, pasaje…) |
| autor | varchar |
| fecha | date |
| imagen | varchar |
| lectura_min | int |

### personajes
| columna | tipo |
|---------|------|
| id | uuid PK |
| slug | varchar único |
| nombre | varchar |
| significado | varchar |
| categoria | enum |
| periodo | varchar |
| resumen | text |
| historia | text |
| versiculos_clave | jsonb |
| leccion | text |

### herramientas
| columna | tipo |
|---------|------|
| id | uuid PK |
| slug | varchar único |
| nombre | varchar |
| descripcion | text |
| categoria | varchar |
| disponible | boolean |
| popular | boolean |
| orden | int |

## Entidades de comunidad (fase 3)

### usuarios
id, email, nombre, foto, proveedor (`google`|`email`), password_hash, role, creado_en

### favoritos
usuario_id FK, versiculo_id FK, creado_en — PK compuesta

### progreso_lectura
usuario_id FK, libro_id FK, capitulo int, actualizado_en — PK compuesta (usuario, libro)

### comentarios
id, articulo_id FK, usuario_id FK nullable (invitados con nombre), texto, aprobado, creado_en

### suscriptores
email único, confirmado, creado_en, fuente (`newsletter_inicio`|`newsletter_fin`)

## Migración desde datos TS

Los módulos `src/lib/data/*.ts` se convierten en seeds de Prisma (`prisma/seed.ts`) que replican el contenido actual 1:1, para no perder el trabajo editorial ya hecho.
