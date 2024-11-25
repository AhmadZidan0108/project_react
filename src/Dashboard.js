import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person"; // Ikon untuk Data Guru
import SchoolIcon from "@mui/icons-material/School"; // Ikon untuk Data Siswa
import Navbar from "./component/Navbar"; // Komponen Navbar

const Home = () => {
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // Fungsi untuk navigasi ke halaman Data Guru
  const handleGoToDataGuru = () => {
    navigate("/Dataguru");
  };

  // Fungsi untuk navigasi ke halaman Data Siswa
  const handleGoToDataSiswa = () => {
    navigate("/Datasiswa");
  };

  return (
    <>
      {/* Navbar untuk navigasi atas */}
      <Navbar />
      <Box
        sx={{
          display: "flex", // Gunakan Flexbox untuk layout
          flexDirection: { xs: "column", md: "row" }, // Kolom untuk layar kecil, baris untuk layar besar
          height: "100vh", // Tinggi penuh layar
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "230px" }, // Lebar penuh untuk layar kecil, tetap 230px untuk layar besar
            flexShrink: 0, // Sidebar tidak mengecil meskipun layar lebih kecil
            display: { xs: "none", md: "block" }, // Sembunyikan sidebar di layar kecil
          }}
        ></Box>

        {/* Kontainer Utama */}
        <Box
          sx={{
            display: "flex", // Gunakan Flexbox untuk menyusun elemen
            flexDirection: "column", // Susun elemen secara vertikal
            alignItems: "center", // Posisikan elemen di tengah horizontal
            justifyContent: "center", // Posisikan elemen di tengah vertikal
            width: "100%", // Lebar penuh kontainer
            background: "linear-gradient(135deg, #81C784, #66BB6A)", // Gradasi warna latar belakang
            padding: { xs: 2, md: 3 }, // Padding lebih kecil untuk layar kecil
            boxSizing: "border-box", // Menghitung padding agar tidak memengaruhi ukuran total
          }}
        >
          {/* Judul Halaman */}
          <Typography
            variant="h4" // Gunakan tipografi MUI
            gutterBottom // Berikan margin bawah
            sx={{
              color: "#ECF0F1", // Warna teks putih terang
              fontWeight: "700", // Teks tebal
              letterSpacing: 1.2, // Jarak antar huruf
              marginBottom: 4, // Margin bawah
              textAlign: "center", // Teks rata tengah
              animation: "fadeIn 1.5s ease-out", // Animasi fade-in
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(-20px)" }, // Awal animasi
                "100%": { opacity: 1, transform: "translateY(0)" }, // Akhir animasi
              },
            }}
          >
            Selamat datang di data sederhana Zidan
          </Typography>

          {/* Kontainer Tombol */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Susun tombol secara vertikal
              alignItems: "center", // Posisikan tombol di tengah horizontal
              gap: 3, // Jarak antar tombol
              padding: 3, // Padding untuk kontainer
              borderRadius: 3, // Sudut kontainer melengkung
              background: "rgba(255, 255, 255, 0.9)", // Latar belakang putih transparan
              backdropFilter: "blur(10px)", // Efek blur untuk latar belakang
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Bayangan untuk efek 3D
              width: "90%", // Lebar kontainer 90% dari layar
              maxWidth: { xs: 300, sm: 400 }, // Batas maksimal lebar, responsif
            }}
          >
            {/* Tombol Data Guru */}
            <Button
              variant="contained" // Tombol dengan warna solid
              sx={{
                width: "100%", // Tombol penuh dalam kontainer
                padding: "12px 18px", // Padding tombol
                background: "linear-gradient(135deg, #3498DB, #2980B9)", // Gradasi warna biru
                color: "#fff", // Warna teks putih
                fontWeight: "600", // Teks tebal
                transition: "all 0.3s ease", // Transisi halus untuk hover
                "&:hover": {
                  background: "linear-gradient(135deg, #2980B9, #1A73E8)", // Gradasi lebih terang saat hover
                  transform: "scale(1.05)", // Efek zoom saat hover
                },
              }}
              onClick={handleGoToDataGuru} // Navigasi ke halaman Data Guru
              startIcon={<PersonIcon />} // Ikon di awal tombol
            >
              Data Guru
            </Button>

            {/* Tombol Data Siswa */}
            <Button
              variant="contained"
              sx={{
                width: "100%", // Tombol penuh dalam kontainer
                padding: "12px 18px", // Padding tombol
                background: "linear-gradient(135deg, #E74C3C, #C0392B)", // Gradasi warna merah
                color: "#fff", // Warna teks putih
                fontWeight: "600", // Teks tebal
                transition: "all 0.3s ease", // Transisi halus untuk hover
                "&:hover": {
                  background: "linear-gradient(135deg, #C0392B, #A93226)", // Gradasi lebih terang saat hover
                  transform: "scale(1.05)", // Efek zoom saat hover
                },
              }}
              onClick={handleGoToDataSiswa} // Navigasi ke halaman Data Siswa
              startIcon={<SchoolIcon />} // Ikon di awal tombol
            >
              Data Siswa
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
