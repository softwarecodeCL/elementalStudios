import es from './es.js';
import en from './en.js';
import pt from './pt.js';

/** @returns {typeof es} */
export function getResourceMessages(locale = 'es') {
  return locale === 'en' ? en : locale === 'pt' ? pt : es;
}
