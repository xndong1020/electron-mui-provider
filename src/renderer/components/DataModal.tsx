/* eslint-disable no-console */
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import {
  IProvider,
  IProviderViewData,
  IUser,
  IUserViewData,
} from "../interfaces";
import ProviderDataTable from "./ProviderDataTable";
import UserDataTable from "./UserDataTable";

interface DataModalProps {
  title?: string;
  open: boolean;
  data: IProviderViewData[] | IUserViewData[];
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

const IsProvidersList = (
  data: IProviderViewData[] | IUserViewData[]
): data is IProviderViewData[] => {
  return data.length > 0 && "tradingName" in data[0];
};

const IsUsersList = (
  data: IProviderViewData[] | IUserViewData[]
): data is IUserViewData[] => {
  return data.length > 0 && "role" in data[0];
};

const DataModal = ({ title, open, data, handleClose }: DataModalProps) => {
  const handleSubmitProviders = (providers: IProvider[]): void => {
    console.log("providers", providers);
  };
  const handleSubmitUsers = (users: IUser[]): void => {
    console.log("users", users);
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
                disabled={data.some(
                  (providerViewData) =>
                    providerViewData.errors &&
                    providerViewData.errors.length > 0
                )}
              >
                Submit
              </Button>
            )}
            {IsUsersList(data) && (
              <Button // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(e) => {
                  handleSubmitUsers(data);
                }}
                disabled={data.some(
                  (providerViewData) =>
                    providerViewData.errors &&
                    providerViewData.errors.length > 0
                )}
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
