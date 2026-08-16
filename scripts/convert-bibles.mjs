import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const raiz = path.join(__dirname, "..");
const BDATOS = path.join(raiz, "bdatos");
const BIBLIA = path.join(raiz, "public", "biblia");

const VARIANTES = {
  genesis: ["GEN"],
  exodo: ["EXO", "EXOD", "EX"],
  levitico: ["LEV"],
  numeros: ["NUM"],
  deuteronomio: ["DEU", "DEUT"],
  josue: ["JOS", "JOSH"],
  jueces: ["JDG", "JUDG"],
  rut: ["RUT", "RUTH"],
  "1-samuel": ["1SA", "1SAM"],
  "2-samuel": ["2SA", "2SAM"],
  "1-reyes": ["1KI", "1KGS"],
  "2-reyes": ["2KI", "2KGS"],
  "1-cronicas": ["1CH", "1CHR"],
  "2-cronicas": ["2CH", "2CHR"],
  esdras: ["EZR", "EZRA"],
  nehemias: ["NEH"],
  ester: ["EST", "ESTH"],
  job: ["JOB"],
  salmos: ["PSA", "PS", "PSS"],
  proverbios: ["PRO", "PROV"],
  eclesiastes: ["ECC", "ECCL"],
  cantares: ["SNG", "SONG", "SON", "SOL"],
  isaias: ["ISA"],
  jeremias: ["JER"],
  lamentaciones: ["LAM"],
  ezequiel: ["EZK", "EZEK"],
  daniel: ["DAN"],
  oseas: ["HOS"],
  joel: ["JOL", "JOEL"],
  amos: ["AMO", "AMOS"],
  abdias: ["OBA", "OBAD"],
  jonas: ["JON", "JONAH"],
  miqueas: ["MIC"],
  nahum: ["NAM", "NAH"],
  habacuc: ["HAB"],
  sofonias: ["ZEP", "ZEPH"],
  hageo: ["HAG"],
  zacarias: ["ZEC", "ZECH"],
  malaquias: ["MAL"],
  mateo: ["MAT", "MATT"],
  marcos: ["MRK", "MARK"],
  lucas: ["LUK", "LUKE"],
  juan: ["JHN", "JOHN"],
  hechos: ["ACT", "ACTS"],
  romanos: ["ROM"],
  "1-corintios": ["1CO", "1COR"],
  "2-corintios": ["2CO", "2COR"],
  galatas: ["GAL"],
  efesios: ["EPH"],
  filipenses: ["PHP", "PHIL"],
  colosenses: ["COL"],
  "1-tesalonicenses": ["1TH", "1THESS"],
  "2-tesalonicenses": ["2TH", "2THESS"],
  "1-timoteo": ["1TI", "1TIM"],
  "2-timoteo": ["2TI", "2TIM"],
  tito: ["TIT", "TITUS"],
  filemon: ["PHM", "PHLM"],
  hebreos: ["HEB"],
  santiago: ["JAS", "JAM"],
  "1-pedro": ["1PE", "1PET"],
  "2-pedro": ["2PE", "2PET"],
  "1-juan": ["1JN", "1JOHN"],
  "2-juan": ["2JN", "2JOHN"],
  "3-juan": ["3JN", "3JOHN"],
  judas: ["JUD", "JUDE"],
  apocalipsis: ["REV"],
};

const lookup = new Map();
for (const [slug, codigos] of Object.entries(VARIANTES)) {
  for (const codigo of codigos) lookup.set(codigo.toUpperCase(), slug);
}

const omitidos = new Set();

function porCodigo(codigo) {
  return lookup.get(String(codigo || "").toUpperCase().trim());
}

const ENTIDADES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodificarEntidades(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, e) => ENTIDADES[e]);
}

