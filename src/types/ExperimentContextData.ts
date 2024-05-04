import { CONNECTION } from "../enums/Connection";
import { Experiment } from "./Experiment";
import { Reading } from "./Reading";
import { TerminalElement } from "./TerminalElement";

export type ExperimentContextData = {
  experiment: Experiment | null;
  connection: CONNECTION | null;
  deviceName: string;
  preSave: Reading[][];
  terminal: TerminalElement[];
  readings: Reading[][];
  create: (data: Experiment) => void;
  connect: (type: CONNECTION, device: string) => void;
  updateTerminal: (reading: TerminalElement) => void;
  parseReading: (reading: DataView) => number;
  handleReading: (reading: number[]) => void;
  handleWriting: (value: string) => void;
  configureDisconnect: (callback: () => Promise<void>) => void;
  disconnect: () => void;
  destroy: () => void;
};
