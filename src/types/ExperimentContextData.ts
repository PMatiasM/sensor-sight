import { CONNECTION } from "../enums/Connection";
import { Experiment } from "./Experiment";
import { Reading } from "./Reading";

export type ExperimentContextData = {
  experiment: Experiment | null;
  connection: CONNECTION | null;
  deviceName: string;
  preSave: Reading[][];
  terminal: string;
  readings: Reading[][];
  create: (data: Experiment) => void;
  connect: (type: CONNECTION, device: string) => void;
  updateTerminal: (reading: string) => void;
  parseReading: (reading: DataView) => number;
  handleReading: (reading: number[]) => void;
  handleWriting: (value: string) => void;
  configureDisconnect: (callback: () => Promise<void>) => void;
  disconnect: () => void;
  destroy: () => void;
};
