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
      {/* Komponen Navbar untuk navigasi atas */}
      <Navbar />
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar placeholder (Anda bisa menambahkan sidebar di sini jika diperlukan) */}
        <div style={{ width: '230px', flexShrink: 0 }}></div>

        {/* Kontainer utama untuk konten halaman */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Elemen disusun secara vertikal
            alignItems: "center", // Posisi elemen di tengah horizontal
            justifyContent: "center", // Posisi elemen di tengah vertikal
            width: "100%", // Memastikan kotak mengisi seluruh lebar layar
            background: "linear-gradient(135deg, #81C784, #66BB6A)", // Gradasi warna hijau muda untuk latar belakang
            padding: 3, // Padding untuk memberi ruang di dalam elemen
            boxSizing: "border-box", // Menghitung padding agar tidak memengaruhi ukuran total
          }}
        >
          {/* Judul halaman dengan animasi fade-in */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#ECF0F1", // Warna teks terang agar kontras dengan latar belakang
              fontWeight: "700", // Ketebalan font untuk judul
              letterSpacing: 1.2, // Memberikan jarak antar huruf
              marginBottom: 4, // Memberikan margin bawah
              animation: "fadeIn 1.5s ease-out", // Animasi muncul perlahan
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(-20px)" }, // Awal animasi: opacity 0 dan naik sedikit
                "100%": { opacity: 1, transform: "translateY(0)" }, // Akhir animasi: opacity penuh dan posisi normal
              },
            }}
          >
            Selamat datang di data sederhana Zidan
          </Typography>

          {/* Kontainer untuk tombol */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Elemen disusun vertikal
              alignItems: "center", // Posisi elemen di tengah horizontal
              gap: 3, // Jarak antara tombol
              padding: 3, // Memberikan padding di dalam kotak
              borderRadius: 3, // Sudut kotak menjadi melengkung
              background: "rgba(255, 255, 255, 0.9)", // Latar belakang putih dengan sedikit transparansi
              backdropFilter: "blur(10px)", // Efek blur di belakang kotak
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Shadow untuk efek 3D
              width: "90%", // Lebar kotak 90% dari layar
              maxWidth: 400, // Lebar maksimal kotak 400px
            }}
          >
            {/* Tombol untuk Data Guru */}
            <Button
              variant="contained"
              sx={{
                width: "100%", // Lebar tombol penuh dalam kotak
                padding: "12px 18px", // Padding tombol untuk ukuran proporsional
                background: "linear-gradient(135deg, #3498DB, #2980B9)", // Gradasi warna biru untuk tombol
                color: "#fff", // Warna teks putih
                fontWeight: "600", // Ketebalan teks tombol
                transition: "all 0.3s ease", // Transisi halus untuk hover
                "&:hover": {
                  background: "linear-gradient(135deg, #2980B9, #1A73E8)", // Warna gradasi lebih terang saat hover
                  transform: "scale(1.05)", // Efek zoom saat hover
                },
              }}
              onClick={handleGoToDataGuru} // Fungsi yang dijalankan saat tombol diklik
              startIcon={<PersonIcon />} // Ikon di awal teks tombol
            >
              Data Guru
            </Button>

            {/* Tombol untuk Data Siswa */}
            <Button
              variant="contained"
              sx={{
                width: "100%", // Lebar tombol penuh dalam kotak
                padding: "12px 18px", // Padding tombol
                background: "linear-gradient(135deg, #E74C3C, #C0392B)", // Gradasi warna merah untuk tombol
                color: "#fff", // Warna teks putih
                fontWeight: "600", // Ketebalan teks tombol
                transition: "all 0.3s ease", // Transisi halus untuk hover
                "&:hover": {
                  background: "linear-gradient(135deg, #C0392B, #A93226)", // Warna gradasi lebih terang saat hover
                  transform: "scale(1.05)", // Efek zoom saat hover
                },
              }}
              onClick={handleGoToDataSiswa} // Fungsi yang dijalankan saat tombol diklik
              startIcon={<SchoolIcon />} // Ikon di awal teks tombol
            >
              Data Siswa
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
