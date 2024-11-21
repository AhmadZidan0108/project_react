import React, { useState } from "react";  // Mengimpor React dan hook useState untuk mengelola state dalam komponen
import axios from "axios";  // Mengimpor axios untuk melakukan permintaan HTTP
import { useNavigate } from "react-router-dom";  // Mengimpor useNavigate untuk menavigasi antar halaman
import TextField from "@mui/material/TextField";  // Mengimpor komponen TextField dari Material-UI untuk input teks
import Button from "@mui/material/Button";  // Mengimpor komponen Button dari Material-UI
import Typography from "@mui/material/Typography";  // Mengimpor komponen Typography untuk teks
import Box from "@mui/material/Box";  // Mengimpor Box untuk pengaturan layout
import Paper from "@mui/material/Paper";  // Mengimpor Paper untuk elemen dengan tampilan kartu
import Swal from "sweetalert2";  // Mengimpor SweetAlert2 untuk menampilkan notifikasi

export default function TambahDataguru() {
  // Deklarasi state untuk menyimpan data inputan
  const [namaguru, setDataguru] = useState("");  // Nama guru
  const [mapel, setMapel] = useState("");  // Mata pelajaran
  const [nik, setNik] = useState("");  // Nomor Induk Kependudukan (NIK)
  const [gender, setGender] = useState("");  // Jenis kelamin
  const [jabatan, setJabatan] = useState("");  // Jabatan guru
  const [minuman, setMinuman] = useState("");  // (Tidak digunakan dalam kode, bisa dihapus)
  const [asal, setAsal] = useState("");  // (Tidak digunakan dalam kode, bisa dihapus)
  const navigate = useNavigate();  // Hook untuk navigasi ke halaman lain

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();  // Mencegah refresh halaman saat form disubmit

    // Validasi sederhana: pastikan nama guru dan NIK tidak kosong
    if (!namaguru || !nik) {  // Jika nama guru atau NIK kosong
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");  // Tampilkan alert error
      return;  // Hentikan eksekusi lebih lanjut
    }

    try {
      // Ambil data minuman (terlihat tidak digunakan di form, tapi mungkin ada kegunaan lain)
      const response = await axios.get("http://localhost:3030/foods");  // Mengambil data dari API
      const foods = response.data;  // Menyimpan data yang diterima dari API

      // Cari ID terbesar dari data yang ada
      const lastId = foods.length > 0
        ? Math.max(...foods.map((food) => parseInt(food.id)))  // ID terbesar diambil dari data food
        : 0;  // Jika tidak ada data, ID dimulai dari 0

      // Membuat objek data baru untuk guru
      const newDataguru = {
        id: (lastId + 1).toString(),  // ID baru yang ditambah 1 dari ID terakhir
        no: lastId + 1,  // Nomor urut berdasarkan ID terakhir
        namaguru,
        mapel,
        nik: parseInt(nik),  // Pastikan NIK dalam bentuk integer
        gender,
        jabatan,
      };

      // Kirim data baru ke server
      await axios.post("http://localhost:3030/foods", newDataguru);  // Post data ke API

      // Menampilkan alert berhasil
      Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      navigate("/Dataguru");  // Navigasi kembali ke halaman daftar guru setelah berhasil
    } catch (error) {
      console.error("Error adding data:", error);  // Menampilkan error di console jika terjadi kesalahan
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan data.", "error");  // Menampilkan alert gagal
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",  // Mengatur layout agar form berada di tengah halaman
        alignItems: "center",  // Mengatur agar form vertikal di tengah
        height: "100vh",  // Set tinggi Box sesuai tinggi viewport
        backgroundColor: "#f5f5f5",  // Set warna latar belakang
      }}
    >
      <Paper
        elevation={6}  // Set elevation untuk Paper agar terlihat lebih tinggi
        sx={{
          p: 4,  // Padding di dalam Paper
          width: "400px",  // Lebar Paper
          display: "flex",
          flexDirection: "column",  // Susunan kolom
          gap: 2,  // Jarak antar elemen
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 2, color: "primary.main" }}  // Teks judul form
        >
          Tambah data Baru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"  // Label untuk field NamaGuru
            variant="outlined"
            fullWidth
            value={namaguru}  // Nilai field NamaGuru
            onChange={(e) => setDataguru(e.target.value)}  // Update state NamaGuru saat input berubah
            sx={{ mb: 2 }}  // Margin bawah
          />
          <TextField
            label="Mapel"  // Label untuk field Mapel
            variant="outlined"
            fullWidth
            value={mapel}  // Nilai field Mapel
            onChange={(e) => setMapel(e.target.value)}  // Update state Mapel
            sx={{ mb: 2 }}  // Margin bawah
          />
          <TextField
            label="Nik"  // Label untuk field NIK
            variant="outlined"
            fullWidth
            type="number"  // Tipe input angka untuk NIK
            value={nik}  // Nilai field NIK
            onChange={(e) => setNik(e.target.value)}  // Update state NIK
            sx={{ mb: 2 }}  // Margin bawah
          />
           <TextField
            label="Gender"  // Label untuk field Gender
            variant="outlined"
            fullWidth
            value={gender}  // Nilai field Gender
            onChange={(e) => setGender(e.target.value)}  // Update state Gender
            sx={{ mb: 2 }}  // Margin bawah
          />
           <TextField
            label="Jabatan"  // Label untuk field Jabatan
            variant="outlined"
            fullWidth
            value={jabatan}  // Nilai field Jabatan
            onChange={(e) => setJabatan(e.target.value)}  // Update state Jabatan
            sx={{ mb: 2 }}  // Margin bawah
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/Dashboard")}  // Navigasi ke halaman Dashboard jika dibatalkan
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
