import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import Logo from "../Logo";

import { Button, Container, Footer, Header, Main } from "./styles";

declare const window: ElectronWindow;

export default function Sidebar() {
  const { experiment, handleWriting, disconnect } = useExperiment();
  return (
    <Container>
      <div>
        <Header>
          <Logo />
        </Header>
        <hr className="border-1 border-top" />
        <Main>
          {experiment!.buttons.map((button, index) => (
            <Button
              key={`sidebar-button-${index}`}
              className="btn btn-secondary"
              onClick={() => handleWriting(button.code)}
            >
              {button.name}
            </Button>
          ))}
        </Main>
      </div>
      <Footer>
        <Button className="btn btn-danger" onClick={disconnect}>
          Desconectar
        </Button>
      </Footer>
    </Container>
  );
}
