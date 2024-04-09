import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAddCircleOutline,
  MdOutlineCheck,
  MdOutlineClear,
} from "react-icons/md";
import { VscTelescope } from "react-icons/vsc";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { Experiment } from "../../types/Experiment";
import { VIEW } from "../../enums/View";
import { openModal } from "../../common/utils/modalControl";

import {
  AddButton,
  Container,
  Item,
  ItemIcon,
  ItemInfos,
  ItemTitle,
  List,
  Option,
  Toggle,
} from "./styles";

declare const window: ElectronWindow;

export default function ExperimentsList({
  handleContextMenu,
}: {
  handleContextMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    view: VIEW,
    experiment: Experiment
  ) => void;
}) {
  const navigate = useNavigate();
  const { create } = useExperiment();
  const [view, setView] = useState<VIEW>(VIEW.DEFAULT);
  const [defaultExperiment, setDefaultExperiment] = useState<
    Experiment[] | null
  >(null);
  const [userExperiment, setUserExperiment] = useState<Experiment[] | null>(
    null
  );
  useEffect(() => {
    window.electronAPI.experiment((_, defaultExperiment, userExperiment) => {
      setDefaultExperiment([...defaultExperiment]);
      setUserExperiment([...userExperiment]);
    });
    window.electronAPI.getExperiment();
    return () => {
      window.electronAPI.cleanListeners(["experiment"]);
    };
  }, []);
  return (
    <Container>
      <Toggle>
        <Option
          $selected={view === VIEW.DEFAULT}
          onClick={() => setView(VIEW.DEFAULT)}
        >
          Default
        </Option>
        <Option
          $selected={view === VIEW.CUSTOM}
          onClick={() => setView(VIEW.CUSTOM)}
        >
          Custom
        </Option>
      </Toggle>
      <List className={view !== VIEW.DEFAULT ? "visually-hidden" : ""}>
        {defaultExperiment?.map((experiment, index) => (
          <Item
            key={`experiment-items-default-${index}`}
            onContextMenu={(event) =>
              handleContextMenu(event, view, { ...experiment })
            }
            onClick={() => {
              create(experiment);
              navigate("/connection");
            }}
          >
            <ItemTitle>
              <h3>{experiment.name}</h3>
              <ItemInfos>
                <div>
                  <p>Variables: {experiment.variables.length}</p>
                  <p>Buttons: {experiment.buttons.length}</p>
                </div>
                <div>
                  <p>
                    Chart:{" "}
                    {experiment.chart ? <MdOutlineCheck /> : <MdOutlineClear />}
                  </p>
                  <p>
                    Terminal:{" "}
                    {experiment.terminal ? (
                      <MdOutlineCheck />
                    ) : (
                      <MdOutlineClear />
                    )}
                  </p>
                </div>
              </ItemInfos>
            </ItemTitle>
            <ItemIcon>
              <VscTelescope size="4.5rem" />
            </ItemIcon>
          </Item>
        ))}
      </List>
      <List className={view !== VIEW.CUSTOM ? "visually-hidden" : ""}>
        {userExperiment?.map((experiment, index) => (
          <Item
            key={`experiment-items-custom-${index}`}
            onContextMenu={(event) =>
              handleContextMenu(event, view, { ...experiment })
            }
            onClick={() => {
              create(experiment);
              navigate("/connection");
            }}
          >
            <ItemTitle>
              <h3>{experiment.name}</h3>
              <ItemInfos>
                <div>
                  <p>Variables: {experiment.variables.length}</p>
                  <p>Buttons: {experiment.buttons.length}</p>
                </div>
                <div>
                  <p>
                    Chart:{" "}
                    {experiment.chart ? <MdOutlineCheck /> : <MdOutlineClear />}
                  </p>
                  <p>
                    Terminal:{" "}
                    {experiment.terminal ? (
                      <MdOutlineCheck />
                    ) : (
                      <MdOutlineClear />
                    )}
                  </p>
                </div>
              </ItemInfos>
            </ItemTitle>
            <ItemIcon>
              <VscTelescope size="4.5rem" />
            </ItemIcon>
          </Item>
        ))}
        <Item onClick={() => openModal("experiment-modal")}>
          <AddButton>
            <MdOutlineAddCircleOutline size="4.5rem" />
          </AddButton>
        </Item>
      </List>
    </Container>
  );
}
