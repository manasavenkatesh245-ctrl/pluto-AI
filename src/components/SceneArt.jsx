import { useId, useMemo } from 'react';

import { createRng } from '../engine/seed.js';

/**
 * Cinematic scene art per genre.
 *
 * Deliberately pure inline SVG: no external images, no network, no bundle weight, and it
 * recolours itself from the active genre's CSS variables. Layers carry different parallax
 * multipliers so the art sits behind glass and moves in depth as you scroll, tilt and
 * descend through the rounds.
 *
 * variant="panel" — the large story/ending artwork
 * variant="thumb" — a quieter version used behind the genre cards
 */

const VB_W = 1200;
const VB_H = 600;

/* ───────────────────────────── shared bits ───────────────────────────── */

function layerStyle(mx, my, ms) {
  return {
    transform: `translate3d(calc(var(--px) * ${mx}px), calc(var(--py) * ${my}px + var(--scroll) * ${ms}px), 0)`,
  };
}

function Starfield({ stars, prefix }) {
  return (
    <g className="art-layer" style={layerStyle(-18, -14, -34)}>
      {stars.map((s, i) => (
        <circle
          key={`${prefix}-star-${i}`}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#eaf6ff"
          opacity={s.o}
          className="art-twinkle"
          style={{ animationDelay: `${s.d}ms`, animationDuration: `${s.dur}ms` }}
        />
      ))}
    </g>
  );
}

function Figure({ x, y, h = 96, rim = 'var(--accent)' }) {
  const w = h * 0.44;
  return (
    <g transform={`translate(${x} ${y})`} className="art-figure">
      <ellipse cx="0" cy="8" rx={w * 0.95} ry="7" fill={rim} opacity="0.18" />
      <path
        d={`M ${-w * 0.5} 0 L ${-w * 0.38} ${-h * 0.6} Q 0 ${-h * 0.78} ${w * 0.38} ${-h * 0.6} L ${w * 0.5} 0 Z`}
        fill="#03040a"
        stroke={rim}
        strokeOpacity="0.45"
        strokeWidth="1.6"
      />
      <circle cx="0" cy={-h * 0.86} r={h * 0.115} fill="#03040a" stroke={rim} strokeOpacity="0.62" strokeWidth="1.6" />
    </g>
  );
}

/**
 * The part of the artwork that exists *because of* the last decision.
 * Allies appear on the ground, clues light up, and the stance changes the weather.
 */
function MoodLayer({ id, mood, allyCount, clueCount }) {
  const figures = Math.min(Math.max(allyCount, mood === 'social' ? 1 : 0), 3);
  const beacons = Math.min(clueCount, 4);
  const figureSpots = [
    [176, 546],
    [1024, 556],
    [596, 570],
  ];
  const beaconSpots = [
    [214, 350],
    [522, 298],
    [762, 334],
    [1002, 370],
  ];

  return (
    <g className="art-layer art-mood" data-mood={mood} style={layerStyle(9, 5, 14)}>
      {Array.from({ length: figures }, (_, i) => (
        <Figure
          key={`fig-${i}`}
          x={figureSpots[i][0]}
          y={figureSpots[i][1]}
          h={96 - i * 9}
          rim={i === 0 ? 'var(--accent2)' : 'var(--accent)'}
        />
      ))}

      {Array.from({ length: beacons }, (_, i) => (
        <g key={`beacon-${i}`}>
          <circle
            cx={beaconSpots[i][0]}
            cy={beaconSpots[i][1]}
            r="5"
            fill="var(--accent)"
            className="art-beacon"
            style={{ animationDelay: `${i * 420}ms` }}
          />
          <circle
            cx={beaconSpots[i][0]}
            cy={beaconSpots[i][1]}
            r="17"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.55"
            className="art-ring"
            style={{ animationDelay: `${i * 500}ms` }}
          />
        </g>
      ))}

      {mood === 'bold' && (
        <>
          <ellipse cx="700" cy="430" rx="430" ry="200" fill="var(--accent)" opacity="0.2" filter={`url(#${id}-soft)`} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`speed-${i}`}
              x1={150 + i * 230}
              y1="472"
              x2={-30 + i * 230}
              y2="524"
              stroke="var(--accent)"
              strokeOpacity="0.32"
              strokeWidth="2"
              className="art-speed"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </>
      )}

      {mood === 'wary' && (
        <>
          <rect x="0" y="318" width={VB_W} height="282" fill="#000" opacity="0.36" />
          <ellipse cx="1130" cy="462" rx="130" ry="62" fill="var(--accent2)" opacity="0.26" filter={`url(#${id}-soft)`} />
        </>
      )}

      {mood === 'curious' && (
        <>
          <path
            d="M 214 350 L 522 298 L 762 334"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="1.4"
            strokeDasharray="6 8"
            className="art-thread"
          />
          <circle
            cx="762"
            cy="334"
            r="36"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            className="art-spin"
          />
        </>
      )}

      {mood === 'commit' && (
        <>
          <path d="M 300 612 L 700 84 L 902 84 L 520 612 Z" fill="var(--accent)" opacity="0.15" filter={`url(#${id}-soft)`} />
          <rect x="0" y="556" width={VB_W} height="56" fill="var(--accent)" opacity="0.09" />
        </>
      )}

      {mood === 'social' && (
        <ellipse cx="600" cy="562" rx="370" ry="62" fill="var(--accent2)" opacity="0.16" filter={`url(#${id}-soft)`} />
      )}
    </g>
  );
}

