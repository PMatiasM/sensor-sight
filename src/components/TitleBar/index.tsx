import { CSSProperties } from "react";
import { Button } from "primereact/button";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { useDialogController } from "../../hooks/useDialogController";
import PreventClosingModal from "../PreventClosingDialog";

declare const window: ElectronWindow;

export default function TitleBar() {
  const { connection } = useExperiment();
  const preventClosingModal = useDialogController();
  return (
    <div
      className="card flex justify-content-between align-items-center border-noround p-0 m-0 w-full h-2rem"
      style={{ WebkitAppRegion: "drag" } as CSSProperties}
    >
      <div className="w-1 h-full" />
      <div className="flex justify-content-center align-items-center w-10 h-full">
        <span className="text-sm">Sensor Sight</span>
      </div>
      <div
        className="flex justify-content-center align-items-center w-1 h-full"
        style={{ WebkitAppRegion: "no-drag" } as CSSProperties}
      >
        <Button
          text
          className="flex justify-content-center align-items-center text-color border-noround hover:surface-200 focus:shadow-none p-0 w-6 h-full"
          icon="pi pi-minus"
          severity="secondary"
          onClick={window.electronAPI.minimize}
        />
        <Button
          text
          className="flex justify-content-center align-items-center text-color border-noround hover:bg-red-600 focus:shadow-none p-0 w-6 h-full"
          icon="pi pi-times"
          severity="danger"
          onClick={() =>
            connection ? preventClosingModal.open() : window.electronAPI.close()
          }
        />
      </div>
      <PreventClosingModal preventClosing={preventClosingModal} />
    </div>
  );
}
