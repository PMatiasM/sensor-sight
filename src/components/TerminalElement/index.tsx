import { PREFIX_LENGTH } from "../../constants";
import { PREFIXES } from "../../enums/Prefixes";

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
        return { tag: "DATA", color: "text-green-600", text: parsedReading };
      case PREFIXES.SSL:
        return { tag: "LOG", color: "text-blue-600", text: parsedReading };
      case PREFIXES.SSW:
        return {
          tag: "WARNING",
          color: "text-yellow-600",
          text: parsedReading,
        };
      case PREFIXES.SSE:
        return { tag: "ERROR", color: "text-red-600", text: parsedReading };
      default:
        return { tag: "RAW", color: "text-color", text: reading };
    }
  };
  const { tag, color, text } = parse();
  return (
    <span className={`block select-text	${color}`}>{`[${new Date(
      date
    ).toLocaleTimeString()}] [${tag}] ${text}`}</span>
  );
}
