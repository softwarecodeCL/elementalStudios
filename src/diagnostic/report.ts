import { jsPDF } from 'jspdf';
import { summarize, type Session } from './model.js';
import { units } from './bank.js';
import { getDiagnosticMessages } from '../i18n/assessment/index.js';
import { getReportCopy } from './report-copy.js';

const C = {
  navy: '#071D30', ink: '#142D40', muted: '#5C6C79', gold: '#D49B44',
  cyan: '#167C98', green: '#237366', pale: '#F3F6F8', line: '#DBE3E9', white: '#FFFFFF',
};
// Standard PDF fonts cover the three interface languages. Normalize typography
// and strip unsupported control characters, including those in participant names.
const clean = (value: unknown) => String(value ?? '').normalize('NFC')
  .replace(/[\u2010-\u2015\u2212]/g, '-')
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/\u2026/g, '...').replace(/\u2192/g, '>')
  .replace(/[^\x20-\x7E\xA0-\xFF\n]/g, '');

/** Creates real, selectable PDF text and vector charts rather than a screenshot. */
export function createDiagnosticReport(state: Session, locale: string, logo?: Uint8Array) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  const t = getReportCopy(locale);
  const d = getDiagnosticMessages(locale);
  const result = summarize(state);
  const margin = 18;
  const width = 174;
  const bottom = 273;
  const lang = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en' : 'es-CL';
  const contact = `https://elementalstudios.cl/${locale === 'es' ? '' : `${locale}/`}diagnostico-ingles-empresas/#consulta-equipo`;
  let y = 0;
  let runningTitle = '';
  doc.setProperties({ title: clean(d.reportTitle), author: 'Elemental Studios SpA',
    subject: clean(t.subtitle), creator: 'Elemental Studios', keywords: 'English, Listening, Reading, diagnostic' });
  doc.setLanguage(lang);
  doc.setDisplayMode('fullwidth', 'continuous');

  const text = (value: unknown, x: number, at: number, size = 10, color = C.ink, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size); doc.setTextColor(color); doc.text(clean(value), x, at);
  };
  const lines = (value: unknown, maxWidth: number, size = 10, bold = false): string[] => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size);
    return doc.splitTextToSize(clean(value), maxWidth);
  };
  const paragraph = (value: unknown, x: number, at: number, maxWidth = width, size = 10, color = C.muted, bold = false) => {
    const rows = lines(value, maxWidth, size, bold);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size); doc.setTextColor(color);
    doc.text(rows, x, at, { lineHeightFactor: 1.4 });
    return at + rows.length * size * 0.3528 * 1.4;
  };
  const box = (x: number, at: number, w: number, h: number, fill = C.pale, stroke?: string) => {
    doc.setFillColor(fill); doc.setDrawColor(stroke || fill); doc.setLineWidth(0.25);
    doc.roundedRect(x, at, w, h, 2.5, 2.5, stroke ? 'FD' : 'F');
  };
  const rule = (at: number, x = margin, w = width) => {
    doc.setDrawColor(C.line); doc.setLineWidth(0.25); doc.line(x, at, x + w, at);
  };
  const brand = (at: number) => {
    if (logo) doc.addImage(logo, 'PNG', margin, at, 46, 46 * 73 / 290, 'elemental-logo');
    else { text('ELEMENTAL', margin, at + 4, 11, C.white, true); text('STUDIOS', margin, at + 9, 8, C.white); }
  };
  const page = (title: string, subtitle: string, first = false) => {
    if (!first) doc.addPage();
    doc.setFillColor(C.white); doc.rect(0, 0, 210, 297, 'F');
    doc.setFillColor(C.navy); doc.rect(0, 0, 210, 30, 'F');
    brand(9);
    doc.setFillColor(C.gold); doc.rect(184, 0, 8, 2, 'F');
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor('#BED0DD');
    doc.text(clean(t.reportLabel), 192, 18, { align: 'right' });
    text(title, margin, 46, 21, C.ink, true);
    y = paragraph(subtitle, margin, 54, width, 9.5) + 10;
    runningTitle = title;
  };
  const ensure = (height: number) => {
    if (y + height > bottom) page(runningTitle, t.continued);
  };
  const bar = (x: number, at: number, w: number, ratio: number, color: string) => {
    box(x, at, w, 2.2, C.line);
    if (ratio > 0) box(x, at, Math.max(1.5, w * ratio), 2.2, color);
  };
  const date = new Date(state.completedAt || '');
  const completed = Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
  const seconds = Math.floor(state.elapsedMs / 1000);
  const elapsed = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const transcriptCount = state.transcripts.length;
  const replayCount = Object.values(state.plays).filter(count => count > 1).length;
  const skillCopy = (id: string) => d.skills[id as keyof typeof d.skills];
  const status = (ratio: number) => ratio < .5 ? d.priority : ratio < .8 ? d.practice : d.strength;
  const color = (ratio: number) => ratio < .5 ? C.gold : ratio < .8 ? C.cyan : C.green;

  // 01 - Executive overview.
  doc.setFillColor(C.navy); doc.rect(0, 0, 210, 91, 'F');
  brand(13);
  text(t.reportLabel, margin, 39, 8.5, '#E4B76E', true);
  const titleEnd = paragraph(t.title, margin, 53, 113, 24, C.white, true);
  paragraph(t.subtitle, margin, titleEnd + 2, 112, 10, '#C5D5E1');
  doc.setLineWidth(2.3); doc.setDrawColor('#27445B'); doc.circle(168, 51, 19, 'S');
  doc.setDrawColor(C.gold);
  const arc: number[][] = [];
  for (let i = 0; i < Math.round(result.percentage * 1.2); i++) {
    const a = (i / 120 * Math.PI * 2) - Math.PI / 2;
    const b = ((i + 1) / 120 * Math.PI * 2) - Math.PI / 2;
    arc.push([19 * (Math.cos(b) - Math.cos(a)), 19 * (Math.sin(b) - Math.sin(a))]);
  }
  if (arc.length) doc.lines(arc, 168, 32, [1, 1], 'S', false);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(27); doc.setTextColor(C.white);
  doc.text(`${result.percentage}%`, 168, 54, { align: 'center' });
  doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.text(`${result.correct}/${result.total}`, 168, 62, { align: 'center' });
  const accuracyLines = lines(d.accuracy, 49, 8);
  doc.setFontSize(8); doc.setTextColor('#C5D5E1'); doc.text(accuracyLines, 168, 78, { align: 'center' });
  text(t.participant.toUpperCase(), margin, 103, 7.5, C.muted, true);
  const participant = clean(state.name).trim() || t.anonymous;
  let participantSize = 14;
  while (participantSize > 9 && lines(participant, 98, participantSize, true).length > 2) participantSize--;
  paragraph(participant, margin, 111, 98, participantSize, C.ink, true);
  text(t.completed.toUpperCase(), 128, 103, 7.5, C.muted, true);
  text(completed, 128, 111, 9.5);
  text(`${t.duration}: ${elapsed}`, 128, 119, 9, C.muted);
  rule(126);
  text(t.executiveTitle, margin, 138, 15, C.ink, true);
  result.sections.forEach((section, i) => {
    const x = margin + i * 90;
    box(x, 145, 84, 53, C.pale);
    text(section.section === 'L' ? 'Listening' : 'Reading', x + 7, 156, 11, C.ink, true);
    text(`${Math.round(section.ratio * 100)}%`, x + 7, 173, 26, C.ink, true);
    text(`${section.correct}/${section.total} ${t.correctAnswers}`, x + 7, 181, 8.5, C.muted);
    bar(x + 7, 188, 70, section.ratio, section.section === 'L' ? C.cyan : C.gold);
  });
  y = paragraph(t.scoreNote, margin, 207, width, 9.2) + 8;
  text(t.conditionsTitle, margin, y, 13, C.ink, true); y += 8;
  box(margin, y - 3, width, 26, C.pale);
  text(transcriptCount || replayCount ? t.supported : t.standard, margin + 6, y + 4, 10, C.ink, true);
  text(`${t.transcriptsLabel}: ${transcriptCount}    /    ${t.replayLabel}: ${replayCount}`, margin + 6, y + 12, 8.8, C.muted);

  // 02 - Skill map, grouped by evaluated section.
  page(t.skillsTitle, t.skillsIntro);
  for (const section of result.sections) {
    ensure(24);
    text(section.section === 'L' ? 'LISTENING' : 'READING', margin, y, 9, C.cyan, true);
    text(section.section === 'L' ? t.listeningDescription : t.readingDescription, margin + 32, y, 9, C.muted);
    y += 7;
    for (const skill of result.skills.filter(item => item.section === section.section)) {
      const name = lines(skillCopy(skill.id).name, 88, 8.8, true);
      const height = Math.max(9, name.length * 4.35 + 2);
      ensure(height);
      paragraph(skillCopy(skill.id).name, margin, y + 1, 88, 8.8, C.ink, true);
      bar(112, y - 1, 48, skill.ratio, color(skill.ratio));
      text(`${skill.correct}/${skill.total}`, 166, y + 1, 9, C.ink, true);
      text(`${Math.round(skill.ratio * 100)}%`, 181, y + 1, 8.5, C.muted);
      rule(y + height - 3);
      y += height;
    }
    y += 5;
  }
  ensure(28);
  box(margin, y - 2, width, 25, C.pale);
  paragraph(`${d.priority}: <50%  /  ${d.practice}: 50-79%  /  ${d.strength}: 80-100%`, margin + 5, y + 5, width - 10, 8.2);
  paragraph(d.sampleNote, margin + 5, y + 14, width - 10, 8.2);

  // 03 - Practical next steps, with recommendations derived from this attempt.
  page(t.recommendationsTitle, t.recommendationsIntro);
  if (result.priorities.length) {
    result.priorities.forEach((skill, i) => {
      const info = skillCopy(skill.id);
      const titleRows = lines(info.name, 138, 11, true);
      const tipRows = lines(info.tip, 138, 10);
      const height = 19 + titleRows.length * 5.4 + tipRows.length * 4.95;
      ensure(height + 5);
      box(margin, y, width, height, C.pale);
      text(`0${i + 1}`, margin + 6, y + 11, 16, C.gold, true);
      text(`${skill.section === 'L' ? 'Listening' : 'Reading'}  /  ${skill.correct}/${skill.total}`, margin + 24, y + 8, 8, C.muted);
      const next = paragraph(info.name, margin + 24, y + 16, 138, 11, C.ink, true);
      paragraph(info.tip, margin + 24, next + 2, 138, 10, C.muted);
      y += height + 5;
    });
  } else {
    box(margin, y, width, 40, C.pale);
    text(t.noPrioritiesTitle, margin + 7, y + 12, 13, C.green, true);
    paragraph(t.noPrioritiesText, margin + 7, y + 22, width - 14, 10);
    y += 47;
  }
  ensure(66);
  text(t.scopeTitle, margin, y + 4, 11, C.ink, true);
  y = paragraph(t.scopeText, margin, y + 12, width, 9) + 6;
  if (transcriptCount || replayCount) {
    y = paragraph(t.conditionsIntro, margin, y, width, 9) + 6;
  }
  const ctaRows = lines(t.nextText, width - 14, 9.5);
  const ctaHeight = 30 + ctaRows.length * 4.7;
  ensure(ctaHeight);
  box(margin, y, width, ctaHeight, C.navy);
  text(t.nextTitle, margin + 7, y + 12, 13, C.white, true);
  const linkY = paragraph(t.nextText, margin + 7, y + 21, width - 14, 9.5, '#C5D5E1') + 4;
  text(`${t.nextLink}  >`, margin + 7, linkY, 10, '#E4B76E', true);
  doc.link(margin + 7, linkY - 4, width - 14, 7, { url: contact });

  // Appendix: each answer and its explanation stays together across page breaks.
  page(t.reviewTitle, t.reviewIntro);
  for (const unit of units) {
    for (const question of unit.questions) {
      const chosen = state.answers[question.id];
      const correct = chosen === question.answer;
      const option = (index: number | undefined) => index === undefined ? d.notAnswered
        : unit.part === 2 ? unit.audio[index + 1]?.[1] || '' : `${'ABCD'[index]}. ${question.options[index]}`;
      const heading = `${String(question.id + 1).padStart(2, '0')}  ${skillCopy(question.tag).name}`;
      const prompt = question.stem || unit.audio[0]?.[1] || '';
      const blocks = [
        { value: heading, size: 10, bold: true, color: C.ink },
        { value: prompt, size: 9.2, bold: false, color: C.muted },
        { value: `${d.yourAnswer}: ${option(chosen)}`, size: 9, bold: false, color: C.muted },
        { value: `${d.rightAnswer}: ${option(question.answer)}`, size: 9, bold: true, color: C.green },
        { value: d.explanations[question.id], size: 9.2, bold: false, color: C.ink },
      ];
      const heights = blocks.map(block => lines(block.value, width - 12, block.size, block.bold).length * block.size * .3528 * 1.4 + 1);
      const height = heights.reduce((sum, value) => sum + value, 0) + 10;
      ensure(height + 5);
      box(margin, y, width, height, C.pale);
      doc.setFillColor(correct ? C.green : C.gold); doc.roundedRect(margin, y, 1.2, height, .6, .6, 'F');
      text(`${unit.section === 'L' ? 'Listening' : 'Reading'}  /  ${correct ? d.correctLabel : d.incorrectLabel}`, margin + 6, y + 7, 7.5, correct ? C.green : C.muted);
      let at = y + 14;
      blocks.forEach((block, i) => {
        paragraph(block.value, margin + 6, at, width - 12, block.size, block.color, block.bold);
        at += heights[i];
      });
      y += height + 4;
    }
  }

  const count = doc.getNumberOfPages();
  for (let i = 1; i <= count; i++) {
    doc.setPage(i); rule(281);
    text('ELEMENTAL STUDIOS', margin, 287, 7, C.ink, true);
    text(t.footer, margin, 292, 7, C.muted);
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(C.muted);
    doc.text(`${t.page} ${i} / ${count}`, 192, 287, { align: 'right' });
    doc.textWithLink('elementalstudios.cl', 165, 292, { url: 'https://elementalstudios.cl/' });
  }
  return doc;
}

export async function downloadDiagnosticReport(state: Session, locale: string) {
  let logo: Uint8Array | undefined;
  try {
    const response = await fetch('/brand/logo.png');
    if (response.ok) logo = new Uint8Array(await response.arrayBuffer());
  } catch { /* The report remains downloadable if the logo is unavailable. */ }
  const doc = createDiagnosticReport(state, locale, logo);
  await doc.save(getReportCopy(locale).filename, { returnPromise: true });
}
