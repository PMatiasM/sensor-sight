import { useEffect, useState } from "react";
import { ElectronWindow } from "../../interfaces/ElectronWindow";
import { useConfig } from "../../contexts/Config";
import { closeModal } from "../../common/utils/modalControl";
import { Config } from "../../types/Config";

import { CancelButton, Category, Form, Title } from "./styles";

declare const window: ElectronWindow;

export default function ConfigModal() {
  const { config } = useConfig();
  const [data, setData] = useState<Config>({ ...config! });
  const delimiters = ["\n", "\r", "\r\n"];

  const cancel = () => {
    setData({ ...config! });
  };

  useEffect(() => {
    setData({ ...config! });
  }, [config]);
  return (
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
                            attemptsToFindTheDevice: Number(event.target.value),
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
              <Title>Serial</Title>
              <Form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="serial-baud-rate-input">Baud Rate</label>
                    <input
                      type="number"
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
                    />
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
                      {delimiters.map((delimiter) => (
                        <option key={delimiter} value={delimiter}>
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
              onClick={() => {
                window.electronAPI.resetConfig();
                closeModal("config-modal");
              }}
            >
              Reset
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                window.electronAPI.updateConfig({
                  ...data,
                  serial: {
                    ...data.serial,
                    baudRate: 10,
                  },
                });
                closeModal("config-modal");
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
