import { FileTypeInfo } from "../types";

const supportedTypes: Record<string, FileTypeInfo> = {
  ".md": {
    extension: ".md",
    mimeType: "text/markdown",
    displayName: "Markdown",
    icon: "markdown",
    isSupported: true,
    type: "Markdown",
  },
  ".txt": {
    extension: ".txt",
    mimeType: "text/plain",
    displayName: "Text",
    icon: "text",
    isSupported: true,
    type: "Text",
  },
  ".json": {
    extension: ".json",
    mimeType: "application/json",
    displayName: "JSON",
    icon: "json",
    isSupported: true,
    type: "JSON",
  },
  ".yaml": {
    extension: ".yaml",
    mimeType: "text/yaml",
    displayName: "YAML",
    icon: "yaml",
    isSupported: true,
    type: "YAML",
  },
  ".yml": {
    extension: ".yaml",
    mimeType: "text/yaml",
    displayName: "YAML",
    icon: "yaml",
    isSupported: true,
    type: "YAML",
  },
  ".log": {
    extension: ".log",
    mimeType: "text/plain",
    displayName: "Log",
    icon: "log",
    isSupported: true,
    type: "Log",
  },
};

export function detectFileType(
  filename: string,
  mimeType?: string
): FileTypeInfo {
  // 1. Extract extension
  const lastDotIndex = filename.lastIndexOf(".");
  let extension = "";
  if (
    lastDotIndex !== -1 &&
    lastDotIndex !== 0 &&
    lastDotIndex !== filename.length - 1
  ) {
    extension = filename.substring(lastDotIndex).toLowerCase();
  }

  // 2. Map extension
  if (extension && supportedTypes[extension]) {
    return supportedTypes[extension];
  }

  // 3. Fallback to MIME type
  if (mimeType) {
    if (mimeType === "text/markdown") return supportedTypes[".md"];
    if (mimeType === "application/json") return supportedTypes[".json"];
    if (mimeType === "text/yaml" || mimeType === "application/x-yaml")
      return supportedTypes[".yaml"];
    if (mimeType.startsWith("text/")) return supportedTypes[".txt"];
  }

  // 4. Default
  return {
    extension: extension || ".txt",
    mimeType: mimeType || "text/plain",
    displayName: "Text",
    icon: "text",
    isSupported: false,
    type: "Text",
  };
}
