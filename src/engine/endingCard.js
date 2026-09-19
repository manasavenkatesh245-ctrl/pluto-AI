/**
 * Ending card export.
 *
 * Phase 1 decision: canvas-based PNG export, with a copyable text summary as the
 * fallback for any environment that blocks downloads (or when the user prefers text).
 * Everything here is client-side — no server, no upload, no storage.
 */

import { getGenre } from './genres.js';

const CARD_W = 1080;
const CARD_H = 1500;
const PAD = 72;

const FONT_DISPLAY = 'Georgia, "Times New Roman", serif';
const FONT_UI = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function hexToRgba(hex, alpha) {
  const clean = String(hex).replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function drawParagraph(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapText(ctx, text, maxWidth);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
  return y + lines.length * lineHeight;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Render the card to an offscreen canvas.
 * @returns {HTMLCanvasElement}
 */
export function renderEndingCard({ genreId, ending, profile, seed, clues = [], allies = [], choices = [], tension = 0 }) {
  const genre = getGenre(genreId);
  const palette = genre?.palette || { accent: '#35e6ff', accent2: '#6b8cff', deep: '#0d0d0d' };
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');

  // Base
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Genre wash
  const wash = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  wash.addColorStop(0, hexToRgba(palette.accent, 0.2));
  wash.addColorStop(0.45, hexToRgba(palette.deep, 0.95));
  wash.addColorStop(1, hexToRgba(palette.accent2, 0.22));
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Vignette
  const vignette = ctx.createRadialGradient(CARD_W / 2, CARD_H * 0.35, 120, CARD_W / 2, CARD_H * 0.5, CARD_H * 0.8);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.72)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Frame
  ctx.strokeStyle = hexToRgba(palette.accent, 0.5);
  ctx.lineWidth = 2;
  roundRect(ctx, PAD / 2, PAD / 2, CARD_W - PAD, CARD_H - PAD, 28);
  ctx.stroke();

  // Header
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = palette.accent;
  ctx.font = `700 30px ${FONT_UI}`;
  ctx.letterSpacing = '10px';
  ctx.fillText('P L U T O', PAD, PAD + 46);
  ctx.letterSpacing = '0px';

  ctx.font = `400 24px ${FONT_UI}`;
  ctx.fillStyle = 'rgba(242,242,242,0.62)';
  ctx.textAlign = 'right';
  ctx.fillText(`${genre?.name || 'Story'} · seed ${seed?.code || '—'}`, CARD_W - PAD, PAD + 44);
  ctx.textAlign = 'left';

  // Divider
  ctx.strokeStyle = 'rgba(242,242,242,0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, PAD + 78);
  ctx.lineTo(CARD_W - PAD, PAD + 78);
  ctx.stroke();

  let y = PAD + 150;

  // Ending title
  ctx.fillStyle = '#f2f2f2';
  ctx.font = `700 68px ${FONT_DISPLAY}`;
  const titleLines = wrapText(ctx, ending?.title || 'Resolution', CARD_W - PAD * 2);
  titleLines.forEach((line, i) => ctx.fillText(line, PAD, y + i * 78));
  y += titleLines.length * 78 + 26;

  // Twist kicker
  ctx.fillStyle = palette.accent2;
  ctx.font = `600 22px ${FONT_UI}`;
  ctx.letterSpacing = '3px';
  ctx.fillText('THE TWIST', PAD, y);
  ctx.letterSpacing = '0px';
  y += 34;

  ctx.fillStyle = hexToRgba(palette.accent, 0.92);
  ctx.font = `italic 30px ${FONT_DISPLAY}`;
  y = drawParagraph(ctx, ending?.twist || '', PAD, y, CARD_W - PAD * 2, 40) + 34;

  // Resolution text
  ctx.fillStyle = 'rgba(242,242,242,0.82)';
  ctx.font = `400 27px ${FONT_UI}`;
  y = drawParagraph(ctx, ending?.text || '', PAD, y, CARD_W - PAD * 2, 39) + 40;

  // Divider
  ctx.strokeStyle = 'rgba(242,242,242,0.12)';
  ctx.beginPath();
  ctx.moveTo(PAD, y - 16);
  ctx.lineTo(CARD_W - PAD, y - 16);
  ctx.stroke();

  // Explorer profile block
  ctx.fillStyle = palette.accent;
  ctx.font = `600 22px ${FONT_UI}`;
  ctx.letterSpacing = '3px';
  ctx.fillText('EXPLORER PROFILE', PAD, y + 26);
  ctx.letterSpacing = '0px';
  y += 74;

  ctx.fillStyle = '#f2f2f2';
  ctx.font = `700 48px ${FONT_DISPLAY}`;
  ctx.fillText(profile?.title || 'The Unknown', PAD, y);
  ctx.font = `400 26px ${FONT_UI}`;
  ctx.fillStyle = 'rgba(242,242,242,0.6)';
  ctx.textAlign = 'right';
  ctx.fillText(profile?.tagline || '', CARD_W - PAD, y - 6);
  ctx.textAlign = 'left';
  y += 52;

  // Axis bars
  const barW = CARD_W - PAD * 2 - 260;
  (profile?.readout || []).forEach((axis) => {
    ctx.fillStyle = 'rgba(242,242,242,0.7)';
    ctx.font = `400 22px ${FONT_UI}`;
    ctx.fillText(axis.label.question, PAD, y + 16);
    const barX = PAD + 260;
    ctx.fillStyle = 'rgba(242,242,242,0.12)';
    roundRect(ctx, barX, y, barW, 14, 7);
    ctx.fill();
    const ratio = Math.max(-1, Math.min(1, axis.value / 6));
    const mid = barX + barW / 2;
    const fillW = Math.abs(ratio) * (barW / 2);
    ctx.fillStyle = ratio >= 0 ? palette.accent : palette.accent2;
    roundRect(ctx, ratio >= 0 ? mid : mid - fillW, y, Math.max(fillW, 3), 14, 7);
    ctx.fill();
    ctx.fillStyle = 'rgba(242,242,242,0.55)';
    ctx.font = `500 20px ${FONT_UI}`;
    ctx.textAlign = 'right';
    ctx.fillText(axis.lean, CARD_W - PAD, y + 16);
    ctx.textAlign = 'left';
    y += 40;
  });

  y += 18;

  // Clues and allies
  const chipLine = (label, items, color) => {
    if (!items?.length) return;
    ctx.fillStyle = color;
    ctx.font = `600 21px ${FONT_UI}`;
    ctx.fillText(label, PAD, y);
    ctx.fillStyle = 'rgba(242,242,242,0.78)';
    ctx.font = `400 22px ${FONT_UI}`;
    const truncated = items.slice(0, 3).join(' · ');
    const lines = wrapText(ctx, truncated, CARD_W - PAD * 2 - 110);
    lines.forEach((line, i) => {
      if (i > 1) return;
      ctx.fillText(line, PAD + 110, y + i * 30);
    });
    y += Math.min(lines.length, 2) * 30 + 20;
  };

  chipLine('CLUES', clues, hexToRgba(palette.accent, 0.95));
  chipLine('ALLIES', allies, hexToRgba(palette.accent2, 0.95));

  // Choices summary
  if (choices?.length) {
    ctx.fillStyle = 'rgba(242,242,242,0.45)';
    ctx.font = `600 21px ${FONT_UI}`;
    ctx.fillText(`${choices.length} DECISIONS · TENSION ${tension}`, PAD, y);
    y += 30;
  }

  // Footer
  ctx.strokeStyle = 'rgba(242,242,242,0.12)';
  ctx.beginPath();
  ctx.moveTo(PAD, CARD_H - PAD - 44);
  ctx.lineTo(CARD_W - PAD, CARD_H - PAD - 44);
  ctx.stroke();

  ctx.fillStyle = 'rgba(242,242,242,0.5)';
  ctx.font = `400 22px ${FONT_UI}`;
  ctx.fillText('Choose your genre. Choose your fate.', PAD, CARD_H - PAD);
  ctx.textAlign = 'right';
  ctx.fillStyle = palette.accent;
  ctx.fillText('pluto', CARD_W - PAD, CARD_H - PAD);
  ctx.textAlign = 'left';

  return canvas;
}

/** Safe filename fragment. */
function slug(str) {
  return String(str || 'pluto')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
}

/**
 * Download the card as a PNG. Returns a result object rather than throwing, so the UI
 * can fall back to the text summary without a visible error.
 */
export function downloadEndingCard(payload) {
  try {
    const canvas = renderEndingCard(payload);
    const filename = `pluto-${slug(payload.genreId)}-${slug(payload.ending?.title)}.png`;
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve({ ok: false, reason: 'toBlob-unsupported' });
          return;
        }
        try {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 4000);
          resolve({ ok: true, filename });
        } catch (error) {
          resolve({ ok: false, reason: error?.message || 'download-blocked' });
        }
      }, 'image/png');
    });
  } catch (error) {
    return Promise.resolve({ ok: false, reason: error?.message || 'canvas-failed' });
  }
}

