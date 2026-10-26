import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseBrief, briefRows } from '../src/corporate/brief.js';
import { getCorporateBriefCopy, getCorporateMessages } from '../src/i18n/corporate/index.js';

const copy = getCorporateBriefCopy('es');
const sample = {version: 1, sector: 'hoteleria', roles: ['front-desk', 'reservations'], size: '6-15', goal: 'plan-training'};

test('La consulta corporativa rechaza almacenamiento inválido o de otra versión', () => {
  for (const value of [null, 'not-json', {}, {...sample, version: 2}, {...sample, sector: '__proto__'}]) assert.equal(parseBrief(value, copy), null);
});

test('Sólo se conservan cargos del sector, sin duplicados ni datos personales', () => {
  const brief = parseBrief({...sample, roles: ['front-desk', 'front-desk', 'guides', '<script>'], email: 'persona@example.com', name: 'PERSONAL'}, copy);
  assert.deepEqual(brief.roles, ['front-desk']);
  assert.deepEqual(Object.keys(brief).sort(), ['version', 'sector', 'roles', 'size', 'goal'].sort());
  assert.ok(!JSON.stringify(brief).includes('PERSONAL'));
});

test('Tamaño y objetivo desconocidos conservan una consulta utilizable', () => {
  const brief = parseBrief({...sample, size: 'a thousand', goal: '<script>'}, copy);
  assert.equal(brief.size, 'unknown');
  assert.equal(brief.goal, 'plan-training');
  assert.deepEqual(briefRows(brief, copy, {hoteleria: 'Hotelería'}).map(row => row.value), ['Hotelería', 'Recepción, Reservas', 'Por definir', 'Preparar una capacitación']);
});

test('El contexto de equipo conserva sus categorías al cambiar el idioma', () => {
  const shape = value => Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, shape(value[key])])) : typeof value;
  for (const locale of ['es', 'en', 'pt']) {
    assert.deepEqual(shape(getCorporateMessages(locale)), shape(getCorporateMessages('es')));
    const local = getCorporateBriefCopy(locale);
    assert.deepEqual(parseBrief(JSON.stringify(sample), local), sample);
    assert.deepEqual(local.sizes.map(option => option.value), copy.sizes.map(option => option.value));
    assert.deepEqual(local.goals.map(option => option.value), copy.goals.map(option => option.value));
    for (const sector of Object.keys(copy.roles)) assert.deepEqual(local.roles[sector].map(option => option.value), copy.roles[sector].map(option => option.value));
  }
});
