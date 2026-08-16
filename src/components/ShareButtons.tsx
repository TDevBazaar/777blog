"use client";

import { useState } from "react";

export default function ShareButtons({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  async function compartir() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lumen · Estudio Bíblico", text: texto, url });
        return;
      } catch {
        /* cancelado */
      }
    }
    copiarEnlace();
  }

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin permiso de portapapeles */
    }
  }

  const base = "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface-container text-primary shadow-sm transition-all hover:bg-secondary hover:text-white hover:shadow-md";

  return (
    <div className="flex gap-3">
      <button type="button" aria-label="Compartir en X (Twitter)" onClick={compartir} className={base}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M8.29 20.25c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.35 8.35 0 0 0 22 5.92a8.19 8.19 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6 1 4.1 4.1 0 0 0-6.99 3.74 11.65 11.65 0 0 1-8.46-4.29 4.1 4.1 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.71v.05a4.1 4.1 0 0 0 3.3 4.02 4.1 4.1 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84Z" />
        </svg>
      </button>
      <button type="button" aria-label="Compartir en Facebook" onClick={compartir} className={base}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12Z" />
        </svg>
      </button>
      <button type="button" aria-label="Copiar enlace" onClick={copiarEnlace} className={base}>
        {copiado ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M10.6 13.4a1 1 0 0 0 1.4 1.4l2.9-2.9a5 5 0 0 0 0-7.1l-1.4-1.4a5 5 0 0 0-7.1 0l-2.9 2.9a1 1 0 0 0 1.4 1.4l2.9-2.9a3 3 0 0 1 4.3 0l1.4 1.4a3 3 0 0 1 0 4.3l-2.9 2.9Zm2.8-2.8a1 1 0 0 0-1.4-1.4l-2.9 2.9a5 5 0 0 0 0 7.1l1.4 1.4a5 5 0 0 0 7.1 0l2.9-2.9a1 1 0 0 0-1.4-1.4l-2.9 2.9a3 3 0 0 1-4.3 0l-1.4-1.4a3 3 0 0 1 0-4.3l2.9-2.9Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
