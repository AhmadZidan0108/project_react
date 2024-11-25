import React, { useEffect, useState } from "react"; // Mengimpor React dan hooks yang dibutuhkan
import axios from "axios"; // Mengimpor axios untuk melakukan HTTP request
import { useNavigate, useParams } from "react-router-dom"; // Mengimpor hook dari react-router-dom untuk navigasi dan mengambil parameter URL
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari MUI
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari MUI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography dari MUI untuk teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box untuk layouting
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper untuk membuat elemen seperti kartu
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan alert
import Navbar from "../component/Navbar"; // Mengimpor Navbar

export default function EditData() {
  // State untuk menyimpan data inputan dari form
  const [namaguru, setNamaguru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const { id } = useParams(); // Mengambil parameter 'id' dari URL
  const navigate = useNavigate(); // Hook untuk melakukan navigasi

  // useEffect untuk mengambil data awal saat komponen pertama kali di-render
  useEffect(() => {
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchData = async () => {
      try {
        // Meminta data berdasarkan ID dari API
        const response = await axios.get(`http://localhost:3030/foods/${id}`);
        const data = response.data;

        if (!data) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Dataguru"); // Jika data tidak ditemukan, navigasi ke halaman Data Guru
          return;
        }

        // Mengisi state dengan data yang diperoleh dari API
        setNamaguru(data.namaguru);
        setMapel(data.mapel);
        setNik(data.nik);
        setGender(data.gender);
        setJabatan(data.jabatan);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Dataguru"); // Navigasi jika terjadi error
      }
    };

    fetchData();
  }, [id, navigate]); // useEffect dijalankan ulang jika 'id' atau 'navigate' berubah

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form dikirim

    // Validasi input
    if (!namaguru || !nik) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      const updatedData = {
        namaguru,
        mapel,
        nik: parseInt(nik), // Konversi 'nik' ke tipe angka
        gender,
        jabatan,
      };

      // Mengirim data yang telah diubah ke API
      await axios.put(`http://localhost:3030/foods/${id}`, updatedData);

      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Dataguru"); // Navigasi ke halaman Data Guru setelah berhasil
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <>
      <Navbar /> {/* Menampilkan komponen Navbar */}
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "230px", flexShrink: 0 }}></div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%", // Kotak mengisi lebar penuh
            background: "linear-gradient(135deg, #81c784, #4caf50)", // Gradasi hijau
            padding: 3, // Menambahkan padding
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              maxWidth: "90%", // Membuat lebar maksimum responsif
              width: "400px", // Default lebar untuk layar besar
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#f4faff", // Warna lembut
              borderRadius: "16px", // Sudut melengkung
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "#4caf50", // Warna hijau
                fontWeight: "500",
                mb: 2,
              }}
            >
              Edit Data
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nama Guru"
                variant="outlined"
                fullWidth
                value={namaguru}
                onChange={(e) => setNamaguru(e.target.value)} // Mengubah state
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mapel"
                variant="outlined"
                fullWidth
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nik"
                variant="outlined"
                fullWidth
                type="number"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Jabatan"
                variant="outlined"
                fullWidth
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#1e90ff",
                    "&:hover": { backgroundColor: "#0056b3" },
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
