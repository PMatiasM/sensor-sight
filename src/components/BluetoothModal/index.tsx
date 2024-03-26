import { useEffect, useState } from "react";
import { MdBluetooth } from "react-icons/md";
import { toast } from "react-toastify";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useConnection } from "../../contexts/Connection";
import { ElectronBluetoothDevice } from "../../types/ElectronBluetoothDevice";
import { closeModal } from "../../common/utils/modalControl";
import { CharacteristicEvent } from "../../interfaces/CharacteristicEvent";
import { CONNECTION } from "../../enums/Connection";
import Spinner from "../Spinner";

import { CancelButton, List, ListItem } from "./styles";

declare const window: ElectronWindow;

export default function BluetoothModal() {
  const { config } = useConfig();
  const { connect, parseReading, handleReading, configureDisconnect } =
    useConnection();
  const [devices, setDevices] = useState<ElectronBluetoothDevice[]>([]);
  const [loading, setLoading] = useState(false);

  const getDevice = async (device: ElectronBluetoothDevice) => {
    // Tem como fazer mandando um evento e definindo o nome do dispositivo
    // na classe e fazer igual ao exemplo sem uma lista
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
          handleReading([parseReading(event.target.value)]);
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
    <div
      className="modal fade"
      id="bluetooth-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="bluetooth-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="bluetooth-modal-label">
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
              {devices.map(
                (device) =>
                  !device.deviceName.includes(
                    "Unknown or Unsupported Device"
                  ) && (
                    <ListItem
                      disabled={loading}
                      key={device.deviceId}
                      onClick={async () => {
                        setLoading(true);
                        window.electronAPI.selectBluetoothDevice(
                          device.deviceId
                        );
                        const find = await getDevice(device);
                        if (find && (await connectDevice(find))) {
                          toast.success("Connected");
                        } else {
                          cancel();
                          toast.error("Failed to connect");
                        }
                        setLoading(false);
                        closeModal("bluetooth-modal");
                      }}
                    >
                      <MdBluetooth size="1.5rem" />
                      <span>{device.deviceName}</span>
                    </ListItem>
                  )
              )}
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
