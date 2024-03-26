import { CONNECTION } from "../enums/Connection";
import { Reading } from "./Reading";

export type ConnectionContextData = {
  connection: CONNECTION | null;
  deviceName: string;
  preSave: Reading[][];
  terminal: string;
  readings: Reading[][];
  connect: (type: CONNECTION, device: string) => void;
  updateTerminal: (reading: string) => void;
  parseReading: (reading: DataView) => number;
  handleReading: (reading: number[]) => void;
  configureDisconnect: (callback: () => Promise<void>) => void;
  disconnect: () => void;
};
