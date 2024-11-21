import React, { useEffect, useState } from "react";  // Import React dan hook useEffect serta useState
import axios from "axios";  // Import axios untuk HTTP request
import Table from "@mui/material/Table";  // Import komponen Table dari Material UI
import TableBody from "@mui/material/TableBody";  // Import komponen TableBody dari Material UI
import TableCell, { tableCellClasses } from "@mui/material/TableCell";  // Import TableCell dan tableCellClasses untuk styling
import TableContainer from "@mui/material/TableContainer";  // Import komponen TableContainer untuk membungkus tabel
import TableHead from "@mui/material/TableHead";  // Import komponen TableHead untuk kepala tabel
import TableRow from "@mui/material/TableRow";  // Import komponen TableRow untuk baris tabel
import Paper from "@mui/material/Paper";  // Import komponen Paper untuk membuat container dengan efek shadow
import Button from "@mui/material/Button";  // Import komponen Button dari Material UI
import Navbar from "./component/Navbar";  // Import Navbar custom dari file komponen lain
import { styled } from "@mui/material/styles";  // Import styled untuk membuat komponen dengan custom styling
import Swal from "sweetalert2";  // Import SweetAlert2 untuk menampilkan alert popup
import { useNavigate } from "react-router-dom";  // Import useNavigate untuk navigasi halaman
import IconButton from "@mui/material/IconButton";  // Import IconButton
import EditIcon from "@mui/icons-material/Edit";  // Import EditIcon
import DeleteIcon from "@mui/icons-material/Delete";  // Import DeleteIcon

// Styling untuk cell tabel, mengubah tampilan cell header dan body
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,  // Mengubah warna background cell header menjadi hitam
    color: theme.palette.common.white,  // Mengubah warna teks header menjadi putih
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,  // Mengatur ukuran font untuk cell body
  },
}));

// Styling untuk row tabel, memberikan warna latar belakang yang berbeda untuk baris ganjil
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,  // Menambahkan warna latar belakang untuk baris ganjil
  },
  "&:last-child td, &:last-child th": {
    border: 0,  // Menghapus border pada baris terakhir
  },
}));

// Komponen Dashboard utama
export default function Dashboard() {
  const [drinks, setDrinks] = useState([]);  // State untuk menyimpan data minuman (atau siswa dalam konteks ini)
  const navigate = useNavigate();  // Hook untuk navigasi ke halaman lain

  // useEffect hook untuk memuat data ketika komponen pertama kali di-render
  useEffect(() => {
    fetchDrinks();  // Memanggil fungsi fetchDrinks untuk mengambil data
  }, []);

  // Fungsi untuk mengambil data siswa dari server
  const fetchDrinks = () => {
    axios
      .get("http://localhost:3030/siswa")  // Mengambil data dari API
      .then((response) => {
        setDrinks(response.data);  // Menyimpan data yang diterima ke dalam state drinks
      })
      .catch((error) => {
        console.error("Error fetching data", error);  // Menangani error jika terjadi kesalahan dalam fetching
      });
  };

  // Fungsi untuk menghapus data berdasarkan id
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",  // Menampilkan konfirmasi untuk menghapus data
      text: "Item ini akan dihapus permanen!",  // Memberikan peringatan
      icon: "warning",  // Menampilkan ikon peringatan
      showCancelButton: true,  // Menampilkan tombol batal
      confirmButtonColor: "#d33",  // Mengatur warna tombol konfirmasi
      cancelButtonColor: "#3085d6",  // Mengatur warna tombol batal
      confirmButtonText: "Ya, Hapus!",  // Mengatur teks tombol konfirmasi
      cancelButtonText: "Batal",  // Mengatur teks tombol batal
    }).then((result) => {
      if (result.isConfirmed) {  // Jika user memilih untuk menghapus
        axios
          .delete(`http://localhost:3030/siswa/${id}`)  // Mengirim request DELETE ke API untuk menghapus data
          .then(() => {
            setDrinks(drinks.filter((drink) => drink.id !== id));  // Menghapus data dari state setelah berhasil dihapus
            Swal.fire("Dihapus!", "Item telah dihapus.", "success");  // Menampilkan notifikasi sukses
          })
          .catch((error) => {
            console.error("Error deleting data", error);  // Menangani error saat menghapus
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");  // Menampilkan notifikasi gagal
          });
      }
    });
  };

  // Fungsi untuk menavigasi ke halaman tambah data
  const handleAddDrink = () => {
    navigate("/tambahsiswa");  // Mengarahkan pengguna ke halaman "/tambahsiswa"
  };

  // Fungsi untuk menavigasi ke halaman edit berdasarkan id
  const handleEdit = (id) => {
    navigate(`/Ubahsiswa/${id}`);  // Mengarahkan pengguna ke halaman "/Ubahsiswa/id"
  };

  return (
    <>
      <Navbar />  {/* Menampilkan Navbar */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar, bisa ditambahkan styling atau komponen sidebar lain */}
        <div style={{ width: '230px', flexShrink: 0 }}></div>
     
        <TableContainer component={Paper}>  {/* Membungkus tabel dengan Paper untuk efek shadow */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDrink}  // Menambahkan event onClick untuk menambahkan data
            style={{ marginBottom: "10px" }}  // Menambahkan margin bawah pada button
          >
            Tambah Data
          </Button>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">  {/* Membuat tabel dengan lebar minimal 700px */}
            <TableHead>
              <TableRow>
                {/* Menambahkan header untuk tabel */}
                <StyledTableCell>NO</StyledTableCell>
                <StyledTableCell align="center">Nama Siswa</StyledTableCell>
                <StyledTableCell align="center">Kelas</StyledTableCell>
                <StyledTableCell align="center">Jurusan</StyledTableCell>
                <StyledTableCell align="center">Nisn</StyledTableCell>
                <StyledTableCell align="center">Aasal Sekolah</StyledTableCell>
                <StyledTableCell align="center">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Iterasi melalui data drinks dan menampilkan setiap item dalam baris tabel */}
              {drinks.map((drink, index) => (
                <StyledTableRow key={drink.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}  {/* Menampilkan nomor urut */}
                  </StyledTableCell>
                  <StyledTableCell align="center">{drink.namasiswa}</StyledTableCell>  {/* Menampilkan nama siswa */}
                  <StyledTableCell align="center">{drink.kelas}</StyledTableCell>  {/* Menampilkan kelas siswa */}
                  <StyledTableCell align="center">{drink.jurusan}</StyledTableCell>  {/* Menampilkan jurusan siswa */}
                  <StyledTableCell align="center">{drink.nisn}</StyledTableCell>  {/* Menampilkan NISN siswa */}
                  <StyledTableCell align="center">{drink.asalsekolah}</StyledTableCell>  {/* Menampilkan asal sekolah */}
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
