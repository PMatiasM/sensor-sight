import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ExperimentProvider } from "./contexts/Experiment";
import { ConfigProvider } from "./contexts/Config";
import TitleBar from "./components/TitleBar";
import AppRouter from "./routes";

import "react-toastify/dist/ReactToastify.css";
import { App, Window } from "./styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <ExperimentProvider>
        <Window>
          <TitleBar />
          <App>
            <AppRouter />
          </App>
        </Window>
      </ExperimentProvider>
    </ConfigProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);
