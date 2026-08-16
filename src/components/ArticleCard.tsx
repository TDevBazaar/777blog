import type { Articulo } from "@/lib/data/articulos";
import { formatFechaArticulo } from "@/lib/data/articulos";

export default function ArticleCard({ articulo, horizontal = false }: { articulo: Articulo; horizontal?: boolean }) {
  const base = horizontal ? "min-w-[280px] md:min-w-[320px] snap-start group cursor-pointer flex flex-col gap-3" : "group cursor-pointer flex flex-col gap-3";
  return (
    <a href={`/blog/${articulo.slug}`} className={base} aria-label={articulo.titulo}>
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(/images/${articulo.imagen}.svg)` }}
          role="img"
          aria-label={articulo.imagenAlt}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-caption text-caption tracking-wider text-secondary uppercase">{articulo.categoria}</span>
        <h3 className="font-display text-lg leading-tight text-primary transition-colors group-hover:text-secondary-fixed-variant dark:group-hover:text-secondary-fixed">
          {articulo.titulo}
        </h3>
        <p className="mt-1 font-caption text-caption text-on-surface-variant">
          Por {articulo.autor} · {articulo.minLectura} min de lectura · {formatFechaArticulo(articulo.fecha)}
        </p>
      </div>
    </a>
  );
}
