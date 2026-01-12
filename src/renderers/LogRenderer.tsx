import { RendererProps } from "./types";
import { useMemo } from "react";

export function LogRenderer({ content, className }: RendererProps) {
  const lines = useMemo(() => content.split(/\r?\n/), [content]);

  const getLineColor = (line: string) => {
    if (/ERROR|FATAL|CRITICAL/i.test(line)) return "var(--text-danger)";
    if (/WARN/i.test(line)) return "var(--text-warning)";
    if (/INFO/i.test(line)) return "var(--text-positive)"; // or normal
    if (/DEBUG/i.test(line)) return "var(--text-muted)";
    return "var(--text-normal)";
  };

  return (
    <div
      className={`vc-log-preview ${className || ""}`}
      style={{
        fontFamily: "var(--font-code)",
        backgroundColor: "var(--background-secondary)",
        padding: "8px",
        borderRadius: "4px",
        overflowX: "auto",
        whiteSpace: "pre",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ display: "flex" }}>
          <span
            style={{
              minWidth: "3em",
              color: "var(--text-muted)",
              textAlign: "right",
              marginRight: "1em",
              userSelect: "none",
              opacity: 0.5,
            }}
          >
            {i + 1}
          </span>
          <span style={{ color: getLineColor(line) }}>{line}</span>
        </div>
      ))}
    </div>
  );
}
