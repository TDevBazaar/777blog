import type { Metadata } from "next";
import Link from "next/link";
import { libros, generos } from "@/lib/data/libros";
import { personajes } from "@/lib/data/personajes";
import GridFiltrable from "@/components/biblioteca/GridFiltrable";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Biblioteca · Libros de la Biblia",
  description:
    "Los 66 libros de la Biblia con resumen, autor, género y contexto. Explora el Antiguo y el Nuevo Testamento en Lumen.",
  alternates: { canonical: "/biblioteca" },
};

export default function BibliotecaPage() {
  const items = libros.map((l) => ({
    slug: l.slug,
    href: `/biblioteca/libros/${l.slug}`,
    categoria: l.genero,
    nombre: l.nombre,
    subtitulo: l.autor,
    descripcion: l.resumen,
    nota: `${l.capitulos} cap.`,
  }));

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Biblioteca" }]} />
      <header className="mt-6 mb-8 text-center">
        <h1 className="font-display text-4xl text-primary md:text-[48px]">Biblioteca</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Los 66 libros de la Biblia y los personajes que Dios usó para escribir su historia.
        </p>
      </header>

      <div className="mb-8 flex justify-center gap-3">
        <Link
          href="/biblioteca"
          className="rounded-full bg-primary px-6 py-2.5 font-label-md text-label-md text-on-primary"
        >
          Libros ({libros.length})
        </Link>
        <Link
          href="/biblioteca/personajes"
          className="rounded-full bg-surface-container-low px-6 py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          Personajes ({personajes.length})
        </Link>
      </div>

      <GridFiltrable items={items} filtros={generos} />
    </main>
  );
}
