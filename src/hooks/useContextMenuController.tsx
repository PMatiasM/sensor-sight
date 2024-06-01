import { MouseEvent, useRef } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { ContextMenuController } from "../types/ContextMenuController";

export function useContextMenuController(): ContextMenuController {
  const ref = useRef<ContextMenu | null>(null);
  const open = (event: MouseEvent) => {
    if (ref.current) {
      ref.current.show(event);
    }
  };

  return { ref, open };
}
