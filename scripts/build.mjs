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
.p{fill:${C.paper}}.d{fill:${C.dim}}.f{fill:${C.faint}}.a{fill:${C.acid}}.k{fill:${C.ink}}
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

/** `// 01 ────────── ABOUT`, the big title, then `$ command█`. Returns [markup, height]. */
function sectionHeader(index, title, command, y0 = 44) {
  const ls = 2.4;
  const right = title.toUpperCase();
  const rw = right.length * (12 * CW + ls);
  const lx = PAD + 70;
  const lineW = W - PAD - rw - 18 - lx;
  let s = text(PAD, y0, `// ${index}`, { size: 12, cls: 'a', extra: `letter-spacing="${ls}"` });
  s += `<rect class="draw" x="${lx}" y="${y0 - 4.5}" width="${r(lineW)}" height="1" fill="${C.faint}"/>`;
  s += text(W - PAD - rw, y0, right, { size: 12, cls: 'd', extra: `letter-spacing="${ls}"` });
  s += `<g class="rise" style="animation-delay:.25s">${text(PAD - 3, y0 + 84, right, { size: 76, cls: 'b', extra: 'letter-spacing="-2"' })}</g>`;
  s += `<g class="rise" style="animation-delay:.5s">${text(PAD, y0 + 124, [['$ ', 'a'], [command, 'd']], { size: 13 })}`;
  s += `<rect class="blink" x="${r(PAD + (command.length + 2.4) * 13 * CW)}" y="${y0 + 113}" width="8" height="14" fill="${C.acid}"/></g>`;
  return [s, y0 + 160];
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

/* ── ascii donut (after Andy Sloane's donut.c, as in the portfolio hero) ── */

function donutFrames(cols, rows, count) {
  const ramp = '.,-~:;=!*#$@';
  const out = [];
  for (let f = 0; f < count; f++) {
    const A = 1 + (f / count) * Math.PI * 2;
    const B = 0.5 + (f / count) * Math.PI * 2; // whole turns per loop keep it seamless
    const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
    const z = new Float32Array(cols * rows);
    const l = new Int8Array(cols * rows).fill(-1);
    const K2 = 5, K1 = (cols * K2 * 3) / (8 * 3);
    for (let t = 0; t < 6.28; t += 0.07) {
      const ct = Math.cos(t), st = Math.sin(t);
      const cx = 2 + ct, cy = st; // R2 + R1·cosθ, R1·sinθ
      for (let p = 0; p < 6.28; p += 0.02) {
        const cp = Math.cos(p), sp = Math.sin(p);
        const x3 = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
        const y3 = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
        const D = 1 / (K2 + cA * cx * sp + cy * sA);
        const x = Math.floor(cols / 2 + K1 * D * x3);
        const y = Math.floor(rows / 2 - (K1 / 2) * D * y3);
        if (x < 0 || x >= cols || y < 0 || y >= rows) continue;
        const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
        const o = x + cols * y;
        if (D > z[o]) {
          z[o] = D;
          l[o] = L > 0 ? Math.floor(L * 8) : 0;
        }
      }
    }
    const tone = (n) => (n < 0 ? null : n <= 2 ? 'f' : n <= 6 ? 'd' : n <= 9 ? 'p' : 'a');
    const lines = [];
    for (let y = 0; y < rows; y++) {
      const parts = [];
      for (let x = 0; x < cols; x++) {
        const n = l[x + cols * y];
        const ch = n < 0 ? ' ' : ramp[Math.min(n, 11)];
        const c = tone(n) ?? '';
        if (parts.length && parts.at(-1)[1] === c) parts.at(-1)[0] += ch;
        else parts.push([ch, c]);
      }
      while (parts.length && parts.at(-1)[1] === '') parts.pop();
      lines.push(parts);
    }
    out.push(lines);
  }
  return out;
}

/* ── 00 hero ──────────────────────────────────────────────────────── */

function hero() {
  const H = 640;
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

  // donut, right side, behind the type
  const DC = 50, DR = 27, DFS = 9, DLH = 11;
  const dx = W - DC * DFS * CW - 10, dy = 150;
  const df = donutFrames(DC, DR, 48).map((lines) =>
    lines.map((parts, i) => (parts.length ? text(dx, dy + i * DLH + DFS, parts, { size: DFS }) : '')).join(''),
  );
  const [donut, donutCss] = frames('dn', df, 7.2);
  css += donutCss;
  s += `<g opacity=".85">${donut}</g>`;

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
    s += text(x, 96, k.toUpperCase(), { size: 10, cls: 'f', extra: 'letter-spacing="1.6"' });
    s += text(x, 114, v.startsWith('●') ? [['● ', 'a'], [v.slice(2).toUpperCase(), 'p']] : v.toUpperCase(), {
      size: 10,
      extra: 'letter-spacing="1.4"',
    });
    s += '</g>';
  });

  // banners — each row is wiped in left to right by a block cursor
  const BFS = 13, BLH = 13;
  const bx = PAD;
  let by = 160;
  const banner = (rows, cls, delay0) => {
    rows.forEach((row, i) => {
      const w = row.length * BFS * CW;
      const id = `w${cls}${i}`;
      const d = r(delay0 + i * 0.07);
      s += `<clipPath id="${id}"><rect class="wipe" style="animation-delay:${d}s" x="${bx}" y="${by - 2}" width="${r(w + 4)}" height="${BLH + 2}"/></clipPath>`;
      s += `<g clip-path="url(#${id})">${text(bx, by + BFS - 2, row, { size: BFS, cls, extra: 'letter-spacing="0"' })}</g>`;
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
  const RFS = 18, rcw = RFS * CW, ry = by + 52;
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
  wrap(profile.bio, 74).forEach((line, i) => {
    s += `<g class="rise" style="animation-delay:${1 + i * 0.08}s">${text(PAD, ry + 40 + i * 21, line, { size: 13, cls: 'd' })}</g>`;
  });

  // ticker bar
  const ty = H - 46;
  s += `<rect x="0" y="${ty}" width="${W}" height="46" fill="${C.ink}" fill-opacity=".9"/>`;
  s += `<rect x="0" y="${ty}" width="${W}" height="1" fill="${C.line}"/><rect x="0" y="${H - 1}" width="${W}" height="1" fill="${C.line}"/>`;
  const [spin, spinCss] = frames('sp', ['|', '/', '-', '\\'].map((ch) => text(PAD, ty + 28, ch, { size: 12, cls: 'a' })), 0.6);
  css += spinCss;
  s += spin + text(PAD + 16, ty + 28, 'SCROLL', { size: 11, cls: 'a', extra: 'letter-spacing="1.8"' });
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

/* ── 01 about ─────────────────────────────────────────────────────── */

function about() {
  let [s, y] = sectionHeader('01', 'about', 'cat ./about.md');
  const lead = [
    ['I build things that run in a browser tab and things that run on a ', ''],
    ['race car', 'a'],
    ['. From full-stack TypeScript in production to C firmware on embedded hardware — I enjoy the whole stack, down to the last byte.', ''],
  ];
  // Wrap while keeping the accent run coloured.
  const words = lead.flatMap(([t, c]) => t.split(/(?<= )/).map((w) => [w, c]));
  const LFS = 21, cols = Math.floor((W - PAD * 2) / (LFS * CW));
  const lines = [[]];
  let len = 0;
  for (const [w, c] of words) {
    if (len + w.trimEnd().length > cols) {
      lines.push([]);
      len = 0;
    }
    lines.at(-1).push([w, c]);
    len += w.length;
  }
  y += 20;
  lines.forEach((parts, i) => {
    s += `<g class="rise" style="animation-delay:${0.6 + i * 0.08}s">${text(PAD, y + i * 32, parts, { size: LFS })}</g>`;
  });
  y += lines.length * 32 + 30;

  // whoami box
  const bw = 560, rowH = 26, bh = WHOAMI.length * rowH + 40;
  s += box(PAD, y, bw, bh, 'whoami');
  WHOAMI.forEach(([k, v], i) => {
    const ty = y + 34 + i * rowH;
    s += `<g class="rise" style="animation-delay:${1 + i * 0.07}s">`;
    s += text(PAD + 24, ty, [[k.padEnd(7), 'd'], [': ', 'f'], [v, 'p']], { size: 13 });
    s += '</g>';
  });

  // the little [ me ] diagram
  const diagram = [
    '  web ─────┐        ┌───── embedded',
    '           ├─[ me ]─┤',
    '  algo ────┘        └───── video',
  ];
  const dx = PAD + bw + 18;
  const dy = y + bh / 2 - 24;
  diagram.forEach((line, i) => {
    const parts = line.split(/(\[ me \])/).map((p) => [p, p === '[ me ]' ? 'a' : 'd']);
    s += text(dx, dy + i * 18, parts, { size: 11 });
  });
  y += bh + 40;
  return svg({ h: y, title: `About: ${lead.map((l) => l[0]).join('')} ${WHOAMI.map((w) => w.join(': ')).join('; ')}`, body: s });
}

/* ── 02 stack ─────────────────────────────────────────────────────── */

function stack() {
  let [s, y] = sectionHeader('02', 'stack', 'ls -la ~/skills');
  y += 12;
  s += text(PAD, y, `total ${SKILLS.length}`, { size: 13, cls: 'd' });
  y += 12;
  const fs = 13, lh = 25;
  SKILLS.forEach(([name, level, cat], i) => {
    const ty = y + (i + 1) * lh;
    const pro = level === 'Proficient';
    const bar = pro ? '████████░░' : '████░░░░░░';
    s += `<g class="rise" style="animation-delay:${0.5 + i * 0.04}s">`;
    s += `<rect x="${PAD - 8}" y="${ty - 17}" width="${W - PAD * 2 + 16}" height="${lh - 1}" fill="${i % 2 ? C.ink : C.ink2}"/>`;
    s += text(PAD, ty, [
      [pro ? '-rwxr-xr-x' : '-rw-r--r--', 'f'],
      ['  1  ', 'f'],
      ['domeepc  ', 'd'],
      [cat.padEnd(11), 'd'],
      [bar, pro ? 'a' : 'd'],
      ['  ', ''],
      [level.toLowerCase().padEnd(12), pro ? 'p' : 'd'],
      [name, pro ? 'p b' : 'p'],
    ], { size: fs });
    s += '</g>';
  });
  y += (SKILLS.length + 1) * lh + 14;
  s += text(PAD, y, [['# ', 'a'], ['rwx = shipping it · rw- = learning it', 'f']], { size: 12 });
  y += 40;
  return svg({ h: y, title: `Stack: ${SKILLS.map(([n, l]) => `${n} (${l.toLowerCase()})`).join(', ')}`, body: s });
}

/* ── 03 work ──────────────────────────────────────────────────────── */

function workHeader() {
  const [s, y] = sectionHeader('03', 'work', 'git log --oneline --repos');
  return svg({ h: y, title: 'Work: selected repositories', body: s });
}

function repoRow(repo, i) {
  const desc = wrap(repo.description, 70);
  const H = 108 + desc.length * 20;
  let s = `<rect x="0" y="0" width="${W}" height="1" fill="${C.line}"/>`;
  s += `<rect x="0" y="${H - 1}" width="${W}" height="1" fill="${C.line}"/>`;
  s += text(PAD, 44, String(i + 1).padStart(2, '0'), { size: 12, cls: 'a', extra: 'letter-spacing="2"' });
  s += `<g class="rise" style="animation-delay:.1s">${text(PAD + 44, 52, repo.name, { size: 34, cls: 'b', extra: 'letter-spacing="-1"' })}</g>`;
  s += text(W - PAD - 34 * CW, 50, '↗', { size: 30, cls: 'a' });
  desc.forEach((line, k) => {
    s += text(PAD + 44, 82 + k * 20, line, { size: 13, cls: 'd' });
  });
  const my = 82 + desc.length * 20 + 6;
  s += `<text x="${PAD + 44}" y="${my}" font-size="12"><tspan fill="${repo.color}">■ </tspan><tspan class="p">${esc(repo.language)}</tspan><tspan class="f"> · </tspan><tspan class="d">updated ${repo.updated}</tspan>${
    repo.homepage ? `<tspan class="f"> · </tspan><tspan class="a">${esc(repo.homepage)}</tspan>` : ''
  }</text>`;
  return svg({ h: H, title: `${repo.name} — ${repo.description} (${repo.language})`, body: s });
}

/* ── 04 log ───────────────────────────────────────────────────────── */

function shortSha(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) h = Math.imul(h ^ input.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function log() {
  let [s, y] = sectionHeader('04', 'log', 'git log --graph --all');
  y += 10;
  const gx = PAD + 8, cx = PAD + 44;
  TIMELINE.forEach((e, i) => {
    const desc = wrap(e.description, 86);
    const h = 120 + desc.length * 20;
    s += `<g class="rise" style="animation-delay:${0.4 + i * 0.1}s">`;
    s += text(gx - 6, y + 14, e.current ? '◉' : '*', { size: 17, cls: 'a' });
    if (i < TIMELINE.length - 1) {
      s += `<line x1="${gx + 0.5}" y1="${y + 24}" x2="${gx + 0.5}" y2="${y + h + 2}" stroke="${C.faint}" stroke-dasharray="6 4"/>`;
    }
    const head = i === 0 ? [[' (', 'd'], ['HEAD', 'a'], [' → ', 'd'], ['main', 'p'], [')', 'd']] : [];
    s += text(cx, y + 12, [[`commit ${shortSha(e.title)}`, 'a'], ...head, [` [${e.type}]`, 'd']], { size: 12 });
    s += text(cx, y + 32, [[`Date:  ${e.year}`, 'd'], ...(e.current ? [['   ● running', 'a']] : [])], { size: 12 });
    s += text(cx, y + 66, e.title, { size: 22, cls: 'b' });
    s += text(cx, y + 88, `@ ${e.at}`, { size: 13, cls: 'd' });
    s += `<rect x="${cx}" y="${y + 102}" width="1" height="${desc.length * 20 + 4}" fill="${C.line}"/>`;
    desc.forEach((line, k) => {
      s += text(cx + 16, y + 118 + k * 20, line, { size: 13, cls: 'd' });
    });
    s += '</g>';
    y += h + 18;
  });
  s += text(gx - 3, y + 10, '$', { size: 13, cls: 'a' });
  s += `<rect class="blink" x="${cx}" y="${y - 1}" width="8" height="14" fill="${C.acid}"/>`;
  y += 44;
  return svg({
    h: y,
    title: `Log: ${TIMELINE.map((e) => `${e.year} ${e.title} @ ${e.at}`).join('; ')}`,
    body: s,
  });
}

/* ── 05 contact ───────────────────────────────────────────────────── */

function contact() {
  let s = '';
  let css = '';
  const y0 = 44;
  s += text(PAD, y0, '// 05', { size: 12, cls: 'a', extra: 'letter-spacing="2.4"' });
  s += `<rect class="draw" x="${PAD + 70}" y="${y0 - 4.5}" width="${W - PAD * 2 - 70 - 110}" height="1" fill="${C.faint}"/>`;
  s += text(W - PAD - 7 * (12 * CW + 2.4), y0, 'CONTACT', { size: 12, cls: 'd', extra: 'letter-spacing="2.4"' });

  // SAY HI banner
  const BFS = 15;
  let by = y0 + 38;
  TALK.forEach((row, i) => {
    s += `<g class="rise" style="animation-delay:${0.15 + i * 0.06}s">${text(PAD, by + BFS - 2, row, { size: BFS, cls: 'a' })}</g>`;
    by += BFS;
  });
  const lines = wrap("Got a project, an internship, or just want to talk race cars and C pointers? My inbox is open.", 34);
  lines.forEach((l, i) => {
    s += text(PAD + 40 * BFS * CW + 34, y0 + 60 + i * 21, l, { size: 13, cls: 'd' });
  });

  // tty1 — a scripted session that types itself, on a loop
  const ty = by + 44, th = 216, tw = W - PAD * 2;
  s += box(PAD, ty, tw, th, 'tty1');
  const P = 'guest@domeepc:~$ ';
  const session = [
    ['out', "type 'help' to list commands"],
    ['in', 'whoami'],
    ['out', `${profile.name} — Computer Engineering Student & Developer`],
    ['in', 'location'],
    ['out', `${profile.location} · ${profile.coords}`],
    ['in', 'sudo hire-me'],
    ['out', 'permission granted. routing you to linkedin ...'],
  ];
  const period = 14;
  const step = 100 / (session.length + 3);
  session.forEach(([kind, t], i) => {
    const at = r(i === 0 ? 0 : (i + 0.5) * step);
    css += `
.s${i}{opacity:0;animation:s${i} ${period}s steps(1,end) infinite}
@keyframes s${i}{0%,${at}%{opacity:0}${r(at + 0.01)}%,96%{opacity:1}97%,100%{opacity:0}}`;
    const y = ty + 36 + i * 24;
    s += `<g class="s${i}">${text(
      PAD + 22,
      y,
      kind === 'in' ? [[P, 'a'], [t, 'p']] : [[t, 'd']],
      { size: 13 },
    )}</g>`;
  });
  css += `
@media (prefers-reduced-motion:reduce){${session.map((_, i) => `.s${i}`).join(',')}{opacity:1}}`;
  const ly = ty + 36 + session.length * 24;
  const lastAt = r((session.length + 0.8) * step);
  css += `
.s-end{opacity:0;animation:s-end ${period}s steps(1,end) infinite}
@keyframes s-end{0%,${lastAt}%{opacity:0}${r(lastAt + 0.01)}%,96%{opacity:1}97%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.s-end{opacity:1}}`;
  s += `<g class="s-end">${text(PAD + 22, ly, P, { size: 13, cls: 'a' })}`;
  s += `<rect class="blink" x="${r(PAD + 22 + P.length * 13 * CW + 2)}" y="${ly - 11}" width="8" height="14" fill="${C.acid}"/></g>`;
  const H = ty + th + 36;
  return svg({ h: H, title: 'Say hi — a terminal session: whoami, location, sudo hire-me', body: s, css });
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

function footer() {
  const H = 64;
  let s = `<rect width="${W}" height="1" fill="${C.line}"/>`;
  s += text(PAD, 38, `© ${new Date().getFullYear()} ${profile.name}`, { size: 11, cls: 'd', extra: 'letter-spacing="1.4"' });
  const t = 'built with svg + markdown · rendered in 0x7f characters';
  s += text(W - PAD - t.length * (11 * CW + 0.6), 38, t, { size: 11, cls: 'f', extra: 'letter-spacing=".6"' });
  return svg({ h: H, title: `© ${profile.name}`, body: s });
}

/* ── write ────────────────────────────────────────────────────────── */

const files = {
  'hero.svg': hero(),
  'about.svg': about(),
  'stack.svg': stack(),
  'work.svg': workHeader(),
  ...Object.fromEntries(REPOS.map((repo, i) => [`work-${repo.name.toLowerCase()}.svg`, repoRow(repo, i)])),
  'log.svg': log(),
  'contact.svg': contact(),
  'btn-portfolio.svg': button('portfolio', '→', true),
  'btn-github.svg': button('github', '→'),
  'btn-linkedin.svg': button('linkedin', '→'),
  'btn-email.svg': button('email', '→'),
  'footer.svg': footer(),
};
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content);
  console.log(`${name.padEnd(30)} ${(content.length / 1024).toFixed(1)} KB`);
}
