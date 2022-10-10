import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import DataModal from "../components/DataModal";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IProvider } from "../interfaces";

const CreateNewProvider = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [open, setOpen] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          try {
            const [_, ...rest] = results.data as string[][];

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
          } catch {
            console.error;
          }
        },
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>CreateNewProvider</Box>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <DataModal open={open} handleClose={handleClose} data={providers} />
      <Box>
        <Button variant="text">
          <Link to="/">Back</Link>
        </Button>
      </Box>
    </>
  );
};

export default CreateNewProvider;
