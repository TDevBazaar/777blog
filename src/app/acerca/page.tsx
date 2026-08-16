import type { Metadata } from "next";
import { site } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Acerca de Lumen",
  description: "Lumen es un estudio bíblico digital en español: versículo del día, lectura guiada, herramientas de fe y contenido para crecer en la Palabra.",
  alternates: { canonical: "/acerca" },
};

export default function AcercaPage() {
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Acerca de Lumen" }]} />
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl text-primary md:text-[48px]">Acerca de {site.name}</h1>
          <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {site.name} nace con una misión sencilla: acercar la Palabra de Dios a cada persona que la busca, en su idioma y a su ritmo.
          </p>
        </header>

        <section className="mb-10 space-y-6">
          <h2 className="font-display text-2xl text-primary">Nuestra misión</h2>
          <p className="font-body-lg text-body-lg leading-[1.75] text-on-surface">
            Creemos que la Biblia es viva y eficaz, y que nadie debería quedarse sin acceso a ella. Por eso construimos {site.name} como un
            santuario digital: un lugar sereno donde el versículo del día, la lectura guiada y las herramientas de estudio te ayudan a
            encontrarte con Dios cada día.
          </p>
        </section>

        <section className="mb-10 space-y-6">
          <h2 className="font-display text-2xl text-primary">Qué encontrarás aquí</h2>
          <ul className="space-y-3 font-body-lg text-body-lg text-on-surface">
            {[
              ["Versículo del día", "Una porción de la Palabra con explicación y aplicación práctica para tu caminar diario."],
              ["Estudio bíblico", "Lectura capítulo por capítulo con notas que iluminan el contexto, el texto y la vida."],
              ["Biblioteca", "Los 66 libros de la Biblia con resúmenes, autores y personajes que marcaron la historia de la salvación."],
              ["Herramientas", "Buscador de versículos, generador de oraciones, quiz bíblico, planes de lectura y más."],
              ["Artículos", "Reflexiones y estudios que profundizan en temas de fe para la vida cotidiana."],
            ].map(([titulo, texto]) => (
              <li key={titulo} className="flex gap-4">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-primary">{titulo}.</strong> {texto}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 space-y-6">
          <h2 className="font-display text-2xl text-primary">Nuestros principios</h2>
          <ul className="space-y-3 font-body-lg text-body-lg text-on-surface">
            {[
              ["Fidelidad al texto", "Usamos versiones de dominio público (RVR1960) y presentamos la Palabra sin manipulación."],
              ["Simplicidad sagrada", "Un diseño sereno y libre de distracciones, para que nada compita con la Palabra."],
              ["Accesible para todos", "Gratuito, rápido y disponible en cualquier dispositivo, sin barreras."],
              ["Honestidad", "Indicamos claramente qué contenido es bíblico y cuál es nuestra reflexión personal."],
            ].map(([titulo, texto]) => (
              <li key={titulo} className="flex gap-4">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-primary">{titulo}.</strong> {texto}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-primary p-8 text-center">
          <h2 className="font-display text-2xl text-on-primary">¿Dudas o sugerencias?</h2>
          <p className="mt-2 font-body-md text-body-md text-on-primary/80">
            Nos encantaría escucharte. Escríbenos y te responderemos lo antes posible.
          </p>
          <a href="/contacto" className="mt-5 inline-block rounded-lg bg-secondary px-8 py-3 font-label-md text-label-md text-on-secondary transition-transform hover:scale-[0.98]">
            Contactar con {site.name}
          </a>
        </section>
      </article>
    </main>
  );
}
