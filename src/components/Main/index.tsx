import { useCallback, useEffect, useMemo, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { ContextMenu } from "primereact/contextmenu";
import { useExperiment } from "../../contexts/Experiment";
import { useContextMenuController } from "../../hooks/useContextMenuController";
import { ParsedData } from "../../types/ParsedData";
import { schemeCategory10 } from "../../themes/SchemeCategory10";
import LineChart from "../LineChart";
import Terminal from "../Terminal";

export default function Main() {
  const { experiment, connection, deviceName, preSave, readings } =
    useExperiment();
  const startTime = Date.now();
  const [chartVariable, setChartVariable] = useState<string | null>(null);
  const chartContextMenu = useContextMenuController();
  const [clock, setClock] = useState<string>("");
  const updateTime = useCallback(() => {
    const milliseconds = Date.now() - startTime;
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);

    const clockStr = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setClock(clockStr);

    if (!seconds) {
      setInterval(updateTime, 1000);
    }
  }, []);

  const parseData = (): ParsedData[] => {
    const aux = [];
    for (
      let index = 0;
      index < experiment!.variables.length && index < readings.length;
      index++
    ) {
      const variable = experiment!.variables[index];
      const reading = readings[index];
      aux.push({ variable, reading });
    }
    return aux;
  };

  const parsedData = useMemo(() => parseData(), [readings]);

  const selectChartVariable = (variable: string | null) => {
    setChartVariable(variable);
  };

  useEffect(() => {
    updateTime();
  }, [updateTime]);

  return (
    <div className="flex flex-column justify-content-evenly w-10 h-full p-3">
      <div className="card m-0 p-3 h-30rem">
        <TabView>
          <TabPanel header="Plain">
            <div className="flex justify-content-evenly align-items-center w-full h-22rem overflow-auto">
              {parsedData.map(({ variable, reading }, index) => (
                <div
                  className="flex flex-column align-items-center"
                  key={`main-plain-variable-${index}`}
                >
                  <h3>{variable.name}:</h3>
                  <h4>{reading[reading.length - 1].y}</h4>
                  <p>{variable.unit}</p>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Chart" disabled={!experiment!.chart}>
            <div className="h-22rem">
              <LineChart
                data={parsedData
                  .map(({ variable, reading }, index) => ({
                    id: `${variable.name} (${variable.unit})`,
                    data: reading,
                    color: schemeCategory10[index] || "#ffffff",
                  }))
                  .filter(({ id }) =>
                    chartVariable ? id === chartVariable : true
                  )}
                chartContextMenu={chartContextMenu}
              />
            </div>
          </TabPanel>
          <TabPanel header="Terminal" disabled={!experiment!.terminal}>
            <Terminal />
          </TabPanel>
        </TabView>
      </div>
      <div className="card p-3 h-13rem">
        <div className="flex justify-content-evenly align-items-center h-full">
          <div>
            <span>Dispositivo conectado</span>
            <h2>{deviceName}</h2>
          </div>
          <div>
            <label>Tipo de conexão</label>
            <h2>{connection}</h2>
          </div>
          <div>
            <label>Tempo de conexão</label>
            <h2>{clock}</h2>
          </div>
          <div>
            <label>Dados recebidos</label>
            <h2>
              {preSave.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.length,
                0
              )}
            </h2>
          </div>
        </div>
      </div>
      <ContextMenu
        ref={chartContextMenu.ref}
        model={[
          ...parsedData.map(({ variable }) => ({
            label: variable.name,
            icon: "pi pi-wave-pulse",
            command: () =>
              selectChartVariable(`${variable.name} (${variable.unit})`),
          })),
          {
            label: "All",
            icon: "pi pi-hashtag",
            command: () => selectChartVariable(null),
          },
        ]}
      />
    </div>
  );
}
