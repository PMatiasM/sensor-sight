import { useEffect, useRef, useState } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useConnection } from "../../contexts/Connection";
import { CONNECTION } from "../../enums/Connection";

import { Container, Input, Screen } from "./styles";

declare const window: ElectronWindow;

export default function Terminal({ className }: { className: string }) {
  const { config } = useConfig();
  const { connection, terminal } = useConnection();
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (connection) {
      case CONNECTION.BLUETOOTH:
        break;
      case CONNECTION.NETWORK:
        console.log(`Network Terminal - ${value}`);
        break;
      case CONNECTION.SERIAL:
        window.electronAPI.serialPortWriting(
          `${value}${config!.serial.delimiter}`
        );
        break;
      default:
        break;
    }
    setValue("");
  };
  useEffect(() => {
    if (ref.current && autoScroll) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [terminal]);
  return (
    <Container className={className}>
      <Screen
        disabled
        onScroll={(event) =>
          event.currentTarget.scrollHeight - event.currentTarget.scrollTop < 400
            ? setAutoScroll(true)
            : setAutoScroll(false)
        }
        value={terminal}
        ref={ref}
      />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          spellCheck={false}
          placeholder="Message (Enter to send message)"
        />
      </form>
    </Container>
  );
}
