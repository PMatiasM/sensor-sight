import { useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DialogController } from "../../types/DialogController";
import { useToast } from "../../contexts/Toast";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { CONNECTION } from "../../enums/Connection";

export default function NetworkDialog({
  networkDialog,
}: {
  networkDialog: DialogController;
}) {
  const toast = useToast();
  const { config } = useConfig();
  const { connect, configureDisconnect } = useExperiment();
  const [URI, setURI] = useState<string>(config!.network.URI);
  const [loading, setLoading] = useState(false);

  const cancel = () => {
    networkDialog.close();
    setURI(config!.network.URI);
  };

  const request = async () => {
    try {
      const { data } = await axios.get(URI);
      console.log(data);
    } catch (error) {}
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      await axios.get(URI);
      toast.success("Connected");
      connect(CONNECTION.NETWORK, URI);
      const interval = setInterval(request, config!.network.requestInterval);
      configureDisconnect(async () => {
        clearInterval(interval);
      });
    } catch (error) {
      cancel();
      toast.error("Failed to connect");
    }
    setLoading(false);
    networkDialog.close();
  };

  return (
    <Dialog
      visible={networkDialog.visible}
      style={{ width: "24rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Network URI"
      draggable={false}
      modal
      className="p-fluid"
      onHide={cancel}
      footer={() => (
        <>
          <Button
            label="Cancel"
            severity="secondary"
            loading={loading}
            onClick={cancel}
          />
          <Button
            label="Connect"
            severity="success"
            loading={loading}
            onClick={handleConnect}
          />
        </>
      )}
    >
      <div className="field">
        <InputText
          id="network-URI-input"
          spellCheck={false}
          value={URI}
          onChange={(event) => setURI(event.target.value)}
        />
      </div>
    </Dialog>
  );
}
