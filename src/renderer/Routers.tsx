import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateNewProvider from "./pages/CreateNewProvider";
import CreateNewUser from "./pages/CreateNewUser";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
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
  );
};

export default Routers;
