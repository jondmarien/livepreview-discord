import type { Message, MessageAttachment } from "@vencord/discord-types";
import { detectFileType } from "../services/FileTypeDetector";
import { PreviewButton } from "./PreviewButton";
import { LoadingOverlay } from "./LoadingOverlay";
import { useGlobalState } from "../store/globalState";

export const PreviewAccessory = (props: any) => {
  const { message } = props;
  if (!message || !message.attachments || message.attachments.length === 0) {
    return null;
  }

  const supportedAttachments = message.attachments.filter(
    (att: MessageAttachment) => {
      return detectFileType(att.filename).isSupported;
    }
  );

  if (supportedAttachments.length === 0) {
    return null;
  }

  const isLoading = useGlobalState((state) => state.isLoading);

  return (
    <div
      className="live-preview-accessory"
      style={{
        display: "flex",
        gap: "8px",
        marginTop: "4px",
        position: "relative",
      }}
    >
      {isLoading && <LoadingOverlay />}
      {supportedAttachments.map((att: MessageAttachment) => (
        <div
          key={att.id}
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Preview {att.filename}:
          </span>
          <PreviewButton attachment={att} />
        </div>
      ))}
    </div>
  );
};
