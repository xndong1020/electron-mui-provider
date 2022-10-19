/* eslint-disable no-console */
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  CreateProviderResponse,
  CreateUserResponse,
  IProvider,
  IProviderViewData,
  IUser,
  IUserViewData,
} from "../interfaces";
import { createProviderAsync } from "../services/providers.service";
import { createUserAsync } from "../services/users.service";
import ProviderDataTable from "./ProviderDataTable";
import UserDataTable from "./UserDataTable";
import { GlobalContext } from "../contexts/GlobalContext";
import { notifyError, notifyGood } from "../_utils/toastor";

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
  const [errorIds, setErrorIds] = useState<string[]>([]);
  const [errorEmails, setErrorEmails] = useState<string[]>([]);
  const { setLoadingStatus } = useContext(GlobalContext);

  const handleSubmitProviders = (providers: IProviderViewData[]): void => {
    console.log("providers", providers);
    const tasks = providers
      .map((providerViewData) => ({
        id: providerViewData.id,
        legalName: providerViewData.legalName,
        tradingName: providerViewData.tradingName,
        orgId: providerViewData.orgId,
        extId: providerViewData.extId,
        phoneNumber: providerViewData.phoneNumber,
        email: providerViewData.email,
        website: providerViewData.website,
        address: providerViewData.address,
      }))
      .map((provider) => createProviderAsync(provider));

    setLoadingStatus(true);
    Promise.allSettled(tasks)
      .then(
        (
          results: PromiseSettledResult<{
            error?: string;
            response?: CreateProviderResponse;
            payload: IProvider;
          }>[]
        ) => {
          const failedIds = [];
          for (const result of results) {
            if (result.status === "rejected") {
              notifyError(result.reason);
            }
            if (result.status === "fulfilled") {
              if (result.value.error) {
                notifyError({
                  message: `Provider ${result.value.payload.id} creation failed. Error:${result.value.error}`,
                });
                failedIds.push(result.value.payload.id);
              } else {
                notifyGood({
                  message: `Provider ${result.value.payload.id} has been created.`,
                });
              }
            }
          }
          setErrorIds(failedIds);
        }
      )
      .finally(() => {
        setLoadingStatus(false);
      });
  };
  const handleSubmitUsers = async (users: IUserViewData[]): Promise<void> => {
    console.log("users", users);
    const tasks = users
      .map((userViewData) => ({
        email: userViewData.email,
        name: userViewData.name,
        defaultProvider: userViewData.defaultProvider,
        role: userViewData.role,
      }))
      .map((user) => createUserAsync(user));

    setLoadingStatus(true);
    Promise.allSettled(tasks)
      .then(
        (
          results: PromiseSettledResult<{
            error?: string;
            response?: CreateUserResponse;
            payload: IUser;
          }>[]
        ) => {
          const failedEmails = [];
          for (const result of results) {
            if (result.status === "rejected") {
              notifyError(result.reason);
            }
            if (result.status === "fulfilled") {
              if (result.value.error) {
                notifyError({
                  message: `User ${result.value.payload.email} creation failed. Error:${result.value.error}`,
                });
                failedEmails.push(result.value.payload.email);
              } else {
                notifyGood({
                  message: `User ${result.value.payload.email} has been created. id:${result.value.response?.id}`,
                });
              }
            }
          }
          setErrorEmails(failedEmails);
        }
      )
      .finally(() => {
        setLoadingStatus(false);
      });
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
            <ProviderDataTable rows={data as IProvider[]} errorIds={errorIds} />
          )}
          {IsUsersList(data) && (
            <UserDataTable rows={data as IUser[]} errorEmails={errorEmails} />
          )}
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
