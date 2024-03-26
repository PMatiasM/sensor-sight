import { useEffect, useState } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { BAUDRATES, DELIMITERS, INTERVALS } from "../../constants";
import { closeModal } from "../../common/utils/modalControl";
import { Config } from "../../types/Config";

import { CancelButton, Category, Form, Title } from "./styles";

declare const window: ElectronWindow;

export default function ConfigModal() {
  const { config } = useConfig();
  const [data, setData] = useState<Config>({ ...config! });

  const cancel = () => {
    setData({ ...config! });
  };

  useEffect(() => {
    setData({ ...config! });
  }, [config]);
  return (
    <>
      <div
        className="modal fade"
        id="config-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="config-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="config-modal-label">
                Settings
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cancel}
              />
            </div>
            <div className="modal-body">
              <Category>
                <Title>Bluetooth</Title>
                <Form>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="bluetooth-primaryService-input">
                        Primary Service
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bluetooth-primaryService-input"
                        value={data.bluetooth.primaryService}
                        onChange={(event) =>
                          setData((data) => ({
                            ...data,
                            bluetooth: {
                              ...data.bluetooth,
                              primaryService: event.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="bluetooth-characteristic-input">
                        Characteristic
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bluetooth-characteristic-input"
                        value={data.bluetooth.characteristic}
                        onChange={(event) =>
                          setData((data) => ({
                            ...data,
                            bluetooth: {
                              ...data.bluetooth,
                              characteristic: event.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="bluetooth-attempts-to-find-the-device-input">
                        Attempts To Find The Device
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="bluetooth-attempts-to-find-the-device-input"
                        value={data.bluetooth.attemptsToFindTheDevice}
                        onChange={(event) =>
                          setData((data) => ({
                            ...data,
                            bluetooth: {
                              ...data.bluetooth,
                              attemptsToFindTheDevice: Number(
                                event.target.value
                              ),
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="col" />
                  </div>
                </Form>
              </Category>
              <Category>
                <Title>Network</Title>
                <Form>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="network-URI-input">URI</label>
                      <input
                        type="text"
                        className="form-control"
                        id="network-URI-input"
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
                    <div className="col">
                      <label htmlFor="network-request-interval-input">
                        Request Interval
                      </label>
                      <select
                        className="form-control"
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
                      >
                        {INTERVALS.map((interval) => (
                          <option
                            key={`network-interval-${interval}`}
                            value={interval}
                          >
                            {interval}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Form>
              </Category>
              <Category>
                <Title>Serial</Title>
                <Form>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="serial-baud-rate-input">Baud Rate</label>
                      <select
                        className="form-control"
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
                      >
                        {BAUDRATES.map((baudRate) => (
                          <option
                            key={`serial-baudRate-${baudRate}`}
                            value={baudRate}
                          >
                            {baudRate}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="serial-delimiter-input">Delimiter</label>
                      <select
                        className="form-control"
                        id="serial-delimiter-input"
                        value={data.serial.delimiter}
                        onChange={(event) =>
                          setData((data) => ({
                            ...data,
                            serial: {
                              ...data.serial,
                              delimiter: event.target.value,
                            },
                          }))
                        }
                      >
                        {DELIMITERS.map((delimiter) => (
                          <option
                            key={`serial-delimiter-${delimiter}`}
                            value={delimiter}
                          >
                            {JSON.stringify(delimiter)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Form>
              </Category>
            </div>
            <div className="modal-footer">
              <CancelButton
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancel}
              >
                Cancel
              </CancelButton>
              <button
                className="btn btn-warning"
                data-bs-target="#config-confirmation-modal"
                data-bs-toggle="modal"
              >
                Reset
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  window.electronAPI.updateConfig(data);
                  closeModal("config-modal");
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="config-confirmation-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="config-confirmation-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="config-confirmation-modal-label"
              >
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-target="#config-modal"
                data-bs-toggle="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure you want to restore the default settings?
            </div>
            <div className="modal-footer">
              <CancelButton
                className="btn btn-secondary"
                data-bs-target="#config-modal"
                data-bs-toggle="modal"
              >
                Cancel
              </CancelButton>
              <button
                className="btn btn-warning"
                onClick={() => {
                  window.electronAPI.resetConfig();
                  closeModal("config-confirmation-modal");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
