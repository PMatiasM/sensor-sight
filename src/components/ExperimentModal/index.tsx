import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdAdd } from "react-icons/md";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { Experiment } from "../../types/Experiment";
import { closeModal } from "../../common/utils/modalControl";

import {
  AddButton,
  AddDiv,
  Category,
  CheckInputs,
  ModalBody,
  Title,
} from "./styles";

declare const window: ElectronWindow;

export default function ExperimentModal() {
  const { experiment, destroy } = useExperiment();

  const defaultExperiment: Experiment = {
    id: "",
    name: "",
    variables: [],
    buttons: [],
    chart: false,
    terminal: false,
  };
  const [currentExperiment, setCurrentExperiment] =
    useState<Experiment>(defaultExperiment);

  const cancel = () => {
    destroy();
    setCurrentExperiment(defaultExperiment);
  };

  const handleSubmit = () => {
    if (experiment && experiment.id) {
      window.electronAPI.updateExperiment(currentExperiment.id, {
        ...currentExperiment,
      });
    } else {
      window.electronAPI.createExperiment({
        ...currentExperiment,
        id: uuidv4(),
      });
    }
    cancel();
    closeModal("experiment-modal");
  };

  useEffect(() => {
    setCurrentExperiment(experiment || defaultExperiment);
  }, [experiment]);

  return (
    <div
      className="modal fade"
      id="experiment-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="experiment-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="experiment-modal-label">
              {experiment && experiment.id ? "Edit" : "Create"} Experiment
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={cancel}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="row">
                <div className="col">
                  <label htmlFor="experiment-name-input">Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="experiment-name-input"
                    value={currentExperiment.name}
                    onChange={(event) =>
                      setCurrentExperiment((experiment) => ({
                        ...experiment,
                        name: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <Category>
                <Title>Variables</Title>
                {currentExperiment.variables.map((_, index) => (
                  <div
                    className="row mt-2 px-2 align-items-center"
                    key={`experiment-variables-${index}`}
                  >
                    <div className="col">
                      <label
                        htmlFor={`experiment-variables-name-input-${index}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id={`experiment-variables-name-input-${index}`}
                        value={currentExperiment.variables[index].name}
                        onChange={(event) =>
                          setCurrentExperiment((currentExperiment) => {
                            const variables = [...currentExperiment.variables];
                            const aux = { ...variables[index] };
                            variables[index] = {
                              ...aux,
                              name: event.target.value,
                            };
                            return {
                              ...currentExperiment,
                              variables: [...variables],
                            };
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor={`experiment-variables-unit-input-${index}`}
                      >
                        Unit
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id={`experiment-variables-unit-input-${index}`}
                        value={currentExperiment.variables[index].unit}
                        onChange={(event) =>
                          setCurrentExperiment((currentExperiment) => {
                            const variables = [...currentExperiment.variables];
                            const aux = { ...variables[index] };
                            variables[index] = {
                              ...aux,
                              unit: event.target.value,
                            };
                            return {
                              ...currentExperiment,
                              variables: [...variables],
                            };
                          })
                        }
                      />
                    </div>
                    <div className="col-1">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() =>
                          setCurrentExperiment((currentExperiment) => ({
                            ...currentExperiment,
                            variables: currentExperiment.variables.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
                <AddDiv>
                  <AddButton
                    onClick={() => {
                      setCurrentExperiment((currentExperiment) => ({
                        ...currentExperiment,
                        variables: [
                          ...currentExperiment.variables,
                          { name: "", unit: "" },
                        ],
                      }));
                    }}
                  >
                    <MdAdd size="1.5rem" />
                  </AddButton>
                </AddDiv>
              </Category>
              <Category>
                <Title>Buttons</Title>
                {currentExperiment.buttons.map((_, index) => (
                  <div
                    className="row mt-2 px-2 align-items-center"
                    key={`experiment-buttons-${index}`}
                  >
                    <div className="col">
                      <label htmlFor={`experiment-buttons-name-input-${index}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id={`experiment-buttons-name-input-${index}`}
                        value={currentExperiment.buttons[index].name}
                        onChange={(event) =>
                          setCurrentExperiment((currentExperiment) => {
                            const buttons = [...currentExperiment.buttons];
                            const aux = { ...buttons[index] };
                            buttons[index] = {
                              ...aux,
                              name: event.target.value,
                            };
                            return {
                              ...currentExperiment,
                              buttons: [...buttons],
                            };
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <label htmlFor={`experiment-buttons-code-input-${index}`}>
                        Code
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id={`experiment-buttons-code-input-${index}`}
                        value={currentExperiment.buttons[index].code}
                        onChange={(event) =>
                          setCurrentExperiment((currentExperiment) => {
                            const buttons = [...currentExperiment.buttons];
                            const aux = { ...buttons[index] };
                            buttons[index] = {
                              ...aux,
                              code: event.target.value,
                            };
                            return {
                              ...currentExperiment,
                              buttons: [...buttons],
                            };
                          })
                        }
                      />
                    </div>
                    <div className="col-1">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() =>
                          setCurrentExperiment((currentExperiment) => ({
                            ...currentExperiment,
                            buttons: currentExperiment.buttons.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
                <AddDiv>
                  <AddButton
                    onClick={() => {
                      setCurrentExperiment((currentExperiment) => ({
                        ...currentExperiment,
                        buttons: [
                          ...currentExperiment.buttons,
                          { name: "", code: "" },
                        ],
                      }));
                    }}
                  >
                    <MdAdd size="1.5rem" />
                  </AddButton>
                </AddDiv>
              </Category>
              <CheckInputs>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="experiment-chart-input"
                    checked={currentExperiment.chart}
                    onChange={(event) =>
                      setCurrentExperiment((currentExperiment) => ({
                        ...currentExperiment,
                        chart: event.target.checked,
                      }))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="experiment-chart-input"
                  >
                    Chart
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="experiment-terminal-input"
                    checked={currentExperiment.terminal}
                    onChange={(event) =>
                      setCurrentExperiment((currentExperiment) => ({
                        ...currentExperiment,
                        terminal: event.target.checked,
                      }))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="experiment-terminal-input"
                  >
                    Terminal
                  </label>
                </div>
              </CheckInputs>
            </ModalBody>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
