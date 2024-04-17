import { MdOutlineDelete } from "react-icons/md";
import { Positioning } from "../../types/Positioning";
import { openModal } from "../../common/utils/modalControl";

import { Menu, MenuBody, MenuItem } from "./styles";

export default function HistoryContextMenu({
  reference,
  positioning,
}: {
  reference: React.MutableRefObject<HTMLMenuElement | null>;
  positioning: Positioning | null;
}) {
  return (
    <Menu
      ref={reference}
      $opened={!!positioning}
      $top={positioning ? positioning.mouseY : null}
      $left={positioning ? positioning.mouseX : null}
    >
      <MenuBody>
        <MenuItem $delete onClick={() => openModal("history-delete-modal")}>
          <MdOutlineDelete />
          <span>Delete</span>
        </MenuItem>
      </MenuBody>
    </Menu>
  );
}
