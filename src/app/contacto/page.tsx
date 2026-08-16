import type { Metadata } from "next";
import { site } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribe a Lumen: sugerencias, correcciones, preguntas o simplemente saludar.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
      <article className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl text-primary md:text-[48px]">Contacto</h1>
          <p className="mx-auto mt-3 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            ¿Encontraste un error, tienes una sugerencia o quieres contarnos cómo {site.name} te ha ayudado? Escríbenos.
          </p>
        </header>

        <form className="space-y-6 rounded-2xl bg-surface-container-lowest p-8 ambient-shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@correo.com"
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="asunto" className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
              Asunto
            </label>
            <select
              id="asunto"
              name="asunto"
              className="w-full cursor-pointer rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:outline-none"
            >
              <option>Sugerencia</option>
              <option>Reportar un error</option>
              <option>Pregunta sobre la fe</option>
              <option>Colaboración</option>
              <option>Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="mensaje" className="mb-2 block font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={6}
              placeholder="Cuéntanos en qué podemos ayudarte…"
              className="w-full resize-y rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-secondary focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full cursor-pointer rounded-lg bg-primary py-3.5 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.99]">
            Enviar mensaje
          </button>
          <p className="text-center font-caption text-caption text-on-surface-variant">
            El formulario requiere configuración de backend o un servicio como Formspree. Por ahora puedes escribirnos a{" "}
            <a href={`mailto:${site.email}`} className="text-secondary hover:text-primary">
              {site.email}
            </a>.
          </p>
        </form>
      </article>
    </main>
  );
}
