import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slugs = [
  "genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "jueces", "rut",
  "1-samuel", "2-samuel", "1-reyes", "2-reyes", "1-cronicas", "2-cronicas", "esdras", "nehemias",
  "ester", "job", "salmos", "proverbios", "eclesiastes", "cantares", "isaias", "jeremias",
  "lamentaciones", "ezequiel", "daniel", "oseas", "joel", "amos", "abdias", "jonas",
  "miqueas", "nahum", "habacuc", "sofonias", "hageo", "zacarias", "malaquias",
  "mateo", "marcos", "lucas", "juan", "hechos", "romanos", "1-corintios", "2-corintios",
  "galatas", "efesios", "filipenses", "colosenses", "1-tesalonicenses", "2-tesalonicenses",
  "1-timoteo", "2-timoteo", "tito", "filemon", "hebreos", "santiago", "1-pedro", "2-pedro",
  "1-juan", "2-juan", "3-juan", "judas", "apocalipsis"
];

async function run() {
  console.log("Descargando texto completo de la Biblia Reina-Valera...");
  const res = await fetch("https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json");
  if (!res.ok) throw new Error("Error al descargar Biblia");
  const booksData = await res.json();

  const outputDir = path.join(__dirname, "../public/biblia");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Procesando ${booksData.length} libros...`);

  booksData.forEach((book, index) => {
    const slug = slugs[index];
    if (!slug) return;

    const capitulos = book.chapters.map((chap) =>
      chap.map((verseText) => verseText.trim())
    );

    const bookObj = {
      slug,
      nombre: book.name,
      capitulos,
    };

    const filePath = path.join(outputDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(bookObj), "utf-8");
  });

  console.log("¡Los 66 libros de la Biblia fueron exportados exitosamente a public/biblia/*.json!");
}

run().catch((err) => {
  console.error("Error al generar datos bíblicos:", err);
  process.exit(1);
});
