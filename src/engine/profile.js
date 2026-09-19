/**
 * Rule-based Explorer Profile.
 *
 * Deterministic by construction: pure arithmetic over the accumulated profileAxis tags.
 * No AI involvement, so the profile is identical whether the session ran on live AI,
 * the local engine, or the scripted fallback path. That is the point of it.
 */

export const AXES = ['bold_cautious', 'lone_social', 'curious_decisive'];

export const AXIS_LABELS = {
  bold_cautious: { positive: 'Bold', negative: 'Cautious', question: 'How you move' },
  lone_social: { positive: 'Solitary', negative: 'Magnetic', question: 'Who you move with' },
  curious_decisive: { positive: 'Curious', negative: 'Decisive', question: 'What you chase' },
};

/** Primary archetypes keyed by the dominant axis and its sign. */
const ARCHETYPES = {
  bold_cautious: {
    positive: {
      title: 'The Ember',
      line: 'You go first. You would rather be wrong at the front of the room than right at the back of it.',
    },
    negative: {
      title: 'The Ledger',
      line: 'You count the cost before you spend it. People mistake that for fear; it is arithmetic.',
    },
  },
  lone_social: {
    positive: {
      title: 'The Lighthouse',
      line: 'You keep your own counsel and shine anyway. Useful in a crisis; hard to reach otherwise.',
    },
    negative: {
      title: 'The Conduit',
      line: 'You collect people the way others collect books, and you are usually right about which ones matter.',
    },
  },
  curious_decisive: {
    positive: {
      title: 'The Magpie',
      line: 'You cannot leave a question alone, even when the sensible move is to walk past it.',
    },
    negative: {
      title: 'The Scalpel',
      line: 'You decide early and commit hard. The room can feel the door close behind your choices.',
    },
  },
};

/** Secondary descriptor from the runner-up axis — adds texture without changing the label. */
function descriptor(axis, value) {
  const labels = AXIS_LABELS[axis];
  return value >= 0 ? labels.positive : labels.negative;
}

const TIERS = [
  { min: 9, label: 'Unrelenting', note: 'You did not hedge once.' },
  { min: 6, label: 'Forged', note: 'Your instincts showed up consistently.' },
  { min: 3, label: 'Rising', note: 'A pattern is forming in how you choose.' },
  { min: 0, label: 'Careful', note: 'You kept your options open to the last minute.' },
];

export function emptyAxes() {
  return { bold_cautious: 0, lone_social: 0, curious_decisive: 0 };
}

/** Add one option's profileAxis tags into the running totals. */
export function applyAxes(axes, delta = {}) {
  const next = { ...emptyAxes(), ...axes };
  AXES.forEach((axis) => {
    const v = Number(delta[axis]);
    if (Number.isFinite(v)) next[axis] = clamp(next[axis] + v, -6, 6);
  });
  return next;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Derive the profile from accumulated axes. Pure function of its input.
 * @param {{bold_cautious:number, lone_social:number, curious_decisive:number}} axes
 */
export function deriveProfile(axes, meta = {}) {
  const normalised = emptyAxes();
  AXES.forEach((axis) => {
    normalised[axis] = Number(axes?.[axis]) || 0;
  });

  const ranked = AXES.map((axis) => ({ axis, value: normalised[axis] })).sort(
    (a, b) => Math.abs(b.value) - Math.abs(a.value),
  );

  const dominant = ranked[0];
  const runnerUp = ranked[1];
  const influence = ranked.reduce((sum, r) => sum + Math.abs(r.value), 0);

  // A genuinely balanced run gets its own honest label rather than a coin-flip archetype.
  const balanced = Math.abs(dominant.value) < 1.5;

  const archetype = balanced
    ? {
        title: 'The Diplomat',
        line: 'You gave every instinct equal time. That is either wisdom or a very disciplined kind of indecision.',
      }
    : ARCHETYPES[dominant.axis][dominant.value >= 0 ? 'positive' : 'negative'];

  const tier = TIERS.find((t) => influence >= t.min) || TIERS[TIERS.length - 1];
  const secondary = descriptor(runnerUp.axis, runnerUp.value);

  return {
    title: archetype.title,
    tier: tier.label,
    tagline: `${tier.label} · ${secondary}`,
    line: archetype.line,
    note: tier.note,
    secondary,
    dominantAxis: balanced ? null : dominant.axis,
    axes: normalised,
    influence,
    readout: AXES.map((axis) => ({
      axis,
      value: normalised[axis],
      label: AXIS_LABELS[axis],
      lean: normalised[axis] === 0 ? 'Even' : descriptor(axis, normalised[axis]),
    })),
    rounds: meta.rounds ?? 0,
    clues: meta.clues ?? [],
    allies: meta.allies ?? [],
    tension: meta.tension ?? 0,
    usingFallback: Boolean(meta.usingFallback),
    mode: meta.mode ?? 'local',
    genre: meta.genre ?? null,
    seedCode: meta.seedCode ?? '—',
  };
}
