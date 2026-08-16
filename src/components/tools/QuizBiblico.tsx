"use client";

import { useState } from "react";

type Pregunta = { pregunta: string; opciones: string[]; correcta: number; explicacion: string };

const preguntas: Pregunta[] = [
  { pregunta: "¿Cuál es el primer libro de la Biblia?", opciones: ["Éxodo", "Génesis", "Levítico", "Job"], correcta: 1, explicacion: "Génesis, «el libro de los comienzos», narra la creación, la caída y el llamado de Abraham." },
  { pregunta: "¿Cuántos libros tiene el Nuevo Testamento?", opciones: ["27", "39", "66", "24"], correcta: 0, explicacion: "27 libros: 4 evangelios, Hechos, 21 epístolas y Apocalipsis. El total de la Biblia es 66 libros." },
  { pregunta: "¿Quién fue arrojado al foso de los leones por su fidelidad a Dios?", opciones: ["José", "Elías", "Daniel", "Jeremías"], correcta: 2, explicacion: "Daniel fue arrojado al foso por continuar orando, y Dios cerró la boca de los leones (Daniel 6)." },
  { pregunta: "¿Cuál es el versículo más conocido de la Biblia?", opciones: ["Salmo 23:1", "Juan 3:16", "Filipenses 4:13", "Proverbios 3:5"], correcta: 1, explicacion: "«Porque de tal manera amó Dios al mundo…» (Juan 3:16) resume el evangelio completo." },
  { pregunta: "¿Quién construyó el arca para salvar a su familia del diluvio?", opciones: ["Abraham", "Moisés", "Noé", "Lot"], correcta: 2, explicacion: "Noé halló gracia ante los ojos de Dios y construyó el arca (Génesis 6-9)." },
  { pregunta: "¿En qué libro está el Sermón del Monte?", opciones: ["Lucas", "Marcos", "Mateo", "Juan"], correcta: 2, explicacion: "El Sermón del Monte (Mateo 5-7) incluye las bienaventuranzas y el Padrenuestro." },
  { pregunta: "¿Quién era el rey que escribió la mayoría de los Proverbios?", opciones: ["David", "Salomón", "Saúl", "Ezequías"], correcta: 1, explicacion: "Salomón, el rey más sabio de Israel, fue el principal autor de Proverbios." },
  { pregunta: "¿Cuántos discípulos tenía Jesús?", opciones: ["7", "10", "12", "70"], correcta: 2, explicacion: "Jesús eligió a 12 apóstoles (Mateo 10:1-4), aunque envió también a otros 70 discípulos." },
  { pregunta: "¿Qué profeta fue tragado por un gran pez?", opciones: ["Amós", "Jonás", "Oseas", "Miqueas"], correcta: 1, explicacion: "Jonás huyó de Dios y fue tragado por un gran pez, donde permaneció tres días (Jonás 1-2)." },
  { pregunta: "¿Cuál es el último libro de la Biblia?", opciones: ["Judas", "Malaquías", "Hechos", "Apocalipsis"], correcta: 3, explicacion: "Apocalipsis, la revelación de Jesucristo, cierra la Biblia con la promesa de la nueva Jerusalén." },
  { pregunta: "¿Quién fue el primer rey de Israel?", opciones: ["David", "Saúl", "Salomón", "Josué"], correcta: 1, explicacion: "Saúl fue el primer rey ungido de Israel; David lo sucedió después (1 Samuel 10)." },
  { pregunta: "¿Qué mujer defendió a su pueblo ante el rey Asuero?", opciones: ["Rut", "Débora", "Ester", "María"], correcta: 2, explicacion: "Ester arriesgó su vida para salvar al pueblo judío de la aniquilación (Ester 4)." },
];

export default function QuizBiblico() {
  const [actual, setActual] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const pregunta = preguntas[actual];
  const esUltima = actual === preguntas.length - 1;

  function responder(i: number) {
    if (seleccion !== null) return;
    setSeleccion(i);
    if (i === pregunta.correcta) setAciertos((a) => a + 1);
  }

  function siguiente() {
    if (esUltima) {
      setTerminado(true);
      return;
    }
    setActual((a) => a + 1);
    setSeleccion(null);
  }

  function reiniciar() {
    setActual(0);
    setSeleccion(null);
    setAciertos(0);
    setTerminado(false);
  }

  if (terminado) {
    const porcentaje = Math.round((aciertos / preguntas.length) * 100);
    const mensaje = porcentaje === 100 ? "¡Excelente! Dominas la Palabra." : porcentaje >= 70 ? "¡Muy bien! Sigue profundizando." : porcentaje >= 40 ? "Buen comienzo. Sigue estudiando." : "No te desanimes: cada paso en la Palabra cuenta.";
    return (
      <div className="py-8 text-center">
        <p className="font-display text-4xl text-primary">{aciertos}/{preguntas.length}</p>
        <p className="mt-2 font-display text-2xl text-primary">{porcentaje}%</p>
        <p className="mt-4 font-body-md text-body-md text-on-surface-variant">{mensaje}</p>
        <button
          type="button"
          onClick={reiniciar}
          className="mt-8 cursor-pointer rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98]"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-label-md text-label-md text-on-surface-variant">
          Pregunta {actual + 1} de {preguntas.length}
        </p>
        <span className="font-caption text-caption text-secondary">{aciertos} aciertos</span>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-surface-container-high" aria-hidden="true">
        <div
          className="h-full rounded-full bg-secondary transition-all duration-500"
          style={{ width: `${((actual + 1) / preguntas.length) * 100}%` }}
        />
      </div>
      <h2 className="mb-6 font-display text-2xl text-primary">{pregunta.pregunta}</h2>
      <div className="space-y-3">
        {pregunta.opciones.map((opcion, i) => {
          let estilo = "border-outline-variant bg-surface-container-lowest hover:border-tertiary-container hover:bg-surface-container-low";
          if (seleccion !== null) {
            if (i === pregunta.correcta) estilo = "border-secondary bg-secondary/10";
            else if (i === seleccion) estilo = "border-error bg-error/5";
            else estilo = "border-outline-variant opacity-50";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => responder(i)}
              disabled={seleccion !== null}
              className={`w-full cursor-pointer rounded-xl border px-5 py-3.5 text-left font-body-md text-body-md text-on-surface transition-all ${estilo}`}
            >
              <span className="mr-3 font-label-md font-bold text-secondary">{String.fromCharCode(65 + i)}</span>
              {opcion}
            </button>
          );
        })}
      </div>
      {seleccion !== null && (
        <div className="mt-6">
          <p className={`rounded-xl p-4 font-body-md text-body-md ${seleccion === pregunta.correcta ? "bg-secondary/10 text-primary" : "bg-error/5 text-on-surface-variant"}`}>
            <strong className="font-semibold">{seleccion === pregunta.correcta ? "¡Correcto! " : "Respuesta correcta: "}</strong>
            {pregunta.explicacion}
          </p>
          <button
            type="button"
            onClick={siguiente}
            className="mt-6 w-full cursor-pointer rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-transform hover:scale-[0.98]"
          >
            {esUltima ? "Ver resultado" : "Siguiente pregunta"}
          </button>
        </div>
      )}
    </div>
  );
}
