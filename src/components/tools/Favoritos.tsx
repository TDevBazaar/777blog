"use client";

import { useEffect, useMemo, useState } from "react";
import { versiculos } from "@/lib/data/versiculos";

const STORAGE_KEY = "lumen-favoritos";

type Favorito = { id: string; ref?: string; texto?: string; agregado: number };

function cargar(): Favorito[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Favorito[]) : [];
  } catch {
    return [];
  }
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setFavoritos(cargar()));
    return () => cancelAnimationFrame(id);
  }, []);

  const curados = useMemo(() => {
    const ids = new Set(favoritos.map((f) => f.id));
    return versiculos.filter((v) => ids.has(v.id));
  }, [favoritos]);

  const personalizados = useMemo(
    () => favoritos.filter((f) => f.texto && f.ref && !versiculos.some((v) => v.id === f.id)),
    [favoritos],
  );

  const total = curados.length + personalizados.length;

  function quitar(id: string) {
    const nuevos = favoritos.filter((f) => f.id !== id);
    setFavoritos(nuevos);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
  }

  function limpiar() {
    setFavoritos([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  if (total === 0) {
    return (
      <div className="py-8 text-center">
        <p className="font-display text-2xl text-primary">Aún no tienes favoritos</p>
        <p className="mx-auto mt-3 max-w-md font-body-md text-body-md text-on-surface-variant">
          Toca el corazón en cualquier versículo del Estudio Bíblico o del Versículo del Día para guardar tus pasajes favoritos. Se
          almacenan solo en tu dispositivo.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-label-md text-label-md text-on-surface-variant">
          {total} versículo{total !== 1 ? "s" : ""} guardado{total !== 1 ? "s" : ""}
        </p>
        <button type="button" onClick={limpiar} className="cursor-pointer font-label-md text-label-md text-error hover:opacity-80">
          Vaciar lista
        </button>
      </div>
      <ul className="space-y-3">
        {personalizados.map((f) => (
          <li key={f.id} className="sacred-border rounded-xl bg-surface-container-low p-5">
            <p className="font-display text-lg italic leading-relaxed text-primary">«{f.texto}»</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-label-md text-label-md text-secondary">{f.ref}</span>
              <button
                type="button"
                onClick={() => quitar(f.id)}
                className="cursor-pointer font-caption text-caption text-on-surface-variant hover:text-error"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
        {curados.map((v) => (
          <li key={v.id} className="sacred-border rounded-xl bg-surface-container-low p-5">
            <p className="font-display text-lg italic leading-relaxed text-primary">«{v.texto}»</p>
            <div className="mt-3 flex items-center justify-between">
              <a href={`/versiculo-del-dia#${v.id}`} className="font-label-md text-label-md text-secondary hover:text-primary">
                {v.referencia}
              </a>
              <button
                type="button"
                onClick={() => quitar(v.id)}
                className="cursor-pointer font-caption text-caption text-on-surface-variant hover:text-error"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
