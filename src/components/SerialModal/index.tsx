import { useEffect, useState } from "react";
import { MdCable } from "react-icons/md";
import { toast } from "react-toastify";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useConnection } from "../../contexts/Connection";
import { PortInfo } from "../../types/PortInfo";
import { closeModal } from "../../common/utils/modalControl";
import { CONNECTION } from "../../enums/Connection";
import Spinner from "../Spinner";

import { CancelButton, List, ListItem } from "./styles";

declare const window: ElectronWindow;

export default function SerialModal() {
  const { config } = useConfig();
  const { connect, configureDisconnect } = useConnection();
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const cancel = () => {
    setPorts([]);
  };

  useEffect(() => {
    window.electronAPI.serialPortList((_, portList) => {
      setPorts([...portList]);
    });
    window.electronAPI.serialPortConnected((_, connected, path) => {
      if (connected) {
        toast.success("Connected");
        connect(CONNECTION.SERIAL, path);
      } else {
        cancel();
        toast.error("Failed to connect");
      }
      setLoading(false);
      closeModal("serial-modal");
    });
    configureDisconnect(async () => {
      window.electronAPI.disconnectSerialPort();
    });

    return () => {
      window.electronAPI.cleanListeners([
        "serial-port-list",
        "serial-port-connected",
      ]);
    };
  }, []);
  return (
    <div
      className="modal fade"
      id="serial-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="serial-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="serial-modal-label">
              Select a device
            </h1>
            {!loading && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cancel}
              />
            )}
          </div>
          <div className="modal-body">
            <List>
              {ports.map((port) => (
                <ListItem
                  disabled={loading}
                  key={port.path}
                  onClick={async () => {
                    setLoading(true);
                    window.electronAPI.connectSerialPort(
                      port.path,
                      config!.serial.baudRate,
                      config!.serial.delimiter
                    );
                  }}
                >
                  <MdCable size="1.5rem" />
                  <span>{port.path}</span>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="modal-footer">
            <CancelButton
              disabled={loading}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={cancel}
            >
              {loading ? <Spinner /> : "Cancel"}
            </CancelButton>
          </div>
        </div>
      </div>
    </div>
  );
}
