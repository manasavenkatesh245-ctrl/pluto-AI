import { useMemo } from 'react';

import { createRng } from '../engine/seed.js';

/**
 * Skeleton/shimmer loading UI.
 *
 * Sized to roughly match the expected scene length rather than showing a generic
 * spinner — the screen should never look frozen or empty while a scene generates.
 */
export default function Skeleton({ seed = 'skeleton', lines = 5, showOptions = true }) {
  const widths = useMemo(() => {
    const rng = createRng('skeleton', seed);
    return Array.from({ length: lines }, (_, i) => {
      if (i === lines - 1) return 42 + rng.int(0, 22);
      return 78 + rng.int(0, 20);
    });
  }, [seed, lines]);

  return (
    <div className="skeleton" aria-live="polite" aria-busy="true">
      <span className="sr-only">Generating the next scene…</span>
      <div className="skeleton-text">
        {widths.map((w, i) => (
          <span key={i} className="skeleton-line" style={{ width: `${Math.min(w, 100)}%` }} />
        ))}
      </div>
      {showOptions && (
        <div className="skeleton-options">
          {[0, 1, 2].map((i) => (
            <span key={i} className="skeleton-option" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      )}
    </div>
  );
}
