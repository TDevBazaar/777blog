"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { libros, getLibroAnterior, getLibroSiguiente } from "@/lib/data/libros";
import { capitulosDisponibles, getCapitulo } from "@/lib/data/capitulos";
import { getTraduccion, traduccionesPorIdioma } from "@/lib/data/traducciones";
import ShareButtons from "@/components/ShareButtons";
import BarraProgreso from "@/components/estudio/BarraProgreso";

const CLAVE_PROGRESO = "lumen-progreso";
const CLAVE_FUENTE = "lumen-fuente";
const CLAVE_FAVORITOS = "lumen-favoritos";
const CLAVE_TRADUCCION = "lumen-traduccion";

type DatosLibroJson = { slug: string; nombre: string; traduccion: string; capitulos: string[][] };
type FavoritoGuardado = { id: string; ref: string; texto: string; agregado: number };

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function leerJson<T>(clave: string, porDefecto: T): T {
  try {
    const raw = window.localStorage.getItem(clave);
    return raw ? (JSON.parse(raw) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export default function LectorBiblico() {
  const [libroSlug, setLibroSlug] = useState("juan");
  const [capituloN, setCapituloN] = useState<number | null>(null);
  const [notasAbiertas, setNotasAbiertas] = useState(true);
  const [datosLibroJson, setDatosLibroJson] = useState<DatosLibroJson | null>(null);
  const [tamanoFuente, setTamanoFuente] = useState(18);
  const [modoLectura, setModoLectura] = useState(false);
  const [filtroLibros, setFiltroLibros] = useState("");
  const [consultaBusqueda, setConsultaBusqueda] = useState("");
  const [leidos, setLeidos] = useState<Record<string, number[]>>({});
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [traduccionId, setTraduccionId] = useState("rvr1960");
  const canvasRef = useRef<HTMLDivElement>(null);

  const libro = useMemo(() => libros.find((l) => l.slug === libroSlug) ?? libros[0], [libroSlug]);
  const traduccion = getTraduccion(traduccionId);
  const esRvr1960 = traduccionId === "rvr1960";
  const disponibles = esRvr1960 ? (capitulosDisponibles[libroSlug] ?? []) : [];
  const totalCapitulos = libro.capitulos;
  const leidosLibro = leidos[libroSlug] ?? [];
  const favoritosSet = useMemo(() => new Set(favoritos), [favoritos]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLeidos(leerJson<Record<string, number[]>>(CLAVE_PROGRESO, {}));
      setTamanoFuente(leerJson<number>(CLAVE_FUENTE, 18));
      setTraduccionId(getTraduccion(leerJson<string>(CLAVE_TRADUCCION, "rvr1960")).id);
      const favs = leerJson<FavoritoGuardado[]>(CLAVE_FAVORITOS, []);
      setFavoritos(favs.map((f) => f.id));

      const params = new URLSearchParams(window.location.search);
      const libroParam = params.get("libro");
      const capParam = params.get("capitulo");
      const objetivo = libroParam ? libros.find((l) => l.slug === libroParam) : undefined;
      if (objetivo) {
        setLibroSlug(objetivo.slug);
        const capN = Number(capParam);
        if (Number.isInteger(capN) && capN > 0 && capN <= objetivo.capitulos) {
          setCapituloN(capN);
          marcarLeido(objetivo.slug, capN);
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let cancel = false;
    fetch(`/biblia/${traduccionId}/${libroSlug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Libro no encontrado");
        return res.json();
      })
      .then((data) => {
        if (!cancel) setDatosLibroJson(data);
      })
      .catch(() => {
        if (!cancel) setDatosLibroJson(null);
      });
    return () => {
      cancel = true;
    };
  }, [libroSlug, traduccionId]);

  useEffect(() => {
    canvasRef.current?.scrollTo({ top: 0 });
  }, [libroSlug, capituloN]);

  function marcarLeido(slug: string, n: number) {
    setLeidos((prev) => {
      const actuales = prev[slug] ?? [];
      if (actuales.includes(n)) return prev;
      const nuevos = { ...prev, [slug]: [...actuales, n].sort((a, b) => a - b) };
      try {
        window.localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(nuevos));
      } catch {
        /* sin almacenamiento */
      }
      return nuevos;
    });
  }

  function abrirCapitulo(n: number) {
    setCapituloN(n);
    marcarLeido(libroSlug, n);
  }

  function seleccionarLibro(slug: string) {
    setLibroSlug(slug);
    setCapituloN(null);
    setConsultaBusqueda("");
    setFiltroLibros("");
  }

  function irALibro(slug: string) {
    setLibroSlug(slug);
    setCapituloN(null);
    setConsultaBusqueda("");
    requestAnimationFrame(() => abrirCapitulo(1));
  }

  function ajustarFuente(delta: number) {
    setTamanoFuente((t) => {
      const nuevo = Math.min(24, Math.max(15, t + delta));
      try {
        window.localStorage.setItem(CLAVE_FUENTE, String(nuevo));
      } catch {
        /* sin almacenamiento */
      }
      return nuevo;
    });
  }

  function cambiarTraduccion(id: string) {
    setTraduccionId(id);
    try {
      window.localStorage.setItem(CLAVE_TRADUCCION, JSON.stringify(id));
    } catch {
      /* sin almacenamiento */
    }
  }

  function toggleFavorito(id: string, ref: string, texto: string) {
    setFavoritos((prev) => {
      const existe = prev.includes(id);
      const ids = existe ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        const lista = leerJson<FavoritoGuardado[]>(CLAVE_FAVORITOS, []);
        const nuevos = existe ? lista.filter((f) => f.id !== id) : [...lista, { id, ref, texto, agregado: Date.now() }];
        window.localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(nuevos));
      } catch {
        /* sin almacenamiento */
      }
      return ids;
    });
  }

  const librosAgrupados = useMemo(() => {
    const grupos: { testamento: string; genero: string; libros: typeof libros }[] = [];
    for (const l of libros) {
      const grupo = grupos.find((g) => g.testamento === l.testamento && g.genero === l.genero);
      if (grupo) grupo.libros.push(l);
      else grupos.push({ testamento: l.testamento, genero: l.genero, libros: [l] });
    }
    return grupos;
  }, []);

  const filtroNorm = normalize(filtroLibros.trim());

  const resultadosBusqueda = useMemo(() => {
    const c = normalize(consultaBusqueda.trim());
    if (!c || !datosLibroJson) return [];
    const res: { capitulo: number; versiculo: number; texto: string }[] = [];
    for (let ci = 0; ci < datosLibroJson.capitulos.length && res.length < 25; ci++) {
      const vers = datosLibroJson.capitulos[ci];
      for (let vi = 0; vi < vers.length; vi++) {
        if (normalize(vers[vi]).includes(c)) {
          res.push({ capitulo: ci + 1, versiculo: vi + 1, texto: vers[vi] });
          if (res.length >= 25) break;
        }
      }
    }
    return res;
  }, [consultaBusqueda, datosLibroJson]);

  const capituloCurado = esRvr1960 && capituloN !== null ? getCapitulo(libroSlug, capituloN) : undefined;
  const versiculosDinamicos = capituloN !== null ? (datosLibroJson?.capitulos[capituloN - 1] ?? []) : [];
  const versiculos = capituloCurado ? capituloCurado.versiculos : versiculosDinamicos;
  const cargando = !datosLibroJson || datosLibroJson.slug !== libroSlug || datosLibroJson.traduccion !== traduccionId;
  const tieneNotas = capituloCurado !== undefined && capituloCurado.notas.length > 0;
  const libroAnterior = getLibroAnterior(libro);
  const libroSiguiente = getLibroSiguiente(libro);
  const ultimoLeido = leidosLibro.length > 0 ? leidosLibro[leidosLibro.length - 1] : 0;
  const primerVersiculo = versiculos[0] ?? "";

  function saltarAVersiculo(cap: number, ver: number) {
    abrirCapitulo(cap);
    setTimeout(() => {
      document.getElementById(`v-${cap}-${ver}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  const claseAside = `hidden overflow-y-auto rounded-2xl bg-surface-container-lowest p-4 ambient-shadow-sm lg:block lg:max-h-[75vh] ${modoLectura ? "lg:hidden" : ""}`;
  const claseColumnas = `flex items-start gap-2 lg:flex-col lg:overflow-y-auto lg:max-h-[75vh] ${modoLectura ? "lg:hidden" : ""}`;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pb-16 pt-10 md:px-margin-desktop">
      <div className={`grid min-h-[70vh] grid-cols-1 gap-6 ${modoLectura ? "" : "lg:grid-cols-[260px_200px_1fr]"}`}>
        <aside className={claseAside}>
          <input
            type="search"
            value={filtroLibros}
            onChange={(e) => setFiltroLibros(e.target.value)}
            placeholder="Buscar libro…"
            aria-label="Buscar libro en la lista"
            className="mb-4 w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 font-label-md text-label-md text-on-surface placeholder:text-outline focus:border-tertiary-container focus:outline-none"
          />
          {librosAgrupados.map((g) => {
            const visibles = filtroNorm ? g.libros.filter((l) => normalize(l.nombre).includes(filtroNorm)) : g.libros;
            if (visibles.length === 0) return null;
            const primeraVez = !librosAgrupados.slice(0, librosAgrupados.indexOf(g)).some((x) => x.testamento === g.testamento);
            return (
              <div key={`${g.testamento}-${g.genero}`}>
                {primeraVez && (
                  <p className="mb-3 mt-2 font-label-md text-label-md uppercase tracking-wider text-secondary first:mt-0">
                    {g.testamento}
                  </p>
                )}
                <p className="mb-1.5 mt-4 font-caption text-caption font-semibold uppercase tracking-widest text-on-surface-variant">
                  {g.genero}
                </p>
                <ul className="mb-3 space-y-0.5">
                  {visibles.map((l) => {
                    const curado = esRvr1960 && (capitulosDisponibles[l.slug] ?? []).length > 0;
                    const leidoAlgo = (leidos[l.slug] ?? []).length > 0;
                    return (
                      <li key={l.slug}>
                        <button
                          type="button"
                          onClick={() => seleccionarLibro(l.slug)}
                          className={`flex w-full cursor-pointer items-center justify-between gap-1 rounded-lg px-3 py-1.5 text-left font-body-md text-body-md transition-colors ${
                            libroSlug === l.slug
                              ? "bg-primary font-medium text-on-primary"
                              : "text-on-surface-variant hover:bg-surface-container-low"
                          }`}
                        >
                          <span className="truncate">{l.nombre}</span>
                          <span className={`shrink-0 font-caption text-caption ${libroSlug === l.slug ? "text-on-primary/70" : "text-outline"}`}>
                            {leidoAlgo && "✓ "}
                            {l.capitulos}
                            {curado && " ★"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {filtroNorm && librosAgrupados.every((g) => g.libros.filter((l) => normalize(l.nombre).includes(filtroNorm)).length === 0) && (
            <p className="py-6 text-center font-caption text-caption text-on-surface-variant">No se encontró ningún libro.</p>
          )}
        </aside>

        <div className={claseColumnas}>
          <select
            aria-label="Elegir libro"
            value={libroSlug}
            onChange={(e) => seleccionarLibro(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none"
          >
            <optgroup label="Antiguo Testamento">
              {libros.filter((l) => l.testamento === "Antiguo Testamento").map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.nombre} ({l.capitulos} cap.)
                </option>
              ))}
            </optgroup>
            <optgroup label="Nuevo Testamento">
              {libros.filter((l) => l.testamento === "Nuevo Testamento").map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.nombre} ({l.capitulos} cap.)
                </option>
              ))}
            </optgroup>
          </select>

          <div className="w-full">
            <BarraProgreso leidos={leidosLibro} total={totalCapitulos} etiqueta={`${libro.nombre} · lectura`} />
          </div>

          <div className="relative hidden w-full lg:block">
            <input
              type="search"
              value={consultaBusqueda}
              onChange={(e) => setConsultaBusqueda(e.target.value)}
              placeholder={`Buscar en ${libro.nombre}…`}
              aria-label={`Buscar versículos en ${libro.nombre}`}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 font-label-md text-label-md text-on-surface placeholder:text-outline focus:border-tertiary-container focus:outline-none"
            />
            {consultaBusqueda.trim() !== "" && (
              <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-2 shadow-lg">
                {resultadosBusqueda.length === 0 ? (
                  <p className="px-3 py-3 font-caption text-caption text-on-surface-variant">Sin resultados en {libro.nombre}.</p>
                ) : (
                  resultadosBusqueda.map((r) => (
                    <button
                      key={`${r.capitulo}-${r.versiculo}`}
                      type="button"
                      onClick={() => {
                        setConsultaBusqueda("");
                        saltarAVersiculo(r.capitulo, r.versiculo);
                      }}
                      className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-container-low"
                    >
                      <span className="font-label-md font-semibold text-secondary">
                        {libro.nombre} {r.capitulo}:{r.versiculo}
                      </span>
                      <span className="line-clamp-2 font-caption text-caption text-on-surface-variant">{r.texto}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <p className="hidden font-caption text-caption text-on-surface-variant lg:block">
            {esRvr1960
              ? disponibles.length > 0
                ? `★ capítulos con notas de estudio: ${disponibles.join(", ")}`
                : "Capítulos con notas de estudio: en preparación"
              : "Las notas de estudio están disponibles en la Reina-Valera 1960"}
          </p>
          <div className="no-scrollbar flex max-h-[60px] flex-1 gap-1.5 overflow-x-auto lg:max-h-none lg:flex-wrap lg:content-start lg:overflow-visible">
            {Array.from({ length: totalCapitulos }, (_, i) => i + 1).map((n) => {
              const tieneNotasCuradas = disponibles.includes(n);
              const leido = leidosLibro.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => abrirCapitulo(n)}
                  title={`${leido ? "Leído · " : ""}Capítulo ${n}${tieneNotasCuradas ? " · con notas de estudio" : ""}`}
                  className={`relative shrink-0 cursor-pointer rounded-lg px-3 py-1.5 font-label-md text-label-md transition-colors ${
                    capituloN === n
                      ? "bg-secondary font-semibold text-on-secondary"
                      : leido
                        ? "bg-tertiary-container/25 font-medium text-primary hover:bg-tertiary-container/40"
                        : tieneNotasCuradas
                          ? "bg-surface-container-high font-medium text-primary hover:bg-surface-container-highest"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {n}
                  {leido && <span className="ml-1 text-[10px]">✓</span>}
                  {tieneNotasCuradas && <span className="ml-1 text-[10px] text-tertiary">★</span>}
                </button>
              );
            })}
          </div>
        </div>

        <section className="min-w-0">
          <div className="rounded-2xl bg-surface-container-lowest ambient-shadow-sm">
            <div className="border-b border-outline-variant/20 px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-label-md text-label-md uppercase tracking-wider text-secondary">
                    {libro.testamento} • {libro.genero} • {libro.nombre}
                    {capituloN !== null ? ` ${capituloN}` : ""} • {traduccion.abreviatura}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-primary md:text-3xl">
                    {capituloCurado?.titulo ?? (capituloN !== null ? `${libro.nombre} ${capituloN}` : libro.nombre)}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Elegir traducción"
                    value={traduccionId}
                    onChange={(e) => cambiarTraduccion(e.target.value)}
                    className="cursor-pointer rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-label-md text-label-md text-on-surface focus:outline-none"
                  >
                    {traduccionesPorIdioma().map((g) => (
                      <optgroup key={g.idioma} label={g.idiomaNombre}>
                        {g.lista.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.nombre} ({t.abreviatura})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="flex items-center overflow-hidden rounded-full border border-outline-variant">
                    <button
                      type="button"
                      onClick={() => ajustarFuente(-1)}
                      disabled={tamanoFuente <= 15}
                      aria-label="Reducir tamaño de letra"
                      className="cursor-pointer px-3 py-1.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      A−
                    </button>
                    <button
                      type="button"
                      onClick={() => ajustarFuente(1)}
                      disabled={tamanoFuente >= 24}
                      aria-label="Aumentar tamaño de letra"
                      className="cursor-pointer border-l border-outline-variant px-3 py-1.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      A+
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModoLectura((v) => !v)}
                    aria-label={modoLectura ? "Salir del modo lectura" : "Activar modo lectura"}
                    title={modoLectura ? "Salir del modo lectura" : "Modo lectura (sin columnas)"}
                    className={`cursor-pointer rounded-full px-3 py-1.5 font-label-md text-label-md transition-colors ${
                      modoLectura ? "bg-primary text-on-primary" : "border border-outline-variant text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    {modoLectura ? "Modo lectura" : "Leer"}
                  </button>
                  {capituloN !== null && primerVersiculo && (
                    <ShareButtons texto={`${libro.nombre} ${capituloN} — «${primerVersiculo}»`} />
                  )}
                </div>
              </div>
              {tieneNotas && (
                <span className="mt-2 inline-block rounded-full bg-secondary/15 px-3 py-1 font-caption text-caption font-semibold text-secondary">
                  ✨ Con notas de estudio
                </span>
              )}
            </div>

            <div ref={canvasRef} className="mx-auto max-w-3xl px-6 py-8 md:px-10">
              {capituloN === null ? (
                <div className="py-4 text-center">
                  <p className="font-label-md text-label-md uppercase tracking-widest text-secondary">{libro.genero}</p>
                  <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">{libro.nombre}</h1>
                  <p className="mt-1 font-caption text-caption text-on-surface-variant">
                    {libro.testamento} · {libro.autor} · {totalCapitulos} capítulos
                  </p>
                  <p className="mx-auto mt-5 max-w-xl font-body-lg leading-[1.75] text-on-surface">{libro.resumen}</p>
                  <div className="mx-auto mt-6 max-w-md">
                    <BarraProgreso leidos={leidosLibro} total={totalCapitulos} />
                  </div>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {ultimoLeido > 0 && ultimoLeido <= totalCapitulos && (
                      <button
                        type="button"
                        onClick={() => abrirCapitulo(ultimoLeido)}
                        className="cursor-pointer rounded-lg border border-secondary px-6 py-2.5 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
                      >
                        Continuar en el capítulo {ultimoLeido}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => abrirCapitulo(1)}
                      className="cursor-pointer rounded-lg bg-primary px-6 py-2.5 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98]"
                    >
                      {ultimoLeido > 0 ? "Empezar de nuevo" : "Empezar a leer"}
                    </button>
                  </div>
                  <Link
                    href={`/biblioteca/libros/${libro.slug}`}
                    className="mt-5 inline-block font-label-md text-label-md text-secondary hover:text-primary"
                  >
                    Ver resumen y contexto completo →
                  </Link>
                </div>
              ) : cargando && versiculos.length === 0 ? (
                <div className="py-12 text-center text-on-surface-variant">
                  <p className="font-body-lg text-body-lg">Cargando pasaje bíblico…</p>
                </div>
              ) : versiculos.length > 0 ? (
                <div className="space-y-4 text-justify" style={{ fontSize: `${tamanoFuente}px` }}>
                  {versiculos.map((texto, i) => {
                    const idFav = `estudio-${libroSlug}-${capituloN}-${i + 1}`;
                    const refFav = `${libro.nombre} ${capituloN}:${i + 1}`;
                    const esFav = favoritosSet.has(idFav);
                    return (
                      <div key={i} id={`v-${capituloN}-${i + 1}`} className="group relative scroll-mt-6">
                        <p className="leading-[1.7] text-on-surface">
                          <span className="verse-num mr-2 align-super font-label-md text-sm font-bold text-secondary">{i + 1}</span>
                          {texto}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleFavorito(idFav, refFav, texto)}
                          aria-label={esFav ? "Quitar de favoritos" : "Guardar en favoritos"}
                          title={esFav ? "Quitar de favoritos" : "Guardar en favoritos"}
                          className={`absolute top-0 -right-2 cursor-pointer rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 ${
                            esFav ? "bg-secondary/15 text-secondary opacity-100" : "text-outline hover:text-error"
                          }`}
                        >
                          {esFav ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-on-surface-variant">
                  <p className="font-body-lg text-body-lg">No se pudo cargar el capítulo en este momento.</p>
                </div>
              )}

              {capituloCurado && capituloCurado.notas.length > 0 && (
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => setNotasAbiertas((v) => !v)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface-container-low px-5 py-4"
                  >
                    <span className="font-label-md font-semibold text-primary">Notas de estudio teológicas</span>
                    <span className="text-secondary">{notasAbiertas ? "−" : "+"}</span>
                  </button>
                  {notasAbiertas && (
                    <div className="mt-4 space-y-4">
                      {capituloCurado.notas.map((n, i) => (
                        <div key={i} className="sacred-border rounded-xl bg-surface-container-low p-5">
                          <div className="mb-1 flex items-baseline gap-3">
                            <h3 className="font-label-md font-semibold text-primary">{n.titulo}</h3>
                            <span className="font-caption text-caption text-secondary">{n.versiculos}</span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface-variant">{n.texto}</p>
                          {n.referencia && (
                            <p className="mt-2 font-caption text-caption text-on-surface-variant">Cruz.: {n.referencia}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {capituloN !== null && (
                <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-6">
                  <div className="flex gap-2">
                    {libroAnterior && (
                      <button
                        type="button"
                        onClick={() => irALibro(libroAnterior.slug)}
                        title={`Ir a ${libroAnterior.nombre}`}
                        className="cursor-pointer rounded-lg border border-outline-variant px-4 py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:border-secondary"
                      >
                        ← {libroAnterior.nombre}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={capituloN <= 1}
                      onClick={() => abrirCapitulo(capituloN - 1)}
                      className="cursor-pointer rounded-lg border border-outline-variant px-4 py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:border-secondary disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      ← Cap.
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={capituloN >= totalCapitulos}
                      onClick={() => abrirCapitulo(capituloN + 1)}
                      className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Cap. siguiente →
                    </button>
                    {libroSiguiente && (
                      <button
                        type="button"
                        onClick={() => irALibro(libroSiguiente.slug)}
                        title={`Ir a ${libroSiguiente.nombre}`}
                        className="cursor-pointer rounded-lg border border-secondary px-4 py-2.5 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
                      >
                        {libroSiguiente.nombre} →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
