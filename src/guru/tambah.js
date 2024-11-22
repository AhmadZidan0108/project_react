import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Navbar from "../component/Navbar";

export default function TambahDataguru() {
  const [namaguru, setDataguru] = useState(""); // State for teacher's name
  const [mapel, setMapel] = useState(""); // State for subject
  const [nik, setNik] = useState(""); // State for NIK (Identification Number)
  const [gender, setGender] = useState(""); // State for gender
  const [jabatan, setJabatan] = useState(""); // State for position
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaguru || !nik) { // Ensure both name and NIK are filled
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3030/foods"); // Fetch data to get the last ID
      const foods = response.data;
      const lastId =
        foods.length > 0 ? Math.max(...foods.map((food) => parseInt(food.id))) : 0; // Get the last ID or 0 if empty

      // New teacher data object
      const newDataguru = {
        id: (lastId + 1).toString(),
        no: lastId + 1,
        namaguru,
        mapel,
        nik: parseInt(nik),
        gender,
        jabatan,
      };

      // Send POST request to add the new teacher data
      await axios.post("http://localhost:3030/foods", newDataguru);

      Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      navigate("/Dataguru"); // Navigate to the data list page
    } catch (error) {
      console.error("Error adding data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan data.", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "230px", flexShrink: 0 }}></div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#81c784", // Slightly darker green background color
            padding: 3,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              width: "90%",
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 3,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 2,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Tambah Data Baru
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Input fields for the form */}
              <TextField
                label="Nama Guru"
                variant="outlined"
                fullWidth
                value={namaguru}
                onChange={(e) => setDataguru(e.target.value)}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
              />
              <TextField
                label="Mapel"
                variant="outlined"
                fullWidth
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
              />
              <TextField
                label="Nik"
                variant="outlined"
                fullWidth
                type="number"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
              />
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
              />
              <TextField
                label="Jabatan"
                variant="outlined"
                fullWidth
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                {/* Cancel and Save buttons */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/Dashboard")}
                  sx={{
                    backgroundColor: "#ff5722",
                    "&:hover": { backgroundColor: "#e64a19" },
                  }}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: "#4caf50",
                    "&:hover": { backgroundColor: "#388e3c" },
                  }}
                >
                  Simpan
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </div>
    </>
  );
}
