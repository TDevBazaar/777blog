import type { Metadata } from "next";
import Link from "next/link";
import { getVersiculoDelDia } from "@/lib/data/versiculos";
import { articulos } from "@/lib/data/articulos";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import ArticleCard from "@/components/ArticleCard";
import ScriptureCard from "@/components/ScriptureCard";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: `${site.name} · Estudio Bíblico, Versículo del Día y Devocionales`,
  description: site.description,
  alternates: { canonical: "/" },
};

const categoriasBento = [
  {
    href: "/estudio",
    titulo: "Estudio bíblico",
    descripcion: "Sumérgete en las Escrituras con herramientas interactivas.",
    imagen: "/images/categoria-estudio.svg",
    alt: "Biblia abierta iluminada",
    grande: true,
  },
  {
    href: "/blog?categoria=Devocional",
    titulo: "Devocionales diarios",
    descripcion: "Inspiración para tu caminar diario.",
    icono: "corazon",
    fondo: "bg-surface-container-low",
  },
  {
    href: "/blog?categoria=Espiritualidad",
    titulo: "Centro de oración",
    descripcion: "Oraciones y guía para tu comunión con Dios.",
    icono: "manos",
    fondo: "bg-primary-container",
    claro: true,
  },
  {
    href: "/herramientas",
    titulo: "Herramientas bíblicas",
    descripcion: "Buscador, quiz, planes de lectura y más.",
    imagen: "/images/categoria-herramientas.svg",
    alt: "Herramientas de estudio bíblico",
  },
  {
    href: "/herramientas/planes-lectura",
    titulo: "Planes de lectura",
    descripcion: "Caminos guiados a través de la Palabra.",
    imagen: "/images/categoria-planes.svg",
    alt: "Calendario de planes de lectura",
  },
];