function Pine({ x, y, h, fill, opacity = 1 }) {
  const w = h * 0.52;
  return (
    <g opacity={opacity}>
      <path d={`M ${x} ${y - h} L ${x + w} ${y} L ${x - w} ${y} Z`} fill={fill} />
      <path d={`M ${x} ${y - h * 0.62} L ${x + w * 0.82} ${y + h * 0.3} L ${x - w * 0.82} ${y + h * 0.3} Z`} fill={fill} />
      <rect x={x - 2} y={y} width="4" height={h * 0.12} fill={fill} />
    </g>
  );
}

/* ───────────────────────────── Sci-fi ───────────────────────────── */

function ScifiScene({ id, stars, thumb }) {
  const station = 'M 300 322 L 392 286 L 500 316 L 500 396 L 392 424 L 300 396 Z';
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#03060d" />
          <stop offset="48%" stopColor="var(--deep)" />
          <stop offset="100%" stopColor="#050b14" />
        </linearGradient>
        <radialGradient id={`${id}-planet`} cx="0.34" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.92" />
          <stop offset="52%" stopColor="var(--accent2)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0.98" />
        </radialGradient>
        <radialGradient id={`${id}-nebula`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-hull`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2836" />
          <stop offset="100%" stopColor="#080d15" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill={`url(#${id}-sky)`} />

      <g className="art-layer" style={layerStyle(-44, -30, -80)}>
        <ellipse cx="880" cy="180" rx="330" ry="200" fill={`url(#${id}-nebula)`} filter={`url(#${id}-soft)`} />
      </g>

      <Starfield stars={stars} prefix={id} />

      <g className="art-layer" style={layerStyle(26, 14, 46)}>
        <circle cx="1010" cy="590" r="300" fill={`url(#${id}-planet)`} />
        <ellipse
          cx="1010"
          cy="520"
          rx="360"
          ry="52"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.35"
          transform="rotate(-13 1010 520)"
        />
      </g>

      <g className="art-layer" style={layerStyle(12, 6, 20)}>
        <path d={station} fill={`url(#${id}-hull)`} stroke="var(--accent)" strokeOpacity="0.4" />
        <rect x="352" y="300" width="4" height="70" fill="var(--accent)" opacity="0.55" />
        <circle cx="354" cy="296" r="4" fill="var(--accent)" className="art-blink" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={332 + i * 24}
            y={344}
            width="12"
            height="20"
            fill="var(--accent2)"
            opacity={0.35 + (i % 3) * 0.2}
            className="art-flicker"
            style={{ animationDelay: `${i * 420}ms` }}
          />
        ))}
        {!thumb &&
          [0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="354"
              cy="296"
              r={40 + i * 46}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.3"
              strokeWidth="1.5"
              className="art-ring"
              style={{ animationDelay: `${i * 900}ms` }}
            />
          ))}
      </g>

      <g className="art-layer" style={layerStyle(6, 3, 10)}>
        <path d="M 0 500 L 1200 470 L 1200 600 L 0 600 Z" fill="#04070d" />
        <path
          d="M 0 540 L 1200 512"
          stroke="var(--accent)"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="14 10"
        />
      </g>
    </>
  );
}

