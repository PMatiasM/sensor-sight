import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { useDialogController } from "../../hooks/useDialogController";
import { useContextMenuController } from "../../hooks/useContextMenuController";
import { useExperiment } from "../../contexts/Experiment";
import ExperimentsList from "../../components/ExperimentsList";
import ExperimentDialog from "../../components/ExperimentDialog";
import ExperimentDeleteDialog from "../../components/ExperimentDeleteDialog";

export default function Experiments() {
  const navigate = useNavigate();
  const { copy, destroy } = useExperiment();
  const defaultExperimentsContextMenu = useContextMenuController();
  const userExperimentsContextMenu = useContextMenuController();
  const experimentDialog = useDialogController();
  const experimentDeleteDialog = useDialogController();

  return (
    <div className="flex justify-content-center align-items-center w-full h-full p-6">
      <div className="card flex flex-column align-items-center w-8 h-full">
        <div className="flex justify-content-between align-items-center w-full mb-3">
          <Button className="p-2" outlined onClick={() => navigate("/")}>
            <i className="pi pi-arrow-left text-xl" />
          </Button>
          <h1 className="m-0">Experiments</h1>
          <Button
            className="p-2"
            outlined
            onClick={() => {
              destroy();
              experimentDialog.open();
            }}
          >
            <i className="pi pi-plus text-xl" />
          </Button>
        </div>
        <ExperimentsList
          defaultExperimentsContextMenu={defaultExperimentsContextMenu}
          userExperimentsContextMenu={userExperimentsContextMenu}
        />
      </div>
      <ContextMenu
        ref={defaultExperimentsContextMenu.ref}
        model={[
          {
            label: "Copy",
            icon: "pi pi-clone",
            command: () => {
              copy();
              experimentDialog.open();
            },
          },
          {
            label: "Info",
            icon: "pi pi-info-circle",
            command: () => {},
          },
        ]}
      />
      <ContextMenu
        ref={userExperimentsContextMenu.ref}
        model={[
          {
            label: "Edit",
            icon: "pi pi-pencil",
            command: experimentDialog.open,
          },
          {
            label: "Delete",
            icon: "pi pi-trash",
            command: experimentDeleteDialog.open,
          },
        ]}
      />
      <ExperimentDialog experimentDialog={experimentDialog} />
      <ExperimentDeleteDialog experimentDeleteDialog={experimentDeleteDialog} />
    </div>
  );
}
