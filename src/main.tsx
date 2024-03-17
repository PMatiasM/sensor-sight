import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ConnectionProvider } from "./contexts/Connection";
import { ConfigProvider } from "./contexts/Config";
import AppRouter from "./routes";

import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles>
      <ConfigProvider>
        <ConnectionProvider>
          <AppRouter />
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
    </GlobalStyles>
  </React.StrictMode>
);
