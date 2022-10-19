/* eslint-disable no-console */
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";
import { deactivateUserAsync } from "../services/users.service";
import { notifyError, notifyGood } from "../_utils/toastor";

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("email", email);
    const { error } = await deactivateUserAsync(email.replace("@", "_"));

    if (!error) {
      notifyGood({
        message: `User ${email} has been deactivated successfully`,
      });
    } else {
      notifyError({
        message: `User ${email} deactivation failed. Error:${error}`,
      });
    }
  };

  return (
    <PublicRouteLayout title="Delete User">
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
            id="email"
            name="email"
            label="email"
            value={email}
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
        <Button variant="text" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </PublicRouteLayout>
  );
};

export default DeleteUser;
