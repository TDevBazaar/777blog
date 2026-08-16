export type Personaje = {
  slug: string;
  nombre: string;
  significado: string;
  categoria: "Patriarcas" | "Profetas" | "Reyes" | "Apóstoles" | "Jueces" | "Mujeres" | "Héroes de la fe";
  periodo: string;
  resumen: string;
  historia: string;
  versiculosClave: { referencia: string; texto: string }[];
  leccion: string;
};

const p = (
  slug: string,
  nombre: string,
  significado: string,
  categoria: Personaje["categoria"],
  periodo: string,
  resumen: string,
  historia: string,
  versiculosClave: { referencia: string; texto: string }[],
  leccion: string,
): Personaje => ({ slug, nombre, significado, categoria, periodo, resumen, historia, versiculosClave, leccion });

export const personajes: Personaje[] = [
  p(
    "abraham",
    "Abraham",
    "Padre de multitudes",
    "Patriarcas",
    "c. 2000 a.C.",
    "El padre de la fe: llamado por Dios a dejar su tierra con la promesa de una descendencia incontable.",
    "Cuando Abram tenía 75 años, Dios le ordenó dejar todo lo conocido y le prometió una tierra y una descendencia. Abram creyó a Dios, y le fue contado por justicia. Su vida fue un peregrinaje de fe con altibajos: la duda con Sara, el nacimiento de Ismael, y finalmente la prueba máxima: ofrecer a Isaac en el monte Moria. Dios proveyó un carnero, y la fe de Abraham quedó sellada como modelo para todos los creyentes.",
    [
      { referencia: "Génesis 15:6", texto: "Y creyó a Jehová, y le fue contado por justicia." },
      { referencia: "Génesis 22:14", texto: "Y llamó Abraham a aquel lugar Jehová-jireh. Por tanto se dice hoy: En el monte de Jehová será provisto." },
    ],
    "La fe no es ausencia de dudas, sino obediencia que sigue a Dios incluso cuando no se ve el final del camino.",
  ),
  p(
    "moises",
    "Moisés",
    "Sacado de las aguas",
    "Patriarcas",
    "c. 1500 a.C.",
    "El libertador de Israel: criado en palacio, llamado en el desierto, y usado por Dios para redimir a su pueblo de Egipto.",
    "Salvado de las aguas del Nilo, Moisés creció como príncipe de Egipto hasta que su defensa de un esclavo lo llevó al exilio. Cuarenta años después, Dios lo llamó desde una zarza ardiente: «Saca a mi pueblo de Egipto». Con señales y prodigios, plagas y el Mar Rojo, Moisés lideró a Israel hacia la libertad y recibió la Ley en el Sinaí. Murió en el monte Nebo viendo la Tierra Prometida sin entrar en ella.",
    [
      { referencia: "Éxodo 3:14", texto: "Yo soy el que soy. Y añadió: Así dirás a los hijos de Israel: Yo Soy me envió a vosotros." },
      { referencia: "Deuteronomio 34:10", texto: "Y nunca más se levantó profeta en Israel como Moisés, a quien Jehová haya conocido cara a cara." },
    ],
    "Dios usa personas dispuestas, no personas perfectas. La humildad y la obediencia abren puertas que el talento solo no puede.",
  ),
  p(
    "david",
    "David",
    "Amado",
    "Reyes",
    "c. 1000 a.C.",
    "El pastor que llegó a rey: un hombre conforme al corazón de Dios, autor de la mitad de los salmos.",
    "El menor de ocho hermanos, ungido en secreto mientras cuidaba ovejas. David derrotó a Goliat con una honda y una fe, huyó de la persecución de Saúl y llegó al trono. Como rey unificó a Israel y llevó el arca a Jerusalén, pero también cayó en el pecado de Betsabé. Su arrepentimiento, reflejado en el Salmo 51, muestra a un hombre que, pese a sus fallas, siempre regresaba a Dios.",
    [
      { referencia: "1 Samuel 13:14", texto: "Jehová se ha buscado un varón conforme a su corazón, y le ha mandado que sea príncipe sobre su pueblo." },
      { referencia: "Salmo 51:10", texto: "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí." },
    ],
    "La grandeza no está en no caer, sino en levantarse con un corazón roto y humillado delante de Dios.",
  ),
  p(
    "elias",
    "Elías",
    "Mi Dios es Jehová",
    "Profetas",
    "c. 850 a.C.",
    "El profeta del fuego: desafió a los profetas de Baal en el Carmelo y representó el poder de Dios en la decadencia de Israel.",
    "En un momento de apostasía nacional, Elías confrontó al rey Acab y a los 450 profetas de Baal en el monte Carmelo. Dios respondió con fuego del cielo. Pero tras la victoria vino el miedo: perseguido por Jezabel, Elías se derrumbó y pidió morir. Dios lo encontró, no en el viento ni en el terremoto, sino en un silbo apacible, y lo restauró para que continuara su ministerio. Fue llevado al cielo en un carro de fuego.",
    [
      { referencia: "1 Reyes 19:11-12", texto: "Y tras el terremoto un fuego; pero Jehová no estaba en el fuego. Y tras el fuego un silbo apacible y delicado." },
    ],
    "Después de las grandes victorias también vienen las batallas del desánimo; Dios encuentra a los agotados en la quietud.",
  ),
  p(
    "isaías",
    "Isaías",
    "Jehová es salvación",
    "Profetas",
    "c. 700 a.C.",
    "El profeta del Mesías: anunció con precisión la venida, el sufrimiento y la gloria del Siervo de Dios.",
    "Llamado en el año de la muerte del rey Uzías, Isaías vio la gloria de Dios en el templo y respondió: «Heme aquí, envíame a mí». Ministró durante cuatro reinados, anunciando juicio y consuelo. Su capítulo 53 describe al Siervo sufriente con detalles que se cumplen en Jesús: traspasado por nuestras rebeliones, molido por nuestros pecados. El «evangelio del Antiguo Testamento».",
    [
      { referencia: "Isaías 6:8", texto: "Y oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí." },
      { referencia: "Isaías 53:5", texto: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados." },
    ],
    "La santidad de Dios es la fuente de nuestro envío: quien ha visto su gloria, no puede quedarse callado.",
  ),
  p(
    "juan-bautista",
    "Juan el Bautista",
    "Dios es misericordioso",
    "Profetas",
    "c. 25 d.C.",
    "El precursor: la voz que clamó en el desierto preparando el camino del Señor.",
    "Primo de Jesús, nacido de padres ancianos con una promesa. Juan vivió en el desierto, predicó el arrepentimiento y bautizó en el Jordán. Su identidad fue clara: «No soy el Cristo; soy la voz». Cuando Jesús vino, Juan declaró: «Es necesario que él crezca, pero que yo mengüe». Fue encarcelado y decapitado por denunciar el pecado de Herodes. Jesús lo llamó el mayor entre los nacidos de mujer.",
    [
      { referencia: "Juan 1:29", texto: "El siguiente día vio Juan a Jesús que venía a él, y dijo: He aquí el Cordero de Dios, que quita el pecado del mundo." },
      { referencia: "Juan 3:30", texto: "Es necesario que él crezca, pero que yo mengüe." },
    ],
    "El mayor ministerio es señalar a Cristo con la vida, y desaparecer cuando Él aparece.",
  ),
  p(
    "pedro",
    "Pedro",
    "Roca",
    "Apóstoles",
    "s. I d.C.",
    "El pescador convertido en roca: líder del grupo apostólico, de la negación a la restauración.",
    "Simón, pescador de Galilea, dejó las redes para seguir a Jesús. Confesó «Tú eres el Cristo, el Hijo del Dios viviente», caminó sobre las aguas, cortó una oreja en Getsemaní y negó a su Maestro tres veces. Pero después de la resurrección, Jesús lo restauró junto al fuego: «Simón, ¿me amas?». Pedro predicó en Pentecostés con tres mil conversos y se convirtió en columna de la iglesia.",
    [
      { referencia: "Mateo 16:16", texto: "Tú eres el Cristo, el Hijo del Dios viviente." },
      { referencia: "Juan 21:17", texto: "Apacienta mis ovejas." },
    ],
    "El fracaso no es el final: la restauración de Cristo devuelve el propósito a los que se arrepienten.",
  ),
  p(
    "pablo",
    "Pablo",
    "Pequeño",
    "Apóstoles",
    "s. I d.C.",
    "El perseguidor convertido en apóstol: el mayor misionero de la historia, autor de la mitad del Nuevo Testamento.",
    "Saulo de Tarso, fariseo celoso, persiguió a la iglesia hasta que Cristo lo confrontó en el camino a Damasco. Ciego durante tres días, recibió la vista y el llamado: llevar el evangelio a los gentiles. Tres viajes misioneros, cárceles, naufragios y sufrimientos; trece cartas que forman el corazón teológico del cristianismo. Murió como mártir en Roma.",
    [
      { referencia: "Hechos 9:15", texto: "Instrumento escogido me es este, para llevar mi nombre en presencia de los gentiles, y de reyes, y de los hijos de Israel." },
      { referencia: "Filipenses 1:21", texto: "Porque para mí el vivir es Cristo, y el morir es ganancia." },
    ],
    "La gracia puede transformar al perseguidor más feroz en el testigo más fiel.",
  ),
  p(
    "ester",
    "Ester",
    "Estrella",
    "Mujeres",
    "c. 470 a.C.",
    "La reina valiente que salvó a su pueblo en un momento crítico de la historia judía.",
    "Huérfana judía criada por su primo Mardoqueo, Ester fue elegida reina de Persia sin revelar su origen. Cuando Hamán planeó el exterminio de los judíos, Ester arriesgó su vida presentándose ante el rey sin ser llamada: «Si perezco, perezco». Con sabiduría, dos banquetes y una denuncia oportuna, el plan del enemigo se revirtió y su pueblo fue salvado. Su historia dio origen a la fiesta de Purim.",
    [
      { referencia: "Ester 4:14", texto: "¿Y quién sabe si para esta hora has llegado al reino?" },
    ],
    "Dios coloca a los suyos en posiciones estratégicas; el valor es obedecer cuando llega la hora.",
  ),
  p(
    "rut",
    "Rut",
    "Amistad, compañera",
    "Mujeres",
    "c. 1100 a.C.",
    "La moabita fiel cuya lealtad la llevó a ser bisabuela del rey David.",
    "Tras enviudar, Rut eligió acompañar a su suegra Noemí a Israel con una declaración inmortal: «A dondequiera que tú fueres, iré yo». En Belén, recogió espigas en los campos de Booz, pariente redentor. Su historia de amor y redención culminó en el matrimonio con Booz, y su descendencia incluyó a David y a Jesús. Una gentil incorporada al pueblo de Dios por su fe.",
    [
      { referencia: "Rut 1:16", texto: "No me ruegues que te deje, y me aparte de ti; porque a dondequiera que tú fueres, iré yo; y dondequiera que vivieres, viviré." },
    ],
    "La fidelidad en lo pequeño y la lealtad en el dolor preparan el camino para la redención de Dios.",
  ),
  p(
    "débora",
    "Débora",
    "Abeja",
    "Jueces",
    "c. 1200 a.C.",
    "La profetisa y jueza que lideró a Israel a la victoria bajo la palmera.",
    "Débora era juez en Israel, profetisa y estratega. Convocó a Barac para liberar al pueblo del yugo de Jabín, rey de Canaán. Barac condicionó su participación: «Si tú fueres conmigo, yo iré». Débora fue, y la victoria se completó con Jael y la caída de Sísara. Su cántico en el capítulo 5 es uno de los poemas más antiguos de la Biblia.",
    [
      { referencia: "Jueces 4:4", texto: "Gobernaba a Israel en aquel tiempo una mujer, Débora, profetisa, mujer de Lapidot." },
    ],
    "El liderazgo de Dios no depende de género ni posición: se reconoce por la sabiduría y la fe que lo respaldan.",
  ),
  p(
    "nehemias",
    "Nehemías",
    "Jehová consuela",
    "Héroes de la fe",
    "c. 440 a.C.",
    "El copero que reconstruyó los muros de Jerusalén con oración, estrategia y trabajo en equipo.",
    "Copero del rey persa Artajerjes, Nehemías lloró al saber que Jerusalén estaba en ruinas. Obtuvo permiso del rey, inspeccionó los muros de noche y organizó el trabajo por secciones, cada familia frente a su puerta. Enfrentó burlas, amenazas y complots, y respondió con oración y determinación. Los muros se reconstruyeron en cincuenta y dos días, y el pueblo celebró con la lectura de la Ley.",
    [
      { referencia: "Nehemías 6:3", texto: "Y les envié mensajeros, diciendo: Yo hago una gran obra, y no puedo descender; porque cesaría la obra si yo la dejase y descendiese a vosotros." },
    ],
    "La visión de Dios se realiza combinando oración constante, planificación cuidadosa y trabajo incansable.",
  ),
  p(
    "timoteo",
    "Timoteo",
    "Que honra a Dios",
    "Apóstoles",
    "s. I d.C.",
    "El joven discípulo de Pablo: un ejemplo de fidelidad generacional en el ministerio.",
    "Joven de madre judía y padre griego, Timoteo fue instruido en las Escrituras desde niño por su madre Eunice y su abuela Loida. Pablo lo tomó como compañero de misión y lo dejó en Éfeso para pastorear. Le escribió dos cartas: instrucciones para el ministerio y un llamado a avivar el don de Dios, no dejarse menospreciar por su juventud y predicar la Palabra a tiempo y fuera de tiempo.",
    [
      { referencia: "2 Timoteo 1:6-7", texto: "Por lo cual te aconsejo que avives el fuego del don de Dios que está en ti... porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio." },
      { referencia: "1 Timoteo 4:12", texto: "Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza." },
    ],
    "La fe se transmite de generación en generación; ser joven no es excusa, sino oportunidad.",
  ),
  p(
    "josé",
    "José",
    "Dios añadirá",
    "Patriarcas",
    "c. 1700 a.C.",
    "El soñador que pasó del pozo al palacio, y perdonó a los que lo vendieron.",
    "Hijo amado de Jacob, vendido por sus hermanos por celos y llevado a Egipto como esclavo. Sirvió con integridad, resistió la tentación de la esposa de Potifar y fue encarcelado injustamente. En la cárcel interpretó sueños con exactitud; en palacio, los de Faraón, siendo elevado a primer ministro. Cuando la hambruna llevó a sus hermanos a Egipto, José reveló su identidad con lágrimas y perdonó: «Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien».",
    [
      { referencia: "Génesis 50:20", texto: "Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo." },
    ],
    "La integridad en el sufrimiento y el perdón en la victoria son las marcas de un carácter formado por Dios.",
  ),
  p(
    "sansón",
    "Sansón",
    "Pequeño sol",
    "Jueces",
    "c. 1100 a.C.",
    "El juez de fuerza sobrenatural cuyas debilidades lo llevaron de la victoria a la humillación y de vuelta a la fe.",
    "Nacido con un voto de nazareo, Sansón fue dotado de fuerza extraordinaria para librar a Israel de los filisteos. Pero su vida estuvo marcada por la impulsividad y la atracción por mujeres filisteas. Delatado por Dalila, perdió su fuerza, sus ojos y su libertad. En su momento final, ciego y humillado, oró una vez más, y Dios respondió: derribó el templo de Dagón sobre sus enemigos. Su último acto liberó a Israel.",
    [
      { referencia: "Jueces 16:28", texto: "Entonces Sansón clamó a Jehová, y dijo: Señor Jehová, acuérdate ahora de mí, y fortaléceme, te ruego, solamente esta vez, oh Dios, para que de una vez tome venganza de los filisteos por mis dos ojos." },
    ],
    "El potencial de Dios no sustituye la santidad personal; pero su gracia responde incluso al final de una vida desgastada.",
  ),
  p(
    "maria-de-nazaret",
    "María de Nazaret",
    "Amada de Dios",
    "Mujeres",
    "s. I a.C. - s. I d.C.",
    "La joven humilde escogida para ser la madre de Jesús: ejemplo de fe pura, disponibilidad absoluta y devoción constante.",
    "Visitada por el ángel Gabriel en la pequeña aldea de Nazaret, María respondió al llamado más trascendental de la historia con humildad absoluta: «He aquí la sierva del Señor; hágase conmigo conforme a tu palabra». Acompañó a Jesús desde el pesebre en Belén hasta la cruz en el Calvario, guardando todas las cosas en su corazón. Estuvo presente con los discípulos en la oración previa a Pentecostés.",
    [
      { referencia: "Lucas 1:38", texto: "Entonces María dijo: He aquí la sierva del Señor; hágase conmigo conforme a tu palabra." },
      { referencia: "Lucas 1:46-47", texto: "Entonces María dijo: Engrandece mi alma al Señor; y mi espíritu se regocija en Dios mi Salvador." },
    ],
    "La verdadera grandeza ante Dios comienza con un corazón dispuesto a rendirse completamente a su voluntad.",
  ),
  p(
    "salomon",
    "Salomón",
    "Pacífico",
    "Reyes",
    "c. 970 a.C.",
    "El rey de la sabiduría: constructor del primer templo de Jerusalén, autor de Proverbios y Eclesiastés.",
    "Hijo de David y Betsabé, Salomón heredó el trono de Israel en un tiempo de paz. Cuando Dios le dijo en un sueño: «Pide lo que quieras que yo te dé», Salomón no pidió riquezas ni larga vida, sino un corazón entendido para juzgar a su pueblo. Dios le otorgó sabiduría inigualable, prosperidad y el privilegio de edificar el Templo. Sin embargo, en sus últimos años, sus alianzas con mujeres extranjeras desviaron su corazón hacia la idolatría, dejando la lección sobre los peligros del compromiso moral.",
    [
      { referencia: "1 Reyes 3:9", texto: "Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo." },
      { referencia: "Proverbios 4:23", texto: "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida." },
    ],
    "La sabiduría comienza con el temor de Dios, y debe guardarse diariamente para no extraviar el corazón.",
  ),
  p(
    "daniel",
    "Daniel",
    "Dios es mi juez",
    "Profetas",
    "c. 605 a.C.",
    "El profeta del exilio: mantuvo una fe inquebrantable en Babilonia, sirvió con excelencia a reyes paganos y fue salvado en el foso de los leones.",
    "Llevado cautivo a Babilonia siendo muy joven, Daniel propuso en su corazón no contaminarse con la ración de la comida del rey. Sirvió con distinción bajo Nabucodonosor, Belsasar y Darío, interpretando sueños y visiones del imperio de Dios. Cuando sus rivales lograron decretar la prohibición de orar a cualquier dios salvo al rey, Daniel oró abiertamente en su ventana tres veces al día como solía hacer. Fue arrojado al foso de los leones, pero Dios cerró la boca de las fieras y libró a su siervo.",
    [
      { referencia: "Daniel 1:8", texto: "Y Daniel propuso en su corazón no contaminarse con la ración de la comida del rey, ni con el vino que él bebía." },
      { referencia: "Daniel 6:22", texto: "Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño." },
    ],
    "La fidelidad a Dios en lo privado sostiene la convicción y la integridad en lo público.",
  ),
  p(
    "samuel",
    "Samuel",
    "Oído por Dios",
    "Profetas",
    "c. 1100 a.C.",
    "El último juez y primer gran profeta de la monarquía: dedicado desde niño en el tabernáculo y ungidor de Saúl y David.",
    "Nacido como respuesta a la oración de Ana, Samuel creció en el tabernáculo sirviendo al sacerdote Elí. Siendo aún niño, escuchó la voz de Dios en la noche: «Habla, porque tu siervo oye». Lideró a Israel durante la transición del tiempo de los jueces a la monarquía, advirtió sobre los riesgos del rey terrenal y ungió por orden divina tanto a Saúl como a David. Su vida se caracterizó por una intercesión constante por el pueblo.",
    [
      { referencia: "1 Samuel 3:10", texto: "Y vino Jehová y se paró, y llamó como las otras veces: ¡Samuel, Samuel! Entonces Samuel dijo: Habla, porque tu siervo oye." },
      { referencia: "1 Samuel 12:23", texto: "Así que, lejos sea de mí que peque yo contra Jehová cesando de rogar por vosotros." },
    ],
    "Escuchar atentamente la voz de Dios y sostener una vida de intercesión transforma generaciones.",
  ),
];

export const categoriasPersonajes = [...new Set(personajes.map((p) => p.categoria))];

export function getPersonaje(slug: string): Personaje | undefined {
  return personajes.find((p) => p.slug === slug);
}

export function getPersonajesPorCategoria(categoria: string): Personaje[] {
  return personajes.filter((p) => p.categoria === categoria);
}
