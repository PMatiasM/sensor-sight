import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { Data } from "../../types/Data";
import { useContextMenuController } from "../../hooks/useContextMenuController";
import { useDialogController } from "../../hooks/useDialogController";

declare const window: ElectronWindow;

export default function History() {
  const navigate = useNavigate();
  const historyContextMenu = useContextMenuController();
  const historyDeleteDialog = useDialogController();
  const [deleteId, setDeleteId] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const exportData = (data: Data) => {
    const header = `Device, Connection, Date, ${data.experiment.variables
      .map((variable) => variable.name)
      .join(", ")}`;
    if (!data.readings.length) {
      return header;
    }
    return [
      header,
      ...data.readings[0].map(
        (_, index) =>
          `${data.device}, ${data.connection}, ${
            data.readings[0][index].x
          }, ${data.readings.map((reading) => reading[index].y).join(", ")}`
      ),
    ].join("\r\n");
  };

  const template = (item: Data | null) => {
    if (item && !loading) {
      const csv = exportData(item);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      return (
        <div className="col-6 p-2" key={item.id}>
          <a
            className="card block cursor-pointer p-2 hover:surface-hover"
            href={url}
            onContextMenu={(event) => {
              setDeleteId(item.id);
              historyContextMenu.open(event);
            }}
          >
            <div className="grid m-0">
              <div className="col-9">
                <div className="grid m-0">
                  <div className="col-12">
                    <h3 className="m-0">
                      {new Date(item.date).toLocaleDateString()}
                    </h3>
                  </div>
                  <div className="col-12">
                    <span>Experiment: {item.experiment.name}</span>
                  </div>
                  <div className="col-12">
                    <span>Connection: {item.connection}</span>
                  </div>
                </div>
              </div>
              <div className="col-3 flex justify-content-center align-items-center">
                <i className="pi pi-history text-6xl" />
              </div>
            </div>
          </a>
        </div>
      );
    }
    return (
      <div className="col-6 p-2" key={new Date().toISOString()}>
        <a className="card block cursor-pointer p-2">
          <div className="grid m-0">
            <div className="col-9">
              <div className="grid m-0">
                <div className="col-12">
                  <h3 className="m-0">
                    <Skeleton className="w-11rem border-round h-2rem" />
                  </h3>
                </div>
                <div className="col-12">
                  <Skeleton className="w-9rem border-round h-1rem" />
                </div>
                <div className="col-12">
                  <Skeleton className="w-9rem border-round h-1rem" />
                </div>
              </div>
            </div>
            <div className="col-3 flex justify-content-center align-items-center">
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </a>
      </div>
    );
  };

  useEffect(() => {
    window.electronAPI.data((_, data) => {
      setData([...data]);
      setLoading(false);
    });
    window.electronAPI.getData();
    return () => {
      window.electronAPI.cleanListeners(["data"]);
    };
  }, []);
  return (
    <div className="flex justify-content-center align-items-center w-full h-full p-6">
      <div className="card flex flex-column align-items-center relative w-8 h-full">
        <div className="flex justify-content-between align-items-center w-full mb-6">
          <div className="w-3rem">
            <Button className="p-2" outlined onClick={() => navigate("/")}>
              <i className="pi pi-arrow-left text-xl" />
            </Button>
          </div>
          <h1 className="m-0">History</h1>
          <div className="w-3rem" />
        </div>
        <div className="w-full">
          <DataView
            className="max-h-30rem overflow-auto"
            emptyMessage="No experiments found."
            value={loading ? Array.from({ length: 6 }, () => null) : data}
            itemTemplate={template}
            layout="grid"
          />
        </div>
      </div>
      <ContextMenu
        ref={historyContextMenu.ref}
        model={[
          {
            label: "Delete",
            icon: "pi pi-trash",
            command: historyDeleteDialog.open,
          },
        ]}
      />
      <Dialog
        visible={historyDeleteDialog.visible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Are you sure?"
        draggable={false}
        modal
        className="p-fluid"
        onHide={historyDeleteDialog.close}
        footer={() => (
          <>
            <Button
              label="No"
              severity="secondary"
              onClick={historyDeleteDialog.close}
            />
            <Button
              label="Yes"
              severity="danger"
              onClick={() => {
                deleteId && window.electronAPI.deleteData(deleteId);
                historyDeleteDialog.close();
              }}
            />
          </>
        )}
      >
        Do you really want to delete this history?
      </Dialog>
    </div>
  );
}
