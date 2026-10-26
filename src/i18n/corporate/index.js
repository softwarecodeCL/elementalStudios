import es from './es.js';
import en from './en.js';
import pt from './pt.js';

/** @returns {typeof es} */
export function getCorporateMessages(locale = 'es') {
  return locale === 'en' ? en : locale === 'pt' ? pt : es;
}

export function getCorporateBriefCopy(locale = 'es') {
  const copy = getCorporateMessages(locale).brief;
  return {
    roles: copy.roles, sizes: copy.sizes, goals: copy.goals,
    labels: {sector: copy.sector, roles: copy.roleLegend, size: copy.size, goal: copy.goal},
    chooseSector: copy.chooseSector, rolesHint: copy.roleHint, selectedCount: copy.selectedCount,
  };
}
