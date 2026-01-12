import definePlugin from "@utils/types";
import { ContentCache } from "./services/ContentCache";

export default definePlugin({
  name: "TextFilePreview",
  description:
    "Preview text text-based file attachments (.md, .txt, .json, .yaml, .log) directly in Discord",
  authors: [
    {
      name: "chron0",
      id: 96714019636785152n,
    },
  ],

  // Initialize services on plugin start
  start() {
    // ContentCache is singleton, no initialization needed
    // State store is already created
  },

  stop() {
    // Clear cache on plugin stop
    ContentCache.getInstance().clear();
    // Reset state if needed, though Zustand store persists in module scope usually
  },
});

// Export services for use by other components
export { ContentCache } from "./services/ContentCache";
export { detectFileType } from "./services/FileTypeDetector";
export { useGlobalState } from "./store/globalState";
export * from "./types";
