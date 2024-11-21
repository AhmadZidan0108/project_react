import React, { useEffect, useState } from "react"; // Mengimpor hooks React untuk manajemen state dan efek samping
import axios from "axios"; // Mengimpor axios untuk melakukan permintaan HTTP
import { useNavigate, useParams } from "react-router-dom"; // Mengimpor hooks untuk routing (navigasi dan parameter URL)
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari Material UI untuk input field
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari Material UI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography dari Material UI untuk styling teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box dari Material UI untuk layout
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper dari Material UI untuk styling container
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan pesan alert

export default function EditData() {
  // Variabel state untuk menyimpan data form
  const [namasiswa, setNamasiswa] = useState(""); // State untuk nama siswa
  const [kelas, setKelas] = useState(""); // State untuk kelas siswa
  const [jurusan, setJurusan] = useState(""); // State untuk jurusan siswa
  const [nisn, setNisn] = useState(""); // State untuk NISN siswa
  const [asalsekolah, setAsalsekolah] = useState(""); // State untuk asal sekolah siswa

  // Mendapatkan parameter 'id' dari URL
  const { id } = useParams();
  const navigate = useNavigate(); // Hook untuk navigasi programatik

  // Mengambil data untuk diedit ketika komponen pertama kali dimuat
  useEffect(() => {
    if (!id) {
      // Jika ID tidak ada dalam URL, tampilkan alert error dan keluar
      Swal.fire("Gagal!", "ID data tidak valid!", "error");
      return;
    }

    const fetchFood = async () => {
      try {
        // Mencoba untuk mengambil data siswa berdasarkan ID dari URL
        const response = await axios.get(`http://localhost:3030/siswa/${id}`);
        const food = response.data;

        if (!food) {
          // Jika data tidak ditemukan untuk ID yang diberikan, tampilkan alert error dan arahkan ke dashboard
          Swal.fire("Gagal!", "Data tidak ditemukan.", "error");
          navigate("/Datasiswa");
          return;
        }

        // Mengisi field form dengan data yang diambil
        setNamasiswa(food.namasiswa);
        setKelas(food.kelas);
        setJurusan(food.jurusan);
        setNisn(food.nisn);
        setAsalsekolah(food.asalsekolah);
      } catch (error) {
        // Jika ada error saat mengambil data, tampilkan alert error dan arahkan ke dashboard
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data.", "error");
        navigate("/Datasiswa");
      }
    };

    fetchFood(); // Panggil fungsi untuk mengambil data
  }, [id, navigate]); // Daftar dependensi untuk menjalankan efek ketika 'id' atau 'navigate' berubah

  // Menangani pengiriman form untuk memperbarui data siswa
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah perilaku default form submission

    // Validasi agar field yang wajib diisi tidak kosong
    if (!namasiswa || !nisn) {
      Swal.fire("Gagal!", "Semua data wajib diisi!", "error");
      return;
    }

    try {
      // Mempersiapkan data untuk dikirimkan dalam request PUT
      const updatedDatasiswa = {
        namasiswa,
        kelas: parseInt(kelas), // Mengubah 'kelas' menjadi angka
        jurusan,
        nisn: parseInt(nisn), // Mengubah 'nisn' menjadi angka
        asalsekolah,
      };

      // Mengirimkan request PUT untuk memperbarui data di server
      await axios.put(`http://localhost:3030/siswa/${id}`, updatedDatasiswa);

      // Menampilkan alert sukses setelah berhasil diperbarui
      Swal.fire("Berhasil!", "Perubahan data berhasil disimpan.", "success");
      navigate("/Datasiswa"); // Arahkan kembali ke dashboard setelah sukses
    } catch (error) {
      // Jika ada error saat memperbarui data, tampilkan alert error
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan perubahan data.", "error");
    }
  };

  return (
    // Layout utama menggunakan Material UI Box untuk memusatkan konten
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Memusatkan secara horizontal
        alignItems: "center", // Memusatkan secara vertikal
        height: "100vh", // Mengambil seluruh tinggi viewport
        backgroundColor: "#dcdcdc", // Warna latar belakang abu-abu muda
      }}
    >
      <Paper
        elevation={6} // Efek bayangan untuk komponen paper
        sx={{
          p: 4, // Padding di dalam komponen Paper
          width: "400px", // Menetapkan lebar container Paper
          display: "flex",
          flexDirection: "column", // Menata elemen secara vertikal
          justifyContent: "center", // Memusatkan konten secara vertikal di dalam Paper
          gap: 2, // Menambahkan jarak antar elemen
        }}
      >
        <Typography
          variant="h4" // Menetapkan ukuran font untuk judul
          sx={{
            textAlign: "center", // Memusatkan teks secara horizontal
            mb: 2, // Margin bawah
            color: "primary.main", // Menetapkan warna utama
            fontWeight: "500", // Menetapkan berat font medium
            letterSpacing: "1px", // Menambahkan jarak antar huruf
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)", // Efek bayangan pada teks
            fontFamily: "'Poppins', sans-serif", // Menetapkan font custom
          }}
        >
          Edit Data
        </Typography>
        {/* Form untuk mengedit data siswa */}
        <form onSubmit={handleSubmit}>
          {/* Field input untuk 'namasiswa', 'kelas', 'jurusan', 'nisn', dan 'asalsekolah' */}
          <TextField
            label="Nama Siswa"
            variant="outlined"
            fullWidth
            value={namasiswa}
            onChange={(e) => setNamasiswa(e.target.value)} // Menangani perubahan input
            sx={{ mb: 2 }} // Menambahkan margin bawah untuk memberi jarak antar field
          />
          <TextField
            label="Kelas"
            variant="outlined"
            fullWidth
            type="number" // Tipe input untuk 'kelas' berupa angka
            value={kelas}
            onChange={(e) => setKelas(e.target.value)} // Menangani perubahan input
            sx={{ mb: 2 }}
          />
          <TextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)} // Menangani perubahan input
            sx={{ mb: 2 }}
          />
          <TextField
            label="Nisn"
            variant="outlined"
            fullWidth
            type="number" // Tipe input untuk 'nisn' berupa angka
            value={nisn}
            onChange={(e) => setNisn(e.target.value)} // Menangani perubahan input
            sx={{ mb: 2 }}
          />
          <TextField
            label="Asalsekolah"
            variant="outlined"
            fullWidth
            value={asalsekolah}
            onChange={(e) => setAsalsekolah(e.target.value)} // Menangani perubahan input
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {/* Tombol kirim untuk menyimpan perubahan */}
            <Button variant="contained" color="primary" type="submit">
              Simpan Perubahan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
