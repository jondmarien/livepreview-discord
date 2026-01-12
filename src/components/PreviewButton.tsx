import { Tooltip, React } from "@webpack/common";
import { detectFileType } from "../services/FileTypeDetector";
import { useGlobalState } from "../store/globalState";
import { EyeIcon } from "./EyeIcon";

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

    console.log("[TextFilePreview] Preview requested for", attachment.filename);

    // Trigger loading state
    // In the future, this will initiate the fetch and modal open process
    useGlobalState.setState({ isLoading: true });

    // Simulation for now
    setTimeout(() => {
      useGlobalState.setState({ isLoading: false });
    }, 1000);
  };

  return (
    <div className={className} onClick={handleClick}>
      <Tooltip text={`Preview ${fileInfo.type}`}>
        {(props) => (
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
