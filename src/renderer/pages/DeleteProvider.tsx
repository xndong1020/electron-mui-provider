import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";

const DeleteProvider = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <PublicRouteLayout title="Delete Provider">
      <Box>
        <div>Delete Provider</div>
        <Button variant="text" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </PublicRouteLayout>
  );
};

export default DeleteProvider;
