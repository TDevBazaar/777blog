import type { Metadata } from "next";
import Link from "next/link";
import { versiculos, getVersiculoDelDia, formatFecha, temas } from "@/lib/data/versiculos";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Versículo del día",
  description:
    "Versículo del día con explicación y aplicación práctica. Una dosis diaria de la Palabra de Dios para tu crecimiento espiritual.",
  alternates: { canonical: "/versiculo-del-dia" },
  openGraph: {
    title: "Versículo del día · Lumen",
    description: "Reflexión y aplicación diaria de la Palabra de Dios.",
  },
};

export default function VersiculoDelDiaPage() {
  const versiculo = getVersiculoDelDia();
  const historico = versiculos.slice(-10).reverse();

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Versículo del día" }]} />
      <header className="mb-10 mt-6 text-center">
        <span className="font-label-md text-label-md tracking-widest text-secondary uppercase">Versículo del día</span>
        <h1 className="mt-2 font-display text-4xl text-primary md:text-[48px]">{formatFecha(new Date())}</h1>
      </header>

      <article
        id={versiculo.id}
        className="sacred-border ambient-shadow-md mx-auto max-w-3xl rounded-2xl bg-surface-container-lowest p-6 md:p-10"
      >
        <blockquote className="font-display text-verse-text leading-relaxed text-primary italic">
          «{versiculo.texto}»
        </blockquote>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant/30 pt-6">
          <div>
            <p className="font-display text-xl text-primary">{versiculo.referencia}</p>
            <span className="font-caption text-caption tracking-wider text-secondary uppercase">{versiculo.tema}</span>
          </div>
          <ShareButtons texto={`${versiculo.referencia}: «${versiculo.texto}»`} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl bg-surface-container-low p-5">
            <h2 className="mb-2 flex items-center gap-2 font-label-md font-bold text-label-md tracking-wider text-primary uppercase">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-secondary" fill="currentColor" aria-hidden="true">
                <path d="M12 3 4 6.5v5.2c0 4.4 3.3 8.6 8 9.8 4.7-1.2 8-5.4 8-9.8V6.5L12 3Zm0 2.1 6 2.5v4.1c0 3.5-2.5 6.9-6 7.9-3.5-1-6-4.4-6-7.9V7.6l6-2.5Z" />
                <path d="M11 8h2v6h-2zM11 15h2v2h-2z" />
              </svg>
              Explicación
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{versiculo.explicacion}</p>
          </section>
          <section className="rounded-xl bg-surface-container-low p-5">
            <h2 className="mb-2 flex items-center gap-2 font-label-md font-bold text-label-md tracking-wider text-primary uppercase">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-secondary" fill="currentColor" aria-hidden="true">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm1-13v4.6l3.2 3.2-1.4 1.4-3.8-3.8V8h2Z" />
              </svg>
              Aplicación
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{versiculo.aplicacion}</p>
          </section>
        </div>
      </article>

      <section className="mt-14" aria-labelledby="temas-titulo">
        <h2 id="temas-titulo" className="mb-4 font-display text-headline-md text-primary">
          Buscar por tema
        </h2>
        <div className="flex flex-wrap gap-2">
          {temas.map((t) => (
            <a
              key={t}
              href={`/busqueda?q=${encodeURIComponent(t)}`}
              className="cursor-pointer rounded-lg bg-surface-container-low px-3 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              {t}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="historico-titulo">
        <h2 id="historico-titulo" className="mb-6 font-display text-headline-md text-primary">
          Versículos recientes
        </h2>
        <ul className="space-y-3">
          {historico.map((v) => (
            <li key={v.id}>
              <a
                href={`/versiculo-del-dia#${v.id}`}
                className="group flex items-baseline justify-between gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-4 ambient-shadow-sm transition-all hover:ambient-shadow-md"
              >
                <span className="font-display text-lg text-primary transition-colors group-hover:text-secondary">
                  «{v.texto}»
                </span>
                <span className="shrink-0 font-label-md text-label-md text-on-surface-variant">{v.referencia}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 text-center">
        <Link href="/blog" className="rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary shadow-sm transition-transform duration-200 hover:scale-[0.98]">
          Leer más devocionales
        </Link>
      </section>
    </div>
  );
}
