import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan mengimpor Bootstrap

import images from "./images/img.jpg"; // Pastikan gambar berada di folder yang benar

const Tugas = () => {
    const [hovered, setHovered] = useState(false); // Menyimpan status hover

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const user = {
        nama: "Ahmad Zidan",
        kelas: "X TKJ",
        tempat_tanggal_lahir: "Demak 1 Desember",
        lahir_tahun: "2008",
        alamat: "Karang Sono",
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
            <div className="card shadow-lg rounded" style={{ maxWidth: '700px', width: '100%' }}>
                <div className="row g-0">
                    {/* Gambar */}
                    <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
                        <img
                            src={images}
                            alt="Foto KTP"
                            className="img-fluid rounded-circle shadow"
                            style={{ width: '80%' }} // Gambar dengan ukuran lebih kecil
                        />
                    </div>

                    {/* Konten Teks */}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title text-uppercase fw-bold mb-4" style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>
                                Identitas Saya
                            </h3>
                            <p
                                className={`card-text mb-3 ${hovered ? "text-primary" : "text-muted"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                Nama: {user.nama}
                            </p>
                            <p
                                className={`card-text mb-3 ${hovered ? "text-primary" : "text-muted"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                Kelas: {user.kelas}
                            </p>
                            <p
                                className={`card-text mb-3 ${hovered ? "text-primary" : "text-muted"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                Tempat Tanggal Lahir: {user.tempat_tanggal_lahir}
                            </p>
                            <p
                                className={`card-text mb-3 ${hovered ? "text-primary" : "text-muted"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                Lahir Tahun: {user.lahir_tahun}
                            </p>
                            <p
                                className={`card-text mb-3 ${hovered ? "text-primary" : "text-muted"}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                            >
                                Alamat: {user.alamat}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tugas;