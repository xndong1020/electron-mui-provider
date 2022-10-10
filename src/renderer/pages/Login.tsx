import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginRequest } from "../interfaces";
import { loginAsync } from "../services/auth.service";

type LoginProps = Omit<LoginRequest, "pool">;

const Login = () => {
  const [form, setForm] = useState<LoginProps>({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await loginAsync(form);
    if (!error) {
      navigate("/home");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      noValidate
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
  );
};

export default Login;
