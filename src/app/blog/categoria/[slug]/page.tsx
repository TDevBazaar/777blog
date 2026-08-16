import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categoriasBlog, getArticulosPorCategoria } from "@/lib/data/articulos";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return categoriasBlog.map((categoria) => ({ slug: categoria.toLowerCase().replace(/ /g, "-") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoria = categoriasBlog.find((c) => c.toLowerCase().replace(/ /g, "-") === slug);
  if (!categoria) return {};
  return {
    title: `Artículos de ${categoria}`,
    description: `Devocionales, estudios y reflexiones sobre ${categoria.toLowerCase()} en Lumen, tu plataforma de estudio bíblico.`,
    alternates: { canonical: `/blog/categoria/${slug}` },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoria = categoriasBlog.find((c) => c.toLowerCase().replace(/ /g, "-") === slug);
  if (!categoria) notFound();
  const articulosDeCategoria = getArticulosPorCategoria(categoria);
  const activa = categoria;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Artículos", href: "/blog" }, { label: categoria }]} />
      <header className="mb-10 mt-6 text-center">
        <span className="font-label-md text-label-md tracking-widest text-secondary uppercase">Categoría</span>
        <h1 className="mt-2 font-display text-4xl text-primary md:text-[48px]">{categoria}</h1>
        <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          {articulosDeCategoria.length} artículo{articulosDeCategoria.length !== 1 ? "s" : ""} sobre {categoria.toLowerCase()}.
        </p>
      </header>

      <nav aria-label="Categorías" className="mb-10 flex flex-wrap justify-center gap-2">
        <Link
          href="/blog"
          className="cursor-pointer rounded-full bg-surface-container-low px-4 py-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          Todos
        </Link>
        {categoriasBlog.map((c) => (
          <a
            key={c}
            href={`/blog/categoria/${c.toLowerCase().replace(/ /g, "-")}`}
            className={`cursor-pointer rounded-full px-4 py-1.5 font-label-md text-label-md transition-colors ${
              c === activa
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {c}
          </a>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articulosDeCategoria.map((a) => (
          <ArticleCard key={a.slug} articulo={a} />
        ))}
      </div>
    </div>
  );
}
