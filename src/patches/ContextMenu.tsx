import { Menu, React } from "@webpack/common";
import { detectFileType } from "../services/FileTypeDetector";
import { PreviewHandler } from "../services/PreviewHandler";
import type { NavContextMenuPatchCallback } from "@api/ContextMenu";

function findInReactTree(tree: any, filter: (node: any) => boolean): any {
  if (!tree) return null;
  if (filter(tree)) return tree;

  if (Array.isArray(tree)) {
    for (const child of tree) {
      if (!child) continue;
      const found = findInReactTree(child, filter);
      if (found) return found;
    }
  } else if (React.isValidElement(tree)) {
    const props = (tree as any).props;
    if (props?.children) {
      return findInReactTree(props.children, filter);
    }
  }

  return null;
}

export const contextMenuPatch: NavContextMenuPatchCallback = (
  children: Array<React.ReactElement | null>,
  ...args: any[]
) => {
  const [props] = args; // Usually props or { attachment, ... }
  const attachment = props?.attachment;

  if (!attachment) return;

  const fileInfo = detectFileType(attachment.filename);
  if (!fileInfo.isSupported) return;

  const previewItem = (
    <Menu.MenuItem
      id="preview-text-file"
      label={`Preview ${fileInfo.type}`}
      action={() => {
        PreviewHandler.getInstance().handlePreview(attachment);
      }}
    />
  );

  const group = findInReactTree(
    children,
    (n: any) => n?.type === Menu.MenuGroup
  );
  if (group) {
    if (Array.isArray(group.props.children)) {
      group.props.children.splice(1, 0, previewItem);
    } else {
      group.props.children = [previewItem, group.props.children];
    }
  } else {
    children.unshift(<Menu.MenuGroup>{previewItem}</Menu.MenuGroup>);
  }
};
