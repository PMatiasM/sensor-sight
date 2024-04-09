import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn } from "react-icons/md";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { Data } from "../../types/Data";

import { BackButton, Container, List, ListItem, Main } from "./styles";

declare const window: ElectronWindow;

export default function History() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  const exportData = (data: Data) => {
    const header = `Device, Connection, Date, ${data.experiment.variables
      .map((variable) => variable.name)
      .join(", ")}`;
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
        <List>
          {data.map((item) => {
            const csv = exportData(item);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            return (
              <ListItem key={new Date(item.date).toISOString()} href={url}>
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <span>{item.device}</span>
                <span>{item.connection}</span>
              </ListItem>
            );
          })}
        </List>
      </Main>
    </Container>
  );
}
