import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITableData } from "../models/TableDataModel";

interface IDenseTableProps {
  tableData: ITableData[];
}

export default function DenseTable({ tableData }: IDenseTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">full name</TableCell>
            <TableCell align="left">adress</TableCell>
            <TableCell align="left">phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.serial}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.fullname}</TableCell>
              <TableCell align="left">{row.adress}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
