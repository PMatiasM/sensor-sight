import { MdOutlineFunctions, MdOutlineNumbers } from "react-icons/md";
import { Positioning } from "../../types/Positioning";
import { ParsedData } from "../../types/ParsedData";

import { Menu, MenuBody, MenuItem } from "./styles";

export default function ChartContextMenu({
  reference,
  positioning,
  parsedData,
  selectChartVariable,
}: {
  reference: React.MutableRefObject<HTMLMenuElement | null>;
  positioning: Positioning | null;
  parsedData: ParsedData[];
  selectChartVariable: (variable: string | null) => void;
}) {
  return (
    <Menu
      ref={reference}
      $opened={!!positioning}
      $top={positioning ? positioning.mouseY : null}
      $left={positioning ? positioning.mouseX : null}
    >
      <MenuBody>
        {parsedData.map(({ variable }) => (
          <MenuItem onClick={() => selectChartVariable(variable.name)}>
            <MdOutlineFunctions />
            <span>{variable.name}</span>
          </MenuItem>
        ))}
        <MenuItem onClick={() => selectChartVariable(null)}>
          <MdOutlineNumbers />
          <span>All</span>
        </MenuItem>
      </MenuBody>
    </Menu>
  );
}
