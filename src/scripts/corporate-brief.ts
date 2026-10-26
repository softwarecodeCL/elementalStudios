import { BRIEF_STORAGE_KEY, parseBrief, briefRows } from '../corporate/brief.js';
import { recordEvent } from './measurement';
import type { BriefCopy } from '../corporate/brief.js';

const form = document.querySelector<HTMLFormElement>('[data-corporate-brief]');
if (form) {
  const copy: BriefCopy = JSON.parse(form.dataset.briefCopy || '{}');
  const sector = form.querySelector<HTMLSelectElement>('[name="brief-sector"]')!;
  const size = form.querySelector<HTMLSelectElement>('[name="brief-size"]')!;
  const goal = form.querySelector<HTMLSelectElement>('[name="brief-goal"]')!;
  const roles = form.querySelector<HTMLElement>('[data-brief-role-options]')!;
  const roleGroup = form.querySelector<HTMLFieldSetElement>('[data-brief-roles]');
  const hint = form.querySelector<HTMLElement>('[data-brief-role-hint]');
  const summary = form.querySelector<HTMLElement>('[data-brief-summary]');
  const status = form.querySelector<HTMLElement>('[data-brief-status]');
  const sectors = Object.fromEntries(Array.from(sector.options).filter(option => option.value).map(option => [option.value, option.text]));
  function currentBrief() {
    return parseBrief({version: 1, sector: sector.value, roles: Array.from(form!.querySelectorAll<HTMLInputElement>('[name="brief-role"]:checked')).map(input => input.value), size: size.value, goal: goal.value}, copy);
  }
  function updateSummary() {
    const brief = currentBrief();
    if (!summary) return;
    summary.hidden = !brief;
    summary.replaceChildren();
    if (!brief) return;
    for (const row of briefRows(brief, copy, sectors)) {
      const item = document.createElement('div');
      const label = document.createElement('span');
      const value = document.createElement('strong');
      label.textContent = row.label;
      value.textContent = row.value;
      item.append(label, value);
      summary.append(item);
    }
  }
  function updateRoles() {
    roles.replaceChildren();
    const options = copy.roles[sector.value] || [];
    if (roleGroup) roleGroup.disabled = !options.length;
    if (hint) { hint.hidden = Boolean(options.length); hint.textContent = copy.rolesHint; }
    for (const option of options) {
      const label = document.createElement('label');
      const input = document.createElement('input');
      const text = document.createElement('span');
      input.type = 'checkbox'; input.name = 'brief-role'; input.value = option.value;
      text.textContent = option.label;
      label.append(input, text);
      roles.append(label);
    }
    updateSummary();
  }
  sector.addEventListener('change', updateRoles);
  form.addEventListener('change', updateSummary);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const brief = currentBrief();
    if (!brief) return;
    try { sessionStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(brief)); } catch { /* The contact link still works without storage. */ }
    recordEvent('corporate_brief_prepared', {program: 'diagnostico-ingles-empresas', sector: brief.sector, team_size: brief.size, objective: brief.goal});
    const target = new URL(form.dataset.contactUrl || '/#contacto', window.location.origin);
    target.searchParams.set('sector', brief.sector);
    target.searchParams.set('team_size', brief.size);
    target.searchParams.set('objective', brief.goal);
    if (brief.roles.length) target.searchParams.set('roles', brief.roles.join(','));
    window.location.assign(target.href);
  });
  try {
    const parameters = new URLSearchParams(window.location.search);
    const fromLink = parseBrief({version: 1, sector: parameters.get('sector'), size: parameters.get('team_size'), goal: parameters.get('objective'), roles: (parameters.get('roles') || '').split(',')}, copy);
    const saved = fromLink || parseBrief(sessionStorage.getItem(BRIEF_STORAGE_KEY), copy);
    if (saved) {
      sector.value = saved.sector; size.value = saved.size; goal.value = saved.goal;
      updateRoles();
      roles.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.checked = saved.roles.includes(input.value); });
    } else updateRoles();
  } catch { updateRoles(); }
  updateSummary();
  if (status) status.textContent = '';
  form.hidden = false;
}
