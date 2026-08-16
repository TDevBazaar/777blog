export type Herramienta = {
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  categoria: string;
  popular: boolean;
  disponible: boolean;
};

export const herramientas: Herramienta[] = [
  { slug: "buscador-versiculos", nombre: "Buscador de versículos", descripcion: "Localiza pasajes por tema, palabra o referencia en nuestras traducciones favoritas.", icono: "search", categoria: "Búsqueda", popular: true, disponible: true },
  { slug: "generador-oraciones", nombre: "Generador de oraciones", descripcion: "Guía estructurada para tus conversaciones diarias con Dios, según tu momento y necesidad.", icono: "folded_hands", categoria: "Devocional", popular: true, disponible: true },
  { slug: "planes-lectura", nombre: "Plan de lectura", descripcion: "Crea un plan personalizado de lectura bíblica según tu ritmo y tus intereses.", icono: "calendar_month", categoria: "Devocional", popular: true, disponible: true },
  { slug: "quiz-biblico", nombre: "Quiz bíblico", descripcion: "Pon a prueba tus conocimientos bíblicos y refuerza tu aprendizaje con preguntas interactivas.", icono: "quiz", categoria: "Aprendizaje", popular: true, disponible: true },
  { slug: "calculadora-lectura", nombre: "Calculadora de tiempo de lectura", descripcion: "Descubre cuánto tardarías en leer un libro, un testamento o toda la Biblia.", icono: "schedule", categoria: "Aprendizaje", popular: false, disponible: true },
  { slug: "favoritos", nombre: "Favoritos", descripcion: "Organiza los versículos y pasajes que más te impactan en tu lista personal.", icono: "bookmarks", categoria: "Personal", popular: false, disponible: true },
  { slug: "cronologia-biblica", nombre: "Cronología bíblica", descripcion: "Visualiza los grandes eventos de la historia bíblica en orden cronológico.", icono: "timeline", categoria: "Historia", popular: false, disponible: false },
  { slug: "mapas-biblicos", nombre: "Mapas bíblicos", descripcion: "Explora la geografía de los viajes, batallas y lugares de las Escrituras.", icono: "map", categoria: "Historia", popular: false, disponible: false },
  { slug: "arbol-genealogico", nombre: "Árbol genealógico", descripcion: "Traza las familias y linajes que conectan las historias de la Biblia.", icono: "account_tree", categoria: "Historia", popular: false, disponible: false },
  { slug: "nombres-biblicos", nombre: "Buscador de nombres bíblicos", descripcion: "Descubre el significado original y la historia detrás de los nombres de la Biblia.", icono: "spellcheck", categoria: "Búsqueda", popular: false, disponible: false },
  { slug: "comparador-personajes", nombre: "Comparador de personajes", descripcion: "Compara la vida, el llamado y las lecciones de dos personajes bíblicos.", icono: "compare_arrows", categoria: "Aprendizaje", popular: false, disponible: false },
  { slug: "generador-devocionales", nombre: "Generador de devocionales", descripcion: "Reflexiones diarias para tu temporada emocional o espiritual actual.", icono: "local_florist", categoria: "Devocional", popular: false, disponible: false },
];

export function getHerramienta(slug: string): Herramienta | undefined {
  return herramientas.find((h) => h.slug === slug);
}

export const categoriasHerramientas = [...new Set(herramientas.map((h) => h.categoria))];
