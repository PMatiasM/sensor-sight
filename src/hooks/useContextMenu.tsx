import { useEffect, useRef, useState } from "react";
import { Positioning } from "../types/Positioning";

export function useContextMenu() {
  const ref = useRef<HTMLMenuElement | null>(null);
  const [positioning, setPositioning] = useState<Positioning | null>(null);
  const handleContextMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPositioning({
      mouseY: event.clientY - 6,
      mouseX: event.clientX + 2,
    });
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && event.target) {
        setPositioning(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return { ref, positioning, handleContextMenu };
}
