import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";

const DeleteCourse = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <PublicRouteLayout title="delete course">
      <Box>
        <div>Delete Course</div>
        <Button variant="text" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </PublicRouteLayout>
  );
};

export default DeleteCourse;
