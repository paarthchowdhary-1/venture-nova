"use client";

import { useEffect, useState } from "react";
import { CONFETTI_COLORS, seeded } from "~/components/confetti";

type Piece = {
  id: string;
  color: string;
  left: number;
  sway: number;
  rot: number;
  size: number;
  round: boolean;
  delay: number;
  duration: number;
};

const COUNT = 230;

function makePieces(): Piece[] {
  const random = seeded(20261011);
  return Array.from({ length: COUNT }, (_, i) => ({
    id: `r${i}`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: Math.round(random() * 1000) / 10,
    sway: Math.round((random() - 0.5) * 220),
    rot: Math.round((random() - 0.5) * 1600),
    size: Math.round(8 + random() * 9),
    round: i % 3 === 0,
    delay: Math.round(random() * 3200),
    duration: Math.round(3200 + random() * 2400),
  }));
}

/**
 * Confetti raining down over the whole screen from the top, a little at a
 * time for a few seconds. Decorative only: it ignores clicks and removes
 * itself once the last piece has fallen.
 */
export function ConfettiRain() {
  const [pieces] = useState(makePieces);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 9500);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti-rain"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.5,
              borderRadius: p.round ? "9999px" : "2px",
              backgroundColor: p.color,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.duration}ms`,
              "--sway": `${p.sway}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
