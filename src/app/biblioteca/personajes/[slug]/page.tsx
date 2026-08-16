import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { personajes, getPersonaje } from "@/lib/data/personajes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return personajes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const personaje = getPersonaje(slug);
  if (!personaje) return {};
  return {
    title: `${personaje.nombre} — significado, historia y lección de vida`,
    description: personaje.resumen,
    alternates: { canonical: `/biblioteca/personajes/${personaje.slug}` },
  };
}

export default async function PersonajePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const personaje = getPersonaje(slug);
  if (!personaje) notFound();

  const mismos = personajes.filter((p) => p.categoria === personaje.categoria && p.slug !== personaje.slug).slice(0, 3);

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personaje.nombre,
    description: personaje.resumen,
    nationality: "Bíblico",
  };

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Biblioteca", href: "/biblioteca" },
          { label: "Personajes", href: "/biblioteca/personajes" },
          { label: personaje.nombre },
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <p className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            {personaje.categoria} · {personaje.periodo}
          </p>
          <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">{personaje.nombre}</h1>
          <p className="mt-2 font-body-lg italic text-on-surface-variant">«{personaje.significado}»</p>
        </header>

        <p className="mb-6 font-body-lg text-body-lg text-on-surface">{personaje.resumen}</p>

        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl text-primary">Su historia</h2>
          <p className="font-body-lg leading-[1.75] text-on-surface">{personaje.historia}</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl text-primary">Versículos clave</h2>
          <div className="space-y-3">
            {personaje.versiculosClave.map((v, i) => (
              <figure key={i} className="sacred-border rounded-xl bg-surface-container-low p-5">
                <blockquote className="font-display text-verse-text italic leading-relaxed text-primary">«{v.texto}»</blockquote>
                <figcaption className="mt-3 font-label-md text-label-md text-secondary">{v.referencia}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl bg-secondary/10 p-6">
          <h2 className="mb-2 font-display text-2xl text-primary">Lección de vida</h2>
          <p className="font-body-lg text-body-lg text-on-surface">{personaje.leccion}</p>
        </section>

        {mismos.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-2xl text-primary">Otros {personaje.categoria.toLowerCase()}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {mismos.map((p) => (
                <a
                  key={p.slug}
                  href={`/biblioteca/personajes/${p.slug}`}
                  className="rounded-xl bg-surface-container-lowest p-4 ambient-shadow-sm transition-all hover:ambient-shadow-md"
                >
                  <p className="font-label-md font-semibold text-primary">{p.nombre}</p>
                  <p className="mt-1 line-clamp-2 font-caption text-caption text-on-surface-variant">{p.resumen}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
      <JsonLd data={jsonld} />
    </main>
  );
}
