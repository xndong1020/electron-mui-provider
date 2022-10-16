import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import DataModal from "../components/DataModal";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProvider } from "../interfaces";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";

const CreateNewProvider = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [firstRow, ...rest] = results.data as string[][];

            const parsedProviders: IProvider[] = rest
              .filter((row) => row.length === 12)
              .map((cols) => ({
                id: cols[0],
                legalName: cols[1],
                tradingName: cols[2],
                orgId: Number(cols[3]),
                extId: cols[4],
                phoneNumber: cols[5],
                email: cols[6],
                website: cols[7],
                address: {
                  addressLine1: cols[8],
                  suburb: cols[9],
                  state: cols[10],
                  postCode: cols[11],
                },
              }));
            setProviders(parsedProviders);
            if (parsedProviders.length) {
              setOpen(true);
            }
            e.target.value = ""; // reset file input
          } catch (e) {
            console.error(e);
          }
        },
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <PublicRouteLayout title="Create Providers Bulk">
      <>
        <Box>Bulk Create New Providers</Box>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        <DataModal
          title="Bulk Create Providers"
          open={open}
          handleClose={handleClose}
          data={providers}
        />
        <Box>
          <Button variant="text" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </>
    </PublicRouteLayout>
  );
};

export default CreateNewProvider;
