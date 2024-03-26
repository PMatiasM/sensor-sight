import { useConnection } from "../../contexts/Connection";
import Logo from "../Logo";

import { Button, Container, Footer, Header, LastRead, Main } from "./styles";

export default function Sidebar() {
  const { readings } = useConnection();
  const { disconnect } = useConnection();
  return (
    <Container>
      <div>
        <Header>
          <Logo />
        </Header>
        <hr className="border-1 border-top" />
        <Main>
          {readings.length && (
            <LastRead>
              {/* <label>Última leitura</label>
              <h2>Y: {readings[readings.length - 1].y}</h2>
              <h2>X: {readings[readings.length - 1].x.toLocaleTimeString()}</h2> */}
            </LastRead>
          )}
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
