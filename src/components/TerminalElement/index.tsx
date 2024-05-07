import { PREFIX_LENGTH } from "../../constants";
import { PREFIXES } from "../../enums/Prefixes";

import { Element } from "./styles";

export default function TerminalElement({
  date,
  reading,
}: {
  date: Date;
  reading: string;
}) {
  const prefix = reading.substring(0, PREFIX_LENGTH);
  const parsedReading = reading.substring(PREFIX_LENGTH);
  const parse = () => {
    switch (prefix) {
      case PREFIXES.SSD:
        return { tag: "DATA", color: "#00b84c", text: parsedReading };
      case PREFIXES.SSL:
        return { tag: "LOG", color: "#027df0", text: parsedReading };
      case PREFIXES.SSW:
        return { tag: "WARNING", color: "#f3f734", text: parsedReading };
      case PREFIXES.SSE:
        return { tag: "ERROR", color: "#fc6b6b", text: parsedReading };
      default:
        return { tag: "RAW", color: "#ffffff", text: reading };
    }
  };
  const { tag, color, text } = parse();
  return (
    <Element $color={color}>{`[${new Date(
      date
    ).toLocaleTimeString()}] [${tag}] ${text}`}</Element>
  );
}