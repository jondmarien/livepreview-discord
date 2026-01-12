import { ComponentType } from "react";
import { RendererProps } from "./types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { CodeRenderer } from "./CodeRenderer";
import { TextRenderer } from "./TextRenderer";
import { LogRenderer } from "./LogRenderer";
import { detectFileType } from "../services/FileTypeDetector";

const JsonRenderer = (props: RendererProps) => (
  <CodeRenderer {...props} language="json" />
);
const YamlRenderer = (props: RendererProps) => (
  <CodeRenderer {...props} language="yaml" />
);

const RENDERER_MAP: Record<string, ComponentType<RendererProps>> = {
  ".md": MarkdownRenderer,
  ".json": JsonRenderer,
  ".yaml": YamlRenderer,
  ".yml": YamlRenderer,
  ".log": LogRenderer,
  ".txt": TextRenderer,
};

export class RendererFactory {
  public static getRenderer(filename: string): ComponentType<RendererProps> {
    const fileInfo = detectFileType(filename);
    return RENDERER_MAP[fileInfo.extension] || TextRenderer;
  }
}
