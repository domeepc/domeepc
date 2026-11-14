// Generates the animated SVG panels used by README.md.
// GitHub strips CSS and JS from READMEs, but SVGs loaded through <img> keep
// their own <style>, so every piece of the portfolio look lives in /assets.
//
//   node scripts/build.mjs
//
// No dependencies. Edit the data block below and re-run.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets');
mkdirSync(OUT, { recursive: true });

/* ── data (mirrors domeepc-Portfolio/src/lib/data.ts) ───────────────── */

const profile = {
  name: 'Domagoj Milardović',
  location: 'Kaštela, Split-Dalmatia, Croatia',
  coords: '43.5446°N 16.4288°E',
  bio: 'Computer Engineer student at the University of Split. I build web apps, embedded systems, and algorithms — and make videos about gaming and coding.',
};

const ROLES = [
  'computer engineering student',
  'embedded C/C++ @ FESB Racing',
  'java intern @ Abysalto',
  'full-stack typescript dev',
];

const TICKER = [
  'currently interning @ abysalto',
  'based in split, croatia',
  'web · embedded · algorithms',
  'currently shipping activitysearch.eu',
  'writes C for an electric formula car',
];

const WHOAMI = [
  ['name', profile.name],
  ['study', 'Computer Engineering @ FESB, Split'],
  ['work', 'Intern Java Developer @ Abysalto'],
  ['team', 'FESB Racing — embedded software'],
  ['loc', profile.location],
  ['into', 'programming · gaming · photography · vlogging'],
];

const SKILLS = [
  ['TypeScript', 'Proficient', 'language'],
  ['JavaScript', 'Proficient', 'language'],
  ['Java', 'Proficient', 'language'],
  ['C', 'Proficient', 'language'],
  ['C++', 'Proficient', 'language'],
  ['C#', 'Learning', 'language'],
  ['React', 'Proficient', 'framework'],
  ['Node.js', 'Proficient', 'framework'],
  ['Spring Boot', 'Learning', 'framework'],
  ['Astro', 'Learning', 'framework'],
  ['.NET', 'Learning', 'framework'],
  ['Git', 'Proficient', 'tool'],
  ['GitHub', 'Proficient', 'tool'],
  ['Linux', 'Learning', 'tool'],
];

export const REPOS = [
  {
    name: 'activitysearch',
    description: 'A web platform to discover and search for activities. Built with TypeScript, live at activitysearch.eu.',
    language: 'TypeScript',
    color: '#3178c6',
    updated: '2026.04',
    homepage: 'activitysearch.eu',
  },
  {
    name: 'Changing-gear-alg',
    description: 'An algorithm implementation for automatic gear-changing logic, written in C++.',
    language: 'C++',
    color: '#f34b7d',
    updated: '2025.11',
  },
  {
    name: 'i_life',
    description: 'A website bringing the most common services into one place. Still in active development.',
    language: 'JavaScript',
    color: '#f7df1e',
    updated: '2025.06',
  },
];

// Newest first, like `git log`.
const TIMELINE = [
  {
    year: '2026 – Present', title: 'Intern Java Developer', at: 'Abysalto', type: 'work', current: true,
    description: 'Working as an intern at Abysalto, a Croatian IT company focused on digital transformation and software development.',
  },
  {
    year: '2025 – Present', title: 'activitysearch.eu — Lead Developer', at: 'Personal Project', type: 'proj', current: true,
    description: 'Designed and built a full-stack TypeScript web platform for discovering activities. Deployed and maintained at activitysearch.eu.',
  },
  {
    year: '2025 – Present', title: 'Embedded Systems: FESB Racing', at: 'Group or Society', type: 'proj', current: true,
    description: 'Developed software for the FESB Racing team, a group of students from the University of Split. Made programs in C and C++ for our electrical formula.',
  },
  {
    year: '2023 – 2028', title: 'Bachelor of Computer Engineering', at: 'University of Split', type: 'edu', current: true,
    description: 'Studying Computer Engineering at FESB. Focus on software development, algorithms, embedded systems, and computer architecture.',
  },
  {
    year: '2023', title: 'Started Programming Journey', at: 'Self-taught', type: 'edu',
    description: 'Began learning programming with C and C++, progressing to web technologies and full-stack development.',
  },
];

