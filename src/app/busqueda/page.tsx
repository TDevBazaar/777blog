import type { Metadata } from "next";
import ResultadosBusqueda from "@/components/busqueda/ResultadosBusqueda";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Búsqueda",
  description: "Busca versículos, libros, artículos, personajes y herramientas en Lumen.",
  alternates: { canonical: "/busqueda" },
};

export default function BusquedaPage() {
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Búsqueda" }]} />
      <header className="mt-6 mb-10 text-center">
        <h1 className="font-display text-4xl text-primary md:text-[48px]">Buscar</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Encuentra pasajes, libros, artículos, personajes y herramientas en todo Lumen.
        </p>
      </header>
      <ResultadosBusqueda />
    </main>
  );
}