function IconoBento({ icono, claro }: { icono: string; claro?: boolean }) {
  const color = claro ? "text-primary-fixed" : "text-secondary";
  if (icono === "corazon") {
    return (
      <svg viewBox="0 0 24 24" className={`h-6 w-6 ${color}`} fill="currentColor" aria-hidden="true">
        <path d="M12 21C7 16.5 2 12.8 2 8.7 2 5.8 4.2 4 6.6 4c1.7 0 3.3.9 4.4 2.4l1 1.3 1-1.3C14.1 4.9 15.7 4 17.4 4 19.8 4 22 5.8 22 8.7c0 4.1-5 7.8-10 12.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={`h-6 w-6 ${color}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21C8 17 4 13.5 4 10a4 4 0 0 1 8-1.5A4 4 0 0 1 20 10c0 3.5-4 7-8 11Z" />
      <path d="M12 5V2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function InicioPage() {
  const versiculo = getVersiculoDelDia();
  const recientes = articulos.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.fullName,
            url: site.url,
            inLanguage: "es",
            description: site.description,
          }),
        }}
      />
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="absolute inset-0 z-0 bg-surface-container-highest">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply dark:opacity-20"
            style={{ backgroundImage: "url(/images/hero.svg)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" aria-hidden="true" />
        </div>
        <div className="relative z-20 mx-auto mt-6 flex max-w-4xl flex-col items-center gap-6 text-center">
          <span className="font-label-md text-label-md tracking-widest text-secondary uppercase">El santuario digital</span>
          <h1 className="font-display text-4xl leading-tight text-primary md:text-[56px]">
            Ilumina tu alma <br className="hidden md:block" />
            con sabiduría sagrada
          </h1>
          <p className="mb-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            El santuario digital para el estudio bíblico profundo y el crecimiento espiritual diario. Descubre claridad y paz en la Palabra.
          </p>
          <ScriptureCard versiculo={versiculo} enlace={`/versiculo-del-dia#${versiculo.id}`} />
          <div className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="/estudio"
              className="rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary shadow-sm transition-transform duration-200 hover:scale-[0.98]"
            >
              Comenzar a leer
            </a>
            <a
              href="/versiculo-del-dia"
              className="rounded-lg border border-secondary bg-transparent px-8 py-3 font-label-md text-label-md text-secondary transition-colors duration-200 hover:bg-secondary/5"
            >
              Versículo del día
            </a>
          </div>
          <div className="relative mt-8 w-full max-w-xl">
            <form action="/busqueda" method="get" className="ambient-shadow-md group relative rounded-2xl bg-white p-2" role="search">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                name="q"
                type="search"
                placeholder="Busca un pasaje, tema o palabra clave…"
                className="w-full rounded-r-2xl bg-transparent px-2 py-3 pl-11 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-xl bg-tertiary-container p-3 text-on-tertiary-container transition-colors hover:bg-tertiary"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M13 19a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm5.3-1.7 3 3-1.4 1.4-3-3a8 8 0 1 1 1.4-1.4Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-container-max flex-col gap-[80px] px-margin-mobile py-stack-lg md:px-margin-desktop">
        <section className="w-full" aria-labelledby="explorar-titulo">
          <div className="mb-6 flex items-end justify-between">
            <h2 id="explorar-titulo" className="font-display text-headline-md text-primary">
              Explora el santuario
            </h2>
          </div>
          <div className="grid auto-rows-[200px] grid-cols-1 gap-6 md:grid-cols-3">
            {categoriasBento.map((c) => {
              const base = c.grande
                ? "md:col-span-2 md:row-span-2"
                : "";
              if (c.imagen) {
                return (
                  <a
                    key={c.titulo}
                    href={c.href}
                    className={`group relative overflow-hidden rounded-2xl ambient-shadow-sm transition-all duration-300 hover:ambient-shadow-md ${base}`}
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${c.imagen})` }} aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 p-6">
                      <h3 className="font-display text-2xl text-white">{c.titulo}</h3>
                      <p className="font-body-md text-body-md text-white/80">{c.descripcion}</p>
                    </div>
                  </a>
                );
              }
              return (
                <a
                  key={c.titulo}
                  href={c.href}
                  className={`group flex flex-col justify-between rounded-2xl p-6 ambient-shadow-sm border border-transparent transition-all duration-300 hover:border-outline-variant/30 ${c.fondo} ${base}`}
                >
                  <div className="w-fit rounded-xl bg-surface p-3 shadow-sm">
                    <IconoBento icono={c.icono!} claro={c.claro} />
                  </div>
                  <div>
                    <h3 className={`font-display text-xl mb-1 ${c.claro ? "text-white" : "text-primary"}`}>{c.titulo}</h3>
                    <p className={`font-caption text-caption ${c.claro ? "text-white/70" : "text-on-surface-variant"}`}>{c.descripcion}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="w-full" aria-labelledby="recientes-titulo">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 id="recientes-titulo" className="font-display text-headline-md text-primary">
                Artículos recientes
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Reflexiones y estudios para tu vida espiritual.</p>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1 font-label-md text-label-md text-tertiary-container transition-colors hover:text-tertiary md:flex"
            >
              Ver todos
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M4 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="no-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-6 overflow-x-auto px-margin-mobile pb-2 md:mx-0 md:px-0">
            {recientes.map((a) => (
              <ArticleCard key={a.slug} articulo={a} horizontal />
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-4 flex items-center gap-1 font-label-md text-label-md text-tertiary-container transition-colors hover:text-tertiary md:hidden"
          >
            Ver todos los artículos
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M4 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </section>

        <section className="ambient-shadow-sm relative overflow-hidden rounded-3xl bg-primary-container px-6 py-14 text-center md:px-12">
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4">
            <span className="font-label-md text-label-md tracking-widest text-primary-fixed uppercase">Carta de la mañana</span>
            <h2 className="font-display text-3xl text-white md:text-4xl">Recibe el versículo del día</h2>
            <p className="font-body-md text-body-md text-white/75">
              Un versículo, una reflexión y una aplicación práctica cada mañana, directo en tu correo.
            </p>
            <NewsletterForm />
          </div>
        </section>

        <section className="w-full" aria-label="Marcas que nos inspiran">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Logo compact />
            <p className="font-caption text-caption text-on-surface-variant">
              {site.slogan}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
