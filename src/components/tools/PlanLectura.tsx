"use client";

import { useMemo, useState } from "react";
import { libros, librosAT, librosNT } from "@/lib/data/libros";

export default function PlanLectura() {
  const [porDia, setPorDia] = useState(3);
  const [alcance, setAlcance] = useState<"biblia" | "at" | "nt">("biblia");
  const [plan, setPlan] = useState<{ libro: string; inicio: number; fin: number; dias: number }[] | null>(null);

  const librosAlcance = alcance === "biblia" ? libros : alcance === "at" ? librosAT : librosNT;
  const capitulosTotal = librosAlcance.reduce((s, l) => s + l.capitulos, 0);
  const duracion = Math.ceil(capitulosTotal / porDia);

  const opcionesPorDia = [1, 2, 3, 4, 5, 10];

  function generar() {
    const plan: { libro: string; inicio: number; fin: number; dias: number }[] = [];
    let contador = 0;
    for (const libro of librosAlcance) {
      let desde = 1;
      let restantes = libro.capitulos;
      while (restantes > 0) {
        const hoy = Math.min(porDia, restantes);
        plan.push({ libro: `${libro.nombre} ${desde}-${desde + hoy - 1}`, inicio: contador, fin: contador + hoy - 1, dias: hoy });
        contador += hoy;
        desde += hoy;
        restantes -= hoy;
      }
    }
    setPlan(plan);
  }

  const resumen = useMemo(() => {
    if (!plan) return null;
    const total = plan.reduce((s, p) => s + p.dias, 0);
    return { total, semanas: Math.ceil(total / porDia / 7) };
  }, [plan, porDia]);

  if (plan && resumen) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-primary">Tu plan de lectura</h2>
            <p className="font-caption text-caption text-on-surface-variant">
              {resumen.total} días · ~{resumen.semanas} semana{resumen.semanas !== 1 ? "s" : ""} · {porDia} capítulo{porDia !== 1 ? "s" : ""}/día
            </p>
          </div>
          <button type="button" onClick={() => setPlan(null)} className="cursor-pointer font-label-md text-label-md text-secondary hover:text-primary">
            Personalizar
          </button>
        </div>
        <ol className="max-h-[420px] space-y-1 overflow-y-auto pr-2">
          {plan.map((p, i) => (
            <li key={i} className="flex items-baseline justify-between rounded-lg bg-surface-container-low px-4 py-2">
              <span className="font-body-md text-body-md text-primary">
                Día {p.inicio + 1}
                {p.dias > 1 ? `–${p.fin + 1}` : ""}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">{p.libro}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
        Crea un plan personalizado según tu ritmo: elige cuántos capítulos leerás al día y qué porción de la Biblia recorrerás.
      </p>
      <fieldset className="mb-6">
        <legend className="mb-3 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">Ritmo diario</legend>
        <div className="flex flex-wrap gap-2">
          {opcionesPorDia.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPorDia(n)}
              className={`cursor-pointer rounded-full px-4 py-2 font-label-md text-label-md transition-colors ${porDia === n ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              {n} capítulo{n !== 1 ? "s" : ""}/día
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mb-8">
        <legend className="mb-3 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">Alcance</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "biblia", nombre: "Toda la Biblia" },
              { id: "at", nombre: "Antiguo Testamento" },
              { id: "nt", nombre: "Nuevo Testamento" },
            ] as const
          ).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setAlcance(o.id)}
              className={`cursor-pointer rounded-full px-4 py-2 font-label-md text-label-md transition-colors ${alcance === o.id ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              {o.nombre}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mb-8 rounded-xl bg-surface-container-low p-5 text-center">
        <p className="font-display text-3xl text-primary">{capitulosTotal.toLocaleString("es")}</p>
        <p className="font-caption text-caption text-on-surface-variant">
          capítulos · terminarías en aproximadamente {duracion} día{duracion !== 1 ? "s" : ""} ({Math.ceil(duracion / 7)} semana{Math.ceil(duracion / 7) !== 1 ? "s" : ""})
        </p>
      </div>
      <button
        type="button"
        onClick={generar}
        className="w-full cursor-pointer rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98]"
      >
        Generar mi plan
      </button>
    </div>
  );
}
