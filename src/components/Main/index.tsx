import { useCallback, useEffect, useState } from "react";
import LineChart from "../LineChart";

import {
  ChartWrapper,
  Container,
  Content,
  InfoBlock,
  InfoItem,
  InfosWrapper,
} from "./styles";
import { useConnection } from "../../contexts/Connection";

export default function Main() {
  const { connection, deviceName, preSave } = useConnection();
  const startTime = Date.now();
  const [clock, setClock] = useState("");
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
      </Content>
    </Container>
  );
}
