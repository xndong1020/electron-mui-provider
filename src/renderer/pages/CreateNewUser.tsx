import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import DataModal from "../components/DataModal";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser, IUserViewData } from "../interfaces";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";
import * as saveSchema from "../schemas/user.save.json";
import { validateJsonData } from "../_utils/validateJsonData";

const CreateNewUser = () => {
  const [users, setUsers] = useState<IUserViewData[]>([]);
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

            const parsedUsers: IUser[] = rest
              .filter((row) => row.length === 4)
              .map((cols) => ({
                email: cols[0]?.trim(),
                name: cols[1]?.trim(),
                defaultProvider: cols[2]?.trim(),
                role: cols[3]?.trim(),
              }));

            const userViewData: IUserViewData[] = [...parsedUsers];

            for (const [index, user] of parsedUsers.entries()) {
              const { errors } = validateJsonData(saveSchema, user);
              if (errors) {
                userViewData[index].errors = errors;
              } else {
                userViewData[index].errors = [];
              }
            }

            setUsers(userViewData);
            if (parsedUsers.length) {
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
        <Box>Bilk Create New Users</Box>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        <DataModal
          title="Bulk Create New Users"
          open={open}
          handleClose={handleClose}
          data={users}
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

export default CreateNewUser;
