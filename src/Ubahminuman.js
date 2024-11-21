import React, { useEffect, useState } from "react"; // Mengimpor React dan hooks useEffect dan useState
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP
import { useNavigate, useParams } from "react-router-dom"; // Mengimpor hooks dari react-router-dom untuk navigasi dan mendapatkan parameter URL
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari Material UI untuk input data
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari Material UI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography dari Material UI untuk teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box dari Material UI untuk layout
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper dari Material UI untuk memberikan efek kertas
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan alert (pop-up)

export default function EditData() {
  // Mendefinisikan state untuk menyimpan nilai input dari form
  const [namaguru, setNamaguru] = useState("");
  const [mapel, setMapel] = useState("");
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [jabatan, setJabatan] = useState("");

  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengambil data berdasarkan ID yang ada di URL
  useEffect(() => {
    if (!id) {
      Swal.fire("Gagal!", "ID data tidak valid!", "error"); // Jika ID tidak ada, tampilkan alert
      return;
    }

    const fetchFood = async () => {
      try {
        // Melakukan request GET ke API untuk mengambil data berdasarkan ID
        const response = await axios.get(`http://localhost:3030/foods/${id}`);
        const food = response.data;

        // Jika data tidak ditemukan
        if (!food) {
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Dataguru"); // Navigasi kembali ke halaman daftar guru
          return;
        }

        // Set nilai state dengan data yang diambil dari API
        setNamaguru(food.namaguru);
        setMapel(food.mapel);
        setNik(food.nik);
        setGender(food.gender);
        setJabatan(food.jabatan);
      } catch (error) {
        // Menangani error jika request gagal
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Dataguru"); // Navigasi kembali ke halaman daftar guru jika error
      }
    };

    fetchFood(); // Panggil fungsi untuk mengambil data
  }, [id, navigate]); // Hook akan dijalankan saat ID atau navigate berubah

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman saat form disubmit

    // Validasi input agar tidak ada data yang kosong
    if (!namaguru || !nik) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      // Menyiapkan data yang akan dikirim untuk update
      const updatedDataguru = {
        namaguru,
        mapel,
        nik: parseInt(nik), // Mengubah nik menjadi tipe data integer
        gender,
        jabatan,
      };

      // Mengirim request PUT untuk memperbarui data
      await axios.put(`http://localhost:3030/foods/${id}`, updatedDataguru);

      // Menampilkan alert jika berhasil
      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Dataguru"); // Navigasi kembali ke halaman daftar guru setelah berhasil
    } catch (error) {
      // Menangani error jika request PUT gagal
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Membuat layout di tengah
        alignItems: "center", // Menjaga agar semua item terpusat secara vertikal
        height: "100vh", // Mengatur tinggi container sesuai tinggi layar
        backgroundColor: "#dcdcdc", // Memberikan warna latar belakang abu-abu terang
      }}
    >
      <Paper
        elevation={6} // Memberikan efek bayangan pada kertas
        sx={{
          p: 4, // Memberikan padding pada seluruh sisi
          width: "400px", // Mengatur lebar container
          display: "flex",
          flexDirection: "column", // Mengatur elemen-elemen dalam kolom
          justifyContent: "center", // Menjaga konten agar terpusat secara vertikal
          gap: 2, // Memberikan jarak antar elemen
        }}
      >
        <Typography
          variant="h4" // Menentukan ukuran teks
          sx={{
            textAlign: "center", // Menyelaraskan teks ke tengah
            mb: 2, // Memberikan margin bawah
            color: "primary.main", // Mengatur warna teks sesuai dengan warna utama tema
            fontWeight: "500", // Mengatur ketebalan font
            letterSpacing: "1px", // Memberikan jarak antar huruf
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)", // Memberikan efek bayangan pada teks
            fontFamily: "'Poppins', sans-serif", // Menggunakan font Poppins
          }}
        >
          Edit Data
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Form input untuk nama guru */}
          <TextField
            label="Nama Guru"
            variant="outlined"
            fullWidth
            value={namaguru}
            onChange={(e) => setNamaguru(e.target.value)} // Update state saat input berubah
            sx={{ mb: 2 }}
          />
          {/* Form input untuk mata pelajaran */}
          <TextField
            label="Mapel"
            variant="outlined"
            fullWidth
            value={mapel}
            onChange={(e) => setMapel(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Form input untuk NIK */}
          <TextField
            label="Nik"
            variant="outlined"
            fullWidth
            type="number"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Form input untuk gender */}
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Form input untuk jabatan */}
          <TextField
            label="Jabatan"
            variant="outlined"
            fullWidth
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {/* Tombol untuk submit data */}
            <Button variant="contained" color="primary" type="submit">
              Simpan Perubahan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
