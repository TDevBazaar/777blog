"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { versiculos } from "@/lib/data/versiculos";
import { libros } from "@/lib/data/libros";
import { articulos } from "@/lib/data/articulos";
import { personajes } from "@/lib/data/personajes";
import { herramientas } from "@/lib/data/herramientas";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function ResultadosBusqueda() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const consulta = normalize(q.trim());

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const inicial = params.get("q") ?? "";
      setQ(inicial);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const resultados = useMemo(() => {
    if (!consulta) return null;
    const match = (s: string) => normalize(s).includes(consulta);
    return {
      versiculos: versiculos.filter((v) => match(v.texto) || match(v.referencia) || match(v.tema)).slice(0, 8),
      libros: libros.filter((l) => match(l.nombre) || match(l.abreviacion) || match(l.resumen) || match(l.autor)).slice(0, 6),
      articulos: articulos.filter((a) => match(a.titulo) || match(a.resumen) || match(a.categoria)).slice(0, 6),
      personajes: personajes.filter((p) => match(p.nombre) || match(p.resumen) || match(p.historia)).slice(0, 6),
      herramientas: herramientas.filter((h) => match(h.nombre) || match(h.descripcion)).slice(0, 6),
    };
  }, [consulta]);

  const total = resultados ? Object.values(resultados).reduce((s, r) => s + r.length, 0) : 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      const url = q.trim() ? `/busqueda?q=${encodeURIComponent(q.trim())}` : "/busqueda";
      router.replace(url, { scroll: false });
    }, 300);
    return () => clearTimeout(handler);
  }, [q, router]);

  return (
    <div className="mx-auto max-w-3xl">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-10">
        <label htmlFor="busqueda-global" className="sr-only">
          Buscar en Lumen
        </label>
        <input
          id="busqueda-global"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca versículos, libros, artículos, personajes…"
          autoFocus
          className="w-full rounded-2xl border border-outline-variant bg-surface-container-lowest px-6 py-4 font-body-lg text-body-lg text-on-surface placeholder:text-outline ambient-shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
      </form>

      {consulta && resultados && total === 0 && (
        <p className="py-10 text-center font-body-lg text-body-lg text-on-surface-variant">
          No se encontraron resultados para «{q}». Prueba con otras palabras.
        </p>
      )}

      {!consulta && (
        <div className="rounded-2xl border border-dashed border-outline-variant p-10 text-center">
          <p className="font-display text-2xl text-primary">¿Qué buscas hoy?</p>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Sugerencias: «amor», «Salmo 91», «fe», «David», «protección»…
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["amor", "fe", "Salmo 23", "esperanza", "oración"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="cursor-pointer rounded-full bg-surface-container-low px-4 py-1.5 font-caption text-caption text-on-surface-variant transition-colors hover:bg-surface-container-high"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {consulta && resultados && (
        <>
          <p className="mb-6 font-caption text-caption text-on-surface-variant">
            {total} resultado{total !== 1 ? "s" : ""} para «{q}»
          </p>

          {resultados.versiculos.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl text-primary">Versículos</h2>
              <ul className="space-y-3">
                {resultados.versiculos.map((v) => (
                  <li key={v.id} className="sacred-border rounded-xl bg-surface-container-low p-5">
                    <p className="font-display text-lg italic leading-relaxed text-primary">«{v.texto}»</p>
                    <a href={`/versiculo-del-dia#${v.id}`} className="mt-3 block font-label-md text-label-md text-secondary hover:text-primary">
                      {v.referencia} — {v.tema}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resultados.libros.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl text-primary">Libros</h2>
              <ul className="space-y-2">
                {resultados.libros.map((l) => (
                  <li key={l.slug}>
                    <a href={`/biblioteca/libros/${l.slug}`} className="flex items-baseline justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md">
                      <span className="font-body-md font-medium text-primary">{l.nombre}</span>
                      <span className="font-caption text-caption text-on-surface-variant">{l.genero} · {l.capitulos} capítulos</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resultados.articulos.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl text-primary">Artículos</h2>
              <ul className="space-y-2">
                {resultados.articulos.map((a) => (
                  <li key={a.slug}>
                    <a href={`/blog/${a.slug}`} className="block rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md">
                      <p className="font-body-md font-medium text-primary">{a.titulo}</p>
                      <p className="mt-0.5 line-clamp-1 font-caption text-caption text-on-surface-variant">{a.resumen}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resultados.personajes.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl text-primary">Personajes</h2>
              <ul className="space-y-2">
                {resultados.personajes.map((p) => (
                  <li key={p.slug}>
                    <a href={`/biblioteca/personajes/${p.slug}`} className="flex items-baseline justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md">
                      <span className="font-body-md font-medium text-primary">{p.nombre}</span>
                      <span className="font-caption text-caption text-on-surface-variant">{p.categoria} · {p.periodo}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resultados.herramientas.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-2xl text-primary">Herramientas</h2>
              <ul className="space-y-2">
                {resultados.herramientas.map((h) => (
                  <li key={h.slug}>
                    <a href={`/herramientas/${h.slug}`} className="flex items-baseline justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md">
                      <span className="font-body-md font-medium text-primary">{h.nombre}</span>
                      <span className="font-caption text-caption text-on-surface-variant">{h.disponible ? h.categoria : "Próximamente"}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
