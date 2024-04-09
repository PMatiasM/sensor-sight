import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { useExperiment } from "../../contexts/Experiment";
import { closeModal } from "../../common/utils/modalControl";
import { CONNECTION } from "../../enums/Connection";
import Spinner from "../Spinner";

import { Button } from "./styles";

declare const window: ElectronWindow;

export default function NetworkModal() {
  const { config } = useConfig();
  const { connect, configureDisconnect } = useExperiment();
  const [URI, setURI] = useState<string>(config!.network.URI);
  const [loading, setLoading] = useState(false);

  const cancel = () => {
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
    closeModal("network-modal");
  };

  return (
    <div
      className="modal fade"
      id="network-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="network-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="network-modal-label">
              Network URI
            </h1>
            {!loading && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cancel}
              />
            )}
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              id="network-URI-input"
              value={URI}
              onChange={(event) => setURI(event.target.value)}
            />
          </div>
          <div className="modal-footer">
            <Button
              disabled={loading}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={cancel}
            >
              {loading ? <Spinner /> : "Cancel"}
            </Button>
            <Button className="btn btn-success" onClick={handleConnect}>
              {loading ? <Spinner /> : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
