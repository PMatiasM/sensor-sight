import { ContextMenu } from "primereact/contextmenu";
import { MouseEvent, MutableRefObject } from "react";

export type ContextMenuController = {
  ref: MutableRefObject<ContextMenu | null>;
  open: (event: MouseEvent) => void;
};
