import { VscChromeClose, VscChromeMinimize } from "react-icons/vsc";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { openModal } from "../../common/utils/modalControl";
import Icon from "../Icon";
import PreventClosingModal from "../PreventClosingModal";

import { Container, Controls, ControlsButton, Logo, Title } from "./styles";

declare const window: ElectronWindow;

export default function TitleBar() {
  const { connection } = useExperiment();
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
        <ControlsButton
          $close
          onClick={() =>
            connection
              ? openModal("prevent-closing-modal")
              : window.electronAPI.close()
          }
        >
          <VscChromeClose />
        </ControlsButton>
      </Controls>
      <PreventClosingModal />
    </Container>
  );
}
