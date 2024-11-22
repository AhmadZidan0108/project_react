import React, { useEffect, useState } from "react"; // Mengimpor React dan hooks yang dibutuhkan
import axios from "axios"; // Mengimpor axios untuk melakukan HTTP request
import { useNavigate, useParams } from "react-router-dom"; // Mengimpor hook dari react-router-dom untuk navigasi dan mengambil parameter URL
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari MUI
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari MUI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography dari MUI untuk teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box untuk layouting
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper untuk membuat elemen seperti kartu
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan alert
import Navbar from "../component/Navbar";

export default function EditData() {
  // Mendeklarasikan state untuk menyimpan data inputan form
  const [namaguru, setNamaguru] = useState(""); 
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const { id } = useParams(); // Mengambil parameter 'id' dari URL
  const navigate = useNavigate(); // Hook untuk melakukan navigasi

  // useEffect untuk mengambil data saat pertama kali komponen di render
  useEffect(() => {
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchFood = async () => {
      try {
        // Mengambil data berdasarkan ID dari API
        const response = await axios.get(`http://localhost:3030/foods/${id}`);
        const food = response.data;

        if (!food) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Dataguru"); // Jika data tidak ditemukan, navigasi ke halaman Data Guru
          return;
        }

        // Mengupdate state dengan data yang didapatkan dari API
        setNamaguru(food.namaguru);
        setMapel(food.mapel);
        setNik(food.nik);
        setGender(food.gender);
        setJabatan(food.jabatan);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Dataguru"); // Jika terjadi error, navigasi ke halaman Data Guru
      }
    };

    fetchFood();
  }, [id, navigate]); // useEffect dijalankan setiap kali 'id' atau 'navigate' berubah

  // Fungsi untuk menangani form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    // Validasi untuk memastikan semua data yang diperlukan sudah diisi
    if (!namaguru || !nik) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      const updatedDataguru = {
        namaguru,
        mapel,
        nik: parseInt(nik), // Mengubah nik menjadi angka
        gender,
        jabatan,
      };

      // Mengirimkan data yang sudah diperbarui ke server
      await axios.put(`http://localhost:3030/foods/${id}`, updatedDataguru);

      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Dataguru"); // Setelah berhasil, navigasi ke halaman Data Guru
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <>
      <Navbar /> {/* Menampilkan Navbar */}
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "230px", flexShrink: 0 }}></div>

        {/* Latar belakang diperbesar dengan efek gradasi */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%", // Memastikan kotak mengisi seluruh lebar layar
            background: "linear-gradient(135deg, #81c784, #4caf50)", // Gradasi warna hijau yang lebih tua
            backgroundSize: "cover", // Menutupi area secara proporsional
            backgroundAttachment: "fixed", // Latar belakang tetap saat scroll
            padding: 3, // Ruang di dalam
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              width: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              backgroundColor: "#f4faff", // Warna lembut biru pucat
              borderRadius: "16px", // Sudut lebih melengkung
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Efek bayangan untuk estetika
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 2,
                color: "#4caf50", // Warna hijau lembut
                fontWeight: "500",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Edit Data
            </Typography>
            {/* Form untuk mengedit data */}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nama Guru"
                variant="outlined"
                fullWidth
                value={namaguru}
                onChange={(e) => setNamaguru(e.target.value)} // Mengupdate state 'namaguru'
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mapel"
                variant="outlined"
                fullWidth
                value={mapel}
                onChange={(e) => setMapel(e.target.value)} // Mengupdate state 'mapel'
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nik"
                variant="outlined"
                fullWidth
                type="number"
                value={nik}
                onChange={(e) => setNik(e.target.value)} // Mengupdate state 'nik'
                sx={{ mb: 2 }}
              />
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)} // Mengupdate state 'gender'
                sx={{ mb: 2 }}
              />
              <TextField
                label="Jabatan"
                variant="outlined"
                fullWidth
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)} // Mengupdate state 'jabatan'
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#1e90ff", // Warna biru cerah
                    "&:hover": {
                      backgroundColor: "#0056b3", // Warna biru lebih gelap saat hover
                    },
                  }}
                >
                  Simpan Perubahan
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </div>
    </>
  );
}
