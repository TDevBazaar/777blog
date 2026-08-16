export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "encabezado"; texto: string; id?: string }
  | { tipo: "cita"; texto: string; autor?: string }
  | { tipo: "escritura"; texto: string; referencia: string }
  | { tipo: "lista"; items: { titulo: string; texto: string }[] };

export type Articulo = {
  slug: string;
  titulo: string;
  categoria: string;
  autor: string;
  cargo: string;
  bio: string;
  fecha: string;
  minLectura: number;
  resumen: string;
  imagen: string;
  imagenAlt: string;
  destacado: boolean;
  bloques: Bloque[];
};

const a = (
  slug: string,
  titulo: string,
  categoria: string,
  autor: string,
  cargo: string,
  bio: string,
  fecha: string,
  minLectura: number,
  resumen: string,
  imagen: string,
  imagenAlt: string,
  destacado: boolean,
  bloques: Bloque[],
): Articulo => ({
  slug, titulo, categoria, autor, cargo, bio, fecha, minLectura, resumen, imagen, imagenAlt, destacado, bloques,
});

export const articulos: Articulo[] = [
  a(
    "el-poder-del-silencio",
    "El poder del silencio: cómo encontrar paz en un mundo ruidoso",
    "Vida cristiana",
    "Dra. Sara Hernández",
    "Teóloga y escritora",
    "Sara es teóloga con maestría en estudios espirituales. Escribe sobre prácticas contemplativas cristianas y vive con su familia en el campo, donde encuentra quietud en medio de la naturaleza.",
    "2026-07-28",
    6,
    "En una era de conexión constante y productividad implacable, encontrar un momento de silencio verdadero puede sentirse revolucionario. Descubre por qué la quietud es una práctica espiritual esencial.",
    "article-silencio",
    "Un amanecer tranquilo sobre montañas cubiertas de niebla con luz dorada",
    true,
    [
      { tipo: "parrafo", texto: "En una era definida por la conexión constante y la productividad implacable, encontrar un momento de silencio verdadero puede sentirse como un acto revolucionario. Nuestros dispositivos zumban, nuestras agendas se desbordan y el mundo exige nuestra atención a cada paso. Sin embargo, dentro de la tradición cristiana, la quietud no es un lujo: es una práctica fundamental para la salud y la claridad espiritual. Es el espacio donde dejamos de esforzarnos y empezamos a escuchar." },
      { tipo: "encabezado", texto: "El ruido de la vida moderna", id: "el-ruido" },
      { tipo: "parrafo", texto: "Estamos sobreestimulados. La persona promedio procesa miles de mensajes diarios, lo que conduce a lo que los psicólogos llaman sobrecarga cognitiva. Este ruido perpetuo no solo nos distrae: erosiona lentamente nuestra capacidad de reflexión profunda y de comunión íntima con Dios. Cuando nuestras mentes están saturadas, la voz que «no es en el viento ni en el terremoto» fácilmente queda ahogada por el rugido de lo urgente." },
      { tipo: "cita", texto: "El silencio no es la ausencia de sonido, sino la presencia del enfoque. Es el lienzo sobre el cual se dibuja la fe." },
      { tipo: "encabezado", texto: "Fundamentos bíblicos del descanso", id: "fundamentos" },
      { tipo: "parrafo", texto: "Las Escrituras apuntan consistentemente a la necesidad de retirarse del caos. Consideremos a Elías en 1 Reyes 19. Huyendo por su vida, exhausto y abrumado, busca a Dios en el viento, el terremoto y el fuego. Pero Dios no estaba en lo espectacular ni en lo ruidoso. Dios estaba en el «silbo apacible y delicado»." },
      { tipo: "parrafo", texto: "Incluso Jesús, en medio de las demandas intensas del ministerio, se retiraba deliberadamente a lugares desiertos para orar (Lucas 5:16). Si el Hijo de Dios requería momentos de soledad deliberada para recargarse y alinearse con la voluntad del Padre, ¿cuánto más lo necesitamos nosotros en nuestro frenético contexto moderno?" },
      { tipo: "escritura", texto: "Estad quietos, y conoced que yo soy Dios; seré exaltado entre las naciones; seré exaltado en la tierra.", referencia: "Salmo 46:10" },
      { tipo: "encabezado", texto: "Pasos prácticos para cultivar la quietud", id: "pasos-practicos" },
      { tipo: "parrafo", texto: "Integrar la quietud en una vida ocupada requiere intencionalidad. Aquí hay maneras prácticas de comenzar:" },
      { tipo: "lista", items: [
        { titulo: "El ancla matutina", texto: "Antes de tomar tu teléfono, pasa los primeros diez minutos del día en silencio. Respira profundamente y dedica el día a Dios." },
        { titulo: "Sábado digital", texto: "Designa un bloque de tiempo cada semana (aunque sean unas horas) donde las pantallas estén apagadas. Úsalo para leer, caminar al aire libre o orar sin prisa." },
        { titulo: "Micro-pausas", texto: "Pon una alarma dos veces al día. Cuando suene, detente por sesenta segundos, cierra los ojos y centra tu atención en la presencia de Cristo." },
      ] },
      { tipo: "encabezado", texto: "Abrazar el silencio", id: "abrazar-silencio" },
      { tipo: "parrafo", texto: "Al principio, el silencio puede resultar incómodo. Cuando el ruido externo se detiene, las ansiedades internas suelen salir a la superficie. No te desanimes. Reconoce esos pensamientos y libéralos suavemente, devolviendo tu enfoque a una oración simple o a un versículo. Con el tiempo, lo que se siente como un vacío se convertirá en un santuario de paz." },
    ],
  ),
  a(
    "la-gracia-que-no-esperabas",
    "La gracia que no esperabas: entendiendo el regalo de Efesios 2",
    "Teología",
    "Rev. Tomás Morales",
    "Pastor y profesor de teología",
    "Tomás ha pastoreado iglesias durante veinte años y enseña teología bíblica. Le apasiona comunicar la gracia de Dios con claridad y calidez.",
    "2026-07-21",
    8,
    "La salvación por gracia es el corazón del evangelio, pero con frecuencia la reducimos a una fórmula. Explora la profundidad de Efesios 2 y el regalo que transforma vidas.",
    "article-gracia",
    "Luz cálida entrando por vitrales de una iglesia antigua con tonos azules y dorados",
    true,
    [
      { tipo: "parrafo", texto: "Hay versículos que conocemos tan bien que dejamos de leerlos. Efesios 2:8-9 es uno de ellos: «Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe». Lo recitamos, lo pegamos en marcos y lo convertimos en un lema. Pero ¿hemos permitido que su realidad penetre hasta los rincones donde todavía intentamos ganarnos el amor de Dios?" },
      { tipo: "encabezado", texto: "El problema: estábamos muertos", id: "estabamos-muertos" },
      { tipo: "parrafo", texto: "Pablo comienza el capítulo con un diagnóstico devastador: estábamos «muertos en nuestros delitos y pecados». No heridos, no enfermos, no simplemente perdidos en el camino: muertos. Y los muertos no pueden ayudar en su propia resurrección. Ningún esfuerzo religioso, ninguna reforma moral, ninguna buena intención puede dar vida a lo que está muerto." },
      { tipo: "parrafo", texto: "Este es el punto de partida que la cultura moderna odia: no somos fundamentalmente buenos con problemas menores. Somos rebeldes que necesitan resurrección. Pero es precisamente en esta profundidad de desesperanza donde la gracia brilla con más esplendor." },
      { tipo: "escritura", texto: "Pero Dios, que es rico en misericordia, por su gran amor con que nos amó, aun estando nosotros muertos en pecados, nos dio vida juntamente con Cristo.", referencia: "Efesios 2:4-5" },
      { tipo: "encabezado", texto: "El giro: «Pero Dios»", id: "pero-dios" },
      { tipo: "parrafo", texto: "Dos palabras cambian toda la historia: «Pero Dios». Donde la humanidad termina en sepultura, Dios interviene. Su misericordia no es un recurso escaso que administra con cuentagotas: es «rica». Su amor no es un sentimiento condicionado a nuestro desempeño: es «gran amor con que nos amó»." },
      { tipo: "parrafo", texto: "La gracia no es la ayuda de Dios para los que se esfuerzan. Es la vida de Dios para los que están muertos. No es un premio por mejorar: es una resurrección por decreto. Por eso Pablo insiste: «y esto no de vosotros, pues es don de Dios». La salvación no es un salario, sino un regalo; no una recompensa, sino una herencia." },
      { tipo: "cita", texto: "La gracia es la vida de Dios para los que están muertos, no la ayuda de Dios para los que se esfuerzan." },
      { tipo: "encabezado", texto: "El propósito: buenas obras", id: "proposito" },
      { tipo: "parrafo", texto: "Algunos temen que la gracia produzca indiferencia moral. Pablo anticipa la objeción y responde en el versículo 10: «Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas». La gracia no elimina las buenas obras: las origina. No obramos para ser salvos; obramos porque somos salvos." },
      { tipo: "parrafo", texto: "Somos «hechura suya», poema, obra maestra de Dios. El mismo poder que resucitó a Cristo ahora produce en nosotros la vida que Él diseñó. Las buenas obras dejan de ser un intento de comprar el favor divino y se convierten en la expresión natural de una vida transformada." },
      { tipo: "encabezado", texto: "Vivir desde la gracia", id: "vivir-gracia" },
      { tipo: "parrafo", texto: "La pregunta que cambia la vida no es «¿qué tengo que hacer para ganarme a Dios?» sino «¿qué significa vivir como alguien que ya ha sido resucitado?». Cuando la identidad se ancla en la gracia, la obediencia se vuelve adoración, el servicio se vuelve alegría y el fracaso deja de ser una sentencia para convertirse en una oportunidad de recibir misericordia." },
      { tipo: "parrafo", texto: "Hoy puedes descansar: el favor de Dios no es algo que ganas, es alguien a quien conoces. Y en ese conocimiento hay vida eterna." },
    ],
  ),
  a(
    "salmos-para-la-ansiedad",
    "Salmos para la ansiedad: 5 oraciones de la Escritura para el corazón inquieto",
    "Devocional",
    "Elena Rojas",
    "Consejera bíblica",
    "Elena es consejera bíblica certificada y autora de devocionales. Acompaña a personas en procesos de ansiedad desde una perspectiva integrada de fe y salud emocional.",
    "2026-07-14",
    5,
    "Cuando la mente se acelera y el pecho se oprime, la Palabra ofrece un refugio concreto. Cinco salmos para orar en medio de la tormenta emocional.",
    "article-ansiedad",
    "Una vela encendida sobre una mesa de madera en un fondo azul profundo",
    true,
    [
      { tipo: "parrafo", texto: "La ansiedad no es un fenómeno moderno. Los salmistas conocieron sus síntomas con nombres distintos: «desfallece mi corazón», «me angustio dentro de mí», «se turba mi alma». La diferencia está en lo que hicieron con ella: no la reprimieron ni la negaron, la llevaron a Dios. Los salmos son la escuela bíblica de la ansiedad transformada en oración." },
      { tipo: "encabezado", texto: "1. Salmo 34: el refugio de la alabanza", id: "salmo-34" },
      { tipo: "parrafo", texto: "David escribió este salmo en uno de sus momentos más vulnerables, cuando tuvo que fingir locura para sobrevivir. Su respuesta no fue el pánico, sino una decisión deliberada: «Bendeciré a Jehová en todo tiempo». La alabanza no niega el peligro; lo sitúa en el contexto más amplio de la grandeza de Dios. Cuando la ansiedad susurra «estás solo», el salmo responde: «Cercano está Jehová a los quebrantados de corazón»." },
      { tipo: "escritura", texto: "Busqué a Jehová, y él me oyó, y me libró de todos mis temores.", referencia: "Salmo 34:4" },
      { tipo: "encabezado", texto: "2. Salmo 42: el diálogo honesto", id: "salmo-42" },
      { tipo: "parrafo", texto: "El salmista se habla a sí mismo con una honestidad que sorprende: «¿Por qué te abates, oh alma mía, y te turbas dentro de mí?». No finge estar bien. Pero no se queda en la queja: se predica a sí mismo la verdad: «Espera en Dios; porque aún he de alabarle». La fe madura no es la ausencia de tormenta interior, sino el diálogo interior que siempre termina apuntando a Dios." },
      { tipo: "cita", texto: "La fe madura no es la ausencia de tormenta interior, sino el diálogo interior que siempre termina apuntando a Dios." },
      { tipo: "encabezado", texto: "3. Salmo 46: la certeza en medio del caos", id: "salmo-46" },
      { tipo: "parrafo", texto: "«Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones». La estructura del salmo es deliberada: primero la confesión (quién es Dios), luego la descripción del caos (montañas que se hunden, aguas que braman) y finalmente la quietud: «Estad quietos, y conoced que yo soy Dios». El orden importa: la identidad de Dios precede a cualquier noticia que hoy te agite." },
      { tipo: "encabezado", texto: "4. Salmo 121: la mirada levantada", id: "salmo-121" },
      { tipo: "parrafo", texto: "«Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra». El peregrino responde su propia pregunta con una doctrina: el socorro viene de Aquel que creó todo lo que ve. El que hizo las montañas puede con tus montañas. Y luego viene la promesa de la vigilancia divina: el que te guarda no duerme." },
      { tipo: "encabezado", texto: "5. Salmo 23: la presencia del Pastor", id: "salmo-23" },
      { tipo: "parrafo", texto: "El salmo más amado no fue escrito para tiempos fáciles, sino para el valle de sombra de muerte. «Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo». La clave no es que el valle desaparezca, sino que el Pastor no se ausenta. El «aunque» es la gramática de la fe: reconoce la dificultad y la supera con la presencia." },
      { tipo: "encabezado", texto: "Cómo orar estos salmos", id: "como-orar" },
      { tipo: "lista", items: [
        { titulo: "Lee lentamente", texto: "Lee el salmo en voz alta, pausando en cada frase. Deja que las palabras se asienten antes de seguir." },
        { titulo: "Hazlo tuyo", texto: "Convierte los versículos en primera persona: «Jehová es mi pastor». La Escritura se personaliza al orarse." },
        { titulo: "Respira y repite", texto: "Elige una frase corta («Mi socorro viene de Jehová») y repítela mientras respiras profundamente durante cinco minutos." },
        { titulo: "Escribe", texto: "Escribe la oración que surge de tu lectura. Verbalizar la ansiedad la saca del torbellino interno y la coloca delante de Dios." },
      ] },
      { tipo: "parrafo", texto: "La ansiedad seguirá llamando a la puerta. La pregunta no es cómo silenciarla para siempre, sino a quién abrimos la puerta. Los salmistas responden con la misma decisión una y otra vez: a Dios. Y en esa respuesta, la paz que excede todo entendimiento comienza su obra." },
    ],
  ),
  a(
    "el-trabajo-como-adoracion",
    "El trabajo como adoración: Colosenses 3 y la dignidad de lo ordinario",
    "Vida cristiana",
    "Dra. Sara Hernández",
    "Teóloga y escritora",
    "Sara es teóloga con maestría en estudios espirituales. Escribe sobre prácticas contemplativas cristianas y vive con su familia en el campo, donde encuentra quietud en medio de la naturaleza.",
    "2026-07-07",
    5,
    "¿Tiene sentido eterno tu trabajo de lunes a viernes? Descubre cómo el apóstol Pablo transforma incluso la tarea más ordinaria en un acto de adoración.",
    "article-trabajo",
    "Manos trabajando en un escritorio de madera con luz natural de mañana",
    false,
    [
      { tipo: "parrafo", texto: "Existe una separación sutil pero destructiva en nuestra vida: lo sagrado (domingo, iglesia, oración) y lo secular (lunes, oficina, informes). El apóstol Pablo la destruye con una frase en Colosenses 3:23: «Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres»." },
      { tipo: "encabezado", texto: "Todo, incluyendo lo invisible", id: "todo" },
      { tipo: "parrafo", texto: "La palabra clave es «todo». Pablo no excluye el correo electrónico pendiente, la reunión tediosa, el informe que nadie lee o el turno nocturno. Su visión del trabajo no depende de la visibilidad del resultado, sino de la audiencia invisible: «como para el Señor». El trabajo cristiano es una liturgia: cada tarea es un acto de culto ofrecido a Dios." },
      { tipo: "escritura", texto: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres; sabiendo que del Señor recibiréis la recompensa de la herencia, porque a Cristo el Señor servís.", referencia: "Colosenses 3:23-24" },
      { tipo: "encabezado", texto: "La recompensa de la herencia", id: "herencia" },
      { tipo: "parrafo", texto: "Pablo conecta el trabajo con la herencia: «del Señor recibiréis la recompensa de la herencia». Esto cambia la economía del esfuerzo. Los salarios son un medio, pero no la motivación última. El cristiano que trabaja para el Señor acumula un tesoro que el mercado no cotiza y la inflación no devora. El trabajo no se pierde: se transfigura." },
      { tipo: "cita", texto: "El trabajo cristiano es una liturgia: cada tarea es un acto de culto ofrecido a Dios." },
      { tipo: "encabezado", texto: "La pausa como parte del trabajo", id: "pausa" },
      { tipo: "parrafo", texto: "Vale la pena notar que Pablo no glorifica el trabajo sin límites. La misma Escritura que ordena trabajar de corazón también instituyó el sábado: el descanso como declaración de confianza en Dios y no en nuestro esfuerzo. Adorar a Dios en el trabajo incluye también adorarlo negándonos a convertir el trabajo en ídolo. El descanso no es pereza; es dependencia." },
      { tipo: "encabezado", texto: "Para mañana en la oficina", id: "manana" },
      { tipo: "lista", items: [
        { titulo: "Cambia la audiencia", texto: "Antes de empezar tu jornada, di: «Hoy trabajo para el Señor». Repítelo cuando la motivación decaiga." },
        { titulo: "Excelencia sin competencia", texto: "Haz bien tu trabajo para la gloria de Dios, no para impresionar a otros ni para aplastar colegas." },
        { titulo: "Humanidad en el trato", texto: "El trabajo para el Señor incluye cómo tratas al cliente difícil y al compañero lento. La adoración se mide en la dignidad que das a las personas." },
        { titulo: "Descansa como acto de fe", texto: "Apaga el correo. El descanso semanal es una declaración de que el mundo no depende de tu productividad." },
      ] },
      { tipo: "parrafo", texto: "El lunes ya no tiene por qué ser la distancia entre dos domingos. Cada tarea, hecha de corazón para el Señor, participa de la gran obra que Dios está realizando en el mundo. Tu trabajo importa: importa a Dios." },
    ],
  ),
  a(
    "oracion-cuando-no-hay-palabras",
    "Cuando no hay palabras: la oración del Espíritu en Romanos 8",
    "Espiritualidad",
    "Rev. Tomás Morales",
    "Pastor y profesor de teología",
    "Tomás ha pastoreado iglesias durante veinte años y enseña teología bíblica. Le apasiona comunicar la gracia de Dios con claridad y calidez.",
    "2026-06-30",
    4,
    "Hay momentos donde el dolor es tan grande que la oración se ahoga. El apóstol Pablo revela que en esos momentos el Espíritu mismo intercede por nosotros.",
    "article-oracion",
    "Manos juntas en oración junto a una ventana con luz suave",
    false,
    [
      { tipo: "parrafo", texto: "Hay dolores que no caben en las palabras. Pérdidas que exceden el vocabulario, confusiones que desordenan la gramática, noches donde el «amén» se atraganta. En esos momentos, la oración parece un lujo imposible. Pero Romanos 8 revela algo asombroso: cuando no podemos orar, la oración no se detiene." },
      { tipo: "encabezado", texto: "El gemido del que no sabe", id: "gemido" },
      { tipo: "parrafo", texto: "«Y de igual manera también el Espíritu nos ayuda en nuestra debilidad; pues qué hemos de pedir como conviene, no lo sabemos, pero el Espíritu mismo intercede por nosotros con gemidos indecibles» (Romanos 8:26). Pablo describe tres realidades: nuestra debilidad (no sabemos pedir), la ayuda del Espíritu (nos sostiene) y su intercesión (presenta lo inexpresable al Padre)." },
      { tipo: "cita", texto: "Cuando no hay palabras para la oración, el Espíritu convierte nuestros gemidos en intercesión perfecta." },
      { tipo: "encabezado", texto: "Dios entiende el dialecto del corazón", id: "dialecto" },
      { tipo: "parrafo", texto: "El texto dice que el Espíritu intercede «conforme a la voluntad de Dios». Esto significa dos cosas consoladoras. Primera: Dios recibe nuestras oraciones incompletas, incoherentes e imperfectas. No necesitamos impresionar al Padre con nuestra elocuencia. Segunda: el Espíritu alinea nuestro dolor con la voluntad divina, de modo que lo que no podemos expresar llega al trono con la precisión perfecta del propio Dios." },
      { tipo: "escritura", texto: "Mas el que escudriña los corazones sabe cuál es la intención del Espíritu, porque conforme a la voluntad de Dios intercede por los santos.", referencia: "Romanos 8:27" },
      { tipo: "encabezado", texto: "Prácticas para los días sin palabras", id: "practicas" },
      { tipo: "lista", items: [
        { titulo: "El suspiro como oración", texto: "Cuando el dolor te impida formular palabras, exhala lentamente y di mentalmente: «Espíritu, tú sabes». El Espíritu toma ese suspiro y lo presenta perfecto ante el Padre." },
        { titulo: "Una sola frase", texto: "Repite un versículo corto como respiración: «Ven, Señor» o «Aquí estoy». La repetición no es vacía: es un ancla en medio de la tormenta." },
        { titulo: "La presencia sin petición", texto: "Puedes orar sin pedir nada: simplemente permanecer delante de Dios en silencio, dejando que su presencia haga lo que las palabras no pueden." },
        { titulo: "Pedir el Espíritu", texto: "Haz de Romanos 8 tu oración: «Espíritu Santo, intercede por mí, porque no sé pedir como conviene»." },
      ] },
      { tipo: "parrafo", texto: "La próxima vez que la oración se te ahogue, recuerda: no estás orando solo. Hay una intercesión más profunda que la tuya ocurriendo en este momento, y tu debilidad no la detiene; la activa." },
    ],
  ),
  a(
    "que-es-el-fruto-del-espiritu",
    "El fruto del Espíritu: 9 cualidades que transforman el carácter",
    "Teología",
    "Elena Rojas",
    "Consejera bíblica",
    "Elena es consejera bíblica certificada y autora de devocionales. Acompaña a personas en procesos de ansiedad desde una perspectiva integrada de fe y salud emocional.",
    "2026-06-23",
    6,
    "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza: un recorrido por el carácter que el Espíritu cultiva en la vida del creyente.",
    "article-fruto",
    "Un olivo con frutos iluminado por luz dorada al atardecer",
    false,
    [
      { tipo: "parrafo", texto: "En Gálatas 5:22-23, Pablo contrasta las obras de la carne con el fruto del Espíritu. La palabra clave es «fruto»: en singular. No son nueve virtudes independientes que cultivamos por separado, sino un carácter integrado que crece como una sola vida. Y el fruto no se fabrica: se cosecha. Es el resultado natural de permanecer conectados a la vid." },
      { tipo: "escritura", texto: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.", referencia: "Gálatas 5:22-23" },
      { tipo: "encabezado", texto: "Las nueve facetas", id: "facetas" },
      { tipo: "lista", items: [
        { titulo: "Amor", texto: "La raíz de todo: el amor ágape que se entrega sin condiciones, reflejo del carácter de Dios. No es emoción, es decisión sostenida." },
        { titulo: "Gozo", texto: "No es felicidad dependiente de circunstancias, sino la alegría profunda que nace de la relación con Dios. Pablo lo tenía en la cárcel." },
        { titulo: "Paz", texto: "Shalom: integridad y bienestar que sobrepasa el entendimiento. La paz de Cristo gobierna el corazón y la comunidad." },
        { titulo: "Paciencia", texto: "La capacidad de soportar la demora y la provocación sin quebrarse. Es el tiempo de Dios aplicado a las relaciones humanas." },
        { titulo: "Benignidad", texto: "La bondad en acción que se inclina hacia el otro con ternura, buscando activamente su bien." },
        { titulo: "Bondad", texto: "La excelencia moral que se traduce en generosidad concreta. La bondad da, sirve y restaura." },
        { titulo: "Fe", texto: "Fidelidad y confianza: el carácter que cumple promesas y se mantiene fiel en lo pequeño." },
        { titulo: "Mansedumbre", texto: "No es debilidad sino fuerza bajo control. La mansedumbre es poder sometido al propósito de Dios." },
        { titulo: "Templanza", texto: "El dominio propio: la capacidad de decir no a los impulsos para decir sí a lo que Dios aprueba." },
      ] },
      { tipo: "cita", texto: "El fruto no se fabrica: se cosecha. Es el resultado natural de permanecer conectados a la vid." },
      { tipo: "encabezado", texto: "Cómo crece el fruto", id: "como-crece" },
      { tipo: "parrafo", texto: "Jesús lo dijo sin ambigüedad: «Separados de mí nada podéis hacer» (Juan 15:5). El fruto del Espíritu no es un proyecto de superación personal con versículos decorativos. Es la consecuencia de la intimidad. Así como la rama no se esfuerza por producir uvas sino que permanece en la vid, el creyente produce carácter en la medida en que permanece en Cristo: en su Palabra, en oración, en comunidad." },
      { tipo: "parrafo", texto: "La buena noticia es que el Espíritu no espera que produzcamos el fruto con nuestras propias fuerzas. Él es el agricultor y el clima, la savia y el sol. Nuestra parte es la permanencia; su parte es la cosecha. Y contra ese fruto, dice Pablo, «no hay ley»: es el único estilo de vida que la ley no condena y que el cielo celebra." },
      { tipo: "parrafo", texto: "¿Por cuál de las nueve facetas comenzarás a orar esta semana? No para fabricarla, sino para permanecer en la vid de la cual fluye." },
    ],
  ),
  a(
    "como-estudiar-la-biblia-metodo-inductivo",
    "Cómo estudiar la Biblia paso a paso: el Método Inductivo para principiantes",
    "Estudio Bíblico",
    "Dra. Sara Hernández",
    "Teóloga y escritora",
    "Sara es teóloga con maestría en estudios espirituales. Escribe sobre prácticas contemplativas cristianas y vive con su familia en el campo, donde encuentra quietud en medio de la naturaleza.",
    "2026-08-01",
    7,
    "Aprende a leer y comprender las Escrituras de forma personal y profunda mediante las tres etapas esenciales del método inductivo: Observación, Interpretación y Aplicación.",
    "article-estudio-inductivo",
    "Una Biblia abierta sobre un escritorio de madera con un cuaderno de notas y una taza de café",
    true,
    [
      { tipo: "parrafo", texto: "Muchas personas desean leer la Biblia con regularidad pero se sienten abrumadas al abrir sus páginas. ¿Por dónde empezar? ¿Cómo entender pasajes antiguos escritos en contextos culturales tan distantes? El estudio bíblico inductivo es una herramienta práctica y accesible que permite a cualquier creyente descubrir las verdades de la Palabra por sí mismo." },
      { tipo: "encabezado", texto: "¿Qué es el estudio inductivo?", id: "que-es-estudio-inductivo" },
      { tipo: "parrafo", texto: "A diferencia del método deductivo —donde partimos de una idea previa y buscamos versículos que la confirmen—, el método inductivo nos invita a acercarnos al texto con mente abierta y humilde. Dejamos que el texto hable por sí mismo. Consta de tres preguntas consecutivas: ¿Qué dice el texto? (Observación), ¿Qué significa el texto? (Interpretación), y ¿Cómo aplica a mi vida? (Aplicación)." },
      { tipo: "cita", texto: "El estudio inductivo no busca que adaptes la Biblia a tus ideas, sino que dejes que la Biblia transforme tu manera de pensar." },
      { tipo: "encabezado", texto: "Fase 1: Observación (¿Qué dice el texto?)", id: "fase-observacion" },
      { tipo: "parrafo", texto: "En esta etapa actuamos como detectives del texto. Leemos el pasaje varias veces, preferiblemente en distintas traducciones. Buscamos respuestas a las preguntas básicas: ¿Quién escribe? ¿A quién se dirige? ¿Cuáles son las palabras clave o repetidas? ¿Qué contrastes o comparaciones se presentan?" },
      { tipo: "lista", items: [
        { titulo: "Identifica personajes y lugares", texto: "Anota quiénes intervienen y la ubicación geográfica o el contexto del pasaje." },
        { titulo: "Subraya conectores lógicos", texto: "Presta atención a palabras como «por tanto», «pero», «porque», «para que». Revelan la estructura del pensamiento del autor." },
        { titulo: "Nota el tono emocional", texto: "Observa si el pasaje es de urgencia, consuelo, reprensión o celebración." },
      ] },
      { tipo: "encabezado", texto: "Fase 2: Interpretación (¿Qué significa el texto?)", id: "fase-interpretacion" },
      { tipo: "parrafo", texto: "Una vez que sabemos qué dice el pasaje, indagamos cuál era la intención original del autor para sus primeros oyentes. El principio fundamental de la hermenéutica es: el texto nunca puede significar lo que nunca significó para el autor original." },
      { tipo: "escritura", texto: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.", referencia: "2 Timoteo 3:16" },
      { tipo: "encabezado", texto: "Fase 3: Aplicación (¿Cómo aplica a mi vida?)", id: "fase-aplicacion" },
      { tipo: "parrafo", texto: "El estudio bíblico sin aplicación se convierte en mero intelectualismo. La meta de la teología es la transformación del corazón y de la conducta. Nos hacemos preguntas concretas: ¿Hay una promesa que creer? ¿Un pecado que confesar? ¿Un mandato que obedecer? ¿Un atributo de Dios por el cual alabar?" },
      { tipo: "lista", items: [
        { titulo: "Sé específico", texto: "Evita propósitos vagos como «seré mejor persona». Opta por «pediré perdón a mi hermano hoy»." },
        { titulo: "Lleva un diario de oración", texto: "Anota las aplicaciones prácticas e intercede por la gracia para vivirlas durante la semana." },
      ] },
      { tipo: "parrafo", texto: "Comienza hoy con un pasaje corto, como una epístola o un salmo. Con la guía del Espíritu Santo, la Palabra cobrará una frescura viva en tu día a día." },
    ],
  ),
  a(
    "la-paz-que-sobrepasa-todo-entendimiento",
    "La paz que sobrepasa todo entendimiento: cómo guardar tu corazón según Filipenses 4",
    "Vida cristiana",
    "Elena Rojas",
    "Consejera bíblica",
    "Elena es consejera bíblica certificada y autora de devocionales. Acompaña a personas en procesos de ansiedad desde una perspectiva integrada de fe y salud emocional.",
    "2026-07-30",
    6,
    "Descubre la fórmula del apóstol Pablo en Filipenses 4 para reemplazar la ansiedad persistente por una paz divina que custodia la mente y el corazón.",
    "article-paz-filipenses",
    "Luz suave entrando por una ventana hacia una persona leyendo en tranquilidad",
    false,
    [
      { tipo: "parrafo", texto: "El apóstol Pablo escribió su carta más gozosa mientras estaba encadenado en una prisión romana. En medio de la incertidumbre sobre su propia vida, nos regala uno de los remedios más profundos contra la ansiedad en Filipenses 4:6-7." },
      { tipo: "escritura", texto: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.", referencia: "Filipenses 4:6-7" },
      { tipo: "encabezado", texto: "El intercambio sagrado: afán por oración", id: "intercambio-sagrado" },
      { tipo: "parrafo", texto: "Pablo no minimiza las cargas de la vida ni exige una fe estoica. En lugar de guardar las preocupaciones dentro o rumiarlas en bucle, propone un canal de salida: preséntalas delante de Dios. La ansiedad pierde su fuerza cuando se traduce en oración sincera y específica." },
      { tipo: "encabezado", texto: "El ingrediente secreto: la acción de gracias", id: "accion-de-gracias" },
      { tipo: "parrafo", texto: "Notemos que Pablo une la oración con la «acción de gracias». Dar gracias antes de ver la respuesta no es una formalidad; es un acto de confianza que reorienta nuestra mente hacia la fidelidad pasada de Dios. La gratitud nos recuerda quién es el Dios a quien estamos orando." },
      { tipo: "cita", texto: "La paz de Dios no es la ausencia de problemas, sino la presencia de un guardián celestial velando por tu mente." },
      { tipo: "encabezado", texto: "La paz como centinela", id: "paz-centinela" },
      { tipo: "parrafo", texto: "La palabra griega que Pablo usa para «guardará» es un término militar que evoca a un centinela haciendo guardia en los muros de una ciudad. La paz de Dios actúa como un soldado apostado en la puerta de nuestras emociones y pensamientos, impidiendo que el pánico y la desesperanza invadan el castillo de nuestra fe." },
      { tipo: "lista", items: [
        { titulo: "Identifica la preocupación", texto: "Ponle nombre exacto al temor que ronda tu mente hoy." },
        { titulo: "Entrega en oración", texto: "Háblale a Dios con franqueza sobre tus limitaciones." },
        { titulo: "Agradece por anticipado", texto: "Recuerda tres ocasiones anteriores donde Dios sostuvo tu vida." },
        { titulo: "Descansa en su guardia", texto: "Permite que la certeza del amor de Cristo custodie tus pensamientos durante el resto del día." },
      ] },
      { tipo: "parrafo", texto: "Hoy puedes soltar el control. Aquel que sostiene los cielos y la tierra es más que suficiente para cuidar de ti." },
    ],
  ),
  a(
    "entendiendo-el-antiguo-testamento",
    "Entendiendo el Antiguo Testamento: el hilo conductor de la Promesa",
    "Teología",
    "Rev. Tomás Morales",
    "Pastor y profesor de teología",
    "Tomás ha pastoreado iglesias durante veinte años y enseña teología bíblica. Le apasiona comunicar la gracia de Dios con claridad y calidez.",
    "2026-08-01",
    8,
    "El Antiguo Testamento no es una colección de historias desconectadas, sino el gran relato de la promesa de Dios que anticipa y encuentra su cumplimiento en Cristo.",
    "article-antiguo-testamento",
    "Manuscritos antiguos en papiro sobre una mesa con luz cálida",
    false,
    [
      { tipo: "parrafo", texto: "Para muchos lectores, el Antiguo Testamento puede parecer un territorio lejano y confuso: leyes ceremoniales minuciosas, genealogías interminables y guerras antiguas. Sin embargo, cuando aprendemos a leerlo con los lentes correctos, descubrimos una hermosa sinfonía que anuncia la redención humana." },
      { tipo: "encabezado", texto: "El hilo rojo de la promesa", id: "hilo-rojo" },
      { tipo: "parrafo", texto: "Desde Génesis 3:15 —conocido como el protoevangelio— Dios promete que de la simiente de la mujer nacerá Aquel que aplastará la cabeza de la serpiente. A partir de ese momento, toda la historia del Antiguo Testamento sigue la preservación de esa línea mesiánica: de Abraham a Isaac, de Jacob a Judá, de David a la cuna de Belén." },
      { tipo: "escritura", texto: "Y pondré enemistad entre ti y la mujer, y entre tu simiente y la simiente suya; ésta te herirá en la cabeza, y tú le herirás en el calcañar.", referencia: "Génesis 3:15" },
      { tipo: "encabezado", texto: "Cuatro grandes secciones", id: "cuatro-secciones" },
      { tipo: "lista", items: [
        { titulo: "La Ley (Pentateuco)", texto: "Establece los cimientos: creación, caída, pacto con Abraham y la constitución de Israel como pueblo de Dios." },
        { titulo: "Libros Históricos", texto: "Muestran la fidelidad de Dios contrastada con la fragilidad humana en la tierra prometida y en el exilio." },
        { titulo: "Libros Poéticos y de Sabiduría", texto: "Expresan el corazón del creyente en adoración, sufrimiento, duda y alabanza ante la soberanía divina." },
        { titulo: "Los Profetas", texto: "Denuncian la injusticia, llaman al arrepentimiento y vislumbran el Nuevo Pacto que transformaría los corazones." },
      ] },
      { tipo: "cita", texto: "El Antiguo Testamento es el Nuevo Testamento contenido; el Nuevo Testamento es el Antiguo Testamento revelado." },
      { tipo: "encabezado", texto: "Cómo leerlo hoy con provecho", id: "como-leerlo" },
      { tipo: "parrafo", texto: "Al abordar cualquier pasaje del Antiguo Testamento, pregúntate: ¿Qué atributo de Dios se revela aquí? ¿Cómo muestra la necesidad humana de un Salvador? ¿Cómo apunta esta historia o institución (sacerdocio, templo, sacrificios) a la persona y obra de Jesucristo?" },
      { tipo: "parrafo", texto: "Lejos de ser un libro obsoleto, el Antiguo Testamento es la raíz de nuestra fe y el testimonio imborrable de un Dios que cumple cada una de sus promesas." },
    ],
  ),
  a(
    "la-oracion-de-ana",
    "La oración de Ana: cuando el dolor del corazón se convierte en intercesión",
    "Vida cristiana",
    "Elena Rojas",
    "Consejera bíblica",
    "Elena me acompaña en procesos de consejería bíblica y devocionales.",
    "2026-08-01",
    5,
    "En 1 Samuel 1, Ana transforma su amargura de alma en una oración de entrega que Dios responde dando a luz al profeta Samuel.",
    "article-oracion-ana",
    "Una mujer en oración silenciosa ante la luz del amanecer",
    false,
    [
      { tipo: "parrafo", texto: "La historia de Ana en 1 Samuel 1 comienza en la profunda angustia. Sumida en la esterilidad y expuesta a la burla constante de Penina, Ana enfrentaba un dolor que las palabras consuelo de su esposo Elcana no podían sanar." },
      { tipo: "encabezado", texto: "Derramar el alma delante del Señor", id: "derramar-el-alma" },
      { tipo: "parrafo", texto: "En lugar de amargarse contra Dios o vengarse de su rival, Ana llevó su quebranto al tabernáculo en Silo. No hizo una oración repetitiva ni formal: «derramó su alma delante de Jehová». Tan intensa era su intercesión silenciosa que el sacerdote Elí pensó erróneamente que estaba ebria." },
      { tipo: "escritura", texto: "Ella con amargura de alma oró a Jehová, y lloró abundantemente. E hizo voto diciendo: Jehová de los ejércitos, si te dignares mirar a la aflicción de tu sierva... darás a tu sierva un hijo varón, yo lo dedicaré a Jehová todos los días de su vida.", referencia: "1 Samuel 1:10-11" },
      { tipo: "cita", texto: "La oración verdadera no exige a Dios nuestros deseos; le rinde nuestras mayores ansias para sus propósitos." },
      { tipo: "encabezado", texto: "De la angustia a la paz", id: "angustia-a-paz" },
      { tipo: "parrafo", texto: "Un detalle hermoso del relato ocurre *antes* de que Ana quedara embarazada: tras recibir la bendición de Elí, «se fue la mujer por su camino, y comió, y no estuvo más triste». Su rostro cambió no porque ya tuviera al bebé en brazos, sino porque había depositado su carga en las manos del Omnipotente." },
      { tipo: "lista", items: [
        { titulo: "Lleva tu dolor al altar", texto: "No escondas la amargura; preséntala a Dios con total honestidad." },
        { titulo: "Transforma la petición en consagración", texto: "Pide no solo para tu satisfacción, sino para la gloria de Dios." },
        { titulo: "Levántate con paz", texto: "Confía en que Dios ha escuchado y descansa en su soberanía." },
      ] },
      { tipo: "parrafo", texto: "Dios respondió a Ana dándole a Samuel, quien restauraría el liderazgo espiritual de Israel. Tu dolor presente, entregado a Dios en oración sincera, puede ser la semilla de una bendición que trascienda tu propia vida." },
    ],
  ),
];

export const categoriasBlog = [...new Set(articulos.map((a) => a.categoria))];

export function getArticulo(slug: string): Articulo | undefined {
  return articulos.find((a) => a.slug === slug);
}

export function getArticulosPorCategoria(categoria: string): Articulo[] {
  return articulos.filter((a) => a.categoria === categoria);
}

export function getArticulosRelacionados(articulo: Articulo, cantidad = 3): Articulo[] {
  return articulos
    .filter((a) => a.slug !== articulo.slug)
    .sort((a, b) => (a.categoria === articulo.categoria ? -1 : 1) - (b.categoria === articulo.categoria ? -1 : 1))
    .slice(0, cantidad);
}

export function formatFechaArticulo(fecha: string): string {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(fecha));
}

export function obtenerIdsDeBloques(articulo: Articulo): { id: string; texto: string }[] {
  return articulo.bloques
    .filter((b): b is Extract<Bloque, { tipo: "encabezado" }> => b.tipo === "encabezado")
    .map((b) => ({ id: b.id ?? b.texto.toLowerCase().replace(/[^a-záéíóúñ0-9\s]/gi, "").replace(/\s+/g, "-"), texto: b.texto }));
}
