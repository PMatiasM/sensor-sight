import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { Experiment } from "../../types/Experiment";
import { DialogController } from "../../types/DialogController";

declare const window: ElectronWindow;

export default function ExperimentDialog({
  experimentDialog,
}: {
  experimentDialog: DialogController;
}) {
  const { experiment } = useExperiment();

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
  const [submitted, setSubmitted] = useState<boolean>(false);

  const cancel = () => {
    setSubmitted(false);
    experimentDialog.close();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (currentExperiment.name.trim()) {
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
      experimentDialog.close();
    }
  };

  useEffect(() => {
    setCurrentExperiment(experiment || defaultExperiment);
  }, [experiment]);

  return (
    <Dialog
      visible={experimentDialog.visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={`${experiment && experiment.id ? "Edit" : "Create"} Experiment`}
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <>
          <Button label="Cancel" severity="secondary" onClick={cancel} />
          <Button label="Save" severity="success" onClick={handleSubmit} />
        </>
      )}
    >
      <div className="field">
        <label
          htmlFor="experiment-name-input"
          className="font-bold inline-block mb-2"
        >
          Name
        </label>
        <InputText
          id="experiment-name-input"
          className={classNames({
            "p-invalid": submitted && !currentExperiment.name,
          })}
          required
          spellCheck={false}
          value={currentExperiment.name}
          onChange={(event) =>
            setCurrentExperiment((experiment) => ({
              ...experiment,
              name: event.target.value,
            }))
          }
        />
        {submitted && !currentExperiment.name && (
          <small className="p-error">Name is required.</small>
        )}
      </div>
      <div className="field">
        {currentExperiment.variables.map((_, index) => (
          <div
            className="formgrid grid align-items-center"
            key={`experiment-variables-${index}`}
          >
            <div className="col mb-3">
              <label
                htmlFor={`experiment-variables-name-input-${index}`}
                className="font-bold inline-block mb-2"
              >
                Variable-{index + 1}
              </label>
              <InputText
                id={`experiment-variables-name-input-${index}`}
                spellCheck={false}
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
            <div className="col mb-3">
              <label
                htmlFor={`experiment-variables-unit-input-${index}`}
                className="font-bold inline-block mb-2"
              >
                Unit
              </label>
              <InputText
                id={`experiment-variables-unit-input-${index}`}
                spellCheck={false}
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
              <Button
                className="p-1 w-auto"
                icon="pi pi-times"
                text
                severity="danger"
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
        <div className="flex justify-content-end">
          <Button
            className="w-auto m-2 p-2"
            label="Add Variable"
            icon="pi pi-plus"
            outlined
            onClick={() => {
              setCurrentExperiment((currentExperiment) => ({
                ...currentExperiment,
                variables: [
                  ...currentExperiment.variables,
                  { name: "", unit: "" },
                ],
              }));
            }}
          />
        </div>
      </div>
      <div className="field">
        {currentExperiment.buttons.map((_, index) => (
          <div
            className="formgrid grid align-items-center"
            key={`experiment-buttons-${index}`}
          >
            <div className="col mb-3">
              <label
                htmlFor={`experiment-buttons-name-input-${index}`}
                className="font-bold inline-block mb-2"
              >
                Button-{index + 1}
              </label>
              <InputText
                id={`experiment-buttons-name-input-${index}`}
                spellCheck={false}
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
            <div className="col mb-3">
              <label
                htmlFor={`experiment-buttons-code-input-${index}`}
                className="font-bold inline-block mb-2"
              >
                Code
              </label>
              <InputText
                id={`experiment-buttons-code-input-${index}`}
                spellCheck={false}
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
              <Button
                className="p-1 w-auto"
                icon="pi pi-times"
                text
                severity="danger"
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
        <div className="flex justify-content-end">
          <Button
            className="w-auto m-2 p-2"
            label="Add Button"
            icon="pi pi-plus"
            outlined
            onClick={() => {
              setCurrentExperiment((currentExperiment) => ({
                ...currentExperiment,
                buttons: [...currentExperiment.buttons, { name: "", code: "" }],
              }));
            }}
          />
        </div>
      </div>
      <div className="field flex justify-content-evenly">
        <div className="flex align-items-center">
          <Checkbox
            inputId="experiment-chart-input"
            checked={currentExperiment.chart}
            onChange={(event) =>
              setCurrentExperiment((currentExperiment) => ({
                ...currentExperiment,
                chart: Boolean(event.target.checked),
              }))
            }
          />
          <label className="ml-2" htmlFor="experiment-chart-input">
            Chart
          </label>
        </div>
        <div className="flex align-items-center">
          <Checkbox
            inputId="experiment-terminal-input"
            checked={currentExperiment.terminal}
            onChange={(event) =>
              setCurrentExperiment((currentExperiment) => ({
                ...currentExperiment,
                terminal: Boolean(event.target.checked),
              }))
            }
          />
          <label className="ml-2" htmlFor="experiment-terminal-input">
            Terminal
          </label>
        </div>
      </div>
    </Dialog>
  );
}
