"use client";

import { useEffect, useState } from "react";
import { CONFETTI_COLORS, seeded } from "~/components/confetti";

type Piece = {
  id: string;
  color: string;
  x: string;
  y: string;
  dx: number;
  dy: number;
  fall: number;
  rot: number;
  size: number;
  round: boolean;
  delay: number;
};

type Burst = {
  count: number;
  delay: number;
  origin: { x: string; y: string };
  /** Launch angle range in radians. Screen y points down, so up is negative. */
  angle: [number, number];
  distance: [number, number];
};

const CENTER = { x: "50%", y: "38%" };
const BURSTS: Burst[] = [
  // The big explosion, in three waves.
  {
    count: 100,
    delay: 0,
    origin: CENTER,
    angle: [0, Math.PI * 2],
    distance: [260, 640],
  },
  {
    count: 70,
    delay: 260,
    origin: CENTER,
    angle: [0, Math.PI * 2],
    distance: [200, 520],
  },
  {
    count: 50,
    delay: 520,
    origin: CENTER,
    angle: [0, Math.PI * 2],
    distance: [140, 400],
  },
  // Two cannons from the bottom corners, aimed at the middle.
  {
    count: 45,
    delay: 140,
    origin: { x: "0%", y: "100%" },
    angle: [-1.45, -0.75],
    distance: [380, 880],
  },
  {
    count: 45,
    delay: 140,
    origin: { x: "100%", y: "100%" },
    angle: [-2.4, -1.7],
    distance: [380, 880],
  },
];

function makePieces(): Piece[] {
  const random = seeded(20261011);
  const pieces: Piece[] = [];
  BURSTS.forEach((burst, b) => {
    for (let i = 0; i < burst.count; i++) {
      const angle =
        burst.angle[0] + random() * (burst.angle[1] - burst.angle[0]);
      const distance =
        burst.distance[0] + random() * (burst.distance[1] - burst.distance[0]);
      pieces.push({
        id: `b${b}-${i}`,
        color: CONFETTI_COLORS[(i + b) % CONFETTI_COLORS.length],
        x: burst.origin.x,
        y: burst.origin.y,
        dx: Math.round(Math.cos(angle) * distance),
        dy: Math.round(Math.sin(angle) * distance),
        fall: Math.round(220 + random() * 260),
        rot: Math.round((random() - 0.5) * 1400),
        size: Math.round(8 + random() * 10),
        round: i % 3 === 0,
        delay: burst.delay + Math.round(random() * 140),
      });
    }
  });
  return pieces;
}

const RINGS = [
  { delay: 0, color: "oklch(0.55 0.22 273 / 0.55)" },
  { delay: 160, color: "oklch(0.82 0.17 78 / 0.6)" },
  { delay: 320, color: "oklch(0.6 0.22 305 / 0.5)" },
];

/**
 * A full-screen celebration: a bright flash, shockwave rings, a giant 💥, and
 * waves of confetti that burst from the middle and shoot from both bottom
 * corners before falling. It is decorative, ignores clicks, and removes itself
 * after a few seconds.
 */
export function Boom() {
  const [pieces] = useState(makePieces);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 4600);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="absolute top-[38%] left-1/2 size-[70vmin] animate-boom-flash rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.99 0.04 90) 0%, oklch(0.85 0.17 78 / 0.55) 40%, transparent 70%)",
        }}
      />
      {RINGS.map((ring) => (
        <div
          key={ring.delay}
          className="absolute top-[38%] left-1/2 size-[130vmax] animate-boom-ring rounded-full border-[10px]"
          style={{ borderColor: ring.color, animationDelay: `${ring.delay}ms` }}
        />
      ))}
      <div className="absolute top-[38%] left-1/2 animate-boom-emoji text-[9rem] leading-none sm:text-[13rem]">
        💥
      </div>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute animate-boom-piece opacity-0"
          style={
            {
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.round ? p.size : p.size * 0.5,
              borderRadius: p.round ? "9999px" : "2px",
              backgroundColor: p.color,
              animationDelay: `${p.delay}ms`,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--fall": `${p.fall}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
