import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { ModalContent, ModalFooter, ModalHeader } from "./styles";

declare const window: ElectronWindow;

export default function PreventClosingModal() {
  const { disconnect } = useExperiment();
  return (
    <div
      className="modal fade"
      id="prevent-closing-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="prevent-closing-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <ModalContent>
          <ModalHeader>
            <h1 className="modal-title fs-5" id="prevent-closing-modal-label">
              Warning!
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </ModalHeader>
          <div className="modal-body">
            Do you want to save the experiment before closing?
          </div>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={window.electronAPI.close}
            >
              No
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                disconnect();
                window.electronAPI.close();
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
