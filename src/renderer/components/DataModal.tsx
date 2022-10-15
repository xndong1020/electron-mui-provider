import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import { IProvider } from "../interfaces";
import ProviderDataTable from "./ProviderDataTable";

interface DataModalProps {
  title?: string;
  open: boolean;
  data: IProvider[];
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DataModal = ({ title, open, data, handleClose }: DataModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <ProviderDataTable rows={data} />
          <Grid container justifyContent="center">
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Submit</Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DataModal;
