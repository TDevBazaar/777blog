import type { Metadata } from "next";
import Link from "next/link";
import { articulos, categoriasBlog } from "@/lib/data/articulos";
import { site } from "@/lib/site";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Artículos y devocionales",
  description:
    "Artículos, devocionales y estudios bíblicos en español: teología, vida cristiana, espiritualidad y reflexiones para tu crecimiento diario.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Artículos" }]} />
      <header className="mb-10 mt-6 text-center">
        <span className="font-label-md text-label-md tracking-widest text-secondary uppercase">El blog de Lumen</span>
        <h1 className="mt-2 font-display text-4xl text-primary md:text-[48px]">Artículos y devocionales</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Reflexiones, estudios bíblicos y sabiduría práctica para tu caminar diario con Dios.
        </p>
      </header>

      <nav aria-label="Categorías" className="mb-10 flex flex-wrap justify-center gap-2">
        <Link
          href="/blog"
          className="cursor-pointer rounded-full bg-primary px-4 py-1.5 font-label-md text-label-md text-on-primary"
        >
          Todos
        </Link>
        {categoriasBlog.map((c) => (
          <Link
            key={c}
            href={`/blog/categoria/${c.toLowerCase().replace(/ /g, "-")}`}
            className="cursor-pointer rounded-full bg-surface-container-low px-4 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            {c}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articulos.map((a) => (
          <ArticleCard key={a.slug} articulo={a} />
        ))}
      </div>
      <p className="mt-14 text-center font-caption text-caption text-on-surface-variant">
        {articulos.length} artículo{articulos.length !== 1 ? "s" : ""} publicado{articulos.length !== 1 ? "s" : ""} · {site.fullName}
      </p>
    </div>
  );
}
