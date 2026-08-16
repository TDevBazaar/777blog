import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { libros } from "@/lib/data/libros";
import { personajes } from "@/lib/data/personajes";
import { articulos } from "@/lib/data/articulos";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const base = site.url;

  const estaticas: MetadataRoute.Sitemap = [
    { url: base, lastModified: ahora, changeFrequency: "daily", priority: 1 },
    { url: `${base}/estudio`, lastModified: ahora, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/herramientas`, lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/herramientas/buscador-versiculos`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/herramientas/generador-oraciones`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/herramientas/quiz-biblico`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/herramientas/planes-lectura`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/herramientas/calculadora-lectura`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/herramientas/favoritos`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/biblioteca`, lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/versiculo-del-dia`, lastModified: ahora, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/acerca`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contacto`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
  ];

  const librosRutas: MetadataRoute.Sitemap = libros.map((l) => ({
    url: `${base}/biblioteca/libros/${l.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const personajesRutas: MetadataRoute.Sitemap = personajes.map((p) => ({
    url: `${base}/biblioteca/personajes/${p.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articulosRutas: MetadataRoute.Sitemap = articulos.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.fecha),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...estaticas, ...librosRutas, ...personajesRutas, ...articulosRutas];
}
