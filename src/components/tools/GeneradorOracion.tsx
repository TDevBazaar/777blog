"use client";

import { useState } from "react";

const temas = [
  { id: "gratitud", nombre: "Gratitud", icono: "🌾", versiculo: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", referencia: "1 Tesalonicenses 5:18" },
  { id: "proteccion", nombre: "Protección", icono: "🛡️", versiculo: "Jehová es mi amparo y mi fortaleza, mi pronto auxilio en las tribulaciones.", referencia: "Salmo 46:1" },
  { id: "familia", nombre: "Familia", icono: "🏠", versiculo: "Levántate, ve a tu casa y a tu familia; y confirma todo lo que te ha sido anunciado.", referencia: "Génesis 18:19 (paráfrasis)" },
  { id: "sanidad", nombre: "Sanidad", icono: "✚", versiculo: "Jehová, sáname, porque mi alma está turbada; y tú, oh Jehová, ¿hasta cuándo?", referencia: "Salmo 6:2-3" },
  { id: "paz", nombre: "Paz", icono: "🕊️", versiculo: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da.", referencia: "Juan 14:27" },
  { id: "sabiduria", nombre: "Sabiduría", icono: "📖", versiculo: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche.", referencia: "Santiago 1:5" },
  { id: "fuerza", nombre: "Fuerza", icono: "💪", versiculo: "Esfuérzate y sé valiente; porque Jehová tu Dios estará contigo en dondequiera que vayas.", referencia: "Josué 1:9" },
  { id: "perdon", nombre: "Perdón", icono: "🤝", versiculo: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.", referencia: "1 Juan 1:9" },
  { id: "mision", nombre: "Misión", icono: "🌍", versiculo: "Id por todo el mundo y predicad el evangelio a toda criatura.", referencia: "Marcos 16:15" },
];

export default function GeneradorOracion() {
  const [seleccion, setSeleccion] = useState<string | null>(null);

  const tema = temas.find((t) => t.id === seleccion);

  function construirOracion(t: (typeof temas)[number]): string {
    const partes = [
      `Padre celestial, vengo ante ti con humildad y gratitud, en el nombre de Jesús.`,
      `Hoy pongo en tus manos este momento de ${t.nombre.toLowerCase()}. Reconozco que tú eres la fuente de todo bien y que tu amor me sostiene en cada circunstancia.`,
      `«${t.versiculo}» (${t.referencia}). Haz que esta promesa sea vida en mí hoy.`,
      `Te pido que ${t.id === "gratitud" ? "me ayudes a reconocer tus bendiciones incluso en lo pequeño y a expresarlas con palabras y obras" : t.id === "proteccion" ? "me guardes de todo mal y seas mi refugio en medio de la tormenta" : t.id === "familia" ? "bendigas a mi familia, nos des unidad, paciencia y amor sincero unos por otros" : t.id === "sanidad" ? "traigas sanidad a mi cuerpo, mente y espíritu, y que tu paz inunde cada parte de mí" : t.id === "paz" ? "calmes la tormenta interior y me des tu paz, esa que excede todo entendimiento" : t.id === "sabiduria" ? "me concedas tu sabiduría para tomar decisiones que te honren y para vivir conforme a tu voluntad" : t.id === "fuerza" ? "me fortalezcas donde soy débil y me recuerdes que tu poder se perfecciona en mi debilidad" : t.id === "perdon" ? "me limpies de todo pecado y me des un corazón dispuesto a perdonar como tú me perdonaste" : "me muestres a quién servir hoy y me des valor para dar un paso de fe"}.`,
      `Que mi vida sea un testimonio de tu amor y que todo lo que haga hoy sea para tu gloria.`,
      `Te lo pido en el nombre de Jesucristo. Amén.`,
    ];
    return partes.join(" ");
  }

  if (tema) {
    const oracion = construirOracion(tema);
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-primary">
            {tema.icono} Oración de {tema.nombre.toLowerCase()}
          </h2>
          <button
            type="button"
            onClick={() => setSeleccion(null)}
            className="cursor-pointer font-label-md text-label-md text-secondary hover:text-primary"
          >
            Elegir otro tema
          </button>
        </div>
        <div className="sacred-border mb-6 rounded-xl bg-surface-container-low p-6">
          <p className="font-display text-verse-text italic leading-relaxed text-primary">«{tema.versiculo}»</p>
          <p className="mt-3 font-label-md text-label-md text-secondary">{tema.referencia}</p>
        </div>
        <p className="whitespace-pre-line font-body-md text-body-md leading-relaxed text-on-surface">{oracion}</p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setSeleccion(null)}
            className="flex-1 cursor-pointer rounded-lg border border-secondary py-3 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
          >
            Generar otra
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(oracion).catch(() => {});
            }}
            className="flex-1 cursor-pointer rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98]"
          >
            Copiar oración
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
        Elige el tema de tu momento actual y genera una oración guiada por la Escritura, pensada para tu conversación con Dios.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {temas.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSeleccion(t.id)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-4 py-6 ambient-shadow-sm transition-all hover:ambient-shadow-md hover:border-secondary"
          >
            <span className="text-2xl" aria-hidden="true">{t.icono}</span>
            <span className="font-label-md text-label-md text-primary">{t.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
