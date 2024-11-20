import React from 'react';
import img from "./images/img.jpg"

// Mendefinisikan komponen fungsional bernama Home
const Home = () => {
    // Mendeklarasikan objek user yang berisi data nama pengguna
    const user = {
        nama: "Ahmad Zidan", // Nama pengguna yang akan ditampilkan
        kelas: "X", 
        tempat_lahir: "Mars",
        tanggal_Lahir: "1-Desember-2008",
    };

    return (
        // Elemen div yang memiliki class 'card-body' dan beberapa style CSS
        <div className="card-body p-4">
            <div className="card bg-light border-0 shadow-sm" style={{ maxWidth: '200px' }}>
                <img
                    src={img}
                    alt="Foto KTP"
                    className="card-img-top rounded"
                    style={{ maxWidth: '100%', height: 'auto' }}  // Menyesuaikan ukuran gambar
                />
            </div>
            {/* Menampilkan nama pengguna dari objek user di dalam elemen h5 */}
            <h5 className="card-title text-center mb-4">{user.nama}</h5>
            <h5 className="card-title text-center mb-4">{user.kelas}</h5>
            <h5 className="card-title text-center mb-4">{user.tempat_lahir}</h5>
            <h5 className="card-title text-center mb-4">{user.tanggal_Lahir}</h5>
        </div>

        
    );
};

export default Home;