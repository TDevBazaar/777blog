"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const datos = new FormData(e.currentTarget);
    await new Promise((r) => setTimeout(r, 700));
    const email = String(datos.get("email") ?? "");
    if (!email.includes("@")) {
      setEstado("error");
      return;
    }
    setEstado("ok");
  }

  if (estado === "ok") {
    return (
      <p className="rounded-xl bg-white/10 px-6 py-4 font-label-md text-label-md text-white" role="status">
        ¡Gracias por suscribirte! Recibirás el versículo del día cada mañana.
      </p>
    );
  }

  return (
    <form onSubmit={enviar} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">
        Correo electrónico
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="tu@correo.com"
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body-md text-body-md text-white placeholder:text-white/50 focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed focus:outline-none"
      />
      <button
        type="submit"
        disabled={estado === "enviando"}
        className="cursor-pointer rounded-xl bg-secondary px-6 py-3 font-label-md text-label-md text-on-secondary transition-transform duration-200 hover:scale-[0.98] disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Suscribirme"}
      </button>
      {estado === "error" && (
        <p className="font-caption text-caption text-error sm:col-span-2" role="alert">
          Verifica tu correo electrónico e inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
