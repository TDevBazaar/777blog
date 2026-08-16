import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articulos, getArticulo, getArticulosRelacionados, formatFechaArticulo, obtenerIdsDeBloques } from "@/lib/data/articulos";
import { site } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import ScriptureCard from "@/components/ScriptureCard";
import { versiculos } from "@/lib/data/versiculos";

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articulo = getArticulo(slug);
  if (!articulo) return {};
  const imagen = `${site.url}/images/${articulo.imagen}.svg`;
  return {
    title: articulo.titulo,
    description: articulo.resumen,
    alternates: { canonical: `/blog/${articulo.slug}` },
    openGraph: {
      type: "article",
      title: articulo.titulo,
      description: articulo.resumen,
      url: `${site.url}/blog/${articulo.slug}`,
      images: [{ url: imagen, width: 640, height: 400, alt: articulo.imagenAlt }],
      publishedTime: articulo.fecha,
      authors: [articulo.autor],
      tags: [articulo.categoria],
    },
    twitter: {
      card: "summary_large_image",
      title: articulo.titulo,
      description: articulo.resumen,
      images: [imagen],
    },
  };
}

export default async function ArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articulo = getArticulo(slug);
  if (!articulo) notFound();
  const indice = obtenerIdsDeBloques(articulo);
  const relacionados = getArticulosRelacionados(articulo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.titulo,
    description: articulo.resumen,
    image: `${site.url}/images/${articulo.imagen}.svg`,
    author: { "@type": "Person", name: articulo.autor, jobTitle: articulo.cargo },
    publisher: { "@type": "Organization", name: site.fullName, logo: { "@type": "ImageObject", url: `${site.url}/og.png` } },
    datePublished: articulo.fecha,
    dateModified: articulo.fecha,
    mainEntityOfPage: `${site.url}/blog/${articulo.slug}`,
    inLanguage: "es",
  };

  return (
    <div className="pb-stack-lg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto mb-8 w-full max-w-container-max px-margin-mobile pt-8 md:px-margin-desktop">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Artículos", href: "/blog" },
            { label: articulo.categoria, href: `/blog/categoria/${articulo.categoria.toLowerCase().replace(/ /g, "-")}` },
          ]}
        />
        <div className="mx-auto mt-8 mb-6 max-w-[720px] text-center">
          <span className="mb-6 inline-block rounded-full bg-surface-container-low px-3 py-1 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
            {articulo.categoria}
          </span>
          <h1 className="font-display text-4xl leading-tight text-primary md:text-[48px]">{articulo.titulo}</h1>
          <div className="mt-4 flex items-center justify-center gap-4 font-caption text-caption text-on-surface-variant">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2Zm12 7V6h-2v2h-2V6H9v2H7V6H5v3h14Z" />
              </svg>
              {formatFechaArticulo(articulo.fecha)}
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" aria-hidden="true" />
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a1 1 0 0 1 1 1v5l4 4-1.4 1.4-4.6-4.6V7a1 1 0 0 1 1-1Z" />
              </svg>
              {articulo.minLectura} min de lectura
            </span>
          </div>
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl ambient-shadow-sm md:aspect-[21/9]">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(/images/${articulo.imagen}.svg)` }}
            role="img"
            aria-label={articulo.imagenAlt}
          />
        </div>
      </header>

      <div className="mx-auto flex max-w-container-max flex-col gap-gutter px-margin-mobile md:flex-row md:px-margin-desktop">
        <aside className="relative hidden w-64 shrink-0 md:block">
          <div className="sticky top-32">
            <h2 className="mb-4 border-b border-outline-variant/30 pb-2 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
              En este artículo
            </h2>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              {indice.map((seccion) => (
                <li key={seccion.id}>
                  <a
                    href={`#${seccion.id}`}
                    className="-ml-3 block border-l-2 border-transparent py-1 pl-3 transition-colors hover:border-secondary hover:text-secondary"
                  >
                    {seccion.texto}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-outline-variant/30 pt-5">
              <p className="mb-3 font-caption text-caption tracking-wide text-on-surface-variant uppercase">Compartir</p>
              <ShareButtons texto={`${articulo.titulo} — ${site.name}`} />
            </div>
          </div>
        </aside>

        <article className="mx-auto w-full max-w-[720px] rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 ambient-shadow-sm md:p-10">
          {articulo.bloques.map((bloque, i) => {
            switch (bloque.tipo) {
              case "encabezado": {
                const id = bloque.id ?? indice[i]?.id;
                return (
                  <h2 key={id ?? i} id={id} className="mb-4 mt-10 font-display text-headline-md text-primary">
                    {bloque.texto}
                  </h2>
                );
              }
              case "cita":
                return (
                  <blockquote key={i} className="my-6 rounded-r-lg border-l-4 border-secondary bg-surface-container-low p-6">
                    <p className="m-0 font-display text-verse-text text-primary-container italic dark:text-on-primary-container">
                      «{bloque.texto}»
                    </p>
                    {bloque.autor && (
                      <cite className="mt-2 block font-caption text-caption text-on-surface-variant not-italic">{bloque.autor}</cite>
                    )}
                  </blockquote>
                );
              case "escritura": {
                const v = versiculos.find((x) => x.referencia === bloque.referencia) ?? {
                  texto: bloque.texto,
                  referencia: bloque.referencia,
                  id: bloque.referencia.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  tema: "Escritura",
                  explicacion: "",
                  aplicacion: "",
                };
                return <ScriptureCard key={i} versiculo={v} />;
              }
              case "lista":
                return (
                  <ul key={i} className="mb-6 space-y-4 font-body-lg text-body-lg">
                    {bloque.items.map((item, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="mt-1 shrink-0 text-xl font-bold text-secondary">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <strong className="font-semibold text-primary">{item.titulo}:</strong>{" "}
                          <span className="text-on-surface">{item.texto}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={i} className="mb-6 font-body-lg text-body-lg text-on-surface [&:first-child]:drop-cap">
                    {bloque.texto}
                  </p>
                );
            }
          })}

          <div className="mt-10 flex flex-col gap-6 border-t border-outline-variant/30 pt-8 sm:flex-row sm:items-start">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-container font-display text-2xl text-on-primary-container shadow-sm"
              aria-hidden="true"
            >
              {articulo.autor.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="mb-1 font-display text-2xl text-primary">{articulo.autor}</h3>
              <p className="mb-3 font-caption text-caption tracking-wider text-secondary uppercase">{articulo.cargo}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{articulo.bio}</p>
            </div>
          </div>
        </article>
      </div>

      <section className="mx-auto mt-12 w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
        <h2 className="mb-6 text-center font-display text-headline-md text-primary">Sigue leyendo</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {relacionados.map((a) => (
            <ArticleCard key={a.slug} articulo={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
