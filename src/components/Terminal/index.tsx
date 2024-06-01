import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useExperiment } from "../../contexts/Experiment";
import TerminalElement from "../TerminalElement";

export default function Terminal() {
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
    <div className="flex flex-column w-full h-22rem">
      <div
        className="card p-2 mb-0 border-noround-bottom overflow-auto w-full h-20rem"
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
      </div>
      <form onSubmit={handleSubmit}>
        <InputText
          className="card border-noround-top	p-2 w-full"
          placeholder="Message (Enter to send message)"
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </div>
  );
}
