import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { ExperimentContextData } from "../../types/ExperimentContextData";
import { Reading } from "../../types/Reading";
import { Experiment } from "../../types/Experiment";
import { TerminalElement } from "../../types/TerminalElement";
import { CONNECTION } from "../../enums/Connection";
import { BLEBuffer } from "../../models/BLEBuffer";
import { useToast } from "../Toast";
import { useConfig } from "../Config";

declare const window: ElectronWindow;

const ExperimentContext = createContext<ExperimentContextData>(
  {} as ExperimentContextData
);

export function ExperimentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  const { config } = useConfig();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [connection, setConnection] = useState<CONNECTION | null>(null);
  const [deviceName, setDeviceName] = useState<string>("");
  const [preSave, setPreSave] = useState<Reading[][]>([]);
  const [terminal, setTerminal] = useState<TerminalElement[]>([]);
  const [readings, setReadings] = useState<Reading[][]>([]);
  const [customDisconnect, setCustomDisconnect] = useState<
    (() => Promise<void>) | null
  >(null);

  const create = (data: Experiment) => {
    setExperiment(data);
  };

  const copy = () => {
    setExperiment((experiment) => {
      if (experiment) {
        return { ...experiment, id: "" };
      }
      return null;
    });
  };

  const connect = (type: CONNECTION, device: string) => {
    setConnection(type);
    setDeviceName(device);
  };

  const defaultDisconnect = async () => {
    if (experiment && connection) {
      window.electronAPI.saveData({
        id: uuidv4(),
        experiment,
        device: deviceName,
        connection,
        date: new Date(),
        readings: preSave,
      });
    }
    setExperiment(null);
    setConnection(null);
    setDeviceName("");
    setPreSave([]);
    setTerminal([]);
    setReadings([]);
    setCustomDisconnect(null);
  };

  const updateTerminal = (reading: TerminalElement) => {
    setTerminal((terminal) => [...terminal, reading]);
  };

  const handleReading = (reading: number[]) => {
    const x = new Date();
    setReadings((readings) => {
      if (!readings.length) {
        return reading.map((element) => [{ x, y: element }]);
      }
      const aux = [...readings];
      reading.map((element, index) => {
        if (aux[index].length === 60) {
          aux[index].shift();
        }
        aux[index].push({ x, y: element });
      });
      return aux;
    });
    setPreSave((preSave) => {
      if (!preSave.length) {
        return reading.map((element) => [{ x, y: element }]);
      }
      const aux = [...preSave];
      reading.map((element, index) => aux[index].push({ x, y: element }));
      return aux;
    });
  };

  const handleWriting = (value: string) => {
    switch (connection) {
      case CONNECTION.BLUETOOTH:
        break;
      case CONNECTION.NETWORK:
        console.log(`Network Terminal - ${value}`);
        break;
      case CONNECTION.SERIAL:
        window.electronAPI.serialPortWriting(
          `${value}${config!.serial.delimiter}`
        );
        break;
      default:
        break;
    }
  };

  const configureDisconnect = (callback: () => Promise<void>) => {
    setCustomDisconnect(() => callback);
  };

  const disconnect = async () => {
    if (customDisconnect) {
      try {
        await customDisconnect();
      } catch (error) {
        toast.warning(
          "Failed to perform Disconnect disconnection for connection, performing standard disconnection"
        );
      }
    }
    await defaultDisconnect();
  };

  const destroy = () => {
    setExperiment(null);
  };

  return (
    <ExperimentContext.Provider
      value={{
        experiment,
        connection,
        deviceName,
        buffer: new BLEBuffer(),
        preSave,
        terminal,
        readings,
        create,
        copy,
        connect,
        updateTerminal,
        handleReading,
        handleWriting,
        configureDisconnect,
        disconnect,
        destroy,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperiment() {
  const context = useContext(ExperimentContext);

  return context;
}
