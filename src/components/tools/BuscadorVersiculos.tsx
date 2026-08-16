"use client";

import { useMemo, useState } from "react";
import { versiculos, temas } from "@/lib/data/versiculos";
import { libros } from "@/lib/data/libros";
import { personajes } from "@/lib/data/personajes";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function BuscadorVersiculos() {
  const [q, setQ] = useState("");
  const [tema, setTema] = useState("");
  const consulta = normalize(q.trim());

  const resultados = useMemo(() => {
    if (!consulta && !tema) {
      return { versiculos: [], libros: [], personajes: [] };
    }
    const match = (s: string) => !consulta || normalize(s).includes(consulta);
    return {
      versiculos: versiculos.filter((v) => (!tema || v.tema === tema) && (match(v.texto) || match(v.referencia) || match(v.tema))),
      libros: consulta ? libros.filter((l) => match(l.nombre) || match(l.abreviacion) || match(l.resumen)).slice(0, 6) : [],
      personajes: consulta ? personajes.filter((p) => match(p.nombre) || match(p.resumen) || match(p.significado)).slice(0, 6) : [],
    };
  }, [consulta, tema]);

  const total = resultados.versiculos.length + resultados.libros.length + resultados.personajes.length;

  return (
    <div>
      <form className="mb-6" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase" htmlFor="buscar-versiculos">
          Buscar pasaje, tema o palabra
        </label>
        <input
          id="buscar-versiculos"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ej: «lámpara», «Salmo 23», «confianza»…"
          autoFocus
          className="w-full rounded-xl border border-outline-variant bg-surface-container-low py-3 pl-4 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container focus:outline-none"
        />
      </form>

      <fieldset className="mb-8">
        <legend className="mb-2 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">Filtrar por tema</legend>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTema("")}
            className={`cursor-pointer rounded-full px-3 py-1 font-caption text-caption transition-colors ${tema === "" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            Todos
          </button>
          {temas.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTema(tema === t ? "" : t)}
              className={`cursor-pointer rounded-full px-3 py-1 font-caption text-caption transition-colors ${tema === t ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      {total === 0 && consulta && (
        <p className="py-10 text-center font-body-md text-body-md text-on-surface-variant">
          No se encontraron resultados para «{q}». Prueba con otra palabra o tema.
        </p>
      )}

      {total === 0 && !consulta && !tema && (
        <p className="py-10 text-center font-body-md text-body-md text-on-surface-variant">
          Escribe una palabra o selecciona un tema para comenzar la búsqueda.
        </p>
      )}

      {resultados.versiculos.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 font-display text-2xl text-primary">Versículos</h2>
          <ul className="space-y-3">
            {resultados.versiculos.map((v) => (
              <li key={v.id} className="sacred-border rounded-xl bg-surface-container-low p-5">
                <p className="font-display text-lg italic leading-relaxed text-primary">«{v.texto}»</p>
                <div className="mt-3 flex items-center justify-between">
                  <a href={`/versiculo-del-dia#${v.id}`} className="font-label-md text-label-md text-secondary hover:text-primary">
                    {v.referencia}
                  </a>
                  <span className="font-caption text-caption text-on-surface-variant">{v.tema}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {resultados.libros.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 font-display text-2xl text-primary">Libros</h2>
          <ul className="space-y-2">
            {resultados.libros.map((l) => (
              <li key={l.slug}>
                <a
                  href={`/biblioteca/libros/${l.slug}`}
                  className="flex items-baseline justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md"
                >
                  <span className="font-body-md font-medium text-primary">{l.nombre}</span>
                  <span className="font-caption text-caption text-on-surface-variant">{l.genero} · {l.capitulos} capítulos</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {resultados.personajes.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-2xl text-primary">Personajes</h2>
          <ul className="space-y-2">
            {resultados.personajes.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/biblioteca/personajes/${p.slug}`}
                  className="flex items-baseline justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 ambient-shadow-sm transition-all hover:ambient-shadow-md"
                >
                  <span className="font-body-md font-medium text-primary">{p.nombre}</span>
                  <span className="font-caption text-caption text-on-surface-variant">{p.categoria} · {p.periodo}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
