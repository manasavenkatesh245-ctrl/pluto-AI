import { useMemo } from 'react';

import { getGenre } from '../engine/genres.js';
import { createRng } from '../engine/seed.js';

/**
 * Layered parallax backdrop.
 *
 * Three depth planes move at different rates: the far field drifts with the pointer,
 * the middle field carries genre colour, and the near plane is a perspective grid that
 * scales as tension rises — the "descending deeper" shift from the UI brief.
 */
export default function Backdrop({ genreId, tension = 0, depth = 0 }) {
  const genre = getGenre(genreId);
  const particles = useMemo(() => {
    const rng = createRng('backdrop', genreId || 'default');
    return Array.from({ length: 26 }, () => ({
      x: rng.int(0, 100),
      y: rng.int(0, 100),
      size: rng.int(1, 3),
      delay: rng.int(0, 9000),
      duration: rng.int(8000, 20000),
      opacity: (rng.int(18, 60) / 100).toFixed(2),
    }));
  }, [genreId]);

  const intensity = Math.max(0, Math.min(1, (tension + 3) / 12));

  return (
    <div className={`backdrop ${genre ? `backdrop--${genreId}` : ''}`} aria-hidden="true">
      <div className="backdrop__far">
        <span className="orb orb--a" />
        <span className="orb orb--b" />
        <span className="orb orb--c" />
      </div>

      <div className="backdrop__mid">
        {particles.map((p, i) => (
          <span
            key={i}
            className="dust"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.duration}ms`,
            }}
          />
        ))}
      </div>

      <div
        className="backdrop__near"
        style={{ transform: `perspective(720px) rotateX(${58 + depth * 6}deg) scale(${1.15 + intensity * 0.35})` }}
      >
        <div className="grid" />
      </div>

      <div className="backdrop__vignette" style={{ opacity: 0.55 + intensity * 0.35 }} />
    </div>
  );
}