// FIGlet "ANSI Shadow", same banners as the portfolio.
const FIRST = [
  '██████╗  ██████╗ ███╗   ███╗ █████╗  ██████╗  ██████╗      ██╗',
  '██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔════╝ ██╔═══██╗     ██║',
  '██║  ██║██║   ██║██╔████╔██║███████║██║  ███╗██║   ██║     ██║',
  '██║  ██║██║   ██║██║╚██╔╝██║██╔══██║██║   ██║██║   ██║██   ██║',
  '██████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║╚██████╔╝╚██████╔╝╚█████╔╝',
  '╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚════╝',
];
const LAST = [
  '███╗   ███╗██╗██╗      █████╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗██╗ ██████╗',
  '████╗ ████║██║██║     ██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║   ██║██║██╔════╝',
  '██╔████╔██║██║██║     ███████║██████╔╝██║  ██║██║   ██║██║   ██║██║██║',
  '██║╚██╔╝██║██║██║     ██╔══██║██╔══██╗██║  ██║██║   ██║╚██╗ ██╔╝██║██║',
  '██║ ╚═╝ ██║██║███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝ ╚████╔╝ ██║╚██████╗',
  '╚═╝     ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝   ╚═══╝  ╚═╝ ╚═════╝',
];
const TALK = [
  '███████╗ █████╗ ██╗   ██╗    ██╗  ██╗██╗',
  '██╔════╝██╔══██╗╚██╗ ██╔╝    ██║  ██║██║',
  '███████╗███████║ ╚████╔╝     ███████║██║',
  '╚════██║██╔══██║  ╚██╔╝      ██╔══██║██║',
  '███████║██║  ██║   ██║       ██║  ██║██║',
  '╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝',
];

/* ── design tokens (portfolio globals.css) ─────────────────────────── */

const C = {
  ink: '#0b0b0a',
  ink2: '#121210',
  paper: '#ebe8e1',
  dim: '#8b887f',
  faint: '#3a3935',
  line: '#262522',
  acid: '#c8ff2e',
  accent: '#c8ff2e', // accent text = acid on the dark ground
};
const W = 880; // GitHub's profile README column
const PAD = 32;
const CW = 0.6; // JetBrains Mono advance width, in em

/* ── svg helpers ───────────────────────────────────────────────────── */

