import diagnostic from "./assessment/es.js";
import articles from "./articles/es.js";

export default {
  meta: {
    title: "Capacitación de idiomas para empresas en Chile | Elemental Studios",
    description:
      "Inglés y portugués para empresas de hotelería, turismo y restaurantes en Chile. OTEC Elemental Studios SpA: formación online y programas a medida.",
  },
  common: {
    home: "Inicio",
    brandHome: "Elemental Studios, inicio",
    skip: "Ir al contenido",
    language: "Idioma del sitio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    navigation: "Navegación principal",
    mobileNavigation: "Navegación móvil",
    previous: "Anterior",
    next: "Siguiente",
    optional: "Opcional",
  },
  nav: {
    programs: "Programas",
    diagnostic: "Diagnóstico de inglés",
    business: "Para empresas",
    contact: "Contacto",
    students: "Acceso alumnos",
    moodle: "Acceso a Moodle",
    talk: "Hablemos",
  },
  hero: {
    eyebrow: "IDIOMAS QUE IMPULSAN LA HOSPITALIDAD",
    line1: "El buen servicio",
    line2: "habla",
    english: "inglés.",
    and: "Y",
    portuguese: "portugués.",
    description:
      "Conecta a tu equipo con el mundo. Capacitación de idiomas para empresas de",
    sectors: "hotelería, turismo y restaurantes.",
    cta: "Conversemos sobre tu equipo",
    explore: "Explorar programas",
    online: "Formación online y asincrónica",
    tailored: "Programas a medida",
    greeting: "HELLO. OLÁ. BIENVENIDOS.",
    detail: "La hospitalidad es un lenguaje que nos conecta.",
    carousel: "Sectores de capacitación",
    selectPhoto: "Seleccionar fotografía del sector",
    previousPhoto: "Fotografía anterior",
    nextPhoto: "Fotografía siguiente",
    slides: ["Hotelería", "Turismo", "Empresas"],
    captions: [
      "Cada estadía comienza con una buena conversación.",
      "Idiomas que acercan culturas y experiencias.",
      "Nuevas herramientas para conectar profesionalmente.",
    ],
  },
  features: [
    {
      title: "Online y asincrónico",
      text: "Aprendizaje que acompaña tu operación.",
    },
    {
      title: "Programas a medida",
      text: "Para las necesidades de tu equipo.",
    },
    {
      title: "Plataforma Moodle",
      text: "Cursos, materiales y evaluaciones.",
    },
    {
      title: "Seguimiento de avance",
      text: "Visibilidad para tu empresa.",
    },
  ],
  programs: {
    eyebrow: "APRENDER PARA CONECTAR",
    title: "Tu sector. Tu equipo.",
    accent: "Inglés y portugués.",
    intro:
      "Dos idiomas. Situaciones reales de trabajo. Programas adaptados a las personas que hacen posible cada experiencia.",
    badge: "INGLÉS Y PORTUGUÉS",
    cta: "Consultar por este programa",
    note: "El punto de partida se define con un diagnóstico inicial. El programa se adapta a tu equipo.",
    sectors: [
      {
        name: "Hotelería",
        subtitle: "Una bienvenida sin barreras.",
        description:
          "Desde la primera reserva hasta el check-out. Inglés y portugués para acompañar cada momento de la estadía.",
        scenario:
          "Recibir huéspedes, gestionar reservas y responder solicitudes con una comunicación más cercana.",
        roles: "Recepción · Reservas · Housekeeping",
        alt: "Atención de un huésped en la recepción de un hotel",
      },
      {
        name: "Turismo",
        subtitle: "Conecta culturas y experiencias.",
        description:
          "Inglés y portugués para orientar viajeros, compartir destinos y acompañar experiencias.",
        scenario:
          "Presentar itinerarios, explicar actividades y resolver consultas de visitantes internacionales.",
        roles: "Guías · Operadores · Atención al viajero",
        alt: "Viajeros recibiendo orientación durante su estadía",
      },
      {
        name: "Restaurantes",
        subtitle: "El buen servicio también se habla.",
        description:
          "Inglés y portugués para recibir comensales, explicar la carta y acompañar el servicio.",
        scenario:
          "Presentar el menú, tomar pedidos y responder consultas en situaciones reales de atención.",
        roles: "Garzones · Anfitriones · Supervisores",
        alt: "Garzón explicando la carta a comensales de un restaurante",
      },
    ],
  },
  business: {
    eyebrow: "PERSONAS QUE HACEN LA DIFERENCIA",
    title: "Más herramientas para tu equipo.",
    accent: "Más posibilidades para tu empresa.",
    benefits: [
      {
        title: "Una atención más cercana",
        text: "Herramientas para comprender y responder a huéspedes, viajeros y comensales.",
      },
      {
        title: "Aprendizaje con contexto",
        text: "Vocabulario y situaciones vinculados a los cargos y las necesidades de tu empresa.",
      },
      {
        title: "Flexibilidad para aprender",
        text: "Formación asincrónica para organizar el estudio junto a las responsabilidades del trabajo.",
      },
      {
        title: "Progreso que puedes seguir",
        text: "Evaluaciones e informes para acompañar el desarrollo de tu equipo.",
      },
    ],
    bannerEyebrow: "INGLÉS + PORTUGUÉS",
    bannerTitle: "La próxima gran experiencia empieza con una conversación.",
    cta: "Hablemos de tu empresa",
  },
  faq: {
    eyebrow: "PREGUNTAS FRECUENTES",
    title: "Conversemos",
    accent: "sin dudas.",
    intro:
      "Lo que necesitas saber antes de dar el siguiente paso con tu equipo.",
    items: [
      {
        question: "¿La capacitación es online o presencial?",
        answer:
          "La formación es online y asincrónica. Los colaboradores acceden a cursos, materiales, ejercicios y exámenes a través de Moodle y avanzan de acuerdo con la organización del programa.",
      },
      {
        question: "¿Los programas se adaptan a nuestra empresa?",
        answer:
          "Sí. La capacitación considera las necesidades de la empresa, el sector y los cargos de sus colaboradores. El diagnóstico inicial permite identificar su punto de partida.",
      },
      {
        question: "¿Ofrecen inglés y portugués?",
        answer:
          "Sí. Desarrollamos capacitación en ambos idiomas aplicada a hotelería, turismo y restaurantes. Al consultar, puedes indicar uno o ambos idiomas.",
      },
      {
        question: "¿Cómo podemos conocer el avance del equipo?",
        answer:
          "El programa contempla diagnóstico inicial, evaluaciones e informes de avance para la empresa. Al finalizar, los participantes cuentan con una evaluación final y un certificado.",
      },
      {
        question: "¿El diagnóstico online es un examen oficial?",
        answer:
          "No. Es una herramienta orientativa de inglés con ejercicios de comprensión auditiva y lectora. El resultado describe esta muestra de preguntas y no certifica un nivel ni reemplaza un examen TOEIC oficial.",
      },
    ],
  },
  contact: {
    eyebrow: "EL PRÓXIMO PASO EMPIEZA AQUÍ",
    title: "Tu equipo tiene mucho que decir.",
    accent: "Conectémoslo con el mundo.",
    intro:
      "Cuéntanos qué necesita tu empresa y conversemos sobre un programa de idiomas para tu equipo.",
    direct: "Prefiero escribir directamente",
    note: "Una conversación para entender tus necesidades. Un programa pensado para tu empresa.",
    formTitle: "Hablemos de tu equipo",
    formIntro: "Completa tus datos para preparar tu consulta.",
    name: "Tu nombre",
    namePlaceholder: "Nombre y apellido",
    company: "Empresa",
    companyPlaceholder: "Nombre de tu empresa",
    email: "Correo de contacto",
    emailPlaceholder: "nombre@tuempresa.cl",
    sector: "Sector",
    selectSector: "Selecciona tu sector",
    otherSector: "Otra empresa",
    language: "Idioma de interés",
    selectLanguage: "Selecciona un idioma",
    english: "Inglés",
    portuguese: "Portugués",
    both: "Inglés y portugués",
    needs: "¿Qué necesita tu equipo?",
    messagePlaceholder:
      "Cuéntanos qué cargos te gustaría capacitar y qué situaciones necesitan resolver.",
    submit: "Continuar en WhatsApp",
    help: "Se abrirá WhatsApp con tu consulta preparada. Tú decides cuándo enviarla.",
    status: "Tu consulta está preparada. Si WhatsApp no se abrió, ",
    fallback: "continúa desde este enlace.",
    noJs: "También puedes escribirnos directamente por WhatsApp.",
    whatsappIntro:
      "Hola, quisiera consultar por capacitación de idiomas para mi empresa.",
    messageLabels: {
      name: "Nombre",
      company: "Empresa",
      email: "Correo",
      sector: "Sector",
      language: "Idioma",
      needs: "Necesidades",
    },
  },
  footer: {
    tagline: "Idiomas que conectan. Personas que marcan la diferencia.",
    explore: "EXPLORA",
    programs: "Nuestros programas",
    diagnostic: "Evalúa tu inglés",
    business: "Para tu empresa",
    connect: "SIGAMOS CONECTADOS",
    whatsapp: "Conversemos por WhatsApp",
    students: "Plataforma de alumnos",
    resources: "Recursos para aprender",
    rights: "Todos los derechos reservados.",
    made: "Hecho para conectar con el mundo",
  },
  diagnosticPromo: {
    eyebrow: "CONOCE TU PUNTO DE PARTIDA",
    title: "Antes del próximo paso,",
    accent: "descubre dónde estás.",
    intro:
      "Explora tu comprensión del inglés con un diagnóstico de Listening y Reading. Identifica fortalezas y contenidos que puedes reforzar.",
    cta: "Hacer diagnóstico de inglés",
    minutes: "25 min aprox.",
    questions: "36 preguntas",
    report: "Informe al terminar",
    note: "Herramienta orientativa inspirada en el formato TOEIC. Disponible para inglés.",
  },
  notFound: {
    title: "Página no encontrada",
    heading: "Busquemos una nueva dirección.",
    description: "La página que buscas no está disponible.",
    cta: "Volver al inicio",
  },
  diagnostic: diagnostic,
  articles: articles,
};
