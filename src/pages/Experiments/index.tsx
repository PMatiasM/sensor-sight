import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn } from "react-icons/md";
import { Experiment } from "../../types/Experiment";
import { ContextMenu } from "../../types/ContextMenu";
import { VIEW } from "../../enums/View";
import ExperimentsList from "../../components/ExperimentsList";
import ExperimentContextMenu from "../../components/ExperimentContextMenu";
import ExperimentModal from "../../components/ExperimentModal";
import ExperimentDeleteModal from "../../components/ExperimentDeleteModal";

import { BackButton, Container, Main, Title } from "./styles";

export default function Experiments() {
  const navigate = useNavigate();
  const ref = useRef<HTMLMenuElement | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const handleContextMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    view: VIEW,
    experiment: Experiment
  ) => {
    event.preventDefault();
    setContextMenu({
      view,
      experiment,
      positioning: {
        mouseY: event.clientY - 6,
        mouseX: event.clientX + 2,
      },
    });
  };
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && event.target) {
        if (!ref.current.contains(event.target as Node)) {
          setContextMenu(null);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <Container>
      <Main>
        <BackButton onClick={() => navigate("/")}>
          <MdKeyboardReturn size="2rem" />
        </BackButton>
        <Title>
          <h1>Experiments</h1>
        </Title>
        <ExperimentsList handleContextMenu={handleContextMenu} />
      </Main>
      <ExperimentContextMenu reference={ref} contextMenu={contextMenu} />
      <ExperimentModal />
      <ExperimentDeleteModal />
    </Container>
  );
}
