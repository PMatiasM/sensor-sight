import { useNavigate } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import Logo from "../../components/Logo";
import { openModal } from "../../common/utils/modalControl";
import ConfigModal from "../../components/ConfigModal";

import { Box, Button, ConfigButton, Container, Main, Title } from "./styles";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Main>
        <Title>
          <Logo />
        </Title>
        <Box>
          <Button onClick={() => navigate("/connection")}>
            <span>Start</span>
          </Button>
          <Button onClick={() => navigate("/connection")}>
            <span>Learn</span>
          </Button>
          <Button onClick={() => navigate("/history")}>
            <span>History</span>
          </Button>
        </Box>
        <ConfigButton onClick={() => openModal("config-modal")}>
          <MdOutlineSettings size="2rem" />
        </ConfigButton>
      </Main>
      <ConfigModal />
    </Container>
  );
}
