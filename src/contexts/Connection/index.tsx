import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { ConnectionContextData } from "../../types/ConnectionContextData";
import { CONNECTION } from "../../enums/Connection";
import { Reading } from "../../types/Reading";

declare const window: ElectronWindow;

const ConnectionContext = createContext<ConnectionContextData>(
  {} as ConnectionContextData
);

export function ConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connection, setConnection] = useState<CONNECTION | null>(null);
  const [deviceName, setDeviceName] = useState<string>("");
  const [preSave, setPreSave] = useState<Reading[][]>([]);
  const [terminal, setTerminal] = useState<string>("");
  const [readings, setReadings] = useState<Reading[][]>([]);
  const [customDisconnect, setCustomDisconnect] = useState<
    (() => Promise<void>) | null
  >(null);

  const connect = (type: CONNECTION, device: string) => {
    setConnection(type);
    setDeviceName(device);
  };

  const defaultDisconnect = async () => {
    if (connection) {
      window.electronAPI.saveData({
        device: deviceName,
        connection,
        date: new Date(),
        readings: [],
      });
    }
    setConnection(null);
    setDeviceName("");
    setPreSave([]);
    setTerminal("");
    setReadings([]);
    setCustomDisconnect(null);
  };

  const updateTerminal = (reading: string) => {
    setTerminal((terminal) => terminal.concat(reading));
  };

  const parseReading = (reading: DataView) => {
    const is16Bits = reading.getUint8(0) & 0x1;
    if (is16Bits) {
      return reading.getUint16(1, true);
    }
    return reading.getUint8(1);
  };

  const handleReading = (reading: number[]) => {
    setReadings((readings) => {
      const aux = [...readings];
      for (let index = 0; index < reading.length; index++) {
        const element = reading[index];
        if (aux.length < reading.length) {
          aux.push([{ x: new Date(), y: element }]);
        } else {
          const auxEl = [...aux[index]];
          if (auxEl.length === 60) {
            auxEl.shift();
          }
          auxEl.push({ x: new Date(), y: element });
          aux[index] = [...auxEl];
        }
      }
      return aux;
    });
    // setPreSave((preSave) => [...preSave, newReading]);
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

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        deviceName,
        preSave,
        terminal,
        readings,
        connect,
        updateTerminal,
        parseReading,
        handleReading,
        configureDisconnect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);

  return context;
}
