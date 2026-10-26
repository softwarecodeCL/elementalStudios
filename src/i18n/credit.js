const messages = {
  es: {
    label: 'Diseño y desarrollo',
    accessible: 'Diseño y desarrollo por softwarecode.cl, abrir sitio en una pestaña nueva',
  },
  en: {
    label: 'Design and development',
    accessible: 'Design and development by softwarecode.cl, open website in a new tab',
  },
  pt: {
    label: 'Design e desenvolvimento',
    accessible: 'Design e desenvolvimento por softwarecode.cl, abrir site em uma nova aba',
  },
};

/** @returns {typeof messages.es} */
export function getCreditMessages(locale = 'es') {
  return messages[locale] || messages.es;
}
