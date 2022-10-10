import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  rgbToHex,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 300,
          textAlign: "center",
        }}
      >
        <Button variant="text">
          <Link to="/">Home</Link>
        </Button>
      </Box>
      <Box
        sx={{
          width: 300,
          height: 80,
          color: "white",
          backgroundColor: rgbToHex("rgb(38, 59, 56)"),
        }}
      >
        <Button variant="text">
          <Link to="/providers/bulk">Providers</Link>
        </Button>
      </Box>
      <Box
        sx={{
          width: 300,
          textAlign: "center",
        }}
      >
        <Button variant="text">
          <Link to="/users/bulk">Users</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
