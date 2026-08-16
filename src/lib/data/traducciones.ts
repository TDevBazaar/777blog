export type IdiomaTraduccion = "es" | "en" | "pt";

export type Traduccion = {
  id: string;
  nombre: string;
  abreviatura: string;
  idioma: IdiomaTraduccion;
  idiomaNombre: string;
  descripcion: string;
  licencia: string;
  atribucion?: string;
  porDefecto?: boolean;
};

export const traducciones: Traduccion[] = [
  {
    id: "rvr1960",
    nombre: "Reina-Valera 1960",
    abreviatura: "RVR1960",
    idioma: "es",
    idiomaNombre: "Español",
    descripcion: "La traducción clásica de la Sociedad Bíblica, texto de referencia del sitio.",
    licencia: "Dominio público",
    porDefecto: true,
  },
  {
    id: "rv1909",
    nombre: "Reina-Valera 1909",
    abreviatura: "RV1909",
    idioma: "es",
    idiomaNombre: "Español",
    descripcion: "Revisión histórica de la versión de Reina y Valera, con lenguaje clásico.",
    licencia: "Dominio público",
  },
  {
    id: "bes",
    nombre: "La Biblia en Español Sencillo",
    abreviatura: "BES",
    idioma: "es",
    idiomaNombre: "Español",
    descripcion: "Traducción en lenguaje simple, ideal para nuevos lectores.",
    licencia: "CC BY 4.0",
    atribucion: "© 2018 AudioBiblia.org / Irma Flores (CC BY 4.0)",
  },
  {
    id: "vbl",
    nombre: "Versión Biblia Libre",
    abreviatura: "VBL",
    idioma: "es",
    idiomaNombre: "Español",
    descripcion: "Traducción libre y moderna del texto bíblico.",
    licencia: "CC BY-SA 4.0",
    atribucion: "© 2018-2020 Jonathan Gallagher y Shelly Barrios de Avila (CC BY-SA 4.0)",
  },
  {
    id: "pddpt",
    nombre: "Palabra de Dios para ti",
    abreviatura: "PDdpt",
    idioma: "es",
    idiomaNombre: "Español",
    descripcion: "Versión en español actual de la Asociación Bíblica Latinoamericana.",
    licencia: "CC BY-SA 4.0",
    atribucion: "© 2017-2022 Asociación Bíblica Latinoamericana (CC BY-SA 4.0)",
  },
  {
    id: "web",
    nombre: "World English Bible",
    abreviatura: "WEB",
    idioma: "en",
    idiomaNombre: "Inglés",
    descripcion: "Traducción inglesa moderna y de dominio público.",
    licencia: "Dominio público",
  },
  {
    id: "kjv",
    nombre: "King James Version",
    abreviatura: "KJV",
    idioma: "en",
    idiomaNombre: "Inglés",
    descripcion: "La versión clásica inglesa de 1769.",
    licencia: "Dominio público",
  },
  {
    id: "almeida",
    nombre: "João Ferreira de Almeida",
    abreviatura: "Almeida",
    idioma: "pt",
    idiomaNombre: "Portugués",
    descripcion: "La traducción clásica portuguesa de João Ferreira de Almeida.",
    licencia: "Dominio público",
  },
];

export function getTraduccion(id: string): Traduccion {
  return traducciones.find((t) => t.id === id) ?? traducciones[0];
}

export function traduccionesPorIdioma(): { idioma: IdiomaTraduccion; idiomaNombre: string; lista: Traduccion[] }[] {
  const grupos: { idioma: IdiomaTraduccion; idiomaNombre: string; lista: Traduccion[] }[] = [];
  for (const t of traducciones) {
    const grupo = grupos.find((g) => g.idioma === t.idioma);
    if (grupo) grupo.lista.push(t);
    else grupos.push({ idioma: t.idioma, idiomaNombre: t.idiomaNombre, lista: [t] });
  }
  return grupos;
}
