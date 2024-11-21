import React, { useState } from "react"; // Import React dan hook useState untuk mengelola state lokal
import axios from "axios"; // Import axios untuk melakukan request HTTP
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi antar halaman
import TextField from "@mui/material/TextField"; // Import komponen TextField dari MUI untuk input teks
import Button from "@mui/material/Button"; // Import komponen Button dari MUI
import Typography from "@mui/material/Typography"; // Import komponen Typography untuk teks yang diformat
import Box from "@mui/material/Box"; // Import komponen Box untuk layout
import Paper from "@mui/material/Paper"; // Import komponen Paper untuk kontainer dengan efek bayangan
import Swal from "sweetalert2"; // Import SweetAlert2 untuk menampilkan pop-up alert

export default function TambahDatasiswa() {
  // State variables untuk menyimpan input form
  const [namasiswa, setNamasiswa] = useState(""); // Nama siswa
  const [kelas, setKelas] = useState(""); // Kelas siswa
  const [jurusan, setJurusan] = useState(""); // Jurusan siswa
  const [nisn, setNisn] = useState(""); // NISN siswa
  const [asalsekolah, setAsalsekolah] = useState(""); // Asal sekolah siswa
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    // Validasi sederhana: Memeriksa apakah Nama Siswa dan NISN sudah diisi
    if (!namasiswa || !nisn) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error"); // Menampilkan alert jika ada field yang kosong
      return; // Menghentikan eksekusi jika validasi gagal
    }

    try {
      // Mengambil data dari server untuk mendapatkan ID terakhir dari data sebelumnya
      const response = await axios.get("http://localhost:3030/siswa");
      const siswa = response.data;

      // Mencari ID terbesar yang ada
      const lastId = siswa.length > 0
        ? Math.max(...siswa.map((food) => parseInt(food.id))) // Mengambil ID terbesar
        : 0;

      // Membuat data siswa baru
      const newDatasiswa = {
        id: (lastId + 1).toString(), // ID baru (dihitung berdasarkan ID terakhir)
        no: lastId + 1, // No urut siswa (dihitung berdasarkan ID terakhir)
        namasiswa, // Nama siswa dari state
        kelas: parseInt(kelas), // Kelas siswa (dikonversi menjadi angka)
        jurusan, // Jurusan siswa dari state
        nisn: parseInt(nisn), // NISN siswa (dikonversi menjadi angka)
        asalsekolah, // Asal sekolah siswa dari state
      };

      // Mengirim data siswa baru ke server
      await axios.post("http://localhost:3030/siswa", newDatasiswa);

      // Menampilkan alert sukses jika data berhasil disubmit
      Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      navigate("/Datasiswa"); // Menavigasi kembali ke halaman daftar siswa setelah berhasil
    } catch (error) {
      console.error("Error adding data:", error); // Menampilkan error jika terjadi kesalahan
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan data.", "error"); // Menampilkan alert error
    }
  };

  return (
    <Box
      sx={{
        display: "flex", // Menggunakan flexbox untuk layout
        justifyContent: "center", // Mengatur konten agar berada di tengah secara horizontal
        alignItems: "center", // Mengatur konten agar berada di tengah secara vertikal
        height: "100vh", // Membuat tinggi layar penuh
        backgroundColor: "#f5f5f5", // Memberikan latar belakang warna abu-abu terang
      }}
    >
      <Paper
        elevation={6} // Memberikan efek bayangan pada Paper
        sx={{
          p: 4, // Padding sekitar konten
          width: "400px", // Lebar Paper
          display: "flex", // Menggunakan flexbox dalam Paper
          flexDirection: "column", // Mengatur layout agar kolom
          gap: 2, // Memberikan jarak antar elemen dalam Paper
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 2, color: "primary.main" }}
        >
          Tambah Data Baru
        </Typography>
        <form onSubmit={handleSubmit}> {/* Menjalankan handleSubmit saat form disubmit */}
          <TextField
            label="Nama Siswa" // Label untuk input nama siswa
            variant="outlined"
            fullWidth
            value={namasiswa} // Nilai input diambil dari state namasiswa
            onChange={(e) => setNamasiswa(e.target.value)} // Mengupdate state saat nilai input berubah
            sx={{ mb: 2 }} // Margin bawah
          />
          <TextField
            label="Kelas" // Label untuk input kelas
            variant="outlined"
            fullWidth
            type="number" // Menggunakan tipe number untuk input kelas
            value={kelas} // Nilai input diambil dari state kelas
            onChange={(e) => setKelas(e.target.value)} // Mengupdate state saat nilai input berubah
            sx={{ mb: 2 }} // Margin bawah
          />
          <TextField
            label="Jurusan" // Label untuk input jurusan
            variant="outlined"
            fullWidth
            value={jurusan} // Nilai input diambil dari state jurusan
            onChange={(e) => setJurusan(e.target.value)} // Mengupdate state saat nilai input berubah
            sx={{ mb: 2 }} // Margin bawah
          />
          <TextField
            label="NISN" // Label untuk input NISN
            variant="outlined"
            fullWidth
            type="number" // Menggunakan tipe number untuk input NISN
            value={nisn} // Nilai input diambil dari state nisn
            onChange={(e) => setNisn(e.target.value)} // Mengupdate state saat nilai input berubah
            sx={{ mb: 2 }} // Margin bawah
          />
          <TextField
            label="Asal Sekolah" // Label untuk input asal sekolah
            variant="outlined"
            fullWidth
            value={asalsekolah} // Nilai input diambil dari state asalsekolah
            onChange={(e) => setAsalsekolah(e.target.value)} // Mengupdate state saat nilai input berubah
            sx={{ mb: 2 }} // Margin bawah
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/Dashboard")} // Navigasi ke halaman dashboard jika batal
            >
              Batal
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Simpan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
