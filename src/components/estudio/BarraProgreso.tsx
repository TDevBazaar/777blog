"use client";

export default function BarraProgreso({ leidos, total, etiqueta = "Progreso de lectura" }: { leidos: number[]; total: number; etiqueta?: string }) {
  const pct = total === 0 ? 0 : Math.round((leidos.length / total) * 100);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2 font-caption text-caption text-on-surface-variant">
        <span>{etiqueta}</span>
        <span>
          {leidos.length}/{total} capítulo{total !== 1 ? "s" : ""} · {pct}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
        <div className="h-full rounded-full bg-secondary transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
