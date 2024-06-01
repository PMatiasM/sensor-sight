import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DialogController } from "../../types/DialogController";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useToast } from "../../contexts/Toast";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { PortInfo } from "../../types/PortInfo";
import { CONNECTION } from "../../enums/Connection";

declare const window: ElectronWindow;

export default function SerialDialog({
  serialDialog,
}: {
  serialDialog: DialogController;
}) {
  const toast = useToast();
  const { config } = useConfig();
  const { connect, configureDisconnect } = useExperiment();
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const cancel = () => {
    serialDialog.close();
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
      serialDialog.close();
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
    <Dialog
      visible={serialDialog.visible}
      style={{ width: "24rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Select a device"
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <Button
          label="Cancel"
          severity="secondary"
          loading={loading}
          onClick={cancel}
        />
      )}
    >
      <div className="flex flex-column justify-content-center align-items-center">
        {ports.map((port) => (
          <Button
            className="my-2"
            outlined
            label={port.path}
            icon="pi pi-microchip"
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
          />
        ))}
      </div>
    </Dialog>
  );
}
