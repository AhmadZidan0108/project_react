import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Navbar from "../component/Navbar";

export default function EditData() {
  const [namaguru, setNamaguru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/foods/${id}`);
        const data = response.data;

        if (!data) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Dataguru");
          return;
        }

        setNamaguru(data.namaguru);
        setMapel(data.mapel);
        setNik(data.nik);
        setGender(data.gender);
        setJabatan(data.jabatan);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Dataguru");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaguru || !nik) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      const updatedData = {
        namaguru,
        mapel,
        nik: parseInt(nik),
        gender,
        jabatan,
      };

      await axios.put(`http://localhost:3030/foods/${id}`, updatedData);

      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Dataguru");
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #81c784, #4caf50)",
          padding: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: { xs: "100%", sm: "400px" },
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#f4faff",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "#4caf50",
              fontWeight: "500",
              mb: 2,
              fontSize: { xs: "1.5rem", sm: "2rem" },
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
              onChange={(e) => setNamaguru(e.target.value)}
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
                  width: "100%",
                  padding: { xs: "10px", sm: "14px" },
                }}
              >
                Simpan Perubahan
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}
