import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./contexts/Toast";
import { ConfigProvider } from "./contexts/Config";
import { ExperimentProvider } from "./contexts/Experiment";
import TitleBar from "./components/TitleBar";
import AppRouter from "./routes";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "./styles/layout.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ToastProvider>
        <ConfigProvider>
          <ExperimentProvider>
            <div className="flex flex-column select-none h-screen">
              <TitleBar />
              <div className="flex flex-1 overflow-hidden	">
                <AppRouter />
              </div>
            </div>
          </ExperimentProvider>
        </ConfigProvider>
      </ToastProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