const font = (w) => readFileSync(join(ROOT, 'scripts/fonts', `jbm-${w}.woff2`)).toString('base64');
const FONT_CSS = `
@font-face{font-family:J;font-weight:400;src:url(data:font/woff2;base64,${font('Regular')}) format('woff2')}
@font-face{font-family:J;font-weight:800;src:url(data:font/woff2;base64,${font('ExtraBold')}) format('woff2')}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r = (n) => Math.round(n * 100) / 100;

const BASE_CSS = `
text{font-family:J,'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;font-feature-settings:'calt' 0,'liga' 0;white-space:pre;fill:${C.paper}}
.p{fill:${C.paper}}.d{fill:${C.dim}}.f{fill:${C.faint}}.a{fill:${C.accent}}.A{fill:${C.acid}}.k{fill:${C.ink}}
.b{font-weight:800}.u{text-transform:uppercase}
.blink{animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.rise{opacity:0;animation:rise .7s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.draw{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:draw 1.1s cubic-bezier(.7,0,.2,1) forwards}
@keyframes draw{to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){
  *{animation:none!important}
  .rise{opacity:1}.draw{transform:none}
}`;

// One-shot reveals only run in the hero, which is on screen when the page loads.
// Lower panels may be painted late (or never animated) inside <img>, so they start complete.
const STATIC = `.rise{opacity:1;animation:none}.draw{transform:none;animation:none}`;

function svg({ h, title, body, css = '', intro = false }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<style>${FONT_CSS}${BASE_CSS}${intro ? '' : STATIC}${css}</style>
<rect width="${W}" height="${h}" fill="${C.ink}"/>
${body}
</svg>
`;
}

/** Text with optional coloured runs: parts = [[text, class], ...] */
function text(x, y, parts, { size = 13, cls = '', extra = '' } = {}) {
  if (typeof parts === 'string') parts = [[parts, '']];
  const spans = parts.map(([t, c]) => (c ? `<tspan class="${c}">${esc(t)}</tspan>` : esc(t))).join('');
  return `<text x="${r(x)}" y="${r(y)}" font-size="${size}" ${cls ? `class="${cls}"` : ''} ${extra}>${spans}</text>`;
}

/** Banner row → runs: solid blocks in one tone, the ╗═║ shadow strokes in another. */
function blocks(row, cls) {
  const [solid, shade] = cls === 'a' ? ['A', 'a'] : ['p', 'p'];
  return row.split(/(█+)/).filter(Boolean).map((t) => [t, t[0] === '█' ? solid : shade]);
}

function wrap(str, cols) {
  const out = [];
  let line = '';
  for (const word of str.split(' ')) {
    if (line && (line + ' ' + word).length > cols) {
      out.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) out.push(line);
  return out;
}

/** The portfolio's AsciiBox: hairline border, "+" corners, ┤ label ├ in the top edge. */
function box(x, y, w, h, label) {
  let s = `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" fill="none" stroke="${C.line}"/>`;
  for (const [cx, cy] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) {
    s += `<rect x="${cx - 4}" y="${cy - 7}" width="8" height="14" fill="${C.ink}"/>`;
    s += text(cx - 3.9, cy + 4.5, '+', { size: 13, cls: 'd' });
  }
  if (label) {
    const t = `┤ ${label.toUpperCase()} ├`;
    const lw = t.length * (11 * CW + 2.2);
    s += `<rect x="${x + 14}" y="${y - 7}" width="${r(lw + 8)}" height="14" fill="${C.ink}"/>`;
    s += text(x + 18, y + 4, t, { size: 11, cls: 'd', extra: 'letter-spacing="2.2"' });
  }
  return s;
}

/**
 * Frame-by-frame animation without JS: every frame is a <g> that is visible for
 * 1/n of the cycle. Negative delays put each frame in its own slot.
 */
function frames(name, list, period, cls = '') {
  const pct = r(100 / list.length);
  const css = `.${name}{opacity:0;animation:${name} ${period}s steps(1,end) infinite}
@keyframes ${name}{0%{opacity:1}${pct}%{opacity:0}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.${name}:first-child{opacity:1}}`;
  const n = list.length;
  const body = list
    .map((f, i) => {
      const delay = i === 0 ? 0 : -r(((n - i) * period) / n);
      return `<g class="${name} ${cls}" style="animation-delay:${delay}s">${f}</g>`;
    })
    .join('');
  return [`<g>${body}</g>`, css];
}

/* ── ascii coder: someone at a desk, typing C for the race car ───────── */

const CODE = [
  [['int ', 'a'], ['shift(', 'p'], ['int ', 'a'], ['rpm) {', 'p']],
  [['  if ', 'a'], ['(rpm > ', 'p'], ['9000', 'a'], [')', 'p']],
  [['    return ', 'a'], ['gear + ', 'p'], ['1', 'a'], [';', 'p']],
  [['  return ', 'a'], ['gear;', 'p']],
  [['}', 'p']],
];

// The programmer, seen from behind: headphones on, hood down, plant and mug
// on the desk. Hands are drawn separately so they can type.
const PERSON = [
  /* 10 */ '                    .=====.',
  /* 11 */ "    \\\\  //       .='.;';';'.=.",
  /* 12 */ "   \\\\\\\\////     //;';';';';';\\\\",
  /* 13 */ "    \\\\\\|//     |/';';';';';';'\\|",
  /* 14 */ "     \\\\|/     .-|';';';';';';';|-.",
  /* 15 */ "    .-'|'-.   | ||';';';';';';'|| |    .-----.",
  /* 16 */ "    |  ~  |   '-|';';';';';';'|-'    |     |]",
  /* 17 */ "    '.___.'     '.;';';';';'.'       '-----'",
  /* 18 */ "               _____.-'    '-._____",
  /* 19 */ "            .-'     \\  .--.  /     '-.",
  /* 20 */ "           /         '-|  |-'         \\",
  /* 21 */ "          /            '--'            \\",
  /* 22 */ '  _______/______________________________\\____',
  /* 23 */ '  |   [__][__][__][__][__][__][__][__][__]   |',
  /* 24 */ '  |__________________________________________|',
];

/** Colour a scene row: plant leaves and headphones in acid, hair texture dim. */
function tint(line, i) {
  const parts = [];
  [...line].forEach((ch, c) => {
    let k = 'p';
    if (i >= 22) k = '[]'.includes(ch) || (i === 23 && ch === '_' && c > 4 && c < 42) ? 'f' : 'd';
    else if (c < 12) k = '\\/|'.includes(ch) && i < 15 ? 'a' : ch === '~' ? 'a' : 'd';
    else if (c >= 37) k = 'd';
    else if ('=#'.includes(ch)) k = 'a';
    else if (i >= 14 && i <= 16 && (c <= 16 || c >= 31)) k = 'a'; // headphone cups
    else if (";'".includes(ch) && i >= 11 && i <= 17 && c > 16 && c < 31) k = 'd';
    if (ch === ' ') k = parts.length ? parts.at(-1)[1] : 'p';
    if (parts.length && parts.at(-1)[1] === k) parts.at(-1)[0] += ch;
    else parts.push([ch, k]);
  });
  return parts;
}

/**
 * Static scene drawn once; only the code (clip-typed), the cursor,
 * the hands, the steam and the power LED move. Returns [markup, css].
 */
function coder(x0, y0) {
  const FS = 9, LH = 11, cw = FS * CW;
  const SW = 36; // screen inner width
  const M = 5; // monitor left column
  const row = (i) => y0 + i * LH + FS;
  const col = (c) => x0 + c * cw;
  let s = '';
  let css = '';
  const T = (c, i, parts) => (s += text(col(c), row(i), parts, { size: FS }));

  // monitor
  const title = '~/fesb-racing/gearbox.c';
  T(M, 0, [['.' + '-'.repeat(SW) + '.', 'd']]);
  T(M, 1, [['|  ', 'd'], ['● ● ●', 'a'], [' '.repeat(SW - 8 - title.length) + title + ' ', 'd'], ['|', 'd']]);
  T(M, 2, [['|' + '-'.repeat(SW) + '|', 'd']]);
  for (let i = 0; i < 6; i++) {
    T(M, 3 + i, [['| ', 'd'], [i < CODE.length ? `${i + 1}` : ' ', 'f'], [' '.repeat(SW - 2), ''], ['|', 'd']]);
  }
  const gap = 8, side = (SW - gap) / 2;
  T(M, 9, [["'" + '-'.repeat(side) + '.' + ' '.repeat(gap - 2) + '.' + '-'.repeat(side) + "'", 'd']]);
  s += `<g class="led">${text(col(M + SW - 1), row(8), '°', { size: FS, cls: 'a' })}</g>`;
  css += `
.led{animation:led 3.2s steps(1,end) infinite}
@keyframes led{0%,70%{opacity:1}71%,74%{opacity:.25}75%,100%{opacity:1}}`;

  PERSON.forEach((line, k) => T(0, 10 + k, tint(line, 10 + k)));

  // code, typed line by line
  const period = 11;
  const cps = 0.075; // seconds per character
  let t = 0.6;
  const pct = (sec) => r((sec / period) * 100);
  const end = 92;
  CODE.forEach((parts, i) => {
    const len = parts.reduce((n, [p]) => n + p.length, 0);
    const a = pct(t), b = pct(t + len * cps);
    const cx = col(M + 4), y = row(3 + i);
    css += `
.k${i}{transform-box:view-box;transform-origin:${r(cx)}px 0;transform:scaleX(0);animation:k${i} ${period}s infinite}
@keyframes k${i}{0%,${a}%{transform:scaleX(0);animation-timing-function:steps(${len},end)}${b}%,${end}%{transform:scaleX(1)}${r(end + 0.5)}%,100%{transform:scaleX(0)}}
.q${i}{opacity:0;animation:q${i} ${period}s infinite}
@keyframes q${i}{0%,${a}%{opacity:0;transform:translateX(0);animation-timing-function:steps(${len},end)}${r(a + 0.01)}%{opacity:1}${b}%{opacity:1;transform:translateX(${r(len * cw)}px)}${i === CODE.length - 1 ? `${end}%{opacity:1;transform:translateX(${r(len * cw)}px)}${r(end + 0.5)}%` : `${r(b + 0.01)}%`},100%{opacity:0;transform:translateX(${r(len * cw)}px)}}`;
    s += `<clipPath id="kc${i}"><rect class="k${i}" x="${r(cx)}" y="${y - FS}" width="${r(len * cw + 1)}" height="${LH}"/></clipPath>`;
    s += `<g clip-path="url(#kc${i})">${text(cx, y, parts, { size: FS })}</g>`;
    s += `<g class="q${i}"><rect class="blink" x="${r(cx + 1)}" y="${y - FS + 1}" width="${r(cw - 1)}" height="${LH - 1}" fill="${C.acid}"/></g>`;
    t += len * cps + 0.35;
  });
  css += `
@media (prefers-reduced-motion:reduce){${CODE.map((_, i) => `.k${i}`).join(',')}{transform:none}}`;

  // hands on the keyboard: one presses while the other lifts
  const L = 13, R = 33;
  const up = (c) => text(col(c), row(21), '.--.', { size: FS, cls: 'p' }) + text(col(c), row(22), '|__|', { size: FS, cls: 'p' });
  const down = (c) => text(col(c), row(22), '.--.', { size: FS, cls: 'p' });
  const clear = (c) => `<rect x="${r(col(c))}" y="${row(21) - FS + 1}" width="${r(4 * cw)}" height="${LH * 2 - 1}" fill="${C.ink}"/>`;
  const [hands, handsCss] = frames('hd', [clear(L) + clear(R) + up(L) + down(R), clear(L) + clear(R) + down(L) + up(R)], 0.36);
  css += handsCss;
  s += hands;

  // steam over the mug
  const sx = col(40);
  const [steam, steamCss] = frames('st', [
    text(sx, row(13), '( (', { size: FS, cls: 'd' }) + text(sx, row(14), ' ) )', { size: FS, cls: 'f' }),
    text(sx, row(13), ' ) )', { size: FS, cls: 'd' }) + text(sx, row(14), '( (', { size: FS, cls: 'f' }),
    text(sx, row(12), ' (', { size: FS, cls: 'f' }) + text(sx, row(13), '  ) (', { size: FS, cls: 'd' }) + text(sx, row(14), ' ( )', { size: FS, cls: 'f' }),
  ], 1.8);
  css += steamCss;
  s += steam;

  return [s, css];
}

/* ── 00 hero ──────────────────────────────────────────────────────── */

function hero() {
  const H = 476;
  let s = '';
  let css = '';

  // nav
  s += text(PAD, 30, [['~/', 'd'], ['domeepc', 'p'], ['_', 'a blink']], { size: 13, cls: 'b' });
  const nav = ['01 about', '02 stack', '03 work', '04 log', '05 contact'];
  let nx = W - PAD;
  for (const item of [...nav].reverse()) {
    const w = item.length * (11 * CW + 1.6);
    nx -= w;
    const [num, label] = item.split(' ');
    s += text(nx, 30, [[num + ' ', 'a'], [label.toUpperCase(), 'd']], { size: 11, extra: 'letter-spacing="1.6"' });
    nx -= 22;
  }
  s += `<rect x="0" y="50" width="${W}" height="1" fill="${C.line}"/>`;

  // the coder, right side
  const [scene, sceneCss] = coder(W - PAD - 46 * 9 * CW + 4, 70);
  css += sceneCss;
  s += scene;

  // meta row
  const meta = [
    ['index', 'readme/v2026'],
    ['coords', profile.coords],
    ['focus', 'web + embedded'],
    ['status', '● employed'],
  ];
  meta.forEach(([k, v], i) => {
    const x = PAD + i * 152;
    s += `<g class="rise" style="animation-delay:${0.1 + i * 0.06}s">`;
    s += text(x, 84, k.toUpperCase(), { size: 10, cls: 'f', extra: 'letter-spacing="1.6"' });
    s += text(x, 100, v.startsWith('●') ? [['● ', 'a'], [v.slice(2).toUpperCase(), 'p']] : v.toUpperCase(), {
      size: 10,
      extra: 'letter-spacing="1.4"',
    });
    s += '</g>';
  });

  // banners — each row is wiped in left to right by a block cursor
  const BFS = 12, BLH = 12;
  const bx = PAD;
  let by = 128;
  const banner = (rows, cls, delay0) => {
    rows.forEach((row, i) => {
      const w = row.length * BFS * CW;
      const id = `w${cls}${i}`;
      const d = r(delay0 + i * 0.07);
      s += `<clipPath id="${id}"><rect class="wipe" style="animation-delay:${d}s" x="${bx}" y="${by - 2}" width="${r(w + 4)}" height="${BLH + 2}"/></clipPath>`;
      s += `<g clip-path="url(#${id})">${text(bx, by + BFS - 2, blocks(row, cls), { size: BFS })}</g>`;
      s += `<rect class="sweep" style="animation-delay:${d}s;--w:${r(w)}px" x="${bx}" y="${by}" width="${r(BFS * CW)}" height="${BLH}" fill="${C.acid}"/>`;
      by += BLH;
    });
  };
  css += `
.wipe{transform-box:fill-box;transform-origin:left;transform:scaleX(0);animation:wipe .9s steps(24,end) forwards}
@keyframes wipe{to{transform:scaleX(1)}}
.sweep{opacity:0;animation:sweep .9s steps(24,end) forwards}
@keyframes sweep{0%{opacity:1;transform:translateX(0)}99%{opacity:1;transform:translateX(var(--w))}100%{opacity:0;transform:translateX(var(--w))}}
@media (prefers-reduced-motion:reduce){.wipe{transform:none}.sweep{display:none}}`;
  banner(FIRST, 'p', 0.15);
  by += 9;
  banner(LAST, 'a', 0.45);

  // typewriter role line
  const RFS = 18, rcw = RFS * CW, ry = by + 42;
  const rx = PAD + 2 * rcw;
  s += text(PAD, ry, '>', { size: RFS, cls: 'a' });
  const slot = 100 / ROLES.length;
  const period = ROLES.length * 5;
  ROLES.forEach((role, i) => {
    const L = role.length;
    const w = L * rcw;
    const a = r(i * slot), b = r(a + slot * 0.28), c = r(a + slot * 0.8), d = r(a + slot * 0.92);
    const end = r(a + slot);
    css += `
.r${i}{opacity:0;animation:r${i} ${period}s linear infinite}
@keyframes r${i}{0%,${a}%{opacity:0}${r(a + 0.01)}%,${r(end - 0.01)}%{opacity:1}${end}%,100%{opacity:0}}
.t${i}{transform-box:view-box;transform-origin:${rx}px 0;animation:t${i} ${period}s infinite}
@keyframes t${i}{0%,${a}%{transform:scaleX(0);animation-timing-function:steps(${L},end)}${b}%,${c}%{transform:scaleX(1);animation-timing-function:steps(${L},end)}${d}%,100%{transform:scaleX(0)}}
.c${i}{animation:c${i} ${period}s infinite}
@keyframes c${i}{0%,${a}%{transform:translateX(0);animation-timing-function:steps(${L},end)}${b}%,${c}%{transform:translateX(${r(w)}px);animation-timing-function:steps(${L},end)}${d}%,100%{transform:translateX(0)}}`;
    s += `<clipPath id="rc${i}"><rect class="t${i}" x="${r(rx)}" y="${ry - RFS}" width="${r(w + 1)}" height="${RFS + 8}"/></clipPath>`;
    s += `<g class="r${i}">`;
    s += `<g clip-path="url(#rc${i})">${text(rx, ry, role, { size: RFS })}</g>`;
    s += `<g class="c${i}"><rect class="blink" x="${r(rx + 2)}" y="${ry - RFS + 3}" width="${r(rcw - 1)}" height="${RFS + 1}" fill="${C.acid}"/></g>`;
    s += '</g>';
  });
  css += `
@media (prefers-reduced-motion:reduce){.r0{opacity:1}.t0{transform:none}.c0{transform:translateX(${r(ROLES[0].length * rcw)}px)}}`;

  // bio
  wrap(profile.bio, 66).forEach((line, i) => {
    s += `<g class="rise" style="animation-delay:${1 + i * 0.08}s">${text(PAD, ry + 32 + i * 20, line, { size: 13, cls: 'd' })}</g>`;
  });

  // ticker bar
  const ty = H - 46;
  s += `<rect x="0" y="${ty}" width="${W}" height="46" fill="${C.ink}" fill-opacity=".9"/>`;
  s += `<rect x="0" y="${ty}" width="${W}" height="1" fill="${C.line}"/><rect x="0" y="${H - 1}" width="${W}" height="1" fill="${C.line}"/>`;
  const [spin, spinCss] = frames('sp', ['|', '/', '-', '\\'].map((ch) => text(PAD, ty + 28, ch, { size: 12, cls: 'a' })), 0.6);
  css += spinCss;
  s += spin + text(PAD + 16, ty + 28, 'NOW', { size: 11, cls: 'a', extra: 'letter-spacing="1.8"' });
  s += `<rect x="128" y="${ty}" width="1" height="46" fill="${C.line}"/>`;
  const items = TICKER.map((t) => `* ${t.toUpperCase()}`);
  const runW = items.reduce((n, t) => n + t.length * (11 * CW + 1.8) + 48, 0);
  const run = (off) => {
    let x = off, out = '';
    for (const t of items) {
      out += text(x, ty + 28, [['* ', 'a'], [t.slice(2), 'd']], { size: 11, extra: 'letter-spacing="1.8"' });
      x += t.length * (11 * CW + 1.8) + 48;
    }
    return out;
  };
  css += `
.mq{animation:mq 45s linear infinite}
@keyframes mq{to{transform:translateX(-${r(runW)}px)}}`;
  s += `<clipPath id="mqc"><rect x="129" y="${ty}" width="${W - 129}" height="46"/></clipPath>`;
  s += `<g clip-path="url(#mqc)"><g class="mq">${run(152)}${run(152 + runW)}</g></g>`;

  return svg({
    h: H,
    title: `${profile.name} — ${ROLES.join(' / ')}. ${profile.bio}`,
    body: s,
    css,
    intro: true,
  });
}

/* ── compact panels ─────────────────────────────────────────────── */

/** `// 01 ABOUT ─────────` then `$ command█`, inside a column. */
function miniHeader(x, y, w, index, title, command) {
  const t = title.toUpperCase();
  let s = text(x, y, [[`// ${index}  `, 'a'], [t, 'p b']], { size: 15, extra: 'letter-spacing="1.5"' });
  const lx = x + (index.length + 5 + t.length) * (15 * CW + 1.5) + 8;
  s += `<rect x="${r(lx)}" y="${y - 5}" width="${r(x + w - lx)}" height="1" fill="${C.faint}"/>`;
  s += text(x, y + 24, [['$ ', 'a'], [command, 'd']], { size: 12 });
  s += `<rect class="blink" x="${r(x + (command.length + 2.4) * 12 * CW)}" y="${y + 14}" width="7" height="13" fill="${C.acid}"/>`;
  return s;
}

const COL = (W - PAD * 3) / 2; // two columns
const X2 = PAD * 2 + COL;

/* 01 about | 02 stack */
function aboutStack() {
  let s = miniHeader(PAD, 40, COL, '01', 'about', 'cat ./about.md');
  const lead = [
    ['I build things that run in a browser tab and things that run on a ', ''],
    ['race car', 'a'],
    ['.', ''],
  ];
  const words = lead.flatMap(([t, c]) => t.split(/(?<= )/).map((w) => [w, c]));
  const lines = [[]];
  let len = 0;
  for (const [w, c] of words) {
    if (len + w.trimEnd().length > 38) { lines.push([]); len = 0; }
    lines.at(-1).push([w, c]);
    len += w.length;
  }
  lines.forEach((parts, i) => { s += text(PAD, 98 + i * 23, parts, { size: 15 }); });
  const by = 98 + lines.length * 23 + 6;
  const rowH = 22, bh = WHOAMI.length * rowH + 26;
  s += box(PAD, by, COL, bh, 'whoami');
  WHOAMI.forEach(([k, v], i) => {
    const short = v.replace('Split-Dalmatia, ', '').replace(' · photography · vlogging', ' · photo · vlogs');
    s += text(PAD + 16, by + 28 + i * rowH, [[k.padEnd(6), 'd'], [': ', 'f'], [short, 'p']], { size: 12 });
  });
  const H1 = by + bh + 28;

  s += miniHeader(X2, 40, COL, '02', 'stack', 'ls -la ~/skills');
  const sorted = [...SKILLS].sort((a, b) => (a[1] === b[1] ? 0 : a[1] === 'Proficient' ? -1 : 1));
  const half = Math.ceil(sorted.length / 2);
  const cw2 = COL / 2;
  sorted.forEach(([name, level], i) => {
    const pro = level === 'Proficient';
    const x = X2 + (i < half ? 0 : cw2 + 6);
    const y = 98 + (i % half) * 26;
    s += text(x, y, [[pro ? '████████░░ ' : '████░░░░░░ ', pro ? 'a' : 'f'], [name, pro ? 'p b' : 'd']], { size: 12 });
  });
  const ly = 98 + half * 26 + 2;
  s += text(X2, ly, [['# ', 'a'], ['██', 'a'], [' shipping it · ', 'd'], ['░░', 'f'], [' learning it', 'd']], { size: 11 });

  const H = Math.max(H1, ly + 28);
  s += `<rect x="${PAD + COL + PAD / 2}" y="24" width="1" height="${H - 48}" fill="${C.line}"/>`;
  return svg({
    h: H,
    title: `About: I build things that run in a browser tab and things that run on a race car. ${WHOAMI.map((w) => w.join(': ')).join('; ')}. Stack: ${SKILLS.map(([n, l]) => `${n} (${l.toLowerCase()})`).join(', ')}`,
    body: s,
  });
}

/* 03 work */
function workHeader() {
  const s = miniHeader(PAD, 40, W - PAD * 2, '03', 'work', 'git log --oneline --repos');
  return svg({ h: 78, title: 'Work: selected repositories', body: s });
}

function repoRow(repo, i) {
  const H = 50;
  let s = `<rect x="0" y="0" width="${W}" height="1" fill="${C.line}"/>`;
  s += text(PAD, 31, String(i + 1).padStart(2, '0'), { size: 11, cls: 'a', extra: 'letter-spacing="2"' });
  s += text(PAD + 34, 32, repo.name, { size: 19, cls: 'b' });
  const nx = PAD + 34 + repo.name.length * 19 * CW + 18;
  s += `<text x="${r(nx)}" y="31" font-size="11"><tspan fill="${repo.color}">■ </tspan><tspan class="p">${esc(repo.language)}</tspan></text>`;
  const dx = nx + (repo.language.length + 2) * 11 * CW + 16;
  const max = Math.floor((W - PAD - 40 - dx) / (12 * CW));
  const d = repo.description.length > max ? repo.description.slice(0, max - 1).trimEnd() + '…' : repo.description;
  s += text(dx, 31, d, { size: 12, cls: 'd' });
  s += text(W - PAD - 12, 32, '↗', { size: 18, cls: 'a' });
  return svg({ h: H, title: `${repo.name} — ${repo.description} (${repo.language})`, body: s });
}

/* 04 log | 05 contact */
function shortSha(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) h = Math.imul(h ^ input.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function logContact() {
  let s = `<rect x="0" y="0" width="${W}" height="1" fill="${C.line}"/>`;
  let css = '';
  s += miniHeader(PAD, 40, COL, '04', 'log', 'git log --graph --all');
  let y = 92;
  const gx = PAD + 5, cx = PAD + 26;
  TIMELINE.forEach((e, i) => {
    s += text(gx - 5, y + 4, e.current ? '◉' : '*', { size: 14, cls: 'a' });
    if (i < TIMELINE.length - 1) s += `<line x1="${gx + 0.5}" y1="${y + 11}" x2="${gx + 0.5}" y2="${y + 38}" stroke="${C.faint}" stroke-dasharray="4 3"/>`;
    const title = e.title.replace(' — Lead Developer', '').replace('Embedded Systems: ', '');
    s += text(cx, y + 4, title, { size: 13, cls: 'b' });
    s += text(cx, y + 22, [[shortSha(e.title) + ' ', 'a'], [`${e.year.replace(' – Present', '–now')} · @ ${e.at}`, 'd']], { size: 11 });
    y += 44;
  });
  const H1 = y + 6;

  // say hi + tty
  s += miniHeader(X2, 40, COL, '05', 'contact', 'echo "say hi"');
  const BFS = 9;
  TALK.forEach((row, i) => { s += text(X2, 92 + i * BFS + BFS - 2, blocks(row, 'a'), { size: BFS }); });
  const ty = 92 + 6 * BFS + 22, th = H1 - ty - 4;
  s += box(X2, ty, COL, th, 'tty1');
  const P = 'guest@domeepc:~$ ';
  const session = [
    ['in', 'whoami'],
    ['out', 'Domagoj Milardović — CE student & dev'],
    ['in', 'location'],
    ['out', 'Kaštela, Split, Croatia'],
    ['in', 'sudo hire-me'],
    ['out', 'permission granted. → linkedin'],
  ];
  const period = 12;
  const step = 100 / (session.length + 3);
  const show = (cls, at) => `
.${cls}{opacity:0;animation:${cls} ${period}s steps(1,end) infinite}
@keyframes ${cls}{0%,${at}%{opacity:0}${r(at + 0.01)}%,96%{opacity:1}97%,100%{opacity:0}}`;
  session.forEach(([kind, t], i) => {
    css += show(`s${i}`, r((i + 0.5) * step));
    s += `<g class="s${i}">${text(X2 + 16, ty + 28 + i * 20, kind === 'in' ? [[P, 'a'], [t, 'p']] : [[t, 'd']], { size: 12 })}</g>`;
  });
  css += show('s-end', r((session.length + 0.8) * step));
  const ly = ty + 28 + session.length * 20;
  s += `<g class="s-end">${text(X2 + 16, ly, P, { size: 12, cls: 'a' })}<rect class="blink" x="${r(X2 + 16 + P.length * 12 * CW + 2)}" y="${ly - 10}" width="7" height="13" fill="${C.acid}"/></g>`;
  css += `
@media (prefers-reduced-motion:reduce){${[...session.keys()].map((i) => `.s${i}`).join(',')},.s-end{opacity:1}}`;

  s += `<rect x="${PAD + COL + PAD / 2}" y="24" width="1" height="${H1 - 40}" fill="${C.line}"/>`;
  const H = H1 + 30;
  s += `<rect x="0" y="${H - 1}" width="${W}" height="1" fill="${C.line}"/>`;
  return svg({
    h: H,
    title: `Log: ${TIMELINE.map((e) => `${e.year} ${e.title} @ ${e.at}`).join('; ')}. Contact: say hi — sudo hire-me.`,
    body: s,
    css,
  });
}

/* ── buttons + footer ─────────────────────────────────────────────── */

function button(label, arrow, primary = false) {
  const fs = 13, ls = 1.1;
  const w = Math.round((label.length + 3) * (fs * CW + ls) + 48);
  const h = 46;
  const body = `<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" fill="${primary ? C.acid : C.ink}" stroke="${primary ? C.acid : C.paper}"/>
${text(24, 28, [[label.toUpperCase(), primary ? 'k' : 'p'], ['  ' + arrow, primary ? 'k' : 'a']], { size: fs, extra: `letter-spacing="${ls}"` })}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title>
<style>${FONT_CSS}${BASE_CSS}</style>
${body}
</svg>
`;
}

/* ── write ────────────────────────────────────────────────────────── */

const files = {
  'hero.svg': hero(),
  'about-stack.svg': aboutStack(),
  'work.svg': workHeader(),
  ...Object.fromEntries(REPOS.map((repo, i) => [`work-${repo.name.toLowerCase()}.svg`, repoRow(repo, i)])),
  'log-contact.svg': logContact(),
  'btn-portfolio.svg': button('portfolio', '→', true),
  'btn-github.svg': button('github', '→'),
  'btn-linkedin.svg': button('linkedin', '→'),
  'btn-email.svg': button('email', '→'),
};
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content);
  console.log(`${name.padEnd(30)} ${(content.length / 1024).toFixed(1)} KB`);
}
