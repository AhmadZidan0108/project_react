import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Navbar from "./component/Navbar";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Styling untuk cell tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styling untuk row tabel
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = () => {
    axios
      .get("http://localhost:3030/foods")
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Item ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/foods/${id}`)
          .then(() => {
            setDrinks(drinks.filter((drink) => drink.id !== id));
            Swal.fire("Dihapus!", "Item telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
          });
      }
    });
  };

  const handleAddDrink = () => {
    navigate("/tambah");
  };

  const handleEdit = (id) => {
    navigate(`/Ubahminuman/${id}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '230px', flexShrink: 0 }}></div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDrink}
        style={{ marginBottom: "10px" }}
      >
        Tambah Data
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NO</StyledTableCell>
              <StyledTableCell align="center">Nama Siwsa</StyledTableCell>
              <StyledTableCell align="center">Kelas</StyledTableCell>
              <StyledTableCell align="center">Jurusan</StyledTableCell>
              <StyledTableCell align="center">Nisn</StyledTableCell>
              <StyledTableCell align="center">Asal Sekolah</StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drinks.map((drink, index) => (
              <StyledTableRow key={drink.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{drink.namasiswa}</StyledTableCell>
                <StyledTableCell align="center">{drink.kelas}</StyledTableCell>
                <StyledTableCell align="center">{drink.jurusan}</StyledTableCell>
                <StyledTableCell align="center">{drink.nisn}</StyledTableCell>
                <StyledTableCell align="center">{drink.asalsekolah}</StyledTableCell>
                <StyledTableCell align="center">{drink.aksi}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleEdit(drink.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(drink.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  );
}
