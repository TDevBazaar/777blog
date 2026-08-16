import type { Versiculo } from "@/lib/data/versiculos";

export default function ScriptureCard({ versiculo, enlace }: { versiculo: Versiculo; enlace?: string }) {
  const contenido = (
    <div className="flex flex-col gap-3 text-left">
      <span className="flex items-center gap-2 font-label-md text-label-md tracking-wider text-secondary uppercase">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
          <path d="M6.8 3.5C5 3.5 3.5 4.9 3.5 6.7v12.6c0 .4.5.7.9.5l1.2-.6a1.5 1.5 0 0 1 1.2 0l1.5.7c.4.2.9 0 1.1-.4l.6-1.2V5.4C9.9 4.3 8.5 3.5 6.8 3.5Zm10.4 0c1.8 0 3.3 1.4 3.3 3.2v12.6c0 .4-.5.7-.9.5l-1.2-.6a1.5 1.5 0 0 0-1.2 0l-1.5.7c-.4.2-.9 0-1.1-.4l-.6-1.2V5.4c.1-1.1 1.5-1.9 3.2-1.9Z" />
        </svg>
        Versículo del día
      </span>
      <blockquote className="font-display text-verse-text italic leading-relaxed text-primary">
        «{versiculo.texto}»
      </blockquote>
      <div className="mt-1 flex items-end justify-between">
        <p className="font-display text-lg text-on-surface-variant">{versiculo.referencia}</p>
        {enlace && (
          <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary-container transition-colors hover:text-tertiary">
            Leer explicación
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="sacred-border ambient-shadow-md my-3 flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-surface-container-lowest/80 p-6 text-left backdrop-blur-sm transition-shadow duration-300 hover:ambient-shadow-sm md:p-8">
      {contenido}
    </div>
  );
}
