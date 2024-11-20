import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function TambahDataguru() {
  const [namaguru, setDataguru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [minuman, setMinuman] = useState("");
const [asal, setAsal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!namaguru || !nik) {  // Perbaiki sintaksis di sini
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Dapatkan data minuman untuk menentukan ID terakhir
      const response = await axios.get("http://localhost:3030/foods");
      const foods = response.data;

      // Cari ID terbesar
      const lastId = foods.length > 0
        ? Math.max(...foods.map((food) => parseInt(food.id)))
        : 0;

      // Buat data minuman baru
      const newDataguru = {
        id: (lastId + 1).toString(),
        no: lastId + 1,
        namaguru,
        mapel,
        nik: parseInt(nik),
        gender,
        jabatan,
      };

      // Kirim data baru ke server
      await axios.post("http://localhost:3030/foods", newDataguru);

      Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      navigate("/Dataguru"); // Kembali ke halaman utama setelah berhasil
    } catch (error) {
      console.error("Error adding data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan data.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 2, color: "primary.main" }}
        >
          Tambah data Baru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="NamaGuru"
            variant="outlined"
            fullWidth
            value={namaguru}
            onChange={(e) => setDataguru(e.target.value)}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/Dashboard")}
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
