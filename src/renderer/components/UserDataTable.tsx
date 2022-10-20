import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { IUserViewData } from "../interfaces";

export interface IUserDataTableProps {
  rows: IUserViewData[];
  errorEmails: string[];
}

export default function ProviderDataTable({
  rows,
  errorEmails,
}: IUserDataTableProps) {
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Error?</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Default Provider</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {(!!row.errors?.length ||
                    errorEmails.includes(row.email)) && (
                    <Tooltip
                      title={JSON.stringify(row.errors, null, 2)}
                      placement="right-start"
                    >
                      <ErrorIcon sx={{ color: "red" }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.defaultProvider}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