function limpiar(texto) {
  return decodificarEntidades(texto.replace(/<[^>]*>/g, " "))
    .replace(/\s+([.,;:!?»])/g, "$1")
    .replace(/([«([{])\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function versiculosDesde(textoConMarcadores, reVersiculo) {
  const partes = textoConMarcadores.split(reVersiculo);
  const vers = [];
  for (let i = 1; i + 1 < partes.length; i += 2) {
    vers[Number(partes[i]) - 1] = limpiar(partes[i + 1]);
  }
  return vers.filter((v) => v !== undefined && v !== "");
}

function parsearZefania(xml) {
  const libros = new Map();
  for (const m of xml.matchAll(/<BIBLEBOOK\s+([^>]*)>([\s\S]*?)<\/BIBLEBOOK>/g)) {
    const bsname = (m[1].match(/bsname="([^"]*)"/) || [])[1];
    const slug = porCodigo(bsname);
    if (!slug) {
      omitidos.add(bsname || "?");
      continue;
    }
    const capitulos = [];
    for (const cm of m[2].matchAll(/<CHAPTER\s+cnumber="(\d+)"[^>]*>([\s\S]*?)<\/CHAPTER>/g)) {
      const vers = [];
      for (const vm of cm[2].matchAll(/<VERS\s+vnumber="(\d+)"[^>]*>([\s\S]*?)<\/VERS>/g)) {
        vers[Number(vm[1]) - 1] = limpiar(vm[2]);
      }
      capitulos[Number(cm[1]) - 1] = vers.filter((v) => v !== undefined);
    }
    libros.set(slug, capitulos.filter((c) => c !== undefined));
  }
  return libros;
}

function parsearUsfx(xml) {
  const libros = new Map();
  for (const m of xml.matchAll(/<book\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/book>/g)) {
    const slug = porCodigo(m[1]);
    if (!slug) {
      omitidos.add(m[1]);
      continue;
    }
    const partesCap = m[2].split(/<c\s+id="(\d+)"[^>]*?\/?>/);
    const capitulos = [];
    for (let i = 1; i + 1 < partesCap.length; i += 2) {
      const vers = versiculosDesde(partesCap[i + 1], /<v\s+id="(\d+)"[^>]*?\/?>/);
      capitulos[Number(partesCap[i]) - 1] = vers;
    }
    libros.set(slug, capitulos.filter((c) => c !== undefined));
  }
  return libros;
}

function parsearOsis(xml) {
  const libros = new Map();
  const aberturas = [...xml.matchAll(/<div\s+type="book"\s[^>]*?>/g)];
  for (let i = 0; i < aberturas.length; i++) {
    const etiqueta = aberturas[i][0];
    const id = (etiqueta.match(/osisID="([^"]+)"/) || [])[1];
    const slug = porCodigo(id);
    if (!slug) {
      omitidos.add(id || "?");
      continue;
    }
    const inicio = aberturas[i].index + etiqueta.length;
    const fin = i + 1 < aberturas.length ? aberturas[i + 1].index : xml.length;
    const caps = [...xml.slice(inicio, fin).matchAll(/<chapter\s+[^>]*?\/?>/g)];
    const capitulos = [];
    for (let c = 0; c < caps.length; c++) {
      const etq = caps[c][0];
      const ref = (etq.match(/osisRef="([^"]+)"/) || [])[1] || "";
      const n = (etq.match(/n="(\d+)"/) || [])[1] || ref.split(".").pop() || "";
      if (!n) continue;
      const inicioCap = caps[c].index + etq.length;
      let contenidoCap;
      if (c + 1 < caps.length) {
        const siguienteAbs = inicio + caps[c + 1].index;
        contenidoCap = xml.slice(inicio + inicioCap, siguienteAbs);
      } else {
        contenidoCap = xml.slice(inicio + inicioCap, fin);
      }
      contenidoCap = contenidoCap.replace(/<verse\s+eID="[^"]*"\s*\/?>/g, "");
      const vers = versiculosDesde(contenidoCap, /<verse\s+[^>]*?n="(\d+)"[^>]*?\/?>/);
      capitulos[Number(n) - 1] = vers;
    }
    libros.set(slug, capitulos.filter((c) => c !== undefined));
  }
  return libros;
}

function detectarFormato(xml) {
  if (xml.includes("<XMLBIBLE")) return "zefania";
  if (/<usfx/i.test(xml)) return "usfx";
  if (xml.includes("<osis")) return "osis";
  throw new Error("Formato XML no reconocido");
}

const TRADUCCIONES = [
  { id: "rv1909", archivo: "spa-rv1909.usfx.xml" },
  { id: "bes", archivo: "spa-bes.usfx.xml" },
  { id: "vbl", archivo: "spa-vbl.usfx.xml" },
  { id: "pddpt", archivo: "spa-pddpt.usfx.xml" },
  { id: "web", archivo: "eng-web.usfx.xml" },
  { id: "kjv", archivo: "eng-kjv.osis.xml" },
  { id: "almeida", archivo: "por-almeida.usfx.xml" },
];

function run() {
  const libroTs = fs.readFileSync(path.join(raiz, "src", "lib", "data", "libros.ts"), "utf8");
  const nombres = new Map();
  for (const m of libroTs.matchAll(/(?:at|nt)\("([a-z0-9-]+)",\s*"([^"]*)"/g)) {
    nombres.set(m[1], m[2]);
  }
  if (nombres.size !== 66) {
    throw new Error(`Se esperaban 66 libros en libros.ts, se leyeron ${nombres.size}`);
  }

  const dirRvr = path.join(BIBLIA, "rvr1960");
  fs.mkdirSync(dirRvr, { recursive: true });

  const referencia = new Map();
  for (const [slug, nombre] of nombres) {
    let origen = path.join(BIBLIA, `${slug}.json`);
    let desdeRaiz = true;
    if (!fs.existsSync(origen)) {
      origen = path.join(dirRvr, `${slug}.json`);
      desdeRaiz = false;
    }
    if (!fs.existsSync(origen)) continue;
    const datos = JSON.parse(fs.readFileSync(origen, "utf8"));
    datos.nombre = nombre;
    datos.traduccion = "rvr1960";
    fs.writeFileSync(path.join(dirRvr, `${slug}.json`), JSON.stringify(datos), "utf8");
    if (desdeRaiz) fs.unlinkSync(origen);
    referencia.set(slug, datos.capitulos);
  }
  if (referencia.size !== 66) {
    throw new Error(`Faltan JSON de referencia RVR1960: ${66 - referencia.size}`);
  }

  const PUESTO_SPOT = { genesis: [1, 31], juan: [3, 36], apocalipsis: [22, 21] };
  let errores = 0;

  for (const tr of TRADUCCIONES) {
    const archivo = path.join(BDATOS, tr.archivo);
    if (!fs.existsSync(archivo)) {
      console.error(`✗ Falta el archivo ${tr.archivo}`);
      errores++;
      continue;
    }
    const xml = fs.readFileSync(archivo, "utf8");
    const formato = detectarFormato(xml);
    const librosMap =
      formato === "zefania" ? parsearZefania(xml) : formato === "usfx" ? parsearUsfx(xml) : parsearOsis(xml);

    const dir = path.join(BIBLIA, tr.id);
    fs.mkdirSync(dir, { recursive: true });

    const faltantes = [...nombres.keys()].filter((s) => !librosMap.has(s));
    const divCap = [];
    const divVer = [];
    let totalVers = 0;

    for (const [slug, capitulos] of librosMap) {
      const ref = referencia.get(slug);
      if (ref && capitulos.length !== ref.length) {
        divCap.push(`${slug}: ${capitulos.length} vs ${ref.length}`);
      }
      for (let i = 0; i < capitulos.length; i++) {
        if (ref && ref[i] && capitulos[i].length !== ref[i].length) {
          divVer.push(`${slug} ${i + 1}: ${capitulos[i].length} vs ${ref[i].length}`);
        }
        totalVers += capitulos[i].length;
      }
      fs.writeFileSync(
        path.join(dir, `${slug}.json`),
        JSON.stringify({ slug, nombre: nombres.get(slug), traduccion: tr.id, capitulos }),
        "utf8",
      );
    }

    const spot = Object.entries(PUESTO_SPOT).map(([slug, [cap, ver]]) => {
      const ok = librosMap.get(slug) && librosMap.get(slug)[cap - 1] && librosMap.get(slug)[cap - 1].length === ver;
      if (!ok) errores++;
      return `${slug} ${cap}:${ver} ${ok ? "OK" : "FALLO"}`;
    });

    const ok = faltantes.length === 0 && divCap.length === 0;
    if (!ok) errores++;
    console.log(
      `\n[${tr.id}] ${formato.toUpperCase()} · ${librosMap.size} libros · ${totalVers.toLocaleString("es")} versículos`,
    );
    console.log(`  Capítulos: ${ok ? "✓ coinciden con RVR1960" : `✗ ${divCap.join(", ")}`}`);
    console.log(`  Faltantes: ${faltantes.length === 0 ? "ninguno ✓" : faltantes.join(", ")}`);
    console.log(`  Spot check: ${spot.join(" · ")}`);
    if (divVer.length > 0) {
      console.log(`  ⚠ Versículos distintos a RVR1960 (${divVer.length}): ${divVer.slice(0, 8).join(", ")}`);
    }
  }

  const bytes = fs
    .readdirSync(BIBLIA, { recursive: true })
    .filter((f) => String(f).endsWith(".json"))
    .map((f) => fs.statSync(path.join(BIBLIA, String(f))).size)
    .reduce((a, b) => a + b, 0);
  console.log(`\nTotal public/biblia: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
  if (omitidos.size > 0) {
    console.log(`Códigos omitidos (deuterocanónicos u otros): ${[...omitidos].slice(0, 30).join(", ")}${omitidos.size > 30 ? "…" : ""}`);
  }

  if (errores > 0) {
    console.error(`\n${errores} errores detectados.`);
    process.exit(1);
  }
  console.log("\n¡Las traducciones se convirtieron correctamente!");
}

run();
