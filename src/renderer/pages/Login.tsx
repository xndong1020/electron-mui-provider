import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginRequest } from "../interfaces";
import { loginAsync } from "../services/auth.service";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";
import { GlobalContext } from "../contexts/GlobalContext";

type LoginProps = Omit<LoginRequest, "pool">;

const Login = () => {
  const [form, setForm] = useState<LoginProps>({ username: "", password: "" });
  const { setLoadingStatus } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoadingStatus(true);
      const { error } = await loginAsync(form);
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <PublicRouteLayout title="Login">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 20px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "45vh",
        }}
      >
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            id="username"
            name="username"
            label="Username"
            value={form.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            variant="standard"
          />
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={form.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            variant="standard"
          />
        </Box>
        <Box>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </PublicRouteLayout>
  );
};

export default Login;
