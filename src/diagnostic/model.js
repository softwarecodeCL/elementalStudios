import { BANK_VERSION, questions, units } from "./bank.js";

export const STORAGE_KEY = "elemental-english-diagnostic-v3";
export const MAX_PLAYS = 2;
/** @typedef {{bankVersion:number, screen:string, unit:number, answers:Record<number,number>, plays:Record<number,number>, transcripts:number[], elapsedMs:number, name:string, target:number, completedAt:string|null}} Session */
/** @returns {Session} */
export function createSession() {
  return {
    bankVersion: BANK_VERSION,
    screen: "intro",
    unit: 0,
    answers: {},
    plays: {},
    transcripts: [],
    elapsedMs: 0,
    name: "",
    target: 0,
    completedAt: null,
  };
}
/** Only restore values that belong to the current question bank. */
export function parseSession(serialized) {
  try {
    const raw =
      typeof serialized === "string" ? JSON.parse(serialized) : serialized;
    if (!raw || raw.bankVersion !== BANK_VERSION) return null;
    const session = createSession();
    session.unit = Number.isInteger(raw.unit)
      ? Math.max(0, Math.min(units.length - 1, raw.unit))
      : 0;
    session.name = typeof raw.name === "string" ? raw.name.slice(0, 80) : "";
    session.target = [0, 450, 550, 650, 750, 850].includes(raw.target)
      ? raw.target
      : 0;
    session.elapsedMs = Number.isFinite(raw.elapsedMs)
      ? Math.max(0, Math.min(raw.elapsedMs, 24 * 60 * 60 * 1000))
      : 0;
    for (const question of questions) {
      const value = raw.answers?.[question.id];
      if (
        Number.isInteger(value) &&
        value >= 0 &&
        value < question.options.length
      )
        session.answers[question.id] = value;
    }
    for (const unit of units.filter((item) => item.audioSrc)) {
      const count = raw.plays?.[unit.id];
      session.plays[unit.id] = Number.isInteger(count)
        ? Math.max(0, Math.min(MAX_PLAYS, count))
        : 0;
    }
    session.transcripts = Array.isArray(raw.transcripts)
      ? [
          ...new Set(
            raw.transcripts.filter(
              (id) => Number.isInteger(id) && units[id]?.audioSrc,
            ),
          ),
        ]
      : [];
    session.screen = ["intro", "test", "paused", "results"].includes(raw.screen)
      ? raw.screen
      : "intro";
    if (
      session.screen === "results" &&
      Object.keys(session.answers).length !== questions.length
    )
      session.screen = "paused";
    session.completedAt =
      session.screen === "results" && typeof raw.completedAt === "string"
        ? raw.completedAt
        : null;
    return session;
  } catch {
    return null;
  }
}

/** This preserves the prototype's heuristic; it is NOT ETS equating. */
export function prototypeScore(section, ratio) {
  const safeRatio = Number.isFinite(ratio)
    ? Math.max(0, Math.min(1, ratio))
    : 0;
  const exponent = section === "L" ? 0.9 : 1.1;
  return Math.max(
    5,
    Math.min(495, Math.round((5 + 490 * safeRatio ** exponent) / 5) * 5),
  );
}
// ETS section reference thresholds. Applying these to an unvalidated estimate
// does not produce a certified CEFR result. The interface states this explicitly.
const thresholds = {
  L: [
    [490, "C1"],
    [400, "B2"],
    [275, "B1"],
    [110, "A2"],
    [60, "A1"],
  ],
  R: [
    [455, "C1"],
    [385, "B2"],
    [275, "B1"],
    [115, "A2"],
    [60, "A1"],
  ],
};
export function cefrReference(section, score) {
  return (
    (thresholds[section] || []).find(([minimum]) => score >= minimum)?.[1] ||
    "< A1"
  );
}
/** @param {Session} session */
export function summarize(session) {
  const sections = ["L", "R"].map((section) => {
    const subset = questions.filter((q) => q.section === section);
    const correct = subset.filter(
      (q) => session.answers[q.id] === q.answer,
    ).length;
    const ratio = correct / subset.length;
    const estimate = prototypeScore(section, ratio);
    return {
      section,
      correct,
      total: subset.length,
      ratio,
      estimate,
      cefr: cefrReference(section, estimate),
    };
  });
  const skills = [...new Set(questions.map((q) => q.tag))].map((id) => {
    const subset = questions.filter((q) => q.tag === id);
    const correct = subset.filter(
      (q) => session.answers[q.id] === q.answer,
    ).length;
    return {
      id,
      section: subset[0].section,
      correct,
      total: subset.length,
      ratio: correct / subset.length,
    };
  });
  const correct = sections.reduce((sum, section) => sum + section.correct, 0);
  return {
    sections,
    skills,
    correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    estimate: sections.reduce((sum, section) => sum + section.estimate, 0),
    priorities: skills
      .filter((skill) => skill.ratio < 0.8)
      .sort((a, b) => a.ratio - b.ratio || b.total - a.total)
      .slice(0, 3),
  };
}