/* ───────────────────────────── Mystery ───────────────────────────── */

function MysteryScene({ id, stars, rain, thumb }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12" />
          <stop offset="55%" stopColor="var(--deep)" />
          <stop offset="100%" stopColor="#140f08" />
        </linearGradient>
        <radialGradient id={`${id}-moon`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff6dd" stopOpacity="0.95" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-house`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191410" />
          <stop offset="100%" stopColor="#07060a" />
        </linearGradient>
        <linearGradient id={`${id}-fog`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.16" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill={`url(#${id}-sky)`} />

      <g className="art-layer" style={layerStyle(-30, -20, -56)}>
        <circle cx="250" cy="130" r="190" fill={`url(#${id}-moon)`} />
        <circle cx="250" cy="130" r="62" fill="#fdf3d8" opacity="0.9" />
      </g>

      <Starfield stars={stars} prefix={id} />

      <g className="art-layer" style={layerStyle(-62, -12, -22)}>
        <ellipse cx="420" cy="230" rx="300" ry="42" fill="#1a1a22" opacity="0.75" filter={`url(#${id}-soft)`} />
        <ellipse cx="820" cy="300" rx="340" ry="46" fill="#161620" opacity="0.7" filter={`url(#${id}-soft)`} />
      </g>

      {/* Manor */}
      <g className="art-layer" style={layerStyle(16, 8, 24)}>
        <rect x="660" y="300" width="380" height="200" fill={`url(#${id}-house)`} />
        <path d="M 640 300 L 850 210 L 1060 300 Z" fill="#0c0a10" />
        <path d="M 806 210 L 850 210 L 850 250 Z" fill="#0c0a10" />
        <rect x="690" y="240" width="30" height="66" fill="#0b0a0f" />
        <rect x="960" y="228" width="28" height="78" fill="#0b0a0f" />
        <rect x="836" y="180" width="18" height="40" fill="#0b0a0f" />
        {[
          [700, 340],
          [760, 340],
          [880, 340],
          [940, 340],
          [700, 412],
          [760, 412],
          [880, 412],
          [940, 412],
        ].map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="34"
            height="46"
            rx="2"
            fill="var(--accent)"
            opacity={0.55 + (i % 3) * 0.16}
            className="art-flicker"
            style={{ animationDelay: `${i * 640}ms` }}
          />
        ))}
        <rect x="840" y="420" width="44" height="80" fill="#0a0910" />
      </g>

      {/* Bare trees */}
      <g className="art-layer" style={layerStyle(30, 12, 42)} fill="#05050a">
        <path d="M 120 500 L 132 500 L 132 320 L 182 250 L 176 244 L 130 306 L 130 250 L 124 250 L 124 330 Z" />
        <path d="M 1080 500 L 1094 500 L 1094 336 L 1148 280 L 1142 272 L 1092 330 L 1092 300 L 1086 300 L 1086 340 Z" />
        <path d="M 420 470 L 430 470 L 430 372 L 466 330 L 461 325 L 428 362 L 428 344 L 424 344 L 424 378 Z" />
      </g>

      {/* Rain */}
      <g className="art-layer" style={layerStyle(20, 28, 120)}>
        {rain.map((r, i) => (
          <line
            key={`${id}-rain-${i}`}
            x1={r.x}
            y1={r.y}
            x2={r.x - 4}
            y2={r.y + r.len}
            stroke="var(--accent)"
            strokeOpacity="0.34"
            strokeWidth="1.2"
            className="art-rain"
            style={{ animationDelay: `${r.d}ms`, animationDuration: `${r.dur}ms` }}
          />
        ))}
      </g>

      <g className="art-layer" style={layerStyle(6, 4, 12)}>
        <rect x="0" y="430" width={VB_W} height="170" fill={`url(#${id}-fog)`} />
        <path d="M 0 500 L 1200 500 L 1200 600 L 0 600 Z" fill="#06060a" />
      </g>
    </>
  );
}

