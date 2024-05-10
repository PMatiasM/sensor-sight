import { useEffect } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { PREFIX_LENGTH } from "../../constants";
import { PREFIXES } from "../../enums/Prefixes";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

declare const window: ElectronWindow;

export default function Dashboard() {
  const { updateTerminal, handleReading, disconnect } = useExperiment();
  useEffect(() => {
    window.addEventListener("beforeunload", disconnect);
    window.electronAPI.serialPortReading((_, reading) => {
      updateTerminal({ date: new Date(), reading });
      if (reading.substring(0, PREFIX_LENGTH) === PREFIXES.SSD) {
        const parsedReading: number[] = JSON.parse(
          reading.substring(PREFIX_LENGTH)
        );
        handleReading(parsedReading);
      }
    });

    return () => {
      window.removeEventListener("beforeunload", disconnect);
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