/** Plain-text summary — the documented fallback when downloads are blocked. */
export function buildTextSummary({ genreId, ending, profile, seed, clues = [], allies = [], choices = [], tension = 0 }) {
  const genre = getGenre(genreId);
  return [
    'PLUTO — Choose your genre. Choose your fate.',
    `${genre?.name || 'Story'} · seed ${seed?.code || '—'}`,
    '',
    `ENDING: ${ending?.title || 'Resolution'}`,
    ending?.text || '',
    '',
    `THE TWIST: ${ending?.twist || ''}`,
    ending?.epilogue ? `\nEPILOGUE: ${ending.epilogue}` : '',
    '',
    `EXPLORER PROFILE: ${profile?.title || '—'} (${profile?.tagline || '—'})`,
    profile?.line || '',
    '',
    `Clues: ${clues.join(' · ') || 'none'}`,
    `Allies: ${allies.join(' · ') || 'none'}`,
    `Tension: ${tension}`,
    '',
    'Decisions:',
    ...(choices.length ? choices.map((c, i) => `${i + 1}. ${c}`) : ['(none)']),
  ]
    .filter((line) => line !== undefined && line !== null)
    .join('\n');
}

/** Copy to clipboard with a fallback for locked-down browsers. */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return { ok: true };
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return { ok };
  } catch (error) {
    return { ok: false, reason: error?.message || 'copy-failed' };
  }
}
