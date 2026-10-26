import assert from "node:assert/strict";
import { test } from "node:test";
import { units, questions } from "../src/diagnostic/bank.js";
import {
  createSession,
  parseSession,
  summarize,
  prototypeScore,
  MAX_PLAYS,
} from "../src/diagnostic/model.js";
import {
  getMessages,
  locales,
  localizedPath,
  getLocale,
} from "../src/i18n/index.js";

const shape = (value) =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, shape(value[key])]),
        )
      : typeof value;

test("Todos los idiomas tienen las mismas claves y contenidos completos", () => {
  const schema = shape(getMessages("es"));
  for (const locale of locales) {
    const messages = getMessages(locale);
    assert.ok(
      !/[A-Za-z]\?+[A-Za-z]/.test(JSON.stringify(messages)),
      `Texto sin problemas de codificación: ${locale}`,
    );
    assert.deepEqual(shape(messages), schema, locale);
    assert.equal(messages.diagnostic.explanations.length, questions.length);
    for (const question of questions) {
      assert.ok(
        messages.diagnostic.explanations[question.id]?.trim(),
        `Explicación ${question.id} en ${locale}`,
      );
      assert.ok(
        messages.diagnostic.skills[question.tag]?.tip,
        `Habilidad ${question.tag} en ${locale}`,
      );
    }
  }
});

test("La localización conserva página y fragmento con español como predeterminado", () => {
  assert.equal(localizedPath("es", "/"), "/");
  assert.equal(localizedPath("en", "/"), "/en/");
  assert.equal(
    localizedPath("pt", "/en/diagnostico-toeic/"),
    "/pt/diagnostico-toeic/",
  );
  assert.equal(localizedPath("en", "/pt/#programas"), "/en/#programas");
  assert.equal(getLocale("/english/"), "es");
  assert.equal(getLocale("/pt/diagnostico-toeic/"), "pt");
});

test("Banco integrado: 36 preguntas, nueve audios y respuestas válidas", () => {
  assert.equal(questions.length, 36);
  assert.equal(questions.filter((q) => q.section === "L").length, 15);
  assert.equal(questions.filter((q) => q.section === "R").length, 21);
  assert.equal(units.filter((unit) => unit.audioSrc).length, 9);
  assert.deepEqual(
    questions.map((q) => q.id),
    Array.from({ length: 36 }, (_, index) => index),
  );
  for (const question of questions)
    assert.ok(
      question.answer >= 0 && question.answer < question.options.length,
    );
});

test("Resultados completos y vacíos permanecen dentro de los límites del prototipo", () => {
  const session = createSession();
  assert.equal(summarize(session).correct, 0);
  assert.equal(summarize(session).estimate, 10);
  for (const question of questions)
    session.answers[question.id] = question.answer;
  const report = summarize(session);
  assert.equal(report.percentage, 100);
  assert.equal(report.estimate, 990);
  assert.equal(report.priorities.length, 0);
  assert.ok(report.skills.every((skill) => skill.ratio === 1));
  assert.equal(prototypeScore("L", NaN), 5);
  assert.equal(prototypeScore("R", 2), 495);
});

test("Restauración conserva respuestas y límites de audio entre recargas e idiomas", () => {
  const session = createSession();
  session.screen = "test";
  session.unit = 7;
  session.answers[0] = 1;
  session.plays[0] = MAX_PLAYS;
  session.transcripts = [0];
  session.elapsedMs = 12000;
  const restored = parseSession(JSON.stringify(session));
  assert.equal(restored.unit, 7);
  assert.equal(restored.answers[0], 1);
  assert.equal(restored.plays[0], 2);
  assert.deepEqual(restored.transcripts, [0]);
  assert.equal(restored.elapsedMs, 12000);
});

test("El estado persistido inválido no produce informes completos ni valores arbitrarios", () => {
  assert.equal(parseSession("{bad json"), null);
  assert.equal(parseSession({ bankVersion: 999 }), null);
  const restored = parseSession({
    ...createSession(),
    screen: "results",
    unit: 1000,
    answers: { 0: 999, 1: -1 },
    plays: { 0: 80 },
    transcripts: [0, 0, 999, "1"],
    elapsedMs: -1,
  });
  assert.equal(restored.screen, "paused");
  assert.equal(restored.unit, units.length - 1);
  assert.deepEqual(restored.answers, {});
  assert.equal(restored.plays[0], MAX_PLAYS);
  assert.deepEqual(restored.transcripts, [0]);
  assert.equal(restored.elapsedMs, 0);
});
