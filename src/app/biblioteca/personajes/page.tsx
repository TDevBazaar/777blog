import type { Metadata } from "next";
import Link from "next/link";
import { libros } from "@/lib/data/libros";
import { personajes, categoriasPersonajes } from "@/lib/data/personajes";
import GridFiltrable from "@/components/biblioteca/GridFiltrable";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Biblioteca · Personajes bíblicos",
  description:
    "Personajes de la Biblia: patriarcas, profetas, reyes, apóstoles, jueces y mujeres de fe, con su historia, versículos clave y lección de vida.",
  alternates: { canonical: "/biblioteca/personajes" },
};

export default function PersonajesPage() {
  const items = personajes.map((p) => ({
    slug: p.slug,
    href: `/biblioteca/personajes/${p.slug}`,
    categoria: p.categoria,
    nombre: p.nombre,
    subtitulo: p.significado,
    descripcion: p.resumen,
    nota: p.periodo,
  }));

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Biblioteca", href: "/biblioteca" },
          { label: "Personajes" },
        ]}
      />
      <header className="mt-6 mb-8 text-center">
        <h1 className="font-display text-4xl text-primary md:text-[48px]">Personajes bíblicos</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Sus historias, sus versículos clave y la lección que Dios nos dejó en cada vida.
        </p>
      </header>

      <div className="mb-8 flex justify-center gap-3">
        <Link
          href="/biblioteca"
          className="rounded-full bg-surface-container-low px-6 py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          Libros ({libros.length})
        </Link>
        <Link
          href="/biblioteca/personajes"
          className="rounded-full bg-primary px-6 py-2.5 font-label-md text-label-md text-on-primary"
        >
          Personajes ({personajes.length})
        </Link>
      </div>

      <GridFiltrable items={items} filtros={categoriasPersonajes} etiquetaTodos="Todas" />
    </main>
  );
}
