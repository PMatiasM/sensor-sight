import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ConnectionProvider } from "./contexts/Connection";
import { ConfigProvider } from "./contexts/Config";
import AppRouter from "./routes";

import "react-toastify/dist/ReactToastify.css";
import { App, Window } from "./styles";
import TitleBar from "./components/TitleBar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <ConnectionProvider>
        <Window>
          <TitleBar />
          <App>
            <AppRouter />
          </App>
        </Window>
      </ConnectionProvider>
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
