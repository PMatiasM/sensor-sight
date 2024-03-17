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
    const header = "Device, Connection, Date, X, Y";
    return [
      header,
      ...data.readings.map(
        (reading) =>
          `${data.device},${data.connection},${data.date},${reading.x},${reading.y}`
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
