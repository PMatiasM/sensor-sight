import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { DialogController } from "../../types/DialogController";
import { useExperiment } from "../../contexts/Experiment";

declare const window: ElectronWindow;

export default function PreventClosingDialog({
  preventClosing,
}: {
  preventClosing: DialogController;
}) {
  const { disconnect } = useExperiment();
  const cancel = () => preventClosing.close();
  return (
    <Dialog
      visible={preventClosing.visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Warning!"
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <>
          <Button
            label="No"
            severity="secondary"
            onClick={window.electronAPI.close}
          />
          <Button
            label="Yes"
            severity="success"
            onClick={() => {
              disconnect();
              window.electronAPI.close();
            }}
          />
        </>
      )}
    >
      Do you want to save the experiment before closing?
    </Dialog>
  );
}
