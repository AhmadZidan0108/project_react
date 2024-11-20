import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function EditData() {
  const [namaguru, setNamaguru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [minuman, setMinuman] = useState("");
  const [harga, setHarga] = useState(0);
  const [asal, setAsal] = useState("");
  const [dataguru, setDataguru] = useState([]);
  const { id } = useParams(); // Get the ID from URL
  const navigate = useNavigate();

  // Fetch data minuman based on the ID from the URL
  useEffect(() => {
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/foods/${id}`);
        const food = response.data;

        if (!food) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Dashboard"); // Redirect to Dashboard if food is not found
          return;
        }

        setMinuman(food.minuman);
        setHarga(food.harga);
        setAsal(food.asal);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Dashboard"); // Redirect to Dashboard if there's an error
      }
    };

    fetchFood();
  }, [id, navigate]); // Add navigate to dependencies to ensure it updates properly

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!minuman || !harga || !asal) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Prepare data to update minuman
      const updatedMinuman = {
        minuman,
        harga: parseInt(harga),
        asal,
      };

      // Send PUT request to update data
      await axios.put(`http://localhost:3030/foods/${id}`, updatedMinuman);

      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Dataguru"); // Go back to dashboard after success
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#dcdcdc", // Ganti warna background menjadi abu-abu terang
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center all content vertically
          gap: 2,
        }}
      >
        <Typography
          variant="h4"  // Change size to make it more prominent
          sx={{
            textAlign: "center",
            mb: 2,
            color: "primary.main",
            fontWeight: "500", // Make it slightly lighter for a friendlier look
            letterSpacing: "1px", // Add some space for a more relaxed feel
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow effect for a softer look
            fontFamily: "'Poppins', sans-serif", // Optional: you can use a Google Font like Poppins
          }}
        >
          Edit Minuman
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"
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
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Simpan Perubahan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}