/* ───────────────────────────── Fantasy ───────────────────────────── */

function FantasyScene({ id, stars, embers, mist, thumb }) {
  const pines = getPineLayout();
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050c10" />
          <stop offset="45%" stopColor="var(--deep)" />
          <stop offset="100%" stopColor="#0d1420" />
        </linearGradient>
        <radialGradient id={`${id}-moon`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f4fff6" stopOpacity="0.95" />
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-mist`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.22" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill={`url(#${id}-sky)`} />

      <g className="art-layer" style={layerStyle(-34, -22, -60)}>
        <circle cx="930" cy="140" r="200" fill={`url(#${id}-moon)`} />
        <circle cx="930" cy="140" r="52" fill="#eafff2" opacity="0.92" />
        <circle cx="1052" cy="96" r="22" fill="var(--accent2)" opacity="0.6" />
        <ellipse cx="420" cy="220" rx="300" ry="120" fill="var(--accent2)" opacity="0.1" filter={`url(#${id}-soft)`} />
      </g>

      <Starfield stars={stars} prefix={id} />

      {/* Mountains */}
      <g className="art-layer" style={layerStyle(-8, -4, -12)}>
        <path d="M 0 380 L 200 214 L 340 330 L 470 196 L 640 380 Z" fill="#0b1a1c" opacity="0.9" />
        <path d="M 520 380 L 700 236 L 840 340 L 980 210 L 1200 380 Z" fill="#0a1618" opacity="0.85" />
      </g>

      {/* Forest, three depths */}
      <g className="art-layer" style={layerStyle(-6, -2, -6)} opacity="0.72">
        {pines.far.map((p, i) => (
          <Pine key={`f-${i}`} x={p.x} y={p.y} h={p.h} fill="#08161a" />
        ))}
      </g>
      <g className="art-layer" style={layerStyle(14, 6, 18)} opacity="0.92">
        {pines.mid.map((p, i) => (
          <Pine key={`m-${i}`} x={p.x} y={p.y} h={p.h} fill="#05100f" />
        ))}
      </g>

      {/* Standing stones */}
      {!thumb && (
        <g className="art-layer" style={layerStyle(26, 12, 34)}>
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 250 + i * 76;
            const h = 92 + (i % 3) * 26;
            return (
              <g key={i}>
                <rect x={x} y={470 - h} width="26" height={h} rx="10" fill="#0a1014" stroke="var(--accent)" strokeOpacity="0.22" />
              </g>
            );
          })}
          <ellipse cx="402" cy="486" rx="230" ry="26" fill="var(--accent)" opacity="0.1" filter={`url(#${id}-soft)`} />
        </g>
      )}

      {/* Embers */}
      <g className="art-layer" style={layerStyle(18, 10, 60)}>
        {embers.map((e, i) => (
          <circle
            key={`${id}-ember-${i}`}
            cx={e.x}
            cy={e.y}
            r={e.r}
            fill="var(--accent)"
            opacity={e.o}
            className="art-ember"
            style={{ animationDelay: `${e.d}ms`, animationDuration: `${e.dur}ms` }}
          />
        ))}
      </g>

      <g className="art-layer" style={layerStyle(4, 2, 8)}>
        {mist.map((m, i) => (
          <ellipse
            key={`${id}-mist-${i}`}
            cx={m.x}
            cy={m.y}
            rx={m.rx}
            ry="20"
            fill="var(--accent2)"
            opacity="0.14"
            className="art-mist"
            style={{ animationDelay: `${m.d}ms`, animationDuration: `${m.dur}ms` }}
          />
        ))}
        <path d="M 0 500 L 1200 486 L 1200 600 L 0 600 Z" fill="#040a09" />
      </g>
    </>
  );
}

