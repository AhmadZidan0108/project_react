import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Komponen untuk routing
import Home from "./Home";
import Tugas from "./tugas";
import Dashboard from "./Dashboard";
import Datasiswa from "./Datasiswa";
import Dataguru from "./Dataguru";
import Tugaspakaian from "./Tugaspakaian";
import Tambah from "./tambah"; // Halaman Tambah
import Edit from "./Ubahminuman"; 

function App() {
  return (
    <div className="App"> {/* Membungkus seluruh konten aplikasi dalam elemen div */}
      <Routes> {/* Membuat rute (route) untuk navigasi */}
        {/* Rute default akan diarahkan ke '/Home' */}
        <Route path="/" element={<Navigate to="/Home" />} />
        {/* Rute untuk masing-masing halaman */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Tugas" element={<Tugas />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Datasiswa" element={<Datasiswa />} />
        <Route path="/Dataguru" element={<Dataguru />} />
        <Route path="/TugasPakaian" element={<Tugaspakaian />} />
        <Route path="/Tambah" element={<Tambah />} /> {/* Rute baru untuk halaman Tambah */}
        <Route path="/Edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App; // Mengekspor komponen App agar bisa digunakan di tempat lain
