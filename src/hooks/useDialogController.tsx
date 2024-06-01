import { useState } from "react";
import { DialogController } from "../types/DialogController";

export function useDialogController(): DialogController {
  const [visible, setvisible] = useState<boolean>(false);

  const open = () => {
    setvisible(true);
  };
  const close = () => {
    setvisible(false);
  };

  return { visible, open, close };
}
