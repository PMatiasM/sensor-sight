import {
  MdOutlineContentCopy,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineInfo,
} from "react-icons/md";
import { useExperiment } from "../../contexts/Experiment";
import { ContextMenu } from "../../types/ContextMenu";
import { VIEW } from "../../enums/View";
import { openModal } from "../../common/utils/modalControl";

import { Menu, MenuBody, MenuDivider, MenuItem } from "./styles";

export default function ExperimentContextMenu({
  reference,
  contextMenu,
}: {
  reference: React.MutableRefObject<HTMLMenuElement | null>;
  contextMenu: ContextMenu | null;
}) {
  const { create } = useExperiment();
  return (
    <Menu
      ref={reference}
      $opened={!!contextMenu}
      $top={contextMenu ? contextMenu.positioning.mouseY : null}
      $left={contextMenu ? contextMenu.positioning.mouseX : null}
    >
      {contextMenu ? (
        contextMenu.view === VIEW.DEFAULT ? (
          <MenuBody>
            <MenuItem
              onClick={() => {
                create({ ...contextMenu.experiment, id: "" });
                openModal("experiment-modal");
              }}
            >
              <MdOutlineContentCopy />
              <span>Copy</span>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => alert(`Infos: ${contextMenu.experiment.id}`)}
            >
              <MdOutlineInfo />
              <span>Info</span>
            </MenuItem>
          </MenuBody>
        ) : (
          <MenuBody>
            <MenuItem
              onClick={() => {
                create({ ...contextMenu.experiment });
                openModal("experiment-modal");
              }}
            >
              <MdOutlineEdit />
              <span>Edit</span>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              $delete
              onClick={() => {
                create(contextMenu.experiment);
                openModal("experiment-delete-modal");
              }}
            >
              <MdOutlineDelete />
              <span>Delete</span>
            </MenuItem>
          </MenuBody>
        )
      ) : (
        <></>
      )}
    </Menu>
  );
}
