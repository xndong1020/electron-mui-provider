import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import ErrorIcon from "@mui/icons-material/Error";
import { IProviderViewData } from "../interfaces";

export interface IProviderDataTableProps {
  rows: IProviderViewData[];
}

export default function ProviderDataTable({ rows }: IProviderDataTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>error?</TableCell>
            <TableCell>id</TableCell>
            <TableCell>legalName</TableCell>
            <TableCell>tradingName</TableCell>
            <TableCell>orgId</TableCell>
            <TableCell>extId</TableCell>
            <TableCell>phoneNumber</TableCell>
            <TableCell>email</TableCell>
            <TableCell>website</TableCell>
            <TableCell>address/addressLine1</TableCell>
            <TableCell>address/suburb</TableCell>
            <TableCell>address/state</TableCell>
            <TableCell>address/postCode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {!!row.errors?.length && (
                  <Tooltip
                    title={JSON.stringify(row.errors, null, 2)}
                    placement="right-start"
                  >
                    <ErrorIcon sx={{ color: "red" }} />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.legalName}</TableCell>
              <TableCell>{row.tradingName}</TableCell>
              <TableCell>{row.orgId}</TableCell>
              <TableCell>{row.extId}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.website}</TableCell>
              <TableCell>{row.address.addressLine1}</TableCell>
              <TableCell>{row.address.suburb}</TableCell>
              <TableCell>{row.address.state}</TableCell>
              <TableCell>{row.address.postCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
