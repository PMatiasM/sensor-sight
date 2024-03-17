import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

export default function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <Main />
    </Container>
  );
}
