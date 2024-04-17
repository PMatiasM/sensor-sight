import { Config } from "../types/Config";
import { Data } from "../types/Data";
import { ElectronBluetoothDevice } from "../types/ElectronBluetoothDevice";
import { Experiment } from "../types/Experiment";
import { PortInfo } from "../types/PortInfo";

export interface ElectronWindow extends Window {
  electronAPI: {
    // Main
    minimize: () => void;
    close: () => void;
    cleanListeners: (channels: string[]) => void;

    // Database
    // Config
    getConfig: () => void;
    config: (callback: (event: Event, config: Config) => void) => void;
    updateConfig: (config: Config) => void;
    resetConfig: () => void;
    // Experiment
    getExperiment: () => void;
    experiment: (
      callback: (
        event: Event,
        defaultExperiment: Experiment[],
        userExperiment: Experiment[]
      ) => void
    ) => void;
    createExperiment: (experiment: Experiment) => void;
    updateExperiment: (id: string, experiment: Experiment) => void;
    deleteExperiment: (id: string) => void;
    // Data
    getData: () => void;
    data: (callback: (event: Event, data: Data[]) => void) => void;
    saveData: (data: Data) => void;
    deleteData: (id: string) => void;

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
      callback: (event: Event, reading: string) => void
    ) => void;
    serialPortWriting: (writing: string) => void;
    serialPortConnected: (
      callback: (event: Event, connected: boolean, path: string) => void
    ) => Event;
    disconnectSerialPort: () => void;
  };
}
