import type { Metadata } from "next";
import LectorBiblico from "@/components/estudio/LectorBiblico";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Estudio Bíblico",
  description: "Lee la Biblia en línea con notas de estudio, contexto y herramientas de reflexión. Una experiencia de lectura guiada en español.",
  alternates: { canonical: "/estudio" },
};

export default function EstudioPage() {
  return (
    <main>
      <div className="mx-auto max-w-container-max px-margin-mobile pt-10 md:px-margin-desktop">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Estudio Bíblico" }]} />
        <header className="mt-6 mb-8 text-center">
          <h1 className="font-display text-4xl text-primary md:text-[48px]">Estudio Bíblico</h1>
          <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Explora la Palabra capítulo por capítulo, con notas de estudio que iluminan el texto y tu caminar diario.
          </p>
        </header>
      </div>
      <LectorBiblico />
    </main>
  );
}
