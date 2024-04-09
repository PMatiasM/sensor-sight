import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { closeModal } from "../../common/utils/modalControl";

import { ModalContent, ModalFooter, ModalHeader } from "./styles";

declare const window: ElectronWindow;

export default function ExperimentDeleteModal() {
  const { experiment, destroy } = useExperiment();
  return (
    <div
      className="modal fade"
      id="experiment-delete-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="experiment-delete-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <ModalContent>
          <ModalHeader>
            <h1 className="modal-title fs-5" id="experiment-delete-modal-label">
              Are you sure?
            </h1>
          </ModalHeader>
          <div className="modal-body">
            Do you really want to delete this experiment?
          </div>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              onClick={() => closeModal("experiment-delete-modal")}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                experiment &&
                  window.electronAPI.deleteExperiment(experiment.id);
                destroy();
                closeModal("experiment-delete-modal");
              }}
            >
              Yes
            </button>
          </ModalFooter>
        </ModalContent>
      </div>
    </div>
  );
}
