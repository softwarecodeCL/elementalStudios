export const BRIEF_STORAGE_KEY = 'elemental-corporate-brief-v1';
export const BRIEF_SIZES = ['unknown', '1-5', '6-15', '16-30', '31-plus'];
export const BRIEF_GOALS = ['plan-training', 'improve-service', 'develop-team'];
export const BRIEF_SECTORS = ['hoteleria', 'turismo', 'restaurantes'];

/** @typedef {{value:string, label:string}} BriefOption */
/** @typedef {{roles:Record<string, BriefOption[]>,sizes:BriefOption[],goals:BriefOption[],labels:{sector:string,roles:string,size:string,goal:string},chooseSector:string,rolesHint:string,selectedCount:string}} BriefCopy */
/** @typedef {{version:1,sector:string,roles:string[],size:string,goal:string}} CorporateBrief */

/** Restore only known categories; contact details and free text are never stored. @param {unknown} value @param {BriefCopy} copy @returns {CorporateBrief|null} */
export function parseBrief(value, copy) {
  try {
    const raw = typeof value === 'string' ? JSON.parse(value) : value;
    if (!raw || typeof raw !== 'object' || raw.version !== 1 || !BRIEF_SECTORS.includes(raw.sector)) return null;
    const allowedRoles = copy.roles[raw.sector] || [];
    return {
      version: 1, sector: raw.sector,
      roles: Array.isArray(raw.roles) ? [...new Set(raw.roles.filter(role => typeof role === 'string' && allowedRoles.some(option => option.value === role)))].slice(0, allowedRoles.length) : [],
      size: BRIEF_SIZES.includes(raw.size) ? raw.size : 'unknown',
      goal: BRIEF_GOALS.includes(raw.goal) ? raw.goal : 'plan-training',
    };
  } catch { return null; }
}

/** @param {CorporateBrief} brief @param {BriefCopy} copy @param {Record<string,string>} sectors */
export function briefRows(brief, copy, sectors) {
  const roleNames = brief.roles.map(role => copy.roles[brief.sector].find(option => option.value === role)?.label).filter(Boolean);
  return [
    { label: copy.labels.sector, value: sectors[brief.sector] },
    ...(roleNames.length ? [{ label: copy.labels.roles, value: roleNames.join(', ') }] : []),
    { label: copy.labels.size, value: copy.sizes.find(option => option.value === brief.size)?.label || '' },
    { label: copy.labels.goal, value: copy.goals.find(option => option.value === brief.goal)?.label || '' },
  ];
}
