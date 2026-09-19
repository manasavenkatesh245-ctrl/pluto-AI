/**
 * Deterministic randomness helpers + random seed generation.
 *
 * Pluto needs two kinds of randomness:
 *  1. A fresh, human-readable "seed" per run (setting / stakes / twist bias) so
 *     repeat playthroughs differ materially — this is the replayability test in Phase 8.
 *  2. A *stable* PRNG keyed off that seed, so a scene that has already been generated
 *     does not change when React re-renders. Same seed + same round => same scene.
 */

/** mulberry32 — small, fast, good enough for storytelling. */
export function mulberry32(a) {
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a string hash so any seed string maps to a stable 32-bit integer. */
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A seeded random helper with the few helpers the story engine actually needs. */
export function createRng(...parts) {
  const rand = mulberry32(hashString(parts.join('::')));
  return {
    next: rand,
    int: (min, max) => min + Math.floor(rand() * (max - min + 1)),
    pick: (arr) => arr[Math.floor(rand() * arr.length)],
    /** Pick n distinct items, preserving no particular order. */
    sample: (arr, n) => {
      const pool = [...arr];
      const out = [];
      while (out.length < n && pool.length) {
        out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
      }
      return out;
    },
    chance: (p) => rand() < p,
    sign: () => (rand() < 0.5 ? -1 : 1),
  };
}

const SEED_ADJECTIVES = [
  'Quiet', 'Cold', 'Last', 'Borrowed', 'Unlisted', 'Second', 'Drowned', 'Patient',
  'Unpaid', 'Narrow', 'Unsent', 'Long', 'Grey', 'Unmarked', 'Final', 'Honest',
];

const SEED_NOUNS = [
  'Hour', 'Signal', 'Ledger', 'Witness', 'Door', 'Debt', 'Favour', 'Margin',
  'Alibi', 'Uptime', 'Bargain', 'Archive', 'Night', 'Receipt', 'Passage', 'Version',
];

/**
 * Build a seed object for a run. Everything the local engine and the AI prompt need
 * to make this playthrough feel specific rather than generic.
 */
export function generateSeed(genreId, salt = '') {
  const rng = createRng('pluto-seed', genreId, salt, String(Date.now()), String(Math.random()));
  const code = `${rng.pick(SEED_ADJECTIVES)} ${rng.pick(SEED_NOUNS)}`;
  return {
    id: `${genreId}-${hashString(`${code}-${salt}-${rng.int(0, 1e6)}`).toString(36)}`,
    code,
    number: hashString(`${code}${genreId}${salt}`) % 9000 + 999,
    // Bias values the prompt and the local engine both read.
    bias: {
      pace: rng.pick(['slow-burn', 'relentless', 'elliptical']),
      morality: rng.pick(['grey', 'greyer', 'almost-clean']),
      twistStyle: rng.pick(['betrayal', 'mistaken identity', 'forced hand', 'reversed debt']),
    },
    createdAt: new Date().toISOString(),
  };
}

/** Ambiguous reference, so a scene counts as "materially different" if it changes. */
export function seedSignature(seed) {
  if (!seed) return '';
  return `${seed.code}#${seed.number}`;
}
