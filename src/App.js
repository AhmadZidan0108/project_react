import React from "react"; // Mengimpor React untuk membuat komponen
import { Route, Routes, Navigate } from "react-router-dom"; // Mengimpor komponen untuk routing dari react-router-dom
import Home from "./Home"; // Mengimpor komponen halaman Home
import Tugas from "./tugas"; // Mengimpor komponen halaman Tugas
import Dashboard from "./Dashboard"; // Mengimpor komponen halaman Dashboard
import Datasiswa from "./Datasiswa"; // Mengimpor komponen halaman Data Siswa
import Dataguru from "./Dataguru"; // Mengimpor komponen halaman Data Guru
import Tugaspakaian from "./Tugaspakaian"; // Mengimpor komponen halaman Tugas Pakaian
import Tambah from "./tambah"; // Mengimpor komponen halaman Tambah
import Ubahminuman from "./Ubahminuman"; // Mengimpor komponen halaman Ubah Minuman
import Tambahsiswa from "./tambahsiswa"; // Mengimpor komponen halaman Tambah Siswa
import Ubahsiswa from "./Ubahsiswa"; // Mengimpor komponen halaman Ubah Siswa

function App() {
  return (
    <div className="App"> {/* Membungkus seluruh aplikasi dalam elemen div untuk pengaturan styling dan struktur */}
      <Routes> {/* Komponen Routes untuk mendefinisikan rute-rute yang tersedia dalam aplikasi */}
        {/* Rute default, jika pengguna mengakses root ('/') maka akan diarahkan ke '/Home' */}
        <Route path="/" element={<Navigate to="/Home" />} />
        
        {/* Definisi rute untuk setiap halaman yang akan ditampilkan */}
        <Route path="/Home" element={<Home />} /> {/* Menampilkan halaman Home */}
        <Route path="/Tugas" element={<Tugas />} /> {/* Menampilkan halaman Tugas */}
        <Route path="/Dashboard" element={<Dashboard />} /> {/* Menampilkan halaman Dashboard */}
        <Route path="/Datasiswa" element={<Datasiswa />} /> {/* Menampilkan halaman Data Siswa */}
        <Route path="/Dataguru" element={<Dataguru />} /> {/* Menampilkan halaman Data Guru */}
        <Route path="/TugasPakaian" element={<Tugaspakaian />} /> {/* Menampilkan halaman Tugas Pakaian */}
        <Route path="/Tambah" element={<Tambah />} /> {/* Menampilkan halaman Tambah */}
        <Route path="/Ubahminuman/:id" element={<Ubahminuman />} /> {/* Menampilkan halaman Ubah Minuman, dengan parameter 'id' */}
        <Route path="/Tambahsiswa" element={<Tambahsiswa />} /> {/* Menampilkan halaman Tambah Siswa */}
        <Route path="/Ubahsiswa/:id" element={<Ubahsiswa />} /> {/* Menampilkan halaman Ubah Siswa, dengan parameter 'id' */}
      </Routes>
    </div>
  );
}

export default App; // Mengekspor komponen App agar bisa digunakan di tempat lain
