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
import Navbar from "./component/Navbar"; // Mengimpor komponen Navbar untuk layout
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2"; // Untuk menampilkan popup seperti alert
import { useNavigate } from "react-router-dom"; // Untuk navigasi antar halaman
import EditIcon from '@mui/icons-material/Edit'; // Ikon untuk Edit
import DeleteIcon from '@mui/icons-material/Delete'; // Ikon untuk Delete
import IconButton from '@mui/material/IconButton'; // Tombol untuk ikon

// Styling untuk cell di header tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black, // Latar belakang hitam untuk cell header
    color: theme.palette.common.white, // Warna teks putih untuk cell header
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, // Ukuran font untuk cell body
  },
}));

// Styling untuk baris tabel (warna baris bergantian)
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover, // Warna latar belakang untuk baris ganjil
  },
  "&:last-child td, &:last-child th": {
    border: 0, // Menghilangkan border pada baris terakhir
  },
}));

export default function Dashboard() {
  const [drinks, setDrinks] = useState([]); // State untuk menyimpan data minuman (dalam hal ini data dari backend)
  const navigate = useNavigate(); // Hook untuk navigasi antar halaman

  // useEffect hook untuk mengambil data ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchDrinks(); // Memanggil fungsi fetchDrinks untuk mengambil data
  }, []); // Array kosong sebagai dependency, artinya ini hanya akan dijalankan sekali ketika komponen dimuat

  // Fungsi untuk mengambil data minuman dari backend menggunakan axios
  const fetchDrinks = () => {
    axios
      .get("http://localhost:3030/foods") // Mengirim permintaan GET ke backend
      .then((response) => {
        setDrinks(response.data); // Menyimpan data yang diterima ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching data", error); // Jika terjadi kesalahan saat mengambil data
      });
  };

  // Fungsi untuk menangani penghapusan item
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?", // Pesan konfirmasi penghapusan
      text: "Item ini akan dihapus permanen!", // Pesan peringatan
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Warna tombol konfirmasi merah
      cancelButtonColor: "#3085d6", // Warna tombol batal biru
      confirmButtonText: "Ya, Hapus!", // Teks untuk tombol konfirmasi
      cancelButtonText: "Batal", // Teks untuk tombol batal
    }).then((result) => {
      if (result.isConfirmed) { // Jika pengguna mengonfirmasi penghapusan
        axios
          .delete(`http://localhost:3030/foods/${id}`) // Mengirim permintaan DELETE ke backend
          .then(() => {
            setDrinks(drinks.filter((drink) => drink.id !== id)); // Menghapus item yang dihapus dari state
            Swal.fire("Dihapus!", "Item telah dihapus.", "success"); // Menampilkan pesan sukses
          })
          .catch((error) => {
            console.error("Error deleting data", error); // Menangani kesalahan saat penghapusan
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error"); // Menampilkan pesan error
          });
      }
    });
  };

  // Fungsi untuk menangani klik pada tombol "Tambah Data" (navigasi ke halaman tambah data)
  const handleAddDrink = () => {
    navigate("/tambah"); // Menavigasi ke halaman tambah data
  };

  // Fungsi untuk menangani klik pada tombol "Edit" (navigasi ke halaman ubah data)
  const handleEdit = (id) => {
    navigate(`/Ubahminuman/${id}`); // Menavigasi ke halaman ubah data untuk item tertentu
  };

  return (
    <>
      {/* Komponen Navbar untuk navigasi atas */}
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Sidebar placeholder (Anda bisa menambahkan sidebar di sini jika diperlukan) */}
        <div style={{ width: '230px', flexShrink: 0 }}></div>

        {/* Tabel untuk menampilkan data minuman */}
        <TableContainer component={Paper}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDrink} // Memanggil fungsi handleAddDrink ketika diklik
            style={{ marginBottom: "10px" }}
          >
            Tambah Data
          </Button>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* Header tabel */}
                <StyledTableCell>NO</StyledTableCell>
                <StyledTableCell align="center">Nama Guru</StyledTableCell>
                <StyledTableCell align="center">Mapel</StyledTableCell>
                <StyledTableCell align="center">Nik</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Jabatan</StyledTableCell>
                <StyledTableCell align="center">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Menampilkan data dalam baris tabel */}
              {drinks.map((drink, index) => (
                <StyledTableRow key={drink.id}>
                  {/* Menampilkan setiap kolom dalam tabel */}
                  <StyledTableCell component="th" scope="row">
                    {index + 1} {/* Nomor urut baris */}
                  </StyledTableCell>
                  <StyledTableCell align="center">{drink.namaguru}</StyledTableCell>
                  <StyledTableCell align="center">{drink.mapel}</StyledTableCell>
                  <StyledTableCell align="center">{drink.nik}</StyledTableCell>
                  <StyledTableCell align="center">{drink.gender}</StyledTableCell>
                  <StyledTableCell align="center">{drink.jabatan}</StyledTableCell>
                  <StyledTableCell align="center">
                    {/* Tombol aksi untuk edit dan delete */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(drink.id)} // Memanggil fungsi handleEdit ketika diklik
                      style={{ marginRight: "5px" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(drink.id)} // Memanggil fungsi handleDelete ketika diklik
                    >
                      <DeleteIcon />
                    </IconButton>
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