/** Static pine layout — built once per module so it is stable across every render. */
let pineCache = null;
function getPineLayout() {
  if (pineCache) return pineCache;
  const rng = createRng('pines');
  const build = (count, baseY, minH, maxH) =>
    Array.from({ length: count }, () => ({
      x: rng.int(-40, VB_W + 40),
      y: baseY + rng.int(-14, 14),
      h: rng.int(minH, maxH),
    }));
  pineCache = {
    far: build(26, 470, 80, 150),
    mid: build(16, 496, 140, 230),
  };
  return pineCache;
}

/* ───────────────────────────── Cybercrime ───────────────────────────── */

function CyberScene({ id, stars, rain, thumb }) {
  const buildings = getBuildingLayout();
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04070a" />
          <stop offset="60%" stopColor="var(--deep)" />
          <stop offset="100%" stopColor="#0a0f0b" />
        </linearGradient>
        <pattern id={`${id}-win`} width="18" height="22" patternUnits="userSpaceOnUse">
          <rect width="6" height="8" x="3" y="4" fill="var(--accent)" opacity="0.5" />
          <rect width="4" height="6" x="12" y="13" fill="var(--accent2)" opacity="0.34" />
        </pattern>
        <pattern id={`${id}-win2`} width="22" height="26" patternUnits="userSpaceOnUse">
          <rect width="7" height="9" x="4" y="6" fill="var(--accent2)" opacity="0.4" />
          <rect width="4" height="5" x="15" y="16" fill="var(--accent)" opacity="0.3" />
        </pattern>
        <linearGradient id={`${id}-tower`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1410" />
          <stop offset="100%" stopColor="#04070a" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill={`url(#${id}-sky)`} />

      <Starfield stars={stars} prefix={id} />

      <g className="art-layer" style={layerStyle(-40, -24, -70)}>
        <ellipse cx="600" cy="330" rx="520" ry="200" fill={`url(#${id}-glow)`} filter={`url(#${id}-soft)`} />
      </g>

      {/* Skyline */}
      <g className="art-layer" style={layerStyle(10, 5, 16)}>
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={600 - b.y} fill={`url(#${id}-tower)`} />
            <rect x={b.x} y={b.y} width={b.w} height={600 - b.y} fill={`url(#${i % 2 ? `${id}-win2` : `${id}-win`})`} opacity="0.75" />
            {b.sign && (
              <rect
                x={b.x + b.w - 12}
                y={b.y + 40}
                width="5"
                height={b.sign}
                fill={i % 2 ? 'var(--accent2)' : 'var(--accent)'}
                className="art-sign"
                style={{ animationDelay: `${i * 380}ms` }}
              />
            )}
            {b.mast && <rect x={b.x + b.w / 2 - 2} y={b.y - 54} width="4" height="54" fill="#0a1210" />}
            {b.mast && (
              <circle cx={b.x + b.w / 2} cy={b.y - 58} r="3.5" fill="var(--accent2)" className="art-blink" />
            )}
          </g>
        ))}
      </g>

      {/* Cables */}
      {!thumb && (
        <g className="art-layer" style={layerStyle(22, 10, 26)}>
          <path d="M 0 120 Q 300 190 620 130 T 1200 150" fill="none" stroke="#0d1a14" strokeWidth="3" />
          <path d="M 0 168 Q 340 240 660 178 T 1200 200" fill="none" stroke="#0b1712" strokeWidth="2" />
        </g>
      )}

      {/* Rain + light streaks */}
      <g className="art-layer" style={layerStyle(18, 26, 96)}>
        {rain.map((r, i) => (
          <line
            key={`${id}-rain-${i}`}
            x1={r.x}
            y1={r.y}
            x2={r.x - 2}
            y2={r.y + r.len}
            stroke="var(--accent)"
            strokeOpacity="0.26"
            strokeWidth="1.1"
            className="art-rain"
            style={{ animationDelay: `${r.d}ms`, animationDuration: `${r.dur}ms` }}
          />
        ))}
      </g>

      <g className="art-layer" style={layerStyle(6, 3, 10)}>
        <rect x="0" y="500" width={VB_W} height="100" fill="#04070a" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={120 + i * 380}
            y={524 + i * 14}
            width={170}
            height="3"
            rx="1.5"
            fill={i % 2 ? 'var(--accent2)' : 'var(--accent)'}
            opacity="0.45"
            filter={`url(#${id}-soft)`}
            className="art-streak"
            style={{ animationDelay: `${i * 1200}ms` }}
          />
        ))}
      </g>
    </>
  );
}

