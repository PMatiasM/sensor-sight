import { useCallback, useEffect, useMemo, useState } from "react";
import { useExperiment } from "../../contexts/Experiment";
import { useContextMenu } from "../../hooks/useContextMenu";
import { ParsedData } from "../../types/ParsedData";
import { VIEW } from "../../enums/View";
import LineChart from "../LineChart";
import Terminal from "../Terminal";
import ChartContextMenu from "../ChartContextMenu";

import {
  ChartWrapper,
  Container,
  Content,
  InfoBlock,
  InfoItem,
  Infos,
  InfosWrapper,
  Option,
  Options,
  PlainVariable,
  PlainWrapper,
} from "./styles";

export default function Main() {
  const { experiment, connection, deviceName, preSave, readings } =
    useExperiment();
  const { ref, positioning, handleContextMenu } = useContextMenu();
  const startTime = Date.now();
  const [chartVariable, setChartVariable] = useState<string | null>(null);
  const [dataView, setDataView] = useState<VIEW>(VIEW.PLAIN);
  const [view, setView] = useState<VIEW>(VIEW.CONNECTION);
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
    <Container>
      <Content>
        <Options>
          <Option
            $selected={dataView === VIEW.PLAIN}
            onClick={() => setDataView(VIEW.PLAIN)}
          >
            PLAIN
          </Option>
          <Option
            $selected={dataView === VIEW.CHART}
            onClick={() => experiment!.chart && setDataView(VIEW.CHART)}
          >
            CHART
          </Option>
        </Options>
        <PlainWrapper
          className={dataView !== VIEW.PLAIN ? "visually-hidden" : ""}
        >
          {parsedData.map(({ variable, reading }, index) => (
            <PlainVariable key={`main-plain-variable-${index}`}>
              <h3>{variable.name}:</h3>
              <h4>{reading[reading.length - 1].y}</h4>
              <p>{variable.unit}</p>
            </PlainVariable>
          ))}
        </PlainWrapper>
        <ChartWrapper
          className={dataView !== VIEW.CHART ? "visually-hidden" : ""}
          onContextMenu={handleContextMenu}
        >
          <LineChart
            data={parsedData
              .map(({ variable, reading }) => ({
                id: `${variable.name}`,
                data: reading,
              }))
              .filter(({ id }) =>
                chartVariable ? id === chartVariable : true
              )}
          />
        </ChartWrapper>
        <Options>
          <Option
            $selected={view === VIEW.CONNECTION}
            onClick={() => setView(VIEW.CONNECTION)}
          >
            CONNECTION
          </Option>
          <Option
            $selected={view === VIEW.TERMINAL}
            onClick={() => experiment!.terminal && setView(VIEW.TERMINAL)}
          >
            TERMINAL
          </Option>
        </Options>
        <Infos className={view !== VIEW.CONNECTION ? "visually-hidden" : ""}>
          <InfosWrapper>
            <InfoBlock>
              <InfoItem>
                <label>Dispositivo conectado</label>
                <h2>{deviceName}</h2>
              </InfoItem>
              <InfoItem>
                <label>Tipo de conexão</label>
                <h2>{connection}</h2>
              </InfoItem>
            </InfoBlock>
            <InfoBlock>
              <InfoItem>
                <label>Tempo de conexão</label>
                <h2>{clock}</h2>
              </InfoItem>
              <InfoItem>
                <label>Dados recebidos</label>
                <h2>
                  {preSave.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.length,
                    0
                  )}
                </h2>
              </InfoItem>
            </InfoBlock>
          </InfosWrapper>
        </Infos>
        <Terminal className={view !== VIEW.TERMINAL ? "visually-hidden" : ""} />
      </Content>
      <ChartContextMenu
        reference={ref}
        positioning={positioning}
        parsedData={parsedData}
        selectChartVariable={selectChartVariable}
      />
    </Container>
  );
}
