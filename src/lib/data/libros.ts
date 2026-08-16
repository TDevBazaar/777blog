export type Libro = {
  slug: string;
  nombre: string;
  abreviacion: string;
  testamento: "Antiguo Testamento" | "Nuevo Testamento";
  genero: string;
  autor: string;
  capitulos: number;
  resumen: string;
  orden: number;
};

const at = (slug: string, nombre: string, abr: string, genero: string, autor: string, cap: number, resumen: string, orden: number): Libro => ({
  slug, nombre, abreviacion: abr, testamento: "Antiguo Testamento", genero, autor, capitulos: cap, resumen, orden,
});

const nt = (slug: string, nombre: string, abr: string, genero: string, autor: string, cap: number, resumen: string, orden: number): Libro => ({
  slug, nombre, abreviacion: abr, testamento: "Nuevo Testamento", genero, autor, capitulos: cap, resumen, orden,
});

export const libros: Libro[] = [
  at("genesis", "Génesis", "Gn", "Pentateuco", "Moisés", 50, "El libro de los comienzos: la creación, la caída, el diluvio y el llamado de Abraham, Isaac, Jacob y José. Dios inicia su plan de redención.", 1),
  at("exodo", "Éxodo", "Éx", "Pentateuco", "Moisés", 40, "La liberación de Israel de la esclavitud en Egipto, el paso del Mar Rojo, el pacto del Sinaí y la construcción del tabernáculo.", 2),
  at("levitico", "Levítico", "Lv", "Pentateuco", "Moisés", 27, "La ley de la santidad: sacrificios, sacerdocio, fiestas y el llamado a ser un pueblo santo para un Dios santo.", 3),
  at("numeros", "Números", "Nm", "Pentateuco", "Moisés", 36, "El censo y los cuarenta años de peregrinación por el desierto. La fidelidad de Dios frente a la murmuración del pueblo.", 4),
  at("deuteronomio", "Deuteronomio", "Dt", "Pentateuco", "Moisés", 34, "Los discursos finales de Moisés antes de entrar a la Tierra Prometida: la ley recapitulada con amor y advertencias.", 5),
  at("josue", "Josué", "Jos", "Históricos", "Josué", 24, "La conquista de Canaán bajo el liderazgo de Josué: «Esforzándote y siendo valiente», Dios cumple sus promesas.", 6),
  at("jueces", "Jueces", "Jue", "Históricos", "Samuel (trad.)", 21, "Un ciclo repetido de desobediencia, opresión, clamor y liberación. Dios levanta jueces para rescatar a su pueblo.", 7),
  at("rut", "Rut", "Rt", "Históricos", "Samuel (trad.)", 4, "Una historia de lealtad y redención: Rut, la moabita, encuentra refugio bajo las alas de Dios y forma parte del linaje de Jesús.", 8),
  at("1-samuel", "1 Samuel", "1 S", "Históricos", "Samuel, Natán, Gad", 31, "La transición de los jueces a la monarquía: Samuel, Saúl y el joven David, un hombre conforme al corazón de Dios.", 9),
  at("2-samuel", "2 Samuel", "2 S", "Históricos", "Natán, Gad (trad.)", 24, "El reinado de David: victorias, el pacto davídico y la caída con Betsabé, seguida del arrepentimiento y restauración.", 10),
  at("1-reyes", "1 Reyes", "1 R", "Históricos", "Jeremías (trad.)", 22, "De Salomón al cisma del reino: la gloria del templo, la sabiduría del rey y el comienzo de la división de Israel.", 11),
  at("2-reyes", "2 Reyes", "2 R", "Históricos", "Jeremías (trad.)", 25, "La historia de los reyes de Israel y Judá hasta el exilio: los ministerios de Elías, Eliseo y la fidelidad de Dios al pacto.", 12),
  at("1-cronicas", "1 Crónicas", "1 Cr", "Históricos", "Esdras (trad.)", 29, "El reinado de David contado desde la perspectiva del templo y el sacerdocio, destacando la adoración y la genealogía.", 13),
  at("2-cronicas", "2 Crónicas", "2 Cr", "Históricos", "Esdras (trad.)", 36, "La historia del reino de Judá y sus reyes, con énfasis en la fidelidad al templo hasta la restauración de Ciro.", 14),
  at("esdras", "Esdras", "Esd", "Históricos", "Esdras", 10, "El regreso del exilio y la reconstrucción del templo. Dios restaura a su pueblo y su adoración.", 15),
  at("nehemias", "Nehemías", "Neh", "Históricos", "Nehemías", 13, "La reconstrucción de los muros de Jerusalén con oración y trabajo en equipo. Liderazgo, oposición y avivamiento.", 16),
  at("ester", "Ester", "Est", "Históricos", "Desconocido", 10, "La providencia oculta de Dios: una reina judía salva a su pueblo de la aniquilación. «Para un tiempo como este».", 17),
  at("job", "Job", "Job", "Poéticos", "Desconocido", 42, "El sufrimiento del justo: Job pierde todo, pero descubre que Dios es suficiente. El problema del dolor y la soberanía divina.", 18),
  at("salmos", "Salmos", "Sal", "Poéticos", "David y otros", 150, "El himnario de Israel: oración, alabanza, lamento y confianza. La música del corazón humano dirigida a Dios.", 19),
  at("proverbios", "Proverbios", "Pr", "Poéticos", "Salomón y otros", 31, "Sabiduría práctica para la vida diaria: el temor de Jehová es el principio del conocimiento.", 20),
  at("eclesiastes", "Eclesiastés", "Ec", "Poéticos", "Salomón", 12, "Vanidad de vanidades: la vida sin Dios es vacía. El Predicador concluye: teme a Dios y guarda sus mandamientos.", 21),
  at("cantares", "Cantares", "Cnt", "Poéticos", "Salomón", 8, "Un poema de amor conyugal que celebra la intimidad del matrimonio y simboliza el amor entre Dios y su pueblo.", 22),
  at("isaias", "Isaías", "Is", "Profetas mayores", "Isaías", 66, "El profeta del Mesías: juicio y consuelo, el Siervo sufriente y la promesa de un reino nuevo. El evangelio del Antiguo Testamento.", 23),
  at("jeremias", "Jeremías", "Jer", "Profetas mayores", "Jeremías", 52, "El profeta llorón anuncia el juicio de Judá y la promesa de un nuevo pacto escrito en el corazón.", 24),
  at("lamentaciones", "Lamentaciones", "Lam", "Profetas mayores", "Jeremías", 5, "Cinco poemas de duelo por la caída de Jerusalén que terminan en esperanza: las misericordias de Dios son nuevas cada mañana.", 25),
  at("ezequiel", "Ezequiel", "Ez", "Profetas mayores", "Ezequiel", 48, "Visiones de la gloria de Dios, juicio sobre Israel y las naciones, y la restauración del templo y del pueblo.", 26),
  at("daniel", "Daniel", "Dn", "Profetas mayores", "Daniel", 12, "Fidelidad en el exilio: Daniel en el foso de los leones, los amigos en el horno y visiones de los reinos y el Hijo del Hombre.", 27),
  at("oseas", "Oseas", "Os", "Profetas menores", "Oseas", 14, "El amor incondicional de Dios retratado en el matrimonio del profeta con una esposa infiel. Dios ama a su pueblo rebelde.", 28),
  at("joel", "Joel", "Jl", "Profetas menores", "Joel", 3, "El día del Señor, juicio y derramamiento del Espíritu: «Todo aquel que invocare el nombre de Jehová será salvo».", 29),
  at("amos", "Amós", "Am", "Profetas menores", "Amós", 9, "Justicia social ante el altar: el pastor de Tecoa denuncia la injusticia y la religión vacía. «Corra el juicio como las aguas».", 30),
  at("abdias", "Abdías", "Abd", "Profetas menores", "Abdías", 1, "El juicio sobre Edom por su soberbia y su trato cruel contra su hermano Israel. El día del Señor será sobre todas las naciones.", 31),
  at("jonas", "Jonás", "Jon", "Profetas menores", "Jonás", 4, "El profeta renuente y la misericordia de Dios hacia Nínive. La gracia divina va más allá de los límites humanos.", 32),
  at("miqueas", "Miqueas", "Miq", "Profetas menores", "Miqueas", 7, "Juicio y esperanza: el nacimiento del Mesías en Belén y la exigencia de hacer justicia, amar misericordia y humillarse ante Dios.", 33),
  at("nahum", "Nahúm", "Nah", "Profetas menores", "Nahúm", 3, "El juicio de Nínive: Dios es lento para la ira pero no dejará impune al malvado. Consuelo para los oprimidos.", 34),
  at("habacuc", "Habacuc", "Hab", "Profetas menores", "Habacuc", 3, "Del «¿Hasta cuándo?» al «Aunque la higuera no florezca»: el justo vivirá por su fe.", 35),
  at("sofonias", "Sofonías", "Sof", "Profetas menores", "Sofonías", 3, "El día del Señor como juicio y esperanza: Dios se gozará sobre su pueblo con cánticos.", 36),
  at("hageo", "Hageo", "Hag", "Profetas menores", "Hageo", 2, "«¿Es tiempo de que vosotros habitéis en casas artesonadas?» Prioridades: reconstruir el templo del Señor primero.", 37),
  at("zacarias", "Zacarías", "Zac", "Profetas menores", "Zacarías", 14, "Visiones del Mesías y su reino: el Rey humilde que viene en un asno, traspasado y refugiado en su pueblo.", 38),
  at("malaquias", "Malaquías", "Mal", "Profetas menores", "Malaquías", 4, "El último mensaje antes del silencio de 400 años: arrepentimiento, diezmo fiel y la promesa de Elías antes del gran día.", 39),

  nt("mateo", "Mateo", "Mt", "Evangelios", "Mateo", 28, "Jesús, el Rey Mesías anunciado en el Antiguo Testamento. El Sermón del Monte y la gran comisión.", 40),
  nt("marcos", "Marcos", "Mc", "Evangelios", "Marcos", 16, "El evangelio de la acción: Jesús, el Siervo que vino «no para ser servido, sino para servir» y dar su vida.", 41),
  nt("lucas", "Lucas", "Lc", "Evangelios", "Lucas", 24, "La investigación cuidadosa del médico Lucas: Jesús, el Salvador de todos, amigo de pecadores y de los marginados.", 42),
  nt("juan", "Juan", "Jn", "Evangelios", "Juan", 21, "El evangelio de la vida eterna: Jesús, el Verbo hecho carne, los siete «Yo soy» y la fe como respuesta.", 43),
  nt("hechos", "Hechos", "Hch", "Históricos", "Lucas", 28, "La iglesia nace en Pentecostés y el evangelio se extiende de Jerusalén a Roma: el poder del Espíritu Santo.", 44),
  nt("romanos", "Romanos", "Ro", "Epístolas", "Pablo", 16, "El evangelio de la gracia: la justificación por la fe, la santificación y la soberanía de Dios. La teología más completa de Pablo.", 45),
  nt("1-corintios", "1 Corintios", "1 Co", "Epístolas", "Pablo", 16, "Corrección y amor a una iglesia dividida: sabiduría, pureza, dones espirituales y el himno del amor.", 46),
  nt("2-corintios", "2 Corintios", "2 Co", "Epístolas", "Pablo", 13, "El ministerio del sufrimiento y la gracia: tesoros en vasos de barro y el consuelo de Dios.", 47),
  nt("galatas", "Gálatas", "Gá", "Epístolas", "Pablo", 6, "La defensa de la gracia pura: ni judaizantes ni legalismo. «Estad, pues, firmes en la libertad con que Cristo nos hizo libres».", 48),
  nt("efesios", "Efesios", "Ef", "Epístolas", "Pablo", 6, "La iglesia como cuerpo de Cristo: nuestras riquezas en Él, nuestra vida en Él y nuestra lucha espiritual.", 49),
  nt("filipenses", "Filipenses", "Flp", "Epístolas", "Pablo", 4, "La carta del gozo en la cárcel: Cristo es suficiente en toda circunstancia. «Todo lo puedo en Cristo».", 50),
  nt("colosenses", "Colosenses", "Col", "Epístolas", "Pablo", 4, "La supremacía de Cristo sobre todo: contra las filosofías vacías. En Él está toda la plenitud.", 51),
  nt("1-tesalonicenses", "1 Tesalonicenses", "1 Ts", "Epístolas", "Pablo", 5, "Una iglesia joven que da ejemplo: esperanza en la segunda venida de Cristo y santificación diaria.", 52),
  nt("2-tesalonicenses", "2 Tesalonicenses", "2 Ts", "Epístolas", "Pablo", 3, "Consuelo y advertencia sobre el día del Señor: no os alarméis, trabajad con fidelidad mientras esperáis.", 53),
  nt("1-timoteo", "1 Timoteo", "1 Ti", "Epístolas", "Pablo", 6, "Instrucciones para el liderazgo de la iglesia: sana doctrina, cualidades de obispos y diáconos, y piedad.", 54),
  nt("2-timoteo", "2 Timoteo", "2 Ti", "Epístolas", "Pablo", 4, "La última carta de Pablo: perseverancia en el ministerio, la Escritura inspirada y la corona de justicia.", 55),
  nt("tito", "Tito", "Tit", "Epístolas", "Pablo", 3, "El orden en las iglesias de Creta: buena doctrina y buenas obras van de la mano.", 56),
  nt("filemon", "Filemón", "Flm", "Epístolas", "Pablo", 1, "Una carta personal: Pablo intercede por Onésimo, el esclavo que ahora es hermano. El evangelio transforma relaciones.", 57),
  nt("hebreos", "Hebreos", "He", "Epístolas", "Desconocido", 13, "Cristo es mejor: superior a los ángeles, a Moisés y al sacerdocio. La fe como certeza de lo que se espera.", 58),
  nt("santiago", "Santiago", "Stg", "Epístolas", "Santiago", 5, "La fe que obra: oidores y hacedores de la Palabra, la lengua, la sabiduría de lo alto y la oración eficaz.", 59),
  nt("1-pedro", "1 Pedro", "1 P", "Epístolas", "Pedro", 5, "Esperanza viva en medio del sufrimiento: un pueblo santo y sacerdotal que espera la herencia incorruptible.", 60),
  nt("2-pedro", "2 Pedro", "2 P", "Epístolas", "Pedro", 3, "Crecimiento en la fe, advertencia contra falsos maestros y la esperanza del día del Señor.", 61),
  nt("1-juan", "1 Juan", "1 Jn", "Epístolas", "Juan", 5, "La seguridad de la salvación: comunión, amor y verdad. «Dios es amor».", 62),
  nt("2-juan", "2 Juan", "2 Jn", "Epístolas", "Juan", 1, "Una breve carta: caminar en la verdad y el amor, y no recibir al que no trae la doctrina de Cristo.", 63),
  nt("3-juan", "3 Juan", "3 Jn", "Epístolas", "Juan", 1, "Una carta para Gayo: hospitalidad cristiana y fidelidad a la verdad frente a Diótrefes.", 64),
  nt("judas", "Judas", "Jud", "Epístolas", "Judas", 1, "Una advertencia urgente contra los falsos maestros y un llamado a contender por la fe una vez dada.", 65),
  nt("apocalipsis", "Apocalipsis", "Ap", "Proféticos", "Juan", 22, "La revelación de Jesucristo: las iglesias, el trono de Dios, los juicios y la nueva Jerusalén. «El que venciere, heredará todas las cosas».", 66),
];

export const librosAT = libros.filter((l) => l.testamento === "Antiguo Testamento");
export const librosNT = libros.filter((l) => l.testamento === "Nuevo Testamento");

export const generos = [...new Set(libros.map((l) => l.genero))];

export function getLibro(slug: string): Libro | undefined {
  return libros.find((l) => l.slug === slug);
}

export function getLibroAnterior(libro: Libro): Libro | undefined {
  return libros.find((l) => l.orden === libro.orden - 1);
}

export function getLibroSiguiente(libro: Libro): Libro | undefined {
  return libros.find((l) => l.orden === libro.orden + 1);
}

export function versiculosPorLibro(slug: string): number {
  const libro = getLibro(slug);
  if (!libro) return 0;
  if (libro.capitulos === 1) return 25;
  return Math.max(8, Math.round((libro.capitulos * 25) / Math.max(1, libro.capitulos)));
}
