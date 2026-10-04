import { Fragment, type ReactNode } from "react";

type Token = { id: number; kind: "text" | "bold" | "italic"; value: string };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      tokens.push({
        id: cursor,
        kind: "text",
        value: text.slice(cursor, start),
      });
    }
    if (match[1] !== undefined) {
      tokens.push({ id: start, kind: "bold", value: match[1] });
    } else {
      tokens.push({ id: start, kind: "italic", value: match[2] ?? "" });
    }
    cursor = start + match[0].length;
  }
  if (cursor < text.length) {
    tokens.push({ id: cursor, kind: "text", value: text.slice(cursor) });
  }
  return tokens;
}

function Inline({ text }: { text: string }) {
  return (
    <>
      {tokenize(text).map((token) => {
        if (token.kind === "bold") {
          return (
            <strong key={token.id} className="font-semibold text-foreground">
              {token.value}
            </strong>
          );
        }
        if (token.kind === "italic") {
          return <em key={token.id}>{token.value}</em>;
        }
        return <Fragment key={token.id}>{token.value}</Fragment>;
      })}
    </>
  );
}

type Block = { id: number; node: ReactNode };

export function LessonReading({ text }: { text: string }) {
  const blocks: Block[] = [];
  let offset = 0;

  for (const raw of text.split(/\n{2,}/)) {
    const id = offset;
    offset += raw.length + 2;
    const block = raw.trim();
    if (!block) continue;
    const lines = block.split("\n");

    if (block.startsWith("## ")) {
      blocks.push({
        id,
        node: (
          <h3 className="mt-8 text-lg font-semibold text-foreground">
            <Inline text={block.slice(3)} />
          </h3>
        ),
      });
    } else if (block.startsWith("> ")) {
      blocks.push({
        id,
        node: (
          <blockquote className="rounded-lg border-l-4 border-primary bg-tint px-4 py-3 text-foreground">
            <Inline text={lines.map((l) => l.replace(/^> ?/, "")).join(" ")} />
          </blockquote>
        ),
      });
    } else if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({
        id,
        node: (
          <ul className="flex list-disc flex-col gap-2 pl-6">
            {lines.map((line) => (
              <li key={line}>
                <Inline text={line.slice(2)} />
              </li>
            ))}
          </ul>
        ),
      });
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      blocks.push({
        id,
        node: (
          <ol className="flex list-decimal flex-col gap-2 pl-6">
            {lines.map((line) => (
              <li key={line}>
                <Inline text={line.replace(/^\d+\. /, "")} />
              </li>
            ))}
          </ol>
        ),
      });
    } else {
      blocks.push({
        id,
        node: (
          <p>
            <Inline text={lines.join(" ")} />
          </p>
        ),
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
      {blocks.map((block) => (
        <Fragment key={block.id}>{block.node}</Fragment>
      ))}
    </div>
  );
}
