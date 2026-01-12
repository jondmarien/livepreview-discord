import { marked } from "marked";
import DOMPurify from "dompurify";
import { RendererProps } from "./types";

export function MarkdownRenderer({ content, className }: RendererProps) {
  // Basic synchronous rendering. In a real scenario, consider async or memoization if heavy.
  // marked.parse is synchronous by default.
  const rawHtml = marked.parse(content, { async: false }) as string;
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      className={`vc-markdown-preview markdown-container ${className || ""}`}
      // Vencord/Discord usually has global styles for markdown-container
      // Sanitized via DOMPurify
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      style={{
        color: "var(--text-normal)",
        userSelect: "text",
      }}
    />
  );
}
