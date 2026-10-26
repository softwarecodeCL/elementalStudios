import es from './es.js';
import en from './en.js';
import pt from './pt.js';

export const commercialSlugs = Object.keys(es.pages);

/**
 * @typedef {{ title: string, text: string }} ContentItem
 * @typedef {{ question: string, answer: string }} Question
 * @typedef {{
 * title: string, description: string, label: string, heading: string,
 * accent: string, lead: string, image: string, alt: string,
 * language: string, sector: string, official: boolean,
 * facts: Array<{ value: string, label: string }>,
 * audience: { title: string, text: string, roles: string[] },
 * outcomes: { eyebrow: string, title: string, items: Array<ContentItem & { example: string }> },
 * included: ContentItem[], note: ContentItem | null,
 * faq: Question[], related: string[], cta: ContentItem
 * }} CommercialPage
 * @typedef {{ ui: typeof es.ui, pages: Record<string, CommercialPage> }} CommercialMessages
 */

/** @returns {CommercialMessages} */
export function getCommercialMessages(locale = 'es') {
  return locale === 'en' ? en : locale === 'pt' ? pt : es;
}
