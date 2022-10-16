import { Box, Grid, Paper, styled } from "@mui/material";
import React from "react";
import MediaCard from "../components/MediaCard";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <PublicRouteLayout title="Home">
      <Box
        sx={{
          padding: "20px 10px",
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Item>
              <MediaCard
                description="Dashboard"
                linkTo="/"
                imgUrl="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                sx={{ flex: "50%" }}
              />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <MediaCard
                description="Providers Bulk"
                linkTo="/providers/bulk"
                imgUrl="https://mui.com/static/images/cards/paella.jpg"
                sx={{ flex: "50%" }}
              />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <MediaCard
                description="Users Bulk"
                linkTo="/users/bulk"
                imgUrl="https://mui.com/static/images/cards/live-from-space.jpg"
                sx={{ flex: "50%" }}
              />{" "}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </PublicRouteLayout>
  );
};

export default Home;
