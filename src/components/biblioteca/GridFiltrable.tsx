"use client";

import { useMemo, useState } from "react";

export type ItemFiltrable = {
  slug: string;
  href: string;
  categoria: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  nota: string;
};

export default function GridFiltrable({ items, filtros, etiquetaTodos = "Todos" }: { items: ItemFiltrable[]; filtros: string[]; etiquetaTodos?: string }) {
  const [activo, setActivo] = useState("");
  const visibles = useMemo(() => (activo ? items.filter((i) => i.categoria === activo) : items), [activo, items]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActivo("")}
          className={`cursor-pointer rounded-full px-4 py-1.5 font-caption text-caption transition-colors ${
            activo === "" ? "bg-secondary text-on-secondary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          {etiquetaTodos}
        </button>
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActivo(activo === f ? "" : f)}
            className={`cursor-pointer rounded-full px-4 py-1.5 font-caption text-caption transition-colors ${
              activo === f ? "bg-secondary text-on-secondary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((i) => (
          <a
            key={i.slug}
            href={i.href}
            className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 ambient-shadow-sm transition-all hover:ambient-shadow-md"
          >
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-caption text-caption uppercase tracking-wider text-secondary">{i.categoria}</span>
                <span className="font-caption text-caption text-on-surface-variant">{i.nota}</span>
              </div>
              <h2 className="font-display text-2xl text-primary transition-colors group-hover:text-secondary">{i.nombre}</h2>
              <p className="mt-1 font-caption text-caption italic text-on-surface-variant">{i.subtitulo}</p>
              <p className="mt-3 line-clamp-3 font-body-md text-body-md text-on-surface-variant">{i.descripcion}</p>
            </div>
            <p className="mt-4 font-label-md text-label-md text-secondary">Ver detalle →</p>
          </a>
        ))}
      </div>
    </div>
  );
}
