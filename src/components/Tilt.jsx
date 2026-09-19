import { useCallback, useRef } from 'react';

/**
 * Subtle 3D tilt/perspective on hover and touch, driven by CSS custom properties.
 * Kept tiny deliberately — the depth effect should support the story, not perform.
 */
export default function Tilt({ children, className = '', max = 7, as = 'div', ...rest }) {
  const Tag = /** @type {any} */ (as);
  const ref = useRef(/** @type {any} */ (null));

  const handleMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`);
      node.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`);
      node.style.setProperty('--glow-x', `${(px * 50 + 50).toFixed(1)}%`);
      node.style.setProperty('--glow-y', `${(py * 50 + 50).toFixed(1)}%`);
    },
    [max],
  );

  const handleLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--tilt-x', '0deg');
    node.style.setProperty('--tilt-y', '0deg');
  }, []);

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
