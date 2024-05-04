import { useEffect, useRef, useState } from "react";
import { useExperiment } from "../../contexts/Experiment";
import TerminalElement from "../TerminalElement";

import { Container, Input, Screen } from "./styles";

export default function Terminal({ className }: { className: string }) {
  const { terminal, handleWriting } = useExperiment();
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleWriting(value);
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
        onScroll={(event) =>
          event.currentTarget.scrollHeight - event.currentTarget.scrollTop < 400
            ? setAutoScroll(true)
            : setAutoScroll(false)
        }
        ref={ref}
      >
        {terminal.map((element, index) => (
          <TerminalElement
            key={`terminal-element-${index}`}
            date={element.date}
            reading={element.reading}
          />
        ))}
      </Screen>
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
