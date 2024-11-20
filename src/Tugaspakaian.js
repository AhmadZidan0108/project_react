import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './component/Navbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(no, pakaian, harga, asal) {
  return { no, pakaian, harga, asal };
}

const rows = [
  createData(1,'Ulee Balang', '100.000', 'Aceh'),
  createData(2,'Ulos', '200.000', 'Sumatera Utara'),
  createData(3,'Baju Kurung Basiba', '300.000', 'Sumatera Barat'),
  createData(4,'Aesan Gede', '400.000', 'Sumatera Selatan'),
  createData(5,'Baju Kurung Tanggung', '500.000', 'Jambi'),
];

export default function CustomizedTables() {
  return (
    <>
    <Navbar />


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="right">pakaian</StyledTableCell>
            <StyledTableCell align="right">harga&nbsp;</StyledTableCell>
            <StyledTableCell align="right">asal&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.no}>
              <StyledTableCell component="th" scope="row">
                {row.no}
              </StyledTableCell>
              <StyledTableCell align="right">{row.pakaian}</StyledTableCell>
              <StyledTableCell align="right">{row.harga}</StyledTableCell>
              <StyledTableCell align="right">{row.asal}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
};