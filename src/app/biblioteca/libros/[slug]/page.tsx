import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLibro, getLibroAnterior, getLibroSiguiente, libros } from "@/lib/data/libros";
import { capitulosDisponibles } from "@/lib/data/capitulos";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return libros.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const libro = getLibro(slug);
  if (!libro) return {};
  return {
    title: `Libro de ${libro.nombre} | Resumen, autor y contexto`,
    description: libro.resumen,
    alternates: { canonical: `/biblioteca/libros/${libro.slug}` },
    openGraph: {
      title: `${libro.nombre} (${libro.abreviacion}) — Lumen`,
      description: libro.resumen,
    },
  };
}

export default async function LibroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const libro = getLibro(slug);
  if (!libro) notFound();

  const anterior = getLibroAnterior(libro);
  const siguiente = getLibroSiguiente(libro);
  const disponibles = capitulosDisponibles[libro.slug] ?? [];

  const esAT = libro.testamento === "Antiguo Testamento";

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: libro.nombre,
    about: `Libro de la Biblia: ${libro.genero}`,
    author: { "@type": "Person", name: libro.autor },
    inLanguage: "es",
    numberOfPages: undefined,
    url: `https://lumenbiblico.com/biblioteca/libros/${libro.slug}`,
  };

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Biblioteca", href: "/biblioteca" },
          { label: libro.nombre },
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <p className="font-label-md text-label-md uppercase tracking-widest text-secondary">
            {libro.testamento} · {libro.genero}
          </p>
          <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">{libro.nombre}</h1>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">{libro.resumen}</p>
        </header>

        <div className="mb-10 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-2xl text-primary">{libro.capitulos}</p>
            <p className="font-caption text-caption text-on-surface-variant">capítulos</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-2xl text-primary">{esAT ? libros.filter((l) => l.orden <= 39).length : "27"}</p>
            <p className="font-caption text-caption text-on-surface-variant">posición {esAT ? "en el AT" : "en el NT"}</p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-2xl text-primary">{libro.autor}</p>
            <p className="font-caption text-caption text-on-surface-variant">autor</p>
          </div>
        </div>

        <div className="mb-10 rounded-2xl bg-primary p-6 text-center">
          <p className="font-body-md text-body-md text-on-primary/80">
            Lee {libro.nombre} completo, capítulo por capítulo
          </p>
          <Link
            href={`/estudio?libro=${libro.slug}&capitulo=1`}
            className="mt-3 inline-block rounded-lg bg-secondary px-6 py-2.5 font-label-md text-label-md text-on-secondary transition-transform hover:scale-[0.98]"
          >
            Ir al estudio bíblico
          </Link>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 font-display text-2xl text-primary">Capítulos del libro</h2>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: libro.capitulos }, (_, i) => i + 1).map((n) => {
              const disponible = disponibles.includes(n);
              return (
                <Link
                  key={n}
                  href={`/estudio?libro=${libro.slug}&capitulo=${n}`}
                  title={`Leer ${libro.nombre} capítulo ${n}${disponible ? " · con notas de estudio" : ""}`}
                  className={`inline-flex h-9 w-9 items-center justify-center gap-0.5 rounded-lg font-label-md text-label-md transition-colors ${
                    disponible
                      ? "bg-secondary text-on-secondary hover:bg-secondary-container"
                      : "bg-surface-container-low text-primary hover:bg-secondary/20"
                  }`}
                >
                  {n}
                  {disponible && <span className="text-[10px]">★</span>}
                </Link>
              );
            })}
          </div>
          <p className="mt-3 font-caption text-caption text-on-surface-variant">
            Cada capítulo se abre en el estudio bíblico, donde puedes cambiar de traducción y guardar favoritos.
            {disponibles.length > 0 && <> ★ Capítulos con notas de estudio: {disponibles.join(", ")}</>}
          </p>
        </div>

        <div className="mb-12 flex items-center justify-between">
          {anterior ? (
            <Link href={`/biblioteca/libros/${anterior.slug}`} className="max-w-[45%]">
              <p className="font-caption text-caption text-on-surface-variant">← Anterior</p>
              <p className="font-label-md font-semibold text-primary hover:text-secondary">{anterior.nombre}</p>
            </Link>
          ) : <span />}
          {siguiente && (
            <Link href={`/biblioteca/libros/${siguiente.slug}`} className="text-right">
              <p className="font-caption text-caption text-on-surface-variant">Siguiente →</p>
              <p className="font-label-md font-semibold text-primary hover:text-secondary">{siguiente.nombre}</p>
            </Link>
          )}
        </div>
      </article>
      <JsonLd data={jsonld} />
    </main>
  );
}
