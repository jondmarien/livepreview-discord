import { Tooltip } from "@webpack/common";
import { detectFileType } from "../services/FileTypeDetector";
import { EyeIcon } from "./EyeIcon";
import { PreviewHandler } from "../services/PreviewHandler";
import { ClassAttributes, HTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

interface PreviewButtonProps {
  attachment: any; // Using any for now as Discord types are complex, can be refined later
  className?: string;
}

export function PreviewButton({ attachment, className }: PreviewButtonProps) {
  const fileInfo = detectFileType(attachment.filename);

  if (!fileInfo.isSupported) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    PreviewHandler.getInstance().handlePreview(attachment);
  };

  return (
    <div className={className} onClick={handleClick}>
      <Tooltip text={`Preview ${fileInfo.type}`}>
        {(
          props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLDivElement> &
            HTMLAttributes<HTMLDivElement>
        ) => (
          <div {...props}>
            <EyeIcon
              className="vc-preview-icon"
              style={{
                cursor: "pointer",
                width: "20px",
                height: "20px",
                color: "var(--interactive-normal)",
                // Hover color handling usually done via CSS or parent class
              }}
            />
          </div>
        )}
      </Tooltip>
    </div>
  );
}
