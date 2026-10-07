"use client";

import { useEffect, useState } from "react";

/** "Good morning/afternoon/evening, Name", using the visitor's own clock. */
export function Greeting({ name }: { name: string | null }) {
  const [part, setPart] = useState("Welcome back");

  useEffect(() => {
    const hour = new Date().getHours();
    setPart(
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening",
    );
  }, []);

  return (
    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
      {part}
      {name ? (
        <>
          , <span className="text-gradient">{name}</span>
        </>
      ) : null}
    </h1>
  );
}
