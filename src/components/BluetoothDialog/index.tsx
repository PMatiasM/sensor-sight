import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { CharacteristicEvent } from "../../interfaces/CharacteristicEvent";
import { ElectronBluetoothDevice } from "../../types/ElectronBluetoothDevice";
import { CONNECTION } from "../../enums/Connection";
import { PREFIXES } from "../../enums/Prefixes";
import { PREFIX_LENGTH } from "../../constants";
import { useToast } from "../../contexts/Toast";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { DialogController } from "../../types/DialogController";

declare const window: ElectronWindow;

export default function BluetoothDialog({
  bluetoothDialog,
}: {
  bluetoothDialog: DialogController;
}) {
  const toast = useToast();
  const { config } = useConfig();
  const {
    buffer,
    connect,
    updateTerminal,
    handleReading,
    configureDisconnect,
  } = useExperiment();
  const [devices, setDevices] = useState<ElectronBluetoothDevice[]>([]);
  const [loading, setLoading] = useState(false);

  const getDevice = async (device: ElectronBluetoothDevice) => {
    for (
      let index = 0;
      index < config!.bluetooth.attemptsToFindTheDevice;
      index++
    ) {
      const devices = await navigator.bluetooth.getDevices();
      const find = devices.find((item) => item.name === device.deviceName);
      if (find) {
        return find;
      }
    }
    return null;
  };

  const connectDevice = async (device: BluetoothDevice) => {
    if (device.gatt) {
      try {
        if (device.gatt.connected) {
          return;
        }
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(
          config!.bluetooth.primaryService
        );
        const characteristic = await service.getCharacteristic(
          config!.bluetooth.characteristic
        );
        await characteristic.startNotifications();

        const characteristicvaluechangedCallback = (e: Event) => {
          const event = e as CharacteristicEvent;
          buffer.add(event.target.value);
          if (buffer.isFull()) {
            const reading = buffer.value;
            updateTerminal({ date: new Date(), reading });
            if (reading.substring(0, PREFIX_LENGTH) === PREFIXES.SSD) {
              const parsedReading: number[] = JSON.parse(
                reading.substring(PREFIX_LENGTH)
              );
              handleReading(parsedReading);
            }
            buffer.clean();
          }
        };

        characteristic.addEventListener(
          "characteristicvaluechanged",
          characteristicvaluechangedCallback
        );

        configureDisconnect(async () => {
          characteristic.removeEventListener(
            "characteristicvaluechanged",
            characteristicvaluechangedCallback
          );
          await characteristic.stopNotifications();
          server.disconnect();
          await device.forget();
        });

        connect(CONNECTION.BLUETOOTH, device.name || "");
        return true;
      } catch (error) {
        device.gatt.disconnect();
        await device.forget();
        return false;
      }
    }
  };

  const cancel = () => {
    bluetoothDialog.close();
    setDevices([]);
    window.electronAPI.cancelBluetoothRequest();
  };

  useEffect(() => {
    window.electronAPI.getBluetoothDeviceList((_, deviceList) => {
      setDevices([...deviceList]);
    });
    return () => {
      window.electronAPI.cleanListeners(["get-bluetooth-device-list"]);
    };
  }, []);
  return (
    <Dialog
      visible={bluetoothDialog.visible}
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
        {devices.map(
          (device) =>
            !device.deviceName.includes("Unknown or Unsupported Device") && (
              <Button
                className="my-2"
                outlined
                label={device.deviceName}
                icon="pi pi-microchip"
                disabled={loading}
                key={device.deviceId}
                onClick={async () => {
                  setLoading(true);
                  window.electronAPI.selectBluetoothDevice(device.deviceId);
                  const find = await getDevice(device);
                  if (find && (await connectDevice(find))) {
                    toast.success("Connected");
                  } else {
                    cancel();
                    toast.error("Failed to connect");
                  }
                  setLoading(false);
                  bluetoothDialog.close();
                }}
              />
            )
        )}
      </div>
    </Dialog>
  );
}
