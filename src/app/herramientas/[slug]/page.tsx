import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { herramientas, getHerramienta } from "@/lib/data/herramientas";
import Breadcrumbs from "@/components/Breadcrumbs";
import BuscadorVersiculos from "@/components/tools/BuscadorVersiculos";
import QuizBiblico from "@/components/tools/QuizBiblico";
import GeneradorOracion from "@/components/tools/GeneradorOracion";
import PlanLectura from "@/components/tools/PlanLectura";
import CalculadoraLectura from "@/components/tools/CalculadoraLectura";
import Favoritos from "@/components/tools/Favoritos";

export function generateStaticParams() {
  return herramientas.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const herramienta = getHerramienta(slug);
  if (!herramienta) return {};
  return {
    title: herramienta.nombre,
    description: herramienta.descripcion,
    alternates: { canonical: `/herramientas/${herramienta.slug}` },
  };
}

const componentes: Record<string, React.ComponentType> = {
  "buscador-versiculos": BuscadorVersiculos,
  "quiz-biblico": QuizBiblico,
  "generador-oraciones": GeneradorOracion,
  "planes-lectura": PlanLectura,
  "calculadora-lectura": CalculadoraLectura,
  favoritos: Favoritos,
};

export default async function HerramientaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const herramienta = getHerramienta(slug);
  if (!herramienta) notFound();
  const Componente = componentes[slug];

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Herramientas", href: "/herramientas" },
          { label: herramienta.nombre },
        ]}
      />
      <header className="mb-10 mt-6 text-center">
        <h1 className="font-display text-4xl text-primary md:text-[48px]">{herramienta.nombre}</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">{herramienta.descripcion}</p>
      </header>

      {Componente ? (
        <div className="ambient-shadow-sm mx-auto max-w-3xl rounded-2xl bg-surface-container-lowest p-6 md:p-10">
          <Componente />
        </div>
      ) : (
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-outline-variant p-10 text-center">
          <p className="font-display text-2xl text-primary">Próximamente</p>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Esta herramienta está en construcción. Mientras tanto, explora las demás herramientas del santuario.
          </p>
          <Link href="/herramientas" className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary">
            Ver todas las herramientas
          </Link>
        </div>
      )}
    </div>
  );
}
