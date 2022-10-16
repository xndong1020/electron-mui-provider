import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import { IProvider, IUser } from "../interfaces";
import ProviderDataTable from "./ProviderDataTable";
import UserDataTable from "./UserDataTable";

interface DataModalProps {
  title?: string;
  open: boolean;
  data: IProvider[] | IUser[];
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

const IsProvidersList = (data: IProvider[] | IUser[]): data is IProvider[] => {
  return data.length > 0 && "tradingName" in data[0];
};

const IsUsersList = (data: IProvider[] | IUser[]): data is IUser[] => {
  return data.length > 0 && "role" in data[0];
};

const DataModal = ({ title, open, data, handleClose }: DataModalProps) => {
  const handleSubmitProviders = (data: IProvider[]): void => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const handleSubmitUsers = (data: IUser[]): void => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
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
          {IsProvidersList(data) && (
            <ProviderDataTable rows={data as IProvider[]} />
          )}
          {IsUsersList(data) && <UserDataTable rows={data as IUser[]} />}
          <Grid container justifyContent="center">
            <Button onClick={handleClose}>Cancel</Button>

            {IsProvidersList(data) && (
              <Button
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(e) => {
                  handleSubmitProviders(data);
                }}
              >
                Submit
              </Button>
            )}
            {IsUsersList(data) && (
              <Button // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(e) => {
                  handleSubmitUsers(data);
                }}
              >
                Submit
              </Button>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DataModal;
