import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";

const DeleteUser = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <PublicRouteLayout title="Delete User">
      <Box>
        <div>Delete User</div>
        <Button variant="text" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </PublicRouteLayout>
  );
};

export default DeleteUser;
