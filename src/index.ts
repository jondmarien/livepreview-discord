import definePlugin from "@utils/types";
import { ContentCache } from "./services/ContentCache";

import { contextMenuPatch } from "./patches/ContextMenu";
import {
  addMessageAccessory,
  removeMessageAccessory,
} from "@api/MessageAccessories";
import { PreviewAccessory } from "./components/PreviewAccessory";

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
  start() {
    addMessageAccessory("live-preview", PreviewAccessory);
  },

  stop() {
    removeMessageAccessory("live-preview");
    // Clear cache on plugin stop
    ContentCache.getInstance().clear();
  },

  contextMenus: {
    "message-attachment-context": contextMenuPatch,
  },
});

// Export services for use by other components
export { ContentCache } from "./services/ContentCache";
export { detectFileType } from "./services/FileTypeDetector";
export { useGlobalState } from "./store/globalState";
export * from "./types";
