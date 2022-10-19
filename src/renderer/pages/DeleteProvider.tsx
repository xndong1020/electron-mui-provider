/* eslint-disable no-console */
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";
import { deleteProviderAsync } from "../services/providers.service";
import { notifyError, notifyGood } from "../_utils/toastor";

const DeleteProvider = () => {
  const [providerId, setProviderId] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setProviderId(evt.target.value);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("providerId", providerId);
    const { error } = await deleteProviderAsync(providerId);
    if (!error) {
      notifyGood({
        message: `Provider ${providerId} has been deleted successfully`,
      });
    } else {
      notifyError({
        message: `Provider ${providerId} deletion failed. Error:${error}`,
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
            id="providerId"
            name="providerId"
            label="providerId"
            value={providerId}
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

export default DeleteProvider;
