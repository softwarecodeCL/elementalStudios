import feedback from "./feedback-es.js";
export default {
  jsRequired:
    "Activa JavaScript para realizar el diagnóstico. Las instrucciones de esta página siguen disponibles.",
  metaTitle: "Diagnóstico de inglés TOEIC | Elemental Studios",
  metaDescription:
    "Explora tu inglés con 36 preguntas de Listening y Reading, audios y un informe de habilidades. Diagnóstico orientativo gratuito de unos 25 minutos.",
  eyebrow: "DIAGNÓSTICO DE INGLÉS",
  title: "Conoce tu punto de partida.",
  accent: "Dale dirección a tu aprendizaje.",
  intro:
    "Un espacio para explorar cómo comprendes el inglés en contextos de trabajo. Responde a tu ritmo y recibe un informe que te ayude a decidir qué practicar después.",
  free: "GRATUITO · SIN REGISTRO",
  minutes: "25 min aprox.",
  questionCount: "36 preguntas",
  sections: "Listening + Reading",
  stepsTitle: "Antes de comenzar",
  steps: [
    {
      title: "Prepara tu espacio",
      text: "Busca un lugar tranquilo, ten tus audífonos a mano y comprueba el sonido. Reserva unos 25 minutos para responder con atención.",
    },
    {
      title: "Responde con lo que sabes",
      text: "Evita traductores y ayuda externa. Lee las instrucciones de cada parte y elige una respuesta por pregunta. Puedes volver a bloques anteriores.",
    },
    {
      title: "Aprende de tus resultados",
      text: "Al terminar verás aciertos, habilidades y explicaciones. El diagnóstico no evalúa expresión oral ni escrita y no reemplaza un examen oficial.",
    },
  ],
  outlineTitle: "Qué vas a encontrar",
  outlineIntro:
    "36 preguntas repartidas en 23 bloques. Algunas lecturas y conversaciones reúnen varias preguntas.",
  listeningDesc: "Preguntas y respuestas, conversaciones y mensajes.",
  readingDesc: "Oraciones, textos incompletos y comprensión lectora.",
  countLabel: "{count} preguntas",
  parts: {
    2: {
      name: "Pregunta y respuesta",
      instruction:
        "Escucha la pregunta o afirmación y las tres respuestas del audio. Las respuestas no se muestran escritas. Elige A, B o C.",
    },
    3: {
      name: "Conversaciones",
      instruction:
        "Lee primero las preguntas. Después escucha la conversación y elige la mejor respuesta para cada una.",
    },
    4: {
      name: "Charlas y mensajes",
      instruction:
        "Lee las preguntas antes de escuchar. Identifica el propósito del mensaje y los datos que necesitas para responder.",
    },
    5: {
      name: "Oraciones incompletas",
      instruction:
        "Lee la oración completa. Elige la palabra o frase que encaje por su significado y su estructura.",
    },
    6: {
      name: "Completar textos",
      instruction:
        "Lee el texto completo y resuelve sus espacios. Uno de ellos requiere una oración: considera también las frases que la rodean.",
    },
    7: {
      name: "Comprensión lectora",
      instruction:
        "Lee el documento y responde según la información que contiene. Algunas preguntas requieren inferir; otras piden identificar detalles.",
    },
  },
  partLabel: "Parte {part}",
  soundTitle: "Comprueba el sonido",
  soundIntro:
    "Escucha una señal breve antes de empezar. Esta prueba no consume reproducciones del diagnóstico.",
  soundButton: "Reproducir sonido de prueba",
  soundSuccess:
    "Se reprodujo la señal. Si no la escuchaste, revisa el volumen y la salida de audio.",
  soundError:
    "No pudimos reproducir la señal. Revisa la configuración de sonido de tu navegador.",
  setupTitle: "Tu diagnóstico, a tu ritmo",
  name: "Nombre (opcional)",
  namePlaceholder: "¿Cómo te llamas?",
  target: "Meta TOEIC (opcional)",
  targetUnknown: "Todavía no tengo una meta",
  targetPoints: "{score} puntos",
  ready: "Tengo un espacio tranquilo y el audio listo.",
  start: "Comenzar diagnóstico",
  resume: "Retomar mi diagnóstico",
  viewSaved: "Ver mi último informe",
  resumeHint: "Hay un diagnóstico guardado en este navegador.",
  restart: "Empezar de nuevo",
  restartConfirm: "¿Quieres borrar este intento y comenzar uno nuevo?",
  localNote:
    "Tu avance se guarda en este navegador. No solicitamos correo ni enviamos tus respuestas a un servidor.",
  rulesTitle: "Cómo funciona",
  rules: [
    "El tiempo es orientativo: no hay cierre automático.",
    "Cada audio admite hasta dos reproducciones; volver atrás no las reinicia.",
    "La transcripción es una ayuda de accesibilidad. Si la usas, se indicará en el informe.",
    "Puedes pausar y retomar desde este navegador. El tiempo de pausa no se suma.",
  ],
  scope:
    "Ejercicios inspirados en las partes 2 a 7 de TOEIC Listening & Reading. No incluye fotografías de la parte 1, expresión oral ni escrita.",
  notice:
    "Este diagnóstico es orientativo. TOEIC es una marca registrada de ETS. Esta herramienta no está afiliada ni respaldada por ETS.",
  progress: "Avance del diagnóstico",
  progressText: "{answered} de {total} respondidas",
  block: "Bloque {current} de {total}",
  elapsed: "Tiempo activo",
  pause: "Pausar",
  pausedTitle: "Un momento para ti.",
  pausedText:
    "Tu avance está guardado. El audio y el tiempo activo están en pausa. Retoma cuando estés listo.",
  continue: "Continuar diagnóstico",
  exit: "Volver a las instrucciones",
  question: "Pregunta {number}",
  choose: "Elige la mejor respuesta.",
  previous: "Bloque anterior",
  next: "Siguiente bloque",
  finish: "Ver mi diagnóstico",
  answerHint: "Selecciona una respuesta en cada pregunta para continuar.",
  audio: "Audio del bloque",
  play: "Reproducir audio",
  pauseAudio: "Pausar audio",
  resumeAudio: "Continuar audio",
  replay: "Escuchar otra vez",
  noPlays: "Reproducciones utilizadas",
  playing: "Reproduciendo…",
  remaining: "{count} de 2 reproducciones disponibles",
  audioError:
    "No se pudo cargar el audio. Inténtalo de nuevo o consulta la transcripción.",
  transcriptShow: "Ver transcripción de apoyo",
  transcriptHide: "Ocultar transcripción",
  transcriptNote:
    "El uso de esta ayuda se registra para interpretar el resultado de Listening.",
  audioHelp:
    "Lee las preguntas antes de reproducir. Los audios y las preguntas se mantienen en inglés.",
  reading: "Texto de lectura",
  saveError:
    "No fue posible guardar el avance. Puedes continuar, pero evita cerrar esta pestaña.",
  resultEyebrow: "TU DIAGNÓSTICO",
  resultTitle: "Tu próximo paso, más claro.",
  resultIntro:
    "Este resultado resume tu desempeño en las preguntas de esta muestra. Úsalo para orientar la práctica y conversar sobre tu capacitación.",
  accuracy: "Aciertos en esta muestra",
  correct: "{correct} de {total} correctas",
  reference: "Referencia TOEIC del prototipo",
  referenceScale: "Escala orientativa 10–990",
  referenceNote:
    "La conversión del prototipo es aproximada y no está validada frente a TOEIC. No predice un puntaje oficial. Las referencias MCER por sección se derivan de esa misma estimación y no certifican un nivel.",
  cefr: "MCER de referencia",
  cefrBelow: "Por debajo de A1",
  goal: "Meta elegida: {score}",
  goalNote:
    "La meta sirve para orientar tu preparación; confirma tu progreso con una evaluación completa.",
  transcriptResult:
    "Bloques con transcripción: {count}. Interpreta Listening como práctica con apoyo.",
  playsResult: "Bloques con repetición de audio: {count}.",
  priorityTitle: "Por dónde puedes empezar",
  priorityIntro:
    "Estas son las habilidades con mayor oportunidad de práctica en esta muestra.",
  allStrong:
    "No hay habilidades por debajo del 80% en esta muestra. El siguiente paso es practicar con una evaluación más amplia.",
  skillMap: "Tu mapa de habilidades",
  sampleNote:
    "Cada habilidad se basa en pocas preguntas. Los resultados describen esta muestra y pueden variar en una evaluación más amplia.",
  priority: "Prioridad",
  practice: "Reforzar",
  strength: "Fortaleza en esta muestra",
  reviewTitle: "Comprende cada respuesta",
  reviewIntro:
    "Abre una pregunta para revisar tu elección, la respuesta correcta y su explicación.",
  yourAnswer: "Tu respuesta",
  rightAnswer: "Respuesta correcta",
  notAnswered: "Sin responder",
  correctLabel: "Correcta",
  incorrectLabel: "Por reforzar",
  download: "Descargar resumen",
  print: "Imprimir informe",
  reportFilename: "diagnostico-ingles-elemental.txt",
  reportTitle: "Diagnóstico orientativo de inglés · Elemental Studios",
  ctaTitle: "Dale continuidad a tu aprendizaje.",
  ctaText:
    "Conversemos sobre las necesidades de tu equipo y un programa de inglés o portugués para tu empresa.",
  cta: "Hablar con Elemental Studios",
  retake: "Repetir diagnóstico",
  storageVersion:
    "El intento anterior no es compatible con esta versión. Puedes comenzar uno nuevo.",
  ...feedback,
};