let buildingCache = null;
function getBuildingLayout() {
  if (buildingCache) return buildingCache;
  const rng = createRng('skyline');
  let x = -60;
  const out = [];
  while (x < VB_W + 40) {
    const w = rng.int(70, 150);
    const y = rng.int(190, 400);
    out.push({
      x,
      y,
      w,
      sign: rng.chance(0.45) ? rng.int(50, 130) : 0,
      mast: rng.chance(0.3),
    });
    x += w + rng.int(6, 22);
  }
  buildingCache = out;
  return out;
}

/* ───────────────────────────── dispatcher ───────────────────────────── */

export default function SceneArt({
  genreId = 'scifi',
  variant = 'panel',
  mood = 'arrival',
  allyCount = 0,
  clueCount = 0,
  className = '',
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = `art-${genreId}-${variant}-${uid}`;

  const data = useMemo(() => {
    const rng = createRng('art', genreId, variant);
    return {
      stars: Array.from({ length: variant === 'thumb' ? 26 : 60 }, () => ({
        x: rng.int(0, VB_W),
        y: rng.int(0, 420),
        r: (rng.int(5, 18) / 10).toFixed(1),
        o: (rng.int(22, 85) / 100).toFixed(2),
        d: rng.int(0, 6000),
        dur: rng.int(2600, 7000),
      })),
      rain: Array.from({ length: variant === 'thumb' ? 24 : 110 }, () => ({
        x: rng.int(-40, VB_W + 40),
        y: rng.int(-200, 460),
        len: rng.int(18, 46),
        d: rng.int(0, 2200),
        dur: rng.int(700, 1600),
      })),
      embers: Array.from({ length: variant === 'thumb' ? 12 : 34 }, () => ({
        x: rng.int(0, VB_W),
        y: rng.int(240, 560),
        r: (rng.int(8, 26) / 10).toFixed(1),
        o: (rng.int(30, 85) / 100).toFixed(2),
        d: rng.int(0, 5000),
        dur: rng.int(4200, 9000),
      })),
      mist: Array.from({ length: 5 }, () => ({
        x: rng.int(0, VB_W),
        y: rng.int(380, 520),
        rx: rng.int(180, 420),
        d: rng.int(0, 6000),
        dur: rng.int(9000, 18000),
      })),
    };
  }, [genreId, variant]);

  const Scene =
    genreId === 'mystery'
      ? MysteryScene
      : genreId === 'fantasy'
        ? FantasyScene
        : genreId === 'cybercrime'
          ? CyberScene
          : ScifiScene;

  return (
    <svg
      className={`scene-art scene-art--${variant} ${className}`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={
        {
          scifi: 'A derelict station silhouetted against a planet and a starfield',
          mystery: 'A manor house at night in the rain, windows lit',
          fantasy: 'A moonlit forest with standing stones and rising embers',
          cybercrime: 'A neon city skyline in the rain at night',
        }[genreId] || 'Story artwork'
      }
    >
      <Scene id={id} stars={data.stars} rain={data.rain} embers={data.embers} mist={data.mist} thumb={variant === 'thumb'} />
      {variant === 'panel' && (
        <MoodLayer key={mood} id={id} mood={mood} allyCount={allyCount} clueCount={clueCount} />
      )}
      <rect width={VB_W} height={VB_H} fill="none" />
    </svg>
  );
}
