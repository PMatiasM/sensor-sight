import { useEffect, useRef, useState } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useExperiment } from "../../contexts/Experiment";

import { Container, Input, Screen } from "./styles";

declare const window: ElectronWindow;

export default function Terminal({ className }: { className: string }) {
  const { terminal, handleWriting } = useExperiment();
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);
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
