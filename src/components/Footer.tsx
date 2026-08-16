import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const columnas = [
  {
    titulo: "Recursos",
    enlaces: [
      { href: "/planes-de-lectura", label: "Planes de lectura" },
      { href: "/herramientas", label: "Herramientas" },
      { href: "/biblioteca", label: "Libros de la Biblia" },
      { href: "/biblioteca/personajes", label: "Personajes bíblicos" },
    ],
  },
  {
    titulo: "Plataforma",
    enlaces: [
      { href: "/estudio", label: "Estudio bíblico" },
      { href: "/blog", label: "Artículos" },
      { href: "/versiculo-del-dia", label: "Versículo del día" },
      { href: "/busqueda", label: "Búsqueda" },
    ],
  },
  {
    titulo: "Compañía",
    enlaces: [
      { href: "/acerca", label: "Acerca de" },
      { href: "/contacto", label: "Contacto" },
      { href: "/privacidad", label: "Privacidad" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container-low py-stack-lg dark:border-outline dark:bg-surface-container-highest">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-stack-md px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="mt-2 font-caption text-caption text-on-surface-variant">
            Iluminando el camino a través de las Escrituras con claridad y reverencia.
          </p>
          <p className="font-caption text-caption text-on-surface-variant">
            © {new Date().getFullYear()} {site.fullName}. Todos los derechos reservados.
          </p>
          <p className="font-caption text-caption text-on-surface-variant">
            Textos bíblicos: Reina-Valera y demás versiones de dominio público (Open Bibles). Español Sencillo © 2018
            AudioBiblia.org / Irma Flores (CC BY 4.0); Biblia Libre © 2018-2020 J. Gallagher y S. Barrios; Palabra de
            Dios para ti © 2017-2022 Asociación Bíblica Latinoamericana (CC BY-SA 4.0).
          </p>
        </div>
        {columnas.map((col) => (
          <div key={col.titulo} className="md:col-span-1">
            <h4 className="mb-4 font-label-md font-bold text-label-md tracking-wider text-primary uppercase dark:text-on-surface">
              {col.titulo}
            </h4>
            <ul className="space-y-3">
              {col.enlaces.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-secondary dark:text-outline-variant dark:hover:text-secondary-fixed"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
