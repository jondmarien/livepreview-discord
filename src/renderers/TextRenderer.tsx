import { RendererProps } from "./types";

export function TextRenderer({ content, className }: RendererProps) {
  return (
    <pre
      className={`vc-text-preview ${className || ""}`}
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontFamily: "var(--font-code)",
        margin: 0,
        color: "var(--text-normal)",
      }}
    >
      {content}
    </pre>
  );
}
