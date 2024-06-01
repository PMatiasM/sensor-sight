import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { BAUDRATES, INTERVALS } from "../../constants";
import { Config } from "../../types/Config";
import { DialogController } from "../../types/DialogController";

declare const window: ElectronWindow;

export default function SettingsDialog({
  settingsDialog,
}: {
  settingsDialog: DialogController;
}) {
  const { config } = useConfig();
  const [data, setData] = useState<Config>({ ...config! });

  const cancel = () => {
    setData({ ...config! });
    settingsDialog.close();
  };

  useEffect(() => {
    setData({ ...config! });
  }, [config]);
  return (
    <Dialog
      visible={settingsDialog.visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Settings"
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <>
          <Button label="Cancel" severity="secondary" onClick={cancel} />
          <Button
            label="Reset"
            severity="warning"
            onClick={(event) => {
              confirmPopup({
                target: event.currentTarget,
                message: "Do you want to restore the default settings?",
                icon: "pi pi-exclamation-triangle",
                defaultFocus: "reject",
                acceptClassName: "p-button-danger",
                accept: window.electronAPI.resetConfig,
              });
            }}
          />
          <Button
            label="Save"
            severity="success"
            onClick={() => {
              window.electronAPI.updateConfig(data);
              settingsDialog.close();
            }}
          />
        </>
      )}
    >
      <div className="field">
        <label htmlFor="network-URI-input" className="font-bold">
          URI
        </label>
        <InputText
          id="network-URI-input"
          spellCheck={false}
          value={data.network.URI}
          onChange={(event) =>
            setData((data) => ({
              ...data,
              network: {
                ...data.network,
                URI: event.target.value,
              },
            }))
          }
        />
      </div>
      <div className="formgrid grid">
        <div className="field col">
          <label htmlFor="network-request-interval-input" className="font-bold">
            Request Interval (ms)
          </label>
          <Dropdown
            id="network-request-interval-input"
            value={data.network.requestInterval}
            onChange={(event) =>
              setData((data) => ({
                ...data,
                network: {
                  ...data.network,
                  requestInterval: Number(event.target.value),
                },
              }))
            }
            options={INTERVALS}
          />
        </div>
        <div className="field col">
          <label htmlFor="serial-baud-rate-input" className="font-bold">
            Baud Rate
          </label>
          <Dropdown
            id="serial-baud-rate-input"
            value={data.serial.baudRate}
            onChange={(event) =>
              setData((data) => ({
                ...data,
                serial: {
                  ...data.serial,
                  baudRate: Number(event.target.value),
                },
              }))
            }
            options={BAUDRATES}
          />
        </div>
      </div>
      <ConfirmPopup />
    </Dialog>
  );
}
