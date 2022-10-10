import { Box, CssBaseline, ThemeProvider,  } from "@mui/material";
import { ipcRenderer } from "electron";
import { useNavigate } from "react-router-dom";
import React from "react";
import Routers from "./Routers";
import theme from "./theme";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  ipcRenderer.on("update-route", (event, message) => {
    navigate(message);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}
