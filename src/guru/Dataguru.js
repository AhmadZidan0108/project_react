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
import Navbar from "../component/Navbar"; // Mengimpor komponen Navbar untuk layout
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2"; // Untuk menampilkan popup seperti alert
import { useNavigate } from "react-router-dom"; // Untuk navigasi antar halaman
import EditIcon from '@mui/icons-material/Edit'; // Ikon untuk Edit
import DeleteIcon from '@mui/icons-material/Delete'; // Ikon untuk Delete
import IconButton from '@mui/material/IconButton'; // Tombol untuk ikon
import { Grid, useMediaQuery } from "@mui/material"; // Material-UI Grid untuk layout responsif
import TextField from "@mui/material/TextField"; // Komponen untuk input pencarian

// Styling untuk cell di header tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#81C784", // Latar belakang hijau muda untuk cell header
    color: theme.palette.common.white, // Warna teks putih untuk cell header
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, // Ukuran font untuk cell body
  },
}));

// Styling untuk baris tabel (warna baris bergantian)
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#C8E6C9", // Latar belakang hijau muda terang untuk baris ganjil
  },
  "&:last-child td, &:last-child th": {
    border: 0, // Menghilangkan border pada baris terakhir
  },
}));

export default function Dashboard() {
  const [drinks, setDrinks] = useState([]); // State untuk menyimpan data minuman (dalam hal ini data dari backend)
  const [searchQuery, setSearchQuery] = useState(""); // Menambahkan state untuk pencarian
  const navigate = useNavigate(); // Hook untuk navigasi antar halaman
  const isMobile = useMediaQuery("(max-width:768px)");

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

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update kata kunci pencarian
  };

  // Filter data berdasarkan pencarian
 const filteredDrinks = drinks.filter((drink) => {
  return (
    (drink.namaguru && drink.namaguru.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (drink.nik && String(drink.nik).toLowerCase().includes(searchQuery.toLowerCase())) // Convert `nik` to string
  );
});



  return (
    <>
      {/* Komponen Navbar untuk navigasi atas */}
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Responsif: Kolom untuk layar kecil
          background: "#A5D6A7", // Hijau muda untuk latar belakang utama
          minHeight: "100vh", // Mengatur tinggi halaman agar memenuhi layar
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "230px", // Lebar penuh untuk layar kecil
            flexShrink: 0,
            backgroundColor: "#81C784",
            display: isMobile ? "none" : "block", // Sembunyikan di layar kecil
          }}
        ></div>
        {/* Tabel untuk menampilkan data minuman */}
        <div style={{ flex: 1, padding: "20px" }}>
          {/* Membungkus tabel dengan Paper untuk efek shadow */}
          <TableContainer
            component={Paper}
            style={{
              padding: isMobile ? "10px" : "20px", // Padding lebih kecil untuk layar kecil
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {/* Tombol untuk menambah data */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDrink}
              style={{
                marginBottom: "20px",
                backgroundColor: "#66BB6A",
                fontSize: isMobile ? "12px" : "16px", // Ukuran font untuk tombol responsif
              }}
            >
              Tambah Data
            </Button>
            {/* Input untuk pencarian */}
            <TextField
              label="Cari Guru"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: "20px", width: "100%" }}
            />
            <Table
              sx={{ minWidth: 700 }}
              aria-label="simple table"
              size={isMobile ? "small" : "medium"} // Ukuran tabel responsif
            >
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
                {/* Iterasi data drinks dan menampilkan setiap item dalam baris tabel */}
                {filteredDrinks.map((drink, index) => (
                  <StyledTableRow key={drink.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1} {/* Menampilkan nomor urut */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {drink.namaguru}
                    </StyledTableCell>{" "}
                    {/* Menampilkan nama guru */}
                    <StyledTableCell align="center">{drink.mapel}</StyledTableCell>{" "}
                    {/* Menampilkan mapel */}
                    <StyledTableCell align="center">{drink.nik}</StyledTableCell>{" "}
                    {/* Menampilkan nik */}
                    <StyledTableCell align="center">{drink.gender}</StyledTableCell>{" "}
                    {/* Menampilkan gender */}
                    <StyledTableCell align="center">
                      {drink.jabatan}
                    </StyledTableCell>{" "}
                    {/* Menampilkan jabatan */}
                    <StyledTableCell align="center">
                      {/* Tombol edit dan delete */}
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(drink.id)} // Fungsi untuk edit
                        style={{ marginRight: "10px", backgroundColor: "#e8f5e9" }}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(drink.id)} // Fungsi untuk delete
                        style={{ backgroundColor: "#ffebee" }}
                        aria-label="delete"
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
      </div>
    </>
  );
}
