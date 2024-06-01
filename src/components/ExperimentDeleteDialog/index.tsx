import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { DialogController } from "../../types/DialogController";

declare const window: ElectronWindow;

export default function ExperimentDeleteDialog({
  experimentDeleteDialog,
}: {
  experimentDeleteDialog: DialogController;
}) {
  const { experiment } = useExperiment();
  const cancel = () => experimentDeleteDialog.close();
  return (
    <Dialog
      visible={experimentDeleteDialog.visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Are you sure?"
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <>
          <Button label="No" severity="secondary" onClick={cancel} />
          <Button
            label="Yes"
            severity="danger"
            onClick={() => {
              experiment && window.electronAPI.deleteExperiment(experiment.id);
              cancel();
            }}
          />
        </>
      )}
    >
      Do you really want to delete this experiment?
    </Dialog>
  );
}
