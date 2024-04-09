import { useEffect } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { PREFIX } from "../../constants";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

declare const window: ElectronWindow;

export default function Dashboard() {
  const { updateTerminal, handleReading } = useExperiment();
  useEffect(() => {
    window.electronAPI.serialPortReading((_, reading) => {
      updateTerminal(reading);
      if (reading.substring(0, PREFIX.length) === PREFIX) {
        const parsedReading: number[] = JSON.parse(
          reading.substring(PREFIX.length)
        );
        handleReading(parsedReading);
      }
    });

    return () => {
      window.electronAPI.cleanListeners(["serial-port-reading"]);
    };
  }, []);
  return (
    <Container>
      <Sidebar />
      <Main />
    </Container>
  );
}
