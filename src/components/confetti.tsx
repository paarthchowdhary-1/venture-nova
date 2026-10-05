"use client";

import { useState } from "react";

const COLORS = [
  "oklch(0.55 0.22 273)",
  "oklch(0.7 0.18 22)",
  "oklch(0.76 0.15 165)",
  "oklch(0.82 0.17 78)",
  "oklch(0.6 0.22 305)",
  "oklch(0.74 0.13 230)",
];

type Piece = {
  id: string;
  color: string;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  round: boolean;
  delay: number;
};

/**
 * A small seeded random generator. Using the same numbers on the server and in
 * the browser keeps the confetti identical in both, so React never sees a
 * mismatch when a quiz result is rendered on the server first.
 */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function makePieces(count: number): Piece[] {
  const random = seeded(20261005);
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + random() * 0.5;
    const distance = 140 + random() * 260;
    return {
      id: `c${i}`,
      color: COLORS[i % COLORS.length],
      dx: Math.round(Math.cos(angle) * distance),
      dy: Math.round(Math.sin(angle) * distance + 120),
      rot: Math.round((random() - 0.5) * 900),
      size: Math.round(7 + random() * 7),
      round: i % 3 === 0,
      delay: Math.round(random() * 120),
    };
  });
}

/** A short burst of confetti from the middle of the screen. Decorative only. */
export function Confetti({ count = 46 }: { count?: number }) {
  const [pieces] = useState(() => makePieces(count));
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[38%] left-1/2 animate-confetti"
          style={
            {
              width: p.size,
              height: p.round ? p.size : p.size * 0.5,
              borderRadius: p.round ? "9999px" : "2px",
              backgroundColor: p.color,
              animationDelay: `${p.delay}ms`,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
