import { useCallback, useEffect, useState } from "react";
import { useConnection } from "../../contexts/Connection";
import { VIEW } from "../../enums/View";
import LineChart from "../LineChart";
import Terminal from "../Terminal";

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
} from "./styles";

export default function Main() {
  const { connection, deviceName, preSave } = useConnection();
  const startTime = Date.now();
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

  useEffect(() => {
    updateTime();
  }, [updateTime]);
  return (
    <Container>
      <Content>
        <ChartWrapper>
          <LineChart />
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
            onClick={() => setView(VIEW.TERMINAL)}
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
                <h2>{preSave.length}</h2>
              </InfoItem>
            </InfoBlock>
          </InfosWrapper>
        </Infos>
        <Terminal className={view !== VIEW.TERMINAL ? "visually-hidden" : ""} />
      </Content>
    </Container>
  );
}
