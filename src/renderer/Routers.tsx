import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./contexts/GlobalContext";
import CreateNewProvider from "./pages/CreateNewProvider";
import CreateNewUser from "./pages/CreateNewUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import theme from "./theme";

const Routers = () => {
  const { loading } = useContext(GlobalContext);
  return (
    <>
      <Backdrop
        open={loading}
        sx={{
          color: "white",
          zIndex: theme.zIndex.drawer - 1,
          opacity: 0.5,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="/main_window" element={<Home />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="providers">
          <Route path="new" element={<CreateNewProvider />} />
          <Route path="bulk" element={<CreateNewProvider />} />
        </Route>
        <Route path="users">
          <Route path="new" element={<CreateNewUser />} />
          <Route path="bulk" element={<CreateNewUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
