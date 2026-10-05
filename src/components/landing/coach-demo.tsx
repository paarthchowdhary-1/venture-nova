"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type Message = {
  from: "founder" | "coach";
  text: string;
};

const script: Message[] = [
  {
    from: "founder",
    text: "I want to build an app that helps high schoolers find study partners.",
  },
  {
    from: "coach",
    text: "Got it — who specifically struggles with this most? Which students, which classes?",
  },
  { from: "founder", text: "Probably students in AP classes." },
  {
    from: "coach",
    text: "Why would they use your app instead of just texting their existing group chat?",
  },
  { from: "founder", text: "...because it's easier?" },
  {
    from: "coach",
    text: "What evidence do you have that finding a study partner is actually hard for them? Before we build anything, let's interview 5 AP students and find out.",
  },
];

function ChatBody() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    function step(index: number) {
      if (cancelled || index >= script.length) {
        if (!cancelled) setIsTyping(false);
        return;
      }
      setIsTyping(true);
      const delay = index === 0 ? 400 : 900;
      setTimeout(() => {
        if (cancelled) return;
        setIsTyping(false);
        setVisibleCount(index + 1);
        setTimeout(() => step(index + 1), 500);
      }, delay);
    }

    step(0);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  });

  const done = visibleCount >= script.length && !isTyping;

  return (
    <>
      <div
        ref={scrollRef}
        className="flex h-72 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {script.slice(0, visibleCount).map((message) => (
          <div
            key={message.text}
            className={cn(
              "flex",
              message.from === "founder" ? "justify-end" : "justify-start",
            )}
          >
            <p
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                message.from === "founder"
                  ? "rounded-br-sm bg-brand-gradient text-primary-foreground"
                  : "rounded-bl-sm bg-secondary text-secondary-foreground",
              )}
            >
              {message.text}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <span className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-2">
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </span>
          </div>
        )}
      </div>
      {done && (
        <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          This is what makes VentureNova different from a chatbot: it remembers
          the venture and pushes back on weak assumptions.
        </p>
      )}
    </>
  );
}

export function CoachDemo() {
  const [playId, setPlayId] = useState(0);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-xl shadow-primary/15">
      <div className="flex items-center justify-between border-b border-border bg-linear-to-r from-secondary to-grape-soft px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-semibold text-primary-foreground">
            VN
          </span>
          <span className="text-sm font-medium">VentureNova AI Coach</span>
        </div>
        <button
          type="button"
          onClick={() => setPlayId((n) => n + 1)}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Replay
        </button>
      </div>
      <ChatBody key={playId} />
    </div>
  );
}
