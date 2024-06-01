import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { useDialogController } from "../../hooks/useDialogController";
import BluetoothDialog from "../../components/BluetoothDialog";
import SerialDialog from "../../components/SerialDialog";
import NetworkDialog from "../../components/NetworkDialog";

declare const window: ElectronWindow;

export default function Connection() {
  const navigate = useNavigate();
  const { config } = useConfig();
  const { experiment } = useExperiment();
  const [bluetoothAvailable, setBluetoothAvailable] = useState(false);
  const bluetoothDialog = useDialogController();
  const networkDialog = useDialogController();
  const serialDialog = useDialogController();

  useEffect(() => {
    !experiment && navigate("/experiments");
    navigator.bluetooth.getAvailability().then((available) => {
      setBluetoothAvailable(available);
    });
  }, []);

  return (
    <div className="flex justify-content-center align-items-center w-full h-full p-6">
      <div className="card flex flex-column justify-content-start align-items-center w-8 h-full">
        <div className="flex justify-content-between align-items-center w-full mt-1 mb-3">
          <Button
            className="p-2"
            outlined
            onClick={() => navigate("/experiments")}
          >
            <i className="pi pi-arrow-left text-xl" />
          </Button>
        </div>
        <div className="flex flex-1 flex-column justify-content-evenly align-items-center w-full">
          <i className="pi pi-wifi text-8xl" />
          <div className="flex flex-column align-items-center w-full">
            <Button
              className="flex justify-content-center align-items-center w-5 my-2"
              outlined
              onClick={async () => {
                bluetoothDialog.open();
                await navigator.bluetooth.requestDevice({
                  acceptAllDevices: true,
                  optionalServices: [config!.bluetooth.primaryService],
                });
              }}
              disabled={!bluetoothAvailable}
            >
              <span className="text-xl">Bluetooth</span>
            </Button>
            <Button
              className="flex justify-content-center align-items-center w-5 my-2"
              outlined
              onClick={async () => {
                networkDialog.open();
              }}
            >
              <span className="text-xl">Network</span>
            </Button>
            <Button
              className="flex justify-content-center align-items-center w-5 my-2"
              outlined
              onClick={async () => {
                serialDialog.open();
                window.electronAPI.getSerialPortList();
              }}
            >
              <span className="text-xl">Serial</span>
            </Button>
          </div>
        </div>
      </div>
      <BluetoothDialog bluetoothDialog={bluetoothDialog} />
      <NetworkDialog networkDialog={networkDialog} />
      <SerialDialog serialDialog={serialDialog} />
    </div>
  );
}
