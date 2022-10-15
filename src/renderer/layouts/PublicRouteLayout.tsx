import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import bgImage from "../assets/LP-Admin-BG.webp";

interface PublicRouteLayoutProps {
  title: string;
  children: JSX.Element;
}

/**
 *
 * @param Title and child Component
 * @returns Layout for Login Page and Register Page
 */
export const PublicRouteLayout = ({
  children,
}: PublicRouteLayoutProps): JSX.Element => {
  return (
    <Grid
      container
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        background: `url(${bgImage}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Grid
          item
          xs={12}
          component={Paper}
          sx={{
            padding: "12px 32px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "16px",
            backdropFilter: "blur(36px)",
            boxShadow:
              "0px 0px 18px rgba(0, 0, 0, 0.12), 0px 0px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box>
            <section>{children}</section>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
