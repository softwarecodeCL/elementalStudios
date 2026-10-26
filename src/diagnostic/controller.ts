import { formatText, localizedPath } from '../i18n/index.js';
import { getDiagnosticMessages } from '../i18n/assessment/index.js';
import { getGrowthMessages } from '../i18n/growth.js';
import { recordEvent } from '../scripts/measurement';
import { units, questions } from './bank.js';
import {
  createSession,
  parseSession,
  summarize,
  STORAGE_KEY,
  MAX_PLAYS,
} from './model.js';

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ] || char,
  );
const clock = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};
const sectionName = (section: string) =>
  section === 'L' ? 'Listening' : 'Reading';

class DiagnosticApp extends HTMLElement {
  state = createSession();
  copy = getDiagnosticMessages('es');
  locale = 'es';
  intro!: HTMLElement;
  outlet!: HTMLElement;
  timer?: ReturnType<typeof setInterval>;
  lastTick = Date.now();
  audio: HTMLAudioElement | null = null;
  audioToken = 0;
  events = new AbortController();

  connectedCallback() {
    this.locale = this.dataset.locale || 'es';
    this.copy = getDiagnosticMessages(this.locale);
    this.intro = this.querySelector('[data-diagnostic-intro]')!;
    this.outlet = this.querySelector('[data-diagnostic-outlet]')!;
    try {
      this.state =
        parseSession(localStorage.getItem(STORAGE_KEY)) || createSession();
    } catch {
      /* Storage may be unavailable. */
    }
    if (this.state.screen === 'test') this.state.screen = 'paused';
    const signal = this.events.signal;
    this.addEventListener('click', (event) => this.onClick(event), { signal });
    this.addEventListener('change', (event) => this.onAnswer(event), {
      signal,
    });
    this.querySelector<HTMLFormElement>(
      '[data-diagnostic-start]',
    )?.addEventListener('submit', (event) => this.start(event), { signal });
    this.querySelector('[data-check-sound]')?.addEventListener(
      'click',
      () => this.checkSound(),
      { signal },
    );
    this.querySelector('[data-resume]')?.addEventListener(
      'click',
      () => {
        this.state.screen = this.state.completedAt ? 'results' : 'test';
        this.lastTick = Date.now();
        this.save();
        this.render();
      },
      { signal },
    );
    window.addEventListener(
      'pagehide',
      () => {
        this.commitTime();
        if (this.state.screen === 'test') this.state.screen = 'paused';
        this.stopAudio();
        this.save();
      },
      { signal },
    );
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden && this.state.screen === 'test') {
          this.commitTime();
          this.state.screen = 'paused';
          this.save();
          this.render(false);
        }
      },
      { signal },
    );
    this.timer = setInterval(() => {
      this.commitTime();
      this.updateProgress();
    }, 1000);
    this.render(false);
  }

  disconnectedCallback() {
    this.commitTime();
    this.save();
    this.stopAudio();
    clearInterval(this.timer);
    this.events.abort();
  }
  commitTime() {
    const now = Date.now();
    if (this.state.screen === 'test' && !document.hidden)
      this.state.elapsedMs += Math.min(5000, Math.max(0, now - this.lastTick));
    this.lastTick = now;
  }
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      const notice = this.querySelector<HTMLElement>('[data-save-error]');
      if (notice) notice.hidden = false;
    }
  }
  stopAudio() {
    this.audioToken++;
    if (this.audio) {
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.pause();
      this.audio = null;
    }
  }
  render(focus = true) {
    this.commitTime();
    this.stopAudio();
    this.intro.hidden = this.state.screen !== 'intro';
    this.outlet.hidden = this.state.screen === 'intro';
    this.dataset.state = this.state.screen;
    if (this.state.screen === 'intro') this.renderIntro();
    else if (this.state.screen === 'paused') this.renderPaused();
    else if (this.state.screen === 'results') this.renderResults();
    else this.renderUnit();
    this.lastTick = Date.now();
    if (focus) {
      const heading = (
        this.state.screen === 'intro' ? this.intro : this.outlet
      ).querySelector<HTMLElement>('h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
      this.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  renderIntro() {
    const form = this.querySelector<HTMLFormElement>(
      '[data-diagnostic-start]',
    )!;
    form.querySelector<HTMLInputElement>('[name="participant"]')!.value =
      this.state.name;
    form.querySelector<HTMLSelectElement>('[name="target"]')!.value = String(
      this.state.target,
    );
    const saved = this.querySelector<HTMLElement>('[data-saved-attempt]')!;
    saved.hidden =
      Object.keys(this.state.answers).length === 0 &&
      !Object.values(this.state.plays).some(Boolean);
    this.querySelector<HTMLButtonElement>('[data-resume]')!.textContent = this
      .state.completedAt
      ? this.copy.viewSaved
      : this.copy.resume;
  }
  start(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    if (
      (Object.keys(this.state.answers).length ||
        Object.values(this.state.plays).some(Boolean)) &&
      !window.confirm(this.copy.restartConfirm)
    )
      return;
    const data = new FormData(form);
    this.state = createSession();
    this.state.name = String(data.get('participant') || '')
      .trim()
      .slice(0, 80);
    this.state.target = Number(data.get('target')) || 0;
    this.lastTick = Date.now();
    this.state.screen = 'test';
    recordEvent('diagnostic_start');
    this.save();
    this.render();
  }
  updateProgress() {
    if (this.state.screen !== 'test') return;
    const answered = Object.keys(this.state.answers).length;
    const label = this.outlet.querySelector('[data-progress-label]');
    if (label)
      label.textContent = formatText(this.copy.progressText, {
        answered,
        total: questions.length,
      });
    const progress = this.outlet.querySelector<HTMLProgressElement>('progress');
    if (progress) progress.value = answered;
    const time = this.outlet.querySelector('[data-active-time]');
    if (time) time.textContent = clock(this.state.elapsedMs);
    this.save();
  }
  onAnswer(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.state.screen !== 'test' || !input.matches('[data-question]'))
      return;
    const id = Number(input.dataset.question);
    const value = Number(input.value);
    const question = questions[id];
    if (
      !question ||
      !Number.isInteger(value) ||
      value < 0 ||
      value >= question.options.length
    )
      return;
    this.state.answers[id] = value;
    this.save();
    this.updateProgress();
    const next = this.outlet.querySelector<HTMLButtonElement>(
      '[data-action="next"]',
    );
    if (next)
      next.disabled = !units[this.state.unit].questions.every(
        (q) => this.state.answers[q.id] !== undefined,
      );
  }
  onClick(event: Event) {
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('[data-action]')
        : null;
    if (!target || !this.contains(target) || target.disabled) return;
    const action = target.dataset.action;
    if (action === 'pause') {
      this.commitTime();
      this.state.screen = 'paused';
      this.save();
      this.render();
    }
    if (action === 'continue') {
      this.lastTick = Date.now();
      this.state.screen = 'test';
      this.save();
      this.render();
    }
    if (action === 'intro') {
      this.state.screen = 'intro';
      this.save();
      this.render();
    }
    if (action === 'previous' && this.state.unit > 0) {
      this.state.unit--;
      this.save();
      this.render();
    }
    if (action === 'next') {
      if (
        !units[this.state.unit].questions.every(
          (q) => this.state.answers[q.id] !== undefined,
        )
      )
        return;
      if (this.state.unit < units.length - 1) this.state.unit++;
      else {
        if (questions.some((q) => this.state.answers[q.id] === undefined)) {
          this.state.unit = units.findIndex((u) =>
            u.questions.some((q) => this.state.answers[q.id] === undefined),
          );
          this.save();
          this.render();
          return;
        }
        this.commitTime();
        this.state.screen = 'results';
        this.state.completedAt = new Date().toISOString();
        recordEvent('diagnostic_complete');
      }
      this.save();
      this.render();
    }
    if (action === 'audio') void this.playAudio();
    if (action === 'transcript') {
      const transcript =
        this.outlet.querySelector<HTMLElement>('[data-transcript]')!;
      transcript.hidden = !transcript.hidden;
      target.textContent = transcript.hidden
        ? this.copy.transcriptShow
        : this.copy.transcriptHide;
      target.setAttribute('aria-expanded', String(!transcript.hidden));
      if (
        !transcript.hidden &&
        !this.state.transcripts.includes(this.state.unit)
      ) {
        this.state.transcripts.push(this.state.unit);
        this.save();
      }
    }
    if (action === 'retake' && window.confirm(this.copy.restartConfirm)) {
      const { name, target: goal } = this.state;
      this.state = createSession();
      this.state.name = name;
      this.state.target = goal;
      this.save();
      this.render();
    }
    if (action === 'download') this.download();
    if (action === 'print') window.print();
  }
  renderPaused() {
    const d = this.copy;
    this.outlet.innerHTML = `<section class="diagnostic-paused"><span class="diagnostic-pause-icon">Ⅱ</span><p class="eyebrow">${escapeHtml(d.eyebrow)}</p><h1>${escapeHtml(d.pausedTitle)}</h1><p>${escapeHtml(d.pausedText)}</p><span class="diagnostic-paused-progress">${escapeHtml(formatText(d.progressText, { answered: Object.keys(this.state.answers).length, total: questions.length }))} · ${clock(this.state.elapsedMs)}</span><div class="diagnostic-paused-actions"><button type="button" class="button button-gold" data-action="continue">${escapeHtml(d.continue)} →</button><button type="button" class="button diagnostic-button-outline" data-action="intro">${escapeHtml(d.exit)}</button></div></section>`;
  }
  renderUnit() {
    const d = this.copy;
    const unit = units[this.state.unit];
    const part = d.parts[unit.part as keyof typeof d.parts];
    const remaining = MAX_PLAYS - (this.state.plays[unit.id] || 0);
    const transcript = unit.audio
      .map(
        ([speaker, text]) =>
          `${unit.part === 3 ? (speaker === 'M' ? 'Man: ' : 'Woman: ') : ''}${text}`,
      )
      .join('\n');
    const passage = unit.passage.replace(
      /<span class="blank">\((\d)\)<\/span>/g,
      '($1) _____',
    );
    this.outlet.innerHTML = `
      <div class="diagnostic-progress-header"><div><p class="eyebrow">${escapeHtml(d.eyebrow)}</p><span data-progress-label>${escapeHtml(formatText(d.progressText, { answered: Object.keys(this.state.answers).length, total: questions.length }))}</span></div><div class="diagnostic-clock"><span>${escapeHtml(d.elapsed)}</span><strong data-active-time>${clock(this.state.elapsedMs)}</strong><button type="button" class="diagnostic-text-button" data-action="pause">Ⅱ ${escapeHtml(d.pause)}</button></div></div>
      <progress class="diagnostic-progress" max="${questions.length}" value="${Object.keys(this.state.answers).length}" aria-label="${escapeHtml(d.progress)}"></progress>
      <div class="diagnostic-test-layout"><aside class="diagnostic-test-aside"><span class="diagnostic-section-label">${sectionName(unit.section)}</span><p>${escapeHtml(formatText(d.block, { current: unit.id + 1, total: units.length }))}</p><div class="diagnostic-part-index">${[2, 3, 4, 5, 6, 7].map((number) => `<div class="${unit.part === number ? 'is-current' : ''}"><span>${escapeHtml(formatText(d.partLabel, { part: number }))}</span><small>${escapeHtml(d.parts[number as keyof typeof d.parts].name)}</small></div>`).join('')}</div><p class="diagnostic-aside-help">${escapeHtml(d.audioHelp)}</p></aside>
      <div class="diagnostic-test-main"><header class="diagnostic-part-heading"><p class="eyebrow">${escapeHtml(formatText(d.partLabel, { part: unit.part }))} · ${sectionName(unit.section)}</p><h1>${escapeHtml(part.name)}</h1><p>${escapeHtml(part.instruction)}</p></header>
      ${unit.audioSrc ? `<section class="diagnostic-audio-panel" aria-label="${escapeHtml(d.audio)}"><div class="diagnostic-audio-controls"><button type="button" class="button button-gold" data-action="audio" ${remaining <= 0 ? 'disabled' : ''}>${escapeHtml(remaining <= 0 ? d.noPlays : this.state.plays[unit.id] ? d.replay : d.play)}</button><div class="diagnostic-audio-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><span data-audio-count>${escapeHtml(formatText(d.remaining, { count: remaining }))}</span></div><p data-audio-status role="status"></p><button class="diagnostic-text-button" type="button" data-action="transcript" aria-expanded="false" aria-controls="diagnostic-transcript">${escapeHtml(d.transcriptShow)}</button><div id="diagnostic-transcript" class="diagnostic-transcript" data-transcript hidden><p>${escapeHtml(d.transcriptNote)}</p><pre lang="en">${escapeHtml(transcript)}</pre></div></section>` : ''}
      ${passage ? `<section class="diagnostic-passage" aria-label="${escapeHtml(d.reading)}" lang="en">${escapeHtml(passage)}</section>` : ''}
      <div class="diagnostic-questions">${unit.questions.map((question) => `<fieldset class="diagnostic-question"><legend><span>${escapeHtml(formatText(d.question, { number: question.id + 1 }))}</span><strong ${question.stem ? 'lang="en"' : ''}>${escapeHtml(question.stem || d.choose)}</strong></legend><div class="diagnostic-options ${unit.part === 2 ? 'diagnostic-letter-options' : ''}">${question.options.map((option, index) => `<label class="diagnostic-option"><input type="radio" name="question-${question.id}" data-question="${question.id}" value="${index}" ${this.state.answers[question.id] === index ? 'checked' : ''} /><b>${'ABCD'[index]}</b>${unit.part === 2 ? '' : `<span lang="en">${escapeHtml(option)}</span>`}</label>`).join('')}</div></fieldset>`).join('')}</div>
      <div class="diagnostic-test-nav"><button class="button diagnostic-button-outline" type="button" data-action="previous" ${unit.id === 0 ? 'disabled' : ''}>← ${escapeHtml(d.previous)}</button><button class="button button-gold" type="button" data-action="next" ${unit.questions.every((q) => this.state.answers[q.id] !== undefined) ? '' : 'disabled'}>${escapeHtml(unit.id === units.length - 1 ? d.finish : d.next)} →</button></div><p class="diagnostic-answer-hint">${escapeHtml(d.answerHint)}</p></div></div>`;
  }

  async playAudio() {
    const d = this.copy;
    const unit = units[this.state.unit];
    if (!unit.audioSrc || this.state.screen !== 'test') return;
    const button = this.outlet.querySelector<HTMLButtonElement>(
      '[data-action="audio"]',
    )!;
    const status = this.outlet.querySelector<HTMLElement>(
      '[data-audio-status]',
    )!;
    const panel = this.outlet.querySelector<HTMLElement>(
      '.diagnostic-audio-panel',
    )!;
    if (this.audio && !this.audio.paused && !this.audio.ended) {
      this.audio.pause();
      panel.classList.remove('is-playing');
      button.textContent = d.resumeAudio;
      return;
    }
    if (this.audio && this.audio.paused && !this.audio.ended) {
      try {
        await this.audio.play();
        button.textContent = d.pauseAudio;
        panel.classList.add('is-playing');
      } catch {
        status.textContent = d.audioError;
      }
      return;
    }
    if ((this.state.plays[unit.id] || 0) >= MAX_PLAYS) return;
    this.stopAudio();
    const token = this.audioToken;
    const audio = new Audio(unit.audioSrc);
    this.audio = audio;
    button.disabled = true;
    status.textContent = '';
    const finish = () => {
      if (token !== this.audioToken) return;
      this.audio = null;
      panel.classList.remove('is-playing');
      const remaining = MAX_PLAYS - (this.state.plays[unit.id] || 0);
      button.disabled = remaining <= 0;
      button.textContent = remaining <= 0 ? d.noPlays : d.replay;
    };
    audio.onended = finish;
    audio.onerror = () => {
      finish();
      status.textContent = d.audioError;
    };
    try {
      await audio.play();
      if (
        token !== this.audioToken ||
        this.state.unit !== unit.id ||
        this.state.screen !== 'test'
      ) {
        audio.pause();
        return;
      }
      this.state.plays[unit.id] = (this.state.plays[unit.id] || 0) + 1;
      this.save();
      button.disabled = false;
      button.textContent = d.pauseAudio;
      panel.classList.add('is-playing');
      this.outlet.querySelector('[data-audio-count]')!.textContent = formatText(
        d.remaining,
        { count: MAX_PLAYS - this.state.plays[unit.id] },
      );
    } catch {
      if (token === this.audioToken) {
        this.audio = null;
        button.disabled = false;
        button.textContent = d.play;
        status.textContent = d.audioError;
      }
    }
  }
  async checkSound() {
    const status = this.querySelector<HTMLElement>('[data-sound-status]')!;
    try {
      const context = new AudioContext();
      await context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 440;
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.04);
      gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.45);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      oscillator.onended = () => {
        void context.close();
      };
      status.textContent = this.copy.soundSuccess;
    } catch {
      status.textContent = this.copy.soundError;
    }
  }
  renderResults() {
    const d = this.copy;
    const corporate = getGrowthMessages(this.locale);
    const corporateContact = localizedPath(this.locale, '/diagnostico-ingles-empresas') + '#consulta-equipo';
    const summary = summarize(this.state);
    const skillCopy = (id: string) => d.skills[id as keyof typeof d.skills];
    const status = (ratio: number) =>
      ratio < 0.5 ? d.priority : ratio < 0.8 ? d.practice : d.strength;
    this.outlet.innerHTML = `
      <header class="diagnostic-result-header"><p class="eyebrow">${escapeHtml(d.resultEyebrow)}${this.state.name ? ' · ' + escapeHtml(this.state.name) : ''}</p><h1>${escapeHtml(d.resultTitle)}</h1><p>${escapeHtml(d.resultIntro)}</p><div class="diagnostic-result-actions"><button type="button" class="button diagnostic-button-outline" data-action="download">↓ ${escapeHtml(d.download)}</button><button type="button" class="diagnostic-text-button" data-action="print">${escapeHtml(d.print)}</button></div></header>
      <div class="diagnostic-score-grid"><section class="diagnostic-score diagnostic-score-primary"><span>${escapeHtml(d.accuracy)}</span><strong>${summary.percentage}<small>%</small></strong><p>${escapeHtml(formatText(d.correct, { correct: summary.correct, total: summary.total }))}</p></section>${summary.sections.map((section) => `<section class="diagnostic-score"><span lang="en">${sectionName(section.section)}</span><strong>${Math.round(section.ratio * 100)}<small>%</small></strong><p>${escapeHtml(formatText(d.correct, { correct: section.correct, total: section.total }))}</p></section>`).join('')}</div>
      <details class="diagnostic-reference"><summary>${escapeHtml(d.reference)}<span>＋</span></summary><div><strong class="diagnostic-estimate">${summary.estimate}<small>${escapeHtml(d.referenceScale)}</small></strong><div class="diagnostic-reference-sections">${summary.sections.map((section) => `<p><b>${sectionName(section.section)}: ${section.estimate}</b><span>${escapeHtml(d.cefr)}: ${escapeHtml(section.cefr === '< A1' ? d.cefrBelow : section.cefr)}</span></p>`).join('')}</div>${this.state.target ? `<p>${escapeHtml(formatText(d.goal, { score: this.state.target }))}. ${escapeHtml(d.goalNote)}</p>` : ''}<p>${escapeHtml(d.referenceNote)}</p></div></details>
      ${this.state.transcripts.length ? `<p class="diagnostic-support-note">${escapeHtml(formatText(d.transcriptResult, { count: this.state.transcripts.length }))}</p>` : ''}${Object.values(this.state.plays).some((count) => count > 1) ? `<p class="diagnostic-support-note">${escapeHtml(formatText(d.playsResult, { count: Object.values(this.state.plays).filter((count) => count > 1).length }))}</p>` : ''}
      <section class="diagnostic-result-section"><p class="eyebrow">${escapeHtml(d.eyebrow)}</p><h2>${escapeHtml(d.priorityTitle)}</h2><p>${escapeHtml(d.priorityIntro)}</p><div class="diagnostic-priority-grid">${summary.priorities.length ? summary.priorities.map((skill, index) => `<article><span class="diagnostic-step-number">0${index + 1}</span><span class="diagnostic-section-label">${sectionName(skill.section)}</span><h3>${escapeHtml(skillCopy(skill.id).name)}</h3><p>${escapeHtml(skillCopy(skill.id).tip)}</p><small>${escapeHtml(formatText(d.correct, { correct: skill.correct, total: skill.total }))}</small></article>`).join('') : `<p>${escapeHtml(d.allStrong)}</p>`}</div></section>
      <section class="diagnostic-result-section diagnostic-skills-panel"><h2>${escapeHtml(d.skillMap)}</h2><p>${escapeHtml(d.sampleNote)}</p><div class="diagnostic-skills">${summary.skills.map((skill) => `<div class="diagnostic-skill"><div><strong>${escapeHtml(skillCopy(skill.id).name)}</strong><span>${sectionName(skill.section)} · ${escapeHtml(status(skill.ratio))}</span></div><div class="diagnostic-skill-bar" role="meter" aria-label="${escapeHtml(skillCopy(skill.id).name)}" aria-valuemin="0" aria-valuemax="${skill.total}" aria-valuenow="${skill.correct}"><i style="width:${Math.round(skill.ratio * 100)}%"></i></div><small>${skill.correct}/${skill.total}</small></div>`).join('')}</div></section>
      <section class="diagnostic-result-section"><h2>${escapeHtml(d.reviewTitle)}</h2><p>${escapeHtml(d.reviewIntro)}</p><div class="diagnostic-review">${units
        .map((unit) =>
          unit.questions
            .map((question) => {
              const chosen = this.state.answers[question.id];
              const correct = chosen === question.answer;
              const option = (index: number) =>
                unit.part === 2
                  ? unit.audio[index + 1]?.[1]
                  : `${'ABCD'[index]}. ${question.options[index]}`;
              return `<details><summary><span class="diagnostic-review-status ${correct ? 'is-correct' : ''}">${correct ? '✓' : '↗'}</span><span>${question.id + 1}. ${escapeHtml(skillCopy(question.tag).name)}<small>${sectionName(question.section)} · ${escapeHtml(correct ? d.correctLabel : d.incorrectLabel)}</small></span><b>＋</b></summary><div class="diagnostic-review-body">${question.stem ? `<p lang="en">${escapeHtml(question.stem)}</p>` : `<p lang="en">${escapeHtml(unit.audio[0]?.[1])}</p>`}<p>${escapeHtml(d.yourAnswer)}: <span lang="en">${escapeHtml(chosen === undefined ? d.notAnswered : option(chosen))}</span></p><p>${escapeHtml(d.rightAnswer)}: <strong lang="en">${escapeHtml(option(question.answer))}</strong></p><p>${escapeHtml(d.explanations[question.id])}</p></div></details>`;
            })
            .join(''),
        )
        .join('')}</div></section>
      <section class="diagnostic-result-cta"><div><h2>${escapeHtml(corporate.corporateTitle)}</h2><p>${escapeHtml(corporate.corporateText)}</p></div><div><a class="button button-gold" href="${escapeHtml(corporateContact)}" data-corporate-diagnostic>${escapeHtml(corporate.corporateCta)} →</a><button class="diagnostic-text-button" type="button" data-action="retake">${escapeHtml(d.retake)}</button></div></section><p class="diagnostic-disclaimer">${escapeHtml(d.notice)}</p>`;
  }
  download() {
    const d = this.copy;
    const result = summarize(this.state);
    const lines = [
      d.reportTitle,
      this.state.name,
      this.state.completedAt
        ? new Date(this.state.completedAt).toLocaleDateString(this.locale)
        : '',
      `${d.accuracy}: ${result.percentage}%`,
      formatText(d.correct, { correct: result.correct, total: result.total }),
      `${d.elapsed}: ${clock(this.state.elapsedMs)}`,
      ...result.sections.map(
        (section) =>
          `${sectionName(section.section)}: ${section.correct}/${section.total}`,
      ),
      '',
      d.priorityTitle,
      ...result.priorities.map((skill) => {
        const translated = d.skills[skill.id as keyof typeof d.skills];
        return `${translated.name}: ${translated.tip}`;
      }),
      '',
      formatText(d.transcriptResult, { count: this.state.transcripts.length }),
      '',
      d.notice,
    ].filter(Boolean);
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + lines.join('\n')], {
        type: 'text/plain;charset=utf-8',
      }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = d.reportFilename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
if (!customElements.get('diagnostic-app'))
  customElements.define('diagnostic-app', DiagnosticApp);
