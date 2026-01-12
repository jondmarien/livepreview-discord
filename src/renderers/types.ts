import { ComponentType } from "react";

export interface RendererProps {
  content: string;
  className?: string; // For additional styling if needed
}

export type IRenderer = ComponentType<RendererProps>;
