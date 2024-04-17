import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn, MdOutlineHistory } from "react-icons/md";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { Data } from "../../types/Data";

import {
  BackButton,
  Container,
  List,
  Item,
  Main,
  Title,
  ItemTitle,
  ItemInfos,
  ItemIcon,
} from "./styles";

declare const window: ElectronWindow;

export default function History() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  const exportData = (data: Data) => {
    const header = `Device, Connection, Date, ${data.experiment.variables
      .map((variable) => variable.name)
      .join(", ")}`;
    if (!data.readings.length) {
      return header;
    }
    return [
      header,
      ...data.readings[0].map(
        (_, index) =>
          `${data.device}, ${data.connection}, ${
            data.readings[0][index].x
          }, ${data.readings.map((reading) => reading[index].y).join(", ")}`
      ),
    ].join("\r\n");
  };

  useEffect(() => {
    window.electronAPI.data((_, data) => {
      setData([...data]);
    });
    window.electronAPI.getData();
    return () => {
      window.electronAPI.cleanListeners(["data"]);
    };
  }, []);

  return (
    <Container>
      <Main>
        <BackButton onClick={() => navigate("/")}>
          <MdKeyboardReturn size="2rem" />
        </BackButton>
        <Title>
          <h1>History</h1>
        </Title>
        <List>
          {data.map((item) => {
            const csv = exportData(item);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            return (
              <Item key={new Date(item.date).toISOString()} href={url}>
                <ItemTitle>
                  <h3>{new Date(item.date).toLocaleDateString()}</h3>
                  <ItemInfos>
                    <div>
                      <p>Experiment: {item.experiment.name}</p>
                      <p>Connection: {item.connection}</p>
                    </div>
                  </ItemInfos>
                </ItemTitle>
                <ItemIcon>
                  <MdOutlineHistory size="4.5rem" />
                </ItemIcon>
              </Item>
            );
          })}
        </List>
      </Main>
    </Container>
  );
}
