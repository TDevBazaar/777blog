"use client";

import { useMemo, useState } from "react";
import { libros } from "@/lib/data/libros";

export default function CalculadoraLectura() {
  const [slug, setSlug] = useState(libros[0].slug);
  const [velocidad, setVelocidad] = useState(250);

  const libro = libros.find((l) => l.slug === slug)!;

  const resultado = useMemo(() => {
    const minutos = Math.round((libro.capitulos * 4) / (velocidad / 250));
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return { minutos, texto: horas > 0 ? `${horas} h ${mins} min` : `${mins} min` };
  }, [libro, velocidad]);

  const bibliaCompleta = useMemo(() => {
    const total = libros.reduce((s, l) => s + l.capitulos, 0);
    const minutos = Math.round((total * 4) / (velocidad / 250));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    return { horas, dias, texto: dias > 0 ? `~${dias} días (${horas} horas)` : `~${horas} horas` };
  }, [velocidad]);

  return (
    <div>
      <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
        Estima cuánto tiempo te llevará leer cualquier libro de la Biblia, según tu ritmo de lectura.
      </p>

      <label className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase" htmlFor="libro-calculo">
        Elige un libro
      </label>
      <select
        id="libro-calculo"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="mb-6 w-full cursor-pointer rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface focus:border-tertiary-container focus:outline-none"
      >
        {libros.map((l) => (
          <option key={l.slug} value={l.slug}>
            {l.nombre} ({l.capitulos} cap.)
          </option>
        ))}
      </select>

      <label className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase" htmlFor="velocidad-lectura">
        Velocidad de lectura
      </label>
      <input
        id="velocidad-lectura"
        type="range"
        min={100}
        max={400}
        step={10}
        value={velocidad}
        onChange={(e) => setVelocidad(Number(e.target.value))}
        className="mb-2 w-full accent-[--color-secondary]"
      />
      <div className="mb-8 flex justify-between font-caption text-caption text-on-surface-variant">
        <span>100 palabras/min (pausado)</span>
        <span className="font-label-md text-secondary">{velocidad} palabras/min</span>
        <span>400 palabras/min (rápido)</span>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface-container-low p-6 text-center">
          <p className="font-caption text-caption uppercase tracking-wider text-on-surface-variant">{libro.nombre}</p>
          <p className="mt-1 font-display text-3xl text-primary">{resultado.texto}</p>
          <p className="font-caption text-caption text-on-surface-variant">{libro.capitulos} capítulos</p>
        </div>
        <div className="rounded-xl bg-primary p-6 text-center">
          <p className="font-caption text-caption uppercase tracking-wider text-on-primary/70">Toda la Biblia</p>
          <p className="mt-1 font-display text-3xl text-on-primary">{bibliaCompleta.texto}</p>
          <p className="font-caption text-caption text-on-primary/70">a tu ritmo actual</p>
        </div>
      </div>

      <p className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 font-caption text-caption text-on-surface-variant">
        Estimación basada en ~4 minutos por capítulo a 250 palabras por minuto (promedio en español). Tu tiempo real puede variar.
      </p>
    </div>
  );
}
