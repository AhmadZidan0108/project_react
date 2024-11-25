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
import Navbar from "../component/Navbar";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField"; // Komponen untuk input pencarian

// Styling untuk cell tabel, mengubah tampilan cell header dan body
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#81C784", // Hijau muda untuk header tabel
    color: theme.palette.common.white, // Mengubah warna teks header menjadi putih
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, // Ukuran font untuk body cell
  },
}));

// Styling untuk row tabel, memberikan warna latar belakang yang berbeda untuk baris ganjil
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#C8E6C9", // Memberikan latar belakang hijau muda untuk baris ganjil
  },
  "&:last-child td, &:last-child th": {
    border: 0, // Menghilangkan border pada baris terakhir
  },
}));

export default function Dashboard() {
  const [drinks, setDrinks] = useState([]); // State untuk menyimpan data siswa
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search query
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain
  const isMobile = useMediaQuery("(max-width:768px)"); // Deteksi jika layar berukuran kecil

  // useEffect untuk memuat data saat komponen pertama kali dirender
  useEffect(() => {
    fetchDrinks(); // Memanggil fungsi fetchDrinks
  }, []);

  // Fungsi untuk mengambil data dari server
  const fetchDrinks = () => {
    axios
      .get("http://localhost:3030/siswa") // Mengambil data dari API
      .then((response) => {
        setDrinks(response.data); // Menyimpan data yang diterima ke state drinks
      })
      .catch((error) => {
        console.error("Error fetching data", error); // Menangani error jika gagal
      });
  };

  // Fungsi untuk menghapus data berdasarkan ID
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?", // Konfirmasi penghapusan
      text: "Item ini akan dihapus permanen!", // Pesan peringatan
      icon: "warning", // Menampilkan ikon peringatan
      showCancelButton: true, // Tombol untuk batal
      confirmButtonColor: "#d33", // Warna tombol konfirmasi
      cancelButtonColor: "#3085d6", // Warna tombol batal
      confirmButtonText: "Ya, Hapus!", // Teks tombol konfirmasi
      cancelButtonText: "Batal", // Teks tombol batal
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika user memilih untuk menghapus
        axios
          .delete(`http://localhost:3030/siswa/${id}`) // Mengirim request DELETE ke API
          .then(() => {
            setDrinks(drinks.filter((drink) => drink.id !== id)); // Menghapus data dari state
            Swal.fire("Dihapus!", "Item telah dihapus.", "success"); // Notifikasi sukses
          })
          .catch((error) => {
            console.error("Error deleting data", error); // Menangani error saat menghapus
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error"); // Notifikasi gagal
          });
      }
    });
  };

  // Fungsi untuk menavigasi ke halaman tambah data
  const handleAddDrink = () => {
    navigate("/add-drink"); // Navigasi ke halaman tambah data
  };

  // Fungsi untuk mengedit data
  const handleEdit = (id) => {
    navigate(`/edit-drink/${id}`); // Navigasi ke halaman edit dengan ID
  };

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query
  };

  // Filter data berdasarkan search query
  const filteredDrinks = drinks.filter((drink) => {
    return (
      (drink.namasiswa && drink.namasiswa.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (drink.nisn && String(drink.nisn).toLowerCase().includes(searchQuery.toLowerCase())) // Convert `nik` to string
    );
  });

  return (
    <>
      <Navbar /> {/* Menampilkan Navbar */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Responsif: Kolom untuk layar kecil
          background: "#A5D6A7", // Hijau muda untuk latar belakang utama
          minHeight: "100vh", // Mengatur tinggi halaman agar memenuhi layar
        }}
      >
        {/* Sidebar kosong */}
        <div
          style={{
            width: isMobile ? "100%" : "230px", // Lebar penuh untuk layar kecil
            flexShrink: 0,
            backgroundColor: "#81C784",
            display: isMobile ? "none" : "block", // Sembunyikan di layar kecil
          }}
        ></div>

        {/* Konten utama */}
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
            <TextField
              label="Cari Siswa"
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
                  <StyledTableCell align="center">Nama Siswa</StyledTableCell>
                  <StyledTableCell align="center">Kelas</StyledTableCell>
                  <StyledTableCell align="center">Jurusan</StyledTableCell>
                  <StyledTableCell align="center">Nisn</StyledTableCell>
                  <StyledTableCell align="center">Asal Sekolah</StyledTableCell>
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
                      {drink.namasiswa}
                    </StyledTableCell>{" "}
                    {/* Menampilkan nama siswa */}
                    <StyledTableCell align="center">{drink.kelas}</StyledTableCell>{" "}
                    {/* Menampilkan kelas siswa */}
                    <StyledTableCell align="center">{drink.jurusan}</StyledTableCell>{" "}
                    {/* Menampilkan jurusan */}
                    <StyledTableCell align="center">{drink.nisn}</StyledTableCell>{" "}
                    {/* Menampilkan NISN */}
                    <StyledTableCell align="center">
                      {drink.asalsekolah}
                    </StyledTableCell>{" "}
                    {/* Menampilkan asal sekolah */}
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
