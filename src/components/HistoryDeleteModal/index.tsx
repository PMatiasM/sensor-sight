import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { closeModal } from "../../common/utils/modalControl";

import { ModalContent, ModalFooter, ModalHeader } from "./styles";

declare const window: ElectronWindow;

export default function HistoryDeleteModal({ id }: { id: string }) {
  return (
    <div
      className="modal fade"
      id="history-delete-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="history-delete-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <ModalContent>
          <ModalHeader>
            <h1 className="modal-title fs-5" id="history-delete-modal-label">
              Are you sure?
            </h1>
          </ModalHeader>
          <div className="modal-body">
            Do you really want to delete this history?
          </div>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              onClick={() => closeModal("history-delete-modal")}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                id && window.electronAPI.deleteData(id);
                closeModal("history-delete-modal");
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
