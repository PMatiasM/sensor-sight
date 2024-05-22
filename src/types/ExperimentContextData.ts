import { CONNECTION } from "../enums/Connection";
import { BLEBuffer } from "../models/BLEBuffer";
import { Experiment } from "./Experiment";
import { Reading } from "./Reading";
import { TerminalElement } from "./TerminalElement";

export type ExperimentContextData = {
  experiment: Experiment | null;
  connection: CONNECTION | null;
  deviceName: string;
  buffer: BLEBuffer;
  preSave: Reading[][];
  terminal: TerminalElement[];
  readings: Reading[][];
  create: (data: Experiment) => void;
  connect: (type: CONNECTION, device: string) => void;
  updateTerminal: (reading: TerminalElement) => void;
  handleReading: (reading: number[]) => void;
  handleWriting: (value: string) => void;
  configureDisconnect: (callback: () => Promise<void>) => void;
  disconnect: () => void;
  destroy: () => void;
};
