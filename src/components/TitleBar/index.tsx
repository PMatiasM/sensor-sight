import { VscChromeClose, VscChromeMinimize } from "react-icons/vsc";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import Icon from "../Icon";

import { Container, Controls, ControlsButton, Logo, Title } from "./styles";

declare const window: ElectronWindow;

export default function TitleBar() {
  return (
    <Container>
      <Logo>
        <Icon />
      </Logo>
      <Title>
        <span>Sensor Sight</span>
      </Title>
      <Controls>
        <ControlsButton onClick={window.electronAPI.minimize}>
          <VscChromeMinimize />
        </ControlsButton>
        <ControlsButton onClick={window.electronAPI.close} $close>
          <VscChromeClose />
        </ControlsButton>
      </Controls>
    </Container>
  );
}
