import type { Metadata } from "next";
import { herramientas, categoriasHerramientas } from "@/lib/data/herramientas";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Herramientas bíblicas",
  description:
    "Herramientas interactivas de estudio bíblico en español: buscador de versículos, quiz bíblico, planes de lectura, generador de oraciones y más.",
  alternates: { canonical: "/herramientas" },
};

const iconos: Record<string, React.ReactNode> = {
  search: (
    <path d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5Zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
  ),
  folded_hands: (
    <path d="M11 21.5 6 17a5.2 5.2 0 0 1-1.5-3.7C4.5 8 9 5 11.5 2.5c.3.6.6 1.2.9 1.9 2.4 2.6 6.6 5.3 6.6 9.3 0 1.4-.5 2.7-1.5 3.7l-5 4.5-1.5-1.4ZM11 6l-3 3c-1 1-1.5 2.1-1.5 3.4 0 2 1.4 3.5 2.3 4.4L11 16l2.2 1.8c.9-.9 2.3-2.4 2.3-4.4 0-1.3-.5-2.4-1.5-3.4l-3-3Z" />
  ),
  calendar_month: (
    <path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2Zm12 7V6h-2v2h-2V6H9v2H7V6H5v3h14Zm0 2H5v10h14V11ZM8 14h3v3H8v-3Zm5 0h3v3h-3v-3Z" />
  ),
  quiz: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 13h2v2h-2v-2Zm2-2.5h-2c0-2 1.5-2 2-3a1.5 1.5 0 1 0-2.6-1H9.3a3.5 3.5 0 1 1 5.2 3c-.8.6-1.5.9-1.5 2Z" />
  ),
  schedule: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3h2v5.6l4 4-1.4 1.4-4.6-4.6V7Z" />
  ),
  bookmarks: (
    <path d="M6 2h9a2 2 0 0 1 2 2v13l-4.5-3.4L8 17V4a2 2 0 0 1 2-2h-4Zm9 1.5H6V16l3.5-2.7L13 16V3.5Z" />
  ),
  timeline: (
    <path d="M4 2v15h16v2H2V2h2Zm18 2-4 4-4-4-4 4-4-4H2v2h3.4l4-4 4 4 4-4L22 4ZM5 10h2v2H5v-2Zm4 0h2v2H9v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z" />
  ),
  map: (
    <path d="M15 3 9.5 5 4 3v18l5.5 2L15 21l5.5-2V1L15 3Zm-9 16.5v-13l3.5 1.3v13L6 19.5Zm7 0-4-1.4v-13l4 1.4v13Zm7 .5-3.5 1.3v-13L20 8v12Zm-8-9h2v2h-2v-2Z" />
  ),
  account_tree: (
    <path d="M17 2a3 3 0 0 1 3 3c0 .6-.2 1.2-.5 1.7.9.5 1.5 1.4 1.5 2.3v3H11v3a3 3 0 1 1-2-.1V12H3V8.7A3 3 0 0 1 3 2a3 3 0 0 1 3 3c0 .6-.2 1.2-.5 1.7.2.2.4.3.5.3h6V5a3 3 0 0 1 5-2.2c.2-.3.4-.5.5-.8H17ZM5 2a1 1 0 0 0-1 1 1 1 0 0 0 2 0 1 1 0 0 0-1-1Zm12 0a1 1 0 0 0-1 1 1 1 0 0 0 2 0 1 1 0 0 0-1-1Zm-5 16a1 1 0 0 0-1 1 1 1 0 0 0 2 0 1 1 0 0 0-1-1Z" />
  ),
  spellcheck: (
    <path d="M12 3 2 20h4.2L12 9.4 17.8 20H22L12 3Zm0 6-2 4h4l-2-4Z" />
  ),
  compare_arrows: (
    <path d="M9 4 4 9h4v8h2V9h4L9 4Zm6 11V7h-2v8H9l5 5 5-5h-4Z" />
  ),
  local_florist: (
    <path d="M12 2a4 4 0 0 1 4 4c0 .6-.1 1.1-.4 1.6A3 3 0 0 1 19 9.5c0 .4-.1.8-.2 1.2 2-.6 4.2-.4 4.2 2.3 0 2.4-2 3.4-3.7 3.9 1.2 1.3.7 2.9-.5 3.6-.7.4-1.6.3-2.3-.3.7-.2 1.4-.4 2-1-.6-.4-1.5-.6-2.5-.6-.7 1.9-2.1 3.2-4 3.2-1.9 0-3.3-1.3-4-3.2-1 0-1.9.2-2.5.6.6.6 1.3.8 2 1-.7.6-1.6.7-2.3.3-1.2-.7-1.7-2.3-.5-3.6-1.7-.5-3.7-1.5-3.7-3.9 0-2.7 2.2-2.9 4.2-2.3a4.3 4.3 0 0 1-.2-1.2 3 3 0 0 1 3.4-2.9A4 4 0 0 1 12 2Z" />
  ),
};

export default function HerramientasPage() {
  return (
    <div className="mx-auto min-h-screen max-w-container-max px-margin-mobile pb-stack-lg pt-10 md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Herramientas" }]} />
      <section className="mb-10 mt-6 text-center">
        <h1 className="font-display text-4xl text-primary md:text-[48px]">Centro de recursos bíblicos</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Equipa tu caminar espiritual con herramientas enfocadas y minimalistas, diseñadas para el estudio profundo y la devoción diaria.
        </p>
      </section>

      {categoriasHerramientas.map((categoria) => {
        const items = herramientas.filter((h) => h.categoria === categoria);
        return (
          <section key={categoria} className="mb-12" aria-labelledby={`cat-${categoria}`}>
            <h2 id={`cat-${categoria}`} className="mb-6 font-display text-headline-md text-primary">
              {categoria}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((h) => (
                <article
                  key={h.slug}
                  className={`group flex flex-col rounded-xl bg-surface-container-lowest p-6 ambient-shadow-sm transition-shadow duration-300 hover:ambient-shadow-md ${h.slug === "buscador-versiculos" || h.slug === "generador-devocionales" ? "sacred-border" : ""}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                        {iconos[h.icono]}
                      </svg>
                    </div>
                    {h.popular && (
                      <span className="rounded-full bg-secondary-container px-2.5 py-0.5 font-caption text-caption font-medium text-on-secondary-container">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-display text-xl text-primary">{h.nombre}</h3>
                  <p className="mb-6 flex-grow font-body-md text-body-md text-on-surface-variant">{h.descripcion}</p>
                  {h.disponible ? (
                    <a
                      href={`/herramientas/${h.slug}`}
                      className="mt-auto w-full rounded-lg bg-primary py-3 text-center font-label-md text-label-md text-on-primary transition-all duration-200 hover:bg-primary-container active:scale-95"
                    >
                      Abrir herramienta
                    </a>
                  ) : (
                    <div className="w-full rounded-lg border border-dashed border-outline-variant py-3 text-center font-label-md text-label-md text-on-surface-variant">
                      Próximamente
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
