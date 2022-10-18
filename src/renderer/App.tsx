import { CssBaseline, ThemeProvider } from "@mui/material";
import { ipcRenderer } from "electron";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";
import Routers from "./Routers";
import theme from "./theme";

import "react-toastify/dist/ReactToastify.css";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  ipcRenderer.on("update-route", (event, message) => {
    navigate(message);
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-left"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        style={{ zIndex: 999999 }}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}
