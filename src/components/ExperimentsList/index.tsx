import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { DataView } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";
import { Experiment } from "../../types/Experiment";
import { ContextMenuController } from "../../types/ContextMenuController";

declare const window: ElectronWindow;

export default function ExperimentsList({
  defaultExperimentsContextMenu,
  userExperimentsContextMenu,
}: {
  defaultExperimentsContextMenu: ContextMenuController;
  userExperimentsContextMenu: ContextMenuController;
}) {
  const navigate = useNavigate();
  const { create } = useExperiment();
  const [defaultExperiments, setDefaultExperiments] = useState<Experiment[]>(
    []
  );
  const [userExperiments, setUserExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const template = (
    experiment: Experiment | null,
    controller: ContextMenuController
  ) => {
    if (experiment && !loading) {
      return (
        <div
          className="col-6 p-2"
          key={`experiment-items-default-${experiment.id}`}
        >
          <div
            className="card text-primary cursor-pointer p-2 hover:surface-hover"
            onClick={() => {
              create(experiment);
              navigate("/connection");
            }}
            onContextMenu={(event) => {
              create({ ...experiment });
              controller.open(event);
            }}
          >
            <div className="grid m-0">
              <div className="col-9">
                <div className="grid m-0">
                  <div className="col-12">
                    <h3 className="m-0">{experiment.name}</h3>
                  </div>
                  <div className="col-6">
                    <span>Variables: {experiment.variables.length}</span>
                  </div>
                  <div className="col-6">
                    <span>Chart: </span>
                    <span>
                      <i
                        className={`pi ${
                          experiment.chart ? "pi-check" : "pi-times"
                        } text-sm`}
                      />
                    </span>
                  </div>
                  <div className="col-6">
                    <span>Buttons: {experiment.buttons.length}</span>
                  </div>
                  <div className="col-6">
                    <span>Terminal: </span>
                    <span>
                      <i
                        className={`pi ${
                          experiment.terminal ? "pi-check" : "pi-times"
                        } text-sm`}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-3 flex justify-content-center align-items-center">
                <i className="pi pi-wave-pulse text-6xl" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="col-6 p-2" key={new Date().toISOString()}>
        <a className="card block cursor-pointer p-2">
          <div className="grid m-0">
            <div className="col-9">
              <div className="grid m-0">
                <div className="col-12">
                  <h3 className="m-0">
                    <Skeleton className="w-11rem border-round h-2rem" />
                  </h3>
                </div>
                <div className="col-12">
                  <Skeleton className="w-9rem border-round h-1rem" />
                </div>
                <div className="col-12">
                  <Skeleton className="w-9rem border-round h-1rem" />
                </div>
              </div>
            </div>
            <div className="col-3 flex justify-content-center align-items-center">
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </a>
      </div>
    );
  };

  useEffect(() => {
    window.electronAPI.experiment((_, defaultExperiment, userExperiment) => {
      setDefaultExperiments([...defaultExperiment]);
      setUserExperiments([...userExperiment]);
      setLoading(false);
    });
    window.electronAPI.getExperiment();
    return () => {
      window.electronAPI.cleanListeners(["experiment"]);
    };
  }, []);
  return (
    <div className="w-full">
      <TabView>
        <TabPanel header="Deafult">
          <DataView
            className="max-h-30rem overflow-auto"
            emptyMessage="No experiments found."
            value={
              loading
                ? Array.from({ length: 6 }, () => null)
                : defaultExperiments
            }
            itemTemplate={(experiment: Experiment | null) =>
              template(experiment, defaultExperimentsContextMenu)
            }
            layout="grid"
          />
        </TabPanel>
        <TabPanel header="Custom">
          <DataView
            className="max-h-30rem overflow-auto"
            emptyMessage="No experiments found."
            value={
              loading ? Array.from({ length: 6 }, () => null) : userExperiments
            }
            itemTemplate={(experiment: Experiment | null) =>
              template(experiment, userExperimentsContextMenu)
            }
            layout="grid"
          />
        </TabPanel>
      </TabView>
    </div>
  );
}
