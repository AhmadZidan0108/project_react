import React, { useEffect, useState } from "react"; // Mengimpor React dan hooks useState, useEffect
import axios from "axios"; // Mengimpor axios untuk melakukan HTTP request
import { useNavigate, useParams } from "react-router-dom"; // Mengimpor hook untuk navigasi dan parameter URL
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari Material-UI
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari Material-UI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography untuk teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box untuk layout
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper untuk latar belakang form
import Swal from "sweetalert2"; // Mengimpor sweetalert2 untuk menampilkan alert
import Navbar from "../component/Navbar"; // Mengimpor Navbar yang sudah dibuat

export default function EditData() {
  // State untuk menyimpan data siswa yang akan diedit
  const [namasiswa, setNamasiswa] = useState(""); 
  const [kelas, setKelas] = useState(""); 
  const [jurusan, setJurusan] = useState(""); 
  const [nisn, setNisn] = useState(""); 
  const [asalsekolah, setAsalsekolah] = useState(""); 

  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  useEffect(() => {
    // Mengecek apakah ID valid, jika tidak tampilkan alert dan hentikan proses
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchData = async () => {
      // Fungsi untuk mengambil data siswa berdasarkan ID
      try {
        const response = await axios.get(`http://localhost:3030/siswa/${id}`); // Melakukan GET request
        const data = response.data; // Mengambil data dari response

        if (!data) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error"); // Jika data tidak ditemukan, tampilkan alert
          navigate("/Datasiswa"); // Arahkan ke halaman daftar siswa
          return;
        }

        // Menyimpan data siswa ke state
        setNamasiswa(data.namasiswa);
        setKelas(data.kelas);
        setJurusan(data.jurusan);
        setNisn(data.nisn);
        setAsalsekolah(data.asalsekolah);
      } catch (error) {
        console.error("Error fetching data:", error); // Menangani error jika terjadi kesalahan saat fetch data
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Datasiswa"); // Arahkan ke halaman daftar siswa
      }
    };

    fetchData(); // Memanggil fungsi fetchData untuk mengambil data
  }, [id, navigate]); // useEffect dijalankan setiap kali 'id' atau 'navigate' berubah

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form submit secara default

    // Memastikan semua field wajib diisi
    if (!namasiswa || !nisn) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      // Membuat data siswa yang sudah diperbarui
      const updatedData = {
        namasiswa,
        kelas: parseInt(kelas), // Mengubah kelas menjadi integer
        jurusan,
        nisn: parseInt(nisn), // Mengubah nisn menjadi integer
        asalsekolah,
      };

      // Mengirimkan PUT request untuk memperbarui data siswa
      await axios.put(`http://localhost:3030/siswa/${id}`, updatedData);
      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success"); // Menampilkan alert berhasil
      navigate("/Datasiswa"); // Arahkan kembali ke halaman daftar siswa
    } catch (error) {
      console.error("Error updating data:", error); // Menangani error jika terjadi kesalahan saat update data
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <>
      <Navbar /> {/* Menampilkan Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Menyusun form di tengah
          alignItems: "center", // Menyusun form di tengah secara vertikal
          height: "100vh", // Mengatur tinggi halaman agar form berada di tengah
          backgroundColor: "#90EE90", // Background hijau muda
        }}
      >
        <Paper
          elevation={6} // Memberikan efek bayangan pada Paper
          sx={{
            p: 4,
            width: "400px", // Mengatur lebar form
            display: "flex",
            flexDirection: "column", // Mengatur layout form secara kolom
            justifyContent: "center",
            gap: 2, // Memberikan jarak antar komponen
            backgroundColor: "#ffffff", // Warna form tetap putih
            borderRadius: "10px", // Memberikan sudut rounded pada Paper
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center", // Mengatur teks agar rata tengah
              mb: 2, // Memberikan margin bawah
              color: "primary.main", // Mengatur warna teks sesuai tema
              fontWeight: "500", // Menentukan ketebalan font
              letterSpacing: "1px", // Memberikan jarak antar huruf
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)", // Memberikan efek bayangan pada teks
              fontFamily: "'Poppins', sans-serif", // Mengatur font
            }}
          >
            Edit Data
          </Typography>
          <form onSubmit={handleSubmit}> {/* Form untuk mengedit data siswa */}
            <TextField
              label="Nama Siswa" // Label untuk input nama siswa
              variant="outlined" // Variasi desain field
              fullWidth // Lebar penuh
              value={namasiswa} // Nilai input diikat dengan state
              onChange={(e) => setNamasiswa(e.target.value)} // Mengubah state ketika input berubah
              sx={{ mb: 2 }} // Memberikan margin bawah
            />
            <TextField
              label="Kelas"
              variant="outlined"
              fullWidth
              type="number" // Input berupa angka
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Jurusan"
              variant="outlined"
              fullWidth
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nisn"
              variant="outlined"
              fullWidth
              type="number"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Asalsekolah"
              variant="outlined"
              fullWidth
              value={asalsekolah}
              onChange={(e) => setAsalsekolah(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" color="primary" type="submit"> {/* Tombol untuk submit form */}
                Simpan Perubahan
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}
