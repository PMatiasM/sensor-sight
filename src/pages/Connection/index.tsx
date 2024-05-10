import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn, MdWifi } from "react-icons/md";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { openModal } from "../../common/utils/modalControl";
import BluetoothModal from "../../components/BluetoothModal";
import SerialModal from "../../components/SerialModal";
import NetworkModal from "../../components/NetworkModal";

import { BackButton, Container, List, ListItem, Main, Title } from "./styles";

declare const window: ElectronWindow;

export default function Connection() {
  const navigate = useNavigate();
  const { config } = useConfig();
  const { experiment } = useExperiment();
  const [bluetoothAvailable, setBluetoothAvailable] = useState(false);

  useEffect(() => {
    !experiment && navigate("/experiments");
    navigator.bluetooth.getAvailability().then((available) => {
      setBluetoothAvailable(available);
    });
  }, []);

  return (
    <Container>
      <Main>
        <BackButton onClick={() => navigate("/experiments")}>
          <MdKeyboardReturn size="2rem" />
        </BackButton>
        <Title>
          <MdWifi size="7rem" />
        </Title>
        <List>
          <ListItem
            onClick={async () => {
              openModal("bluetooth-modal");
              await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [config!.bluetooth.primaryService],
              });
            }}
            disabled={!bluetoothAvailable}
          >
            <span>Bluetooth</span>
          </ListItem>
          <ListItem
            onClick={async () => {
              openModal("network-modal");
            }}
          >
            <span>Network</span>
          </ListItem>
          <ListItem
            onClick={async () => {
              openModal("serial-modal");
              window.electronAPI.getSerialPortList();
            }}
          >
            <span>Serial</span>
          </ListItem>
        </List>
      </Main>
      <BluetoothModal />
      <NetworkModal />
      <SerialModal />
    </Container>
  );
}
