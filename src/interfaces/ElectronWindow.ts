import { Config } from "../types/Config";
import { Data } from "../types/Data";
import { ElectronBluetoothDevice } from "../types/ElectronBluetoothDevice";
import { PortInfo } from "../types/PortInfo";

export interface ElectronWindow extends Window {
  electronAPI: {
    // Main
    getConfig: () => void;
    config: (callback: (event: Event, config: Config) => void) => void;
    updateConfig: (config: Config) => void;
    resetConfig: () => void;
    getData: () => void;
    data: (callback: (event: Event, data: Data[]) => void) => void;
    saveData: (data: Data) => void;
    cleanListeners: (channels: string[]) => void;

    // Bluetooth
    cancelBluetoothRequest: () => void;
    getBluetoothDeviceList: (
      callback: (event: Event, deviceList: ElectronBluetoothDevice[]) => void
    ) => void;
    selectBluetoothDevice: (deviceId: string) => void;

    // Serial
    getSerialPortList: () => void;
    serialPortList: (
      callback: (event: Event, deviceList: PortInfo[]) => void
    ) => void;
    connectSerialPort: (
      path: string,
      baudRate: number,
      delimiter: string
    ) => void;
    serialPortReading: (
      callback: (event: Event, reading: number) => void
    ) => void;
    serialPortConnected: (
      callback: (event: Event, connected: boolean, path: string) => void
    ) => Event;
    disconnectSerialPort: () => void;
  };
}
