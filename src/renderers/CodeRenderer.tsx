import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import { RendererProps } from "./types";
import { useMemo } from "react";

interface CodeRendererProps extends RendererProps {
  language: "json" | "yaml";
}

export function CodeRenderer({
  content,
  language,
  className,
}: CodeRendererProps) {
  const highlighted = useMemo(() => {
    let formatted = content;
    if (language === "json") {
      try {
        // Try format if valid JSON
        const obj = JSON.parse(content);
        formatted = JSON.stringify(obj, null, 2);
      } catch (e) {
        // Fallback to raw if invalid
      }
    }

    return Prism.highlight(
      formatted,
      Prism.languages[language] || Prism.languages.plain,
      language
    );
  }, [content, language]);

  return (
    <pre
      className={`vc-code-preview ${className || ""}`}
      style={{
        margin: 0,
        padding: "8px",
        background: "var(--background-secondary)",
        borderRadius: "4px",
        overflowX: "auto",
        fontFamily: "var(--font-code)",
        color: "var(--text-normal)",
      }}
    >
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className={`language-${language}`}
      />
    </pre>
  );
}
