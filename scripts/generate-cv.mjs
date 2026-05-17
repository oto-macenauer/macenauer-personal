// Generates a print-ready, ATS-friendly CV PDF for Oto Macenauer.
// Run: npm run cv
//
// Output: public/resume.pdf
// Style:  modern minimal hybrid — Arial headings, Times body, single accent rule.
//         Embedded TTFs from C:\Windows\Fonts so Czech diacritics render correctly.

import PDFDocument from 'pdfkit';
import { createWriteStream, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public', 'resume.pdf');

// ── Fonts ──────────────────────────────────────────────────
// System Windows fonts — full Unicode coverage (Š, Č, ť, …).
const WIN_FONTS = 'C:\\Windows\\Fonts';
const FONTS = {
  sans:        join(WIN_FONTS, 'arial.ttf'),
  sansBold:    join(WIN_FONTS, 'arialbd.ttf'),
  serif:       join(WIN_FONTS, 'times.ttf'),
  serifItalic: join(WIN_FONTS, 'timesi.ttf'),
  serifBold:   join(WIN_FONTS, 'timesbd.ttf'),
};
for (const [k, p] of Object.entries(FONTS)) {
  if (!existsSync(p)) {
    console.error(`Missing font for "${k}": ${p}`);
    process.exit(1);
  }
}

// ── Profile data (from LinkedIn, May 2026) ─────────────────
const PROFILE = {
  name: 'Oto Macenauer',
  headline: 'Tech Lead · Full-Stack Engineer',
  stack: '.NET / C#  ·  Angular  ·  Python  ·  Cloud Architecture  ·  AWS / Kubernetes',
  location: 'Prague, Czechia',
  email: 'leomacenauer@gmail.com',
  links: [
    { label: 'macenauer.net',                     href: 'https://www.macenauer.net' },
    { label: 'linkedin.com/in/oto-macenauer',     href: 'https://www.linkedin.com/in/oto-macenauer/' },
    { label: 'github.com/oto-macenauer',          href: 'https://github.com/oto-macenauer' },
  ],
  summary:
    'Tech Lead and full-stack developer with over a decade of experience building and evolving complex web systems. ' +
    'Specialized in .NET / C# backend development and modern frontend applications (Angular / Vue), ' +
    'with a strong focus on system architecture, scalability, and maintainable codebases. ' +
    'Combines hands-on development with technical leadership — guiding architecture decisions, mentoring developers, ' +
    'and helping teams deliver reliable production systems. Background spans enterprise platforms, ' +
    'geospatial systems, and cloud-native applications running on AWS and Kubernetes.',
};

const EXPERIENCE = [
  {
    from: 'Nov 2025', to: 'Present',
    role: 'Technical Lead', co: 'Absa Group',
    place: 'Prague, Czechia · Hybrid',
    bullets: [
      'Leading development of cloud-native financial applications built with .NET and Python on AWS and Kubernetes.',
      'Designing system architecture and backend services; setting technical direction for the team.',
      'Leading full-stack feature work across .NET, Python, and Angular.',
      'Mentoring developers and improving engineering practices, reliability, and performance.',
    ],
    stack: ['.NET', 'C#', 'Python', 'Angular', 'PostgreSQL', 'AWS', 'Kubernetes', 'GitHub DevOps'],
  },
  {
    from: 'Feb 2021', to: 'Nov 2025',
    role: 'Lead Product Engineer', co: 'Absa Group',
    place: 'Prague, Czechia',
    bullets: [
      'Full-stack development and technical design of internal financial platforms.',
      'Designed backend services and APIs in .NET; built frontend features using modern web frameworks.',
      'Contributed to architecture decisions and system improvements; collaborated across product and engineering.',
    ],
    stack: ['.NET Core', 'AWS', 'Kubernetes', 'PostgreSQL', 'GitHub DevOps'],
  },
  {
    from: 'Nov 2019', to: 'Jan 2021',
    role: 'Full-Stack Developer', co: 'iOCO',
    place: 'Prague, Czechia · Contract',
    bullets: [
      'Development and maintenance of enterprise web applications.',
      'Implemented backend APIs and services in .NET, integrated databases and external systems.',
    ],
    stack: ['.NET', 'C#', 'SQL Server'],
  },
  {
    from: 'Jun 2015', to: 'Oct 2019',
    role: 'Full-Stack Developer', co: 'GPS Dozor — TLV s.r.o.',
    bullets: [
      'Designed and implemented a real-time geospatial platform for GPS tracker monitoring.',
      'Led the transformation of the system into a Single Page Application — improving performance and usability.',
      'Coordinated development tasks within a small team and provided technical guidance.',
    ],
    stack: ['ASP.NET', 'Web API', 'Vue.js', 'MS SQL', 'Entity Framework', 'WCF'],
  },
  {
    from: 'Feb 2013', to: 'Jun 2015',
    role: 'SharePoint Developer', co: 'Trask Solutions',
    place: 'Prague, Czechia',
    bullets: [
      'Enterprise SharePoint solutions for large organizations including Škoda Auto.',
      'Team Webs (Škoda Auto): maintained and extended a SharePoint platform for inter-workgroup document sharing.',
      'New K2 (Škoda Auto): designed a SharePoint-based data layer for a CMS with an Azure-hosted frontend.',
    ],
    stack: ['SharePoint', 'ASP.NET', 'PowerShell', 'MEF', 'Azure'],
  },
  {
    from: 'May 2011', to: 'Jan 2013',
    role: 'Programmer', co: 'Accenture',
    place: 'Prague, Czechia',
    bullets: [
      'Enterprise SharePoint applications for insurance companies.',
      'Business Portal (Česká pojišťovna): SharePoint-based internal business portal.',
      'Data Transformation Tool (ČSOB Pojišťovna): data processing tool built on .NET and SQL Server.',
    ],
    stack: ['SharePoint', '.NET', 'MS SQL'],
  },
  {
    from: 'Sep 2010', to: 'Dec 2010',
    role: '.NET Developer', co: 'Radiation Detection Systems',
    bullets: [
      'Database storing data about worker radiation exposure (C# / WinForms / Access / OLE DB).',
      'Computer-vision application counting exposure by processing radiation-sensitive films (C++ / OpenCV / Qt).',
    ],
    stack: ['C#', 'WinForms', 'C++', 'OpenCV', 'Qt'],
  },
  {
    from: 'Jan 2008', to: 'Jun 2010',
    role: '.NET Developer', co: 'Progress Project',
    bullets: [
      'Analysis and development of an application maintaining construction-evidence records.',
    ],
    stack: ['ASP.NET MVC', 'jQuery', 'Entity Framework'],
  },
];

const EDUCATION = [
  { from: '2008', to: '2010', deg: 'M.Sc., Computer Programming',
    school: 'Brno University of Technology' },
  { from: '2005', to: '2008', deg: 'B.Sc., Electrical & Electronics Engineering',
    school: 'Czech Technical University, Prague' },
];

const CERTS = [
  'AWS Certified Developer · Associate',
  'Microsoft Azure Fundamentals',
  'React Developer Certification',
  'Node.js Certified Developer',
];

const CAPABILITIES = [
  ['Backend',     '.NET · C# · ASP.NET Core · Python · Web API'],
  ['Frontend',    'Angular · Vue.js · React · TypeScript · jQuery'],
  ['Cloud',       'AWS · Azure · Kubernetes · GitHub DevOps'],
  ['Data',        'PostgreSQL · MS SQL · Entity Framework · SharePoint'],
  ['Specialties', 'System architecture · Banking platforms · Geospatial systems · Mentoring'],
];

// ── Layout constants ──────────────────────────────────────
const PAGE = { w: 595.28, h: 841.89 };          // A4
const M = { l: 56, r: 56, t: 56, b: 56 };
const COL_W = PAGE.w - M.l - M.r;
const COLOR = {
  ink:    '#15130F',
  body:   '#2A2622',
  mute:   '#7A7264',
  rule:   '#D4CCB9',
  accent: '#C2330F',
};

// ── Build the PDF ─────────────────────────────────────────
const doc = new PDFDocument({
  size: 'A4',
  margins: M,
  bufferPages: true,
  info: {
    Title: 'Oto Macenauer — CV',
    Author: 'Oto Macenauer',
    Subject: 'Curriculum Vitae',
    Keywords: '.NET, C#, Python, Angular, AWS, Kubernetes, software engineering',
    Creator: 'macenauer.net build pipeline',
  },
});
doc.pipe(createWriteStream(OUT));

// Register fonts under short aliases
doc.registerFont('sans',         FONTS.sans);
doc.registerFont('sans-bold',    FONTS.sansBold);
doc.registerFont('serif',        FONTS.serif);
doc.registerFont('serif-italic', FONTS.serifItalic);
doc.registerFont('serif-bold',   FONTS.serifBold);

// ── Header ────────────────────────────────────────────────
function rule(y, color = COLOR.rule, width = 0.5) {
  doc.save()
    .moveTo(M.l, y).lineTo(PAGE.w - M.r, y)
    .strokeColor(color).lineWidth(width).stroke()
    .restore();
}

// Page meta (top-right, very small)
doc.font('sans').fontSize(8).fillColor(COLOR.mute)
  .text('CV · 2026.05', M.l, M.t - 4, { width: COL_W, align: 'right' });

// Name
doc.font('sans-bold').fontSize(28).fillColor(COLOR.ink)
  .text(PROFILE.name.toUpperCase(), M.l, M.t + 6, {
    characterSpacing: 1.5,
  });

const headerBaseY = doc.y + 4;

// Accent rule under name
doc.save()
  .moveTo(M.l, headerBaseY).lineTo(M.l + 60, headerBaseY)
  .strokeColor(COLOR.accent).lineWidth(2).stroke()
  .restore();
doc.save()
  .moveTo(M.l + 60, headerBaseY).lineTo(PAGE.w - M.r, headerBaseY)
  .strokeColor(COLOR.rule).lineWidth(0.5).stroke()
  .restore();

// Headline + stack
doc.font('sans').fontSize(11).fillColor(COLOR.ink)
  .text(PROFILE.headline, M.l, headerBaseY + 8);
doc.font('sans').fontSize(8.5).fillColor(COLOR.mute)
  .text(PROFILE.stack.toUpperCase(), {
    characterSpacing: 0.4,
  });

// Contact row (location · email · links) — wraps if needed
const contactBits = [
  PROFILE.location,
  PROFILE.email,
  ...PROFILE.links.map(l => l.label),
].join('   ·   ');
doc.font('sans').fontSize(9).fillColor(COLOR.body)
  .text(contactBits, M.l, doc.y + 8, { width: COL_W });

// Add link annotations over the link labels (best-effort using ranges)
// Simpler: attach link to email + each label by drawing with link option in a separate pass.
// Skipping individual hot-spots for layout simplicity; URLs are still listed as text.

// Summary
doc.moveDown(0.8);
doc.font('serif-italic').fontSize(10.5).fillColor(COLOR.body)
  .text(PROFILE.summary, { width: COL_W, lineGap: 1.5, align: 'justify' });

// ── Section helper ────────────────────────────────────────
function section(label) {
  doc.moveDown(1.0);
  // Reserve space — paginate if near bottom
  if (doc.y > PAGE.h - M.b - 80) doc.addPage();
  const y = doc.y;
  doc.font('sans-bold').fontSize(8.5).fillColor(COLOR.accent)
    .text(label.toUpperCase(), M.l, y, { characterSpacing: 2 });
  rule(doc.y + 2);
  doc.moveDown(0.5);
}

function ensureSpace(needed) {
  if (doc.y + needed > PAGE.h - M.b) doc.addPage();
}

// ── Experience ────────────────────────────────────────────
section('Experience');

const dateCol = 108;
const contentX = M.l + dateCol;
const contentW = COL_W - dateCol;

EXPERIENCE.forEach((j, i) => {
  // Estimate full role height; if it won't fit, push the whole entry to next page
  // to avoid orphaned stack-tag lines.
  const estHeight =
    18 +                              // role title line
    (j.bullets.length * 26) +         // bullet lines (rough avg with wrap)
    (j.stack ? 16 : 0) +              // stack row
    (j.place ? 10 : 0);               // place line under date
  if (doc.y + estHeight > PAGE.h - M.b - 8) {
    doc.addPage();
  } else if (i > 0) {
    doc.moveDown(0.55);
  }

  const rowTop = doc.y;

  // Left date column
  doc.font('sans').fontSize(8.5).fillColor(COLOR.mute)
    .text(`${j.from} — ${j.to}`, M.l, rowTop, {
      width: dateCol - 8,
    });
  if (j.place) {
    doc.font('sans').fontSize(7.5).fillColor(COLOR.mute)
      .text(j.place, M.l, doc.y + 1, { width: dateCol - 8 });
  }

  // Right content column
  doc.font('sans-bold').fontSize(11).fillColor(COLOR.ink)
    .text(j.role, contentX, rowTop, { width: contentW, continued: true })
    .font('sans').fillColor(COLOR.mute)
    .text(`   —   ${j.co}`);

  doc.moveDown(0.15);
  doc.font('serif').fontSize(10).fillColor(COLOR.body);
  j.bullets.forEach((b) => {
    doc.text('•   ' + b, contentX, doc.y, { width: contentW, lineGap: 1.5, indent: 0 });
  });

  // Stack tags as a compact row
  if (j.stack && j.stack.length) {
    doc.moveDown(0.25);
    doc.font('sans').fontSize(8).fillColor(COLOR.mute)
      .text(j.stack.join('  ·  '), contentX, doc.y, { width: contentW });
  }
});

// ── Education ─────────────────────────────────────────────
section('Education');

EDUCATION.forEach((e, i) => {
  ensureSpace(40);
  if (i > 0) doc.moveDown(0.4);
  const rowTop = doc.y;
  doc.font('sans').fontSize(8.5).fillColor(COLOR.mute)
    .text(`${e.from} — ${e.to}`, M.l, rowTop, { width: dateCol - 8 });

  doc.font('sans-bold').fontSize(11).fillColor(COLOR.ink)
    .text(e.deg, contentX, rowTop, { width: contentW });
  doc.font('serif-italic').fontSize(10).fillColor(COLOR.body)
    .text(e.school, contentX, doc.y, { width: contentW });
});

// ── Certifications + Capabilities (two-column) ────────────
section('Certifications & Capabilities');

const certColW = COL_W * 0.42;
const capColX = M.l + COL_W * 0.46;
const capColW = COL_W - (capColX - M.l);
const twoColTop = doc.y;

// Certs (left)
doc.font('sans').fontSize(8.5).fillColor(COLOR.mute)
  .text('CERTIFIED', M.l, twoColTop, { characterSpacing: 1.2 });
doc.moveDown(0.3);
const certListTop = doc.y;
CERTS.forEach((c) => {
  doc.font('serif').fontSize(10).fillColor(COLOR.body)
    .text('•   ' + c, M.l, doc.y, { width: certColW, lineGap: 2 });
});
const certBottom = doc.y;

// Capabilities (right)
doc.font('sans').fontSize(8.5).fillColor(COLOR.mute)
  .text('CAPABILITIES', capColX, twoColTop, { characterSpacing: 1.2 });
doc.y = certListTop;
CAPABILITIES.forEach(([k, v]) => {
  doc.font('sans-bold').fontSize(8.5).fillColor(COLOR.ink)
    .text(k.toUpperCase(), capColX, doc.y, { characterSpacing: 1, lineGap: 0 });
  doc.font('serif').fontSize(10).fillColor(COLOR.body)
    .text(v, capColX, doc.y + 1, { width: capColW, lineGap: 1 });
  doc.moveDown(0.25);
});
const capBottom = doc.y;

doc.y = Math.max(certBottom, capBottom);

// ── Footer with page count and tagline ────────────────────
const range = doc.bufferedPageRange();
const pageCount = range.count;
for (let i = 0; i < pageCount; i++) {
  doc.switchToPage(range.start + i);
  const fy = PAGE.h - M.b + 24;
  doc.save();
  doc.font('sans').fontSize(7.5).fillColor(COLOR.mute);
  doc.text(`OTO MACENAUER  ·  CV  ·  ${PROFILE.location.toUpperCase()}`, M.l, fy, {
    width: COL_W * 0.7,
  });
  doc.text(`p. ${i + 1} / ${pageCount}`, M.l, fy, { width: COL_W, align: 'right' });
  doc.restore();
}

doc.flushPages();
doc.end();

process.on('exit', () => {
  console.log(`✓ Wrote ${OUT}`);
});
