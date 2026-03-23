/**
 * NEXALYST CORE ENGINE v2.2 - Elevatio AuraArray
 * Logic: Smart Context Analysis & Persistent Logging
 */

// 1. DATABASE HARGA DEFAULT (Bisa diubah via Admin Panel nanti)
const defaultPrices = {
    landing: 2500000,    // Harga dasar Landing Page
    webProfil: 4000000,  // Harga dasar Web Profil Bisnis
    webApp: 7500000,     // Harga dasar Web App/Sistem
    fiturLogin: 1000000, // Tambahan fitur akun/login
    fiturPayment: 2000000 // Tambahan fitur bayar otomatis/QRIS
};

/**
 * MENGAMBIL HARGA AKTIF
 * Mencoba mengambil dari memori Admin, jika kosong pakai harga default.
 */
function getActivePrices() {
    const saved = localStorage.getItem('auraArray_prices');
    return saved ? JSON.parse(saved) : defaultPrices;
}

/**
 * FUNGSI ANALISA TEKS (THE BRAIN)
 * Menganalisis kata kunci dari curhatan klien untuk menentukan harga.
 */
function analisaKebutuhan(teks) {
    const t = teks.toLowerCase();
    const p = getActivePrices();
    
    let estimasi = p.landing; // Mulai dari harga terendah
    let kategori = "Landing Page / Single Page";

    // Deteksi Web Profil (Bisnis/Instansi/Perusahaan)
    if (t.includes("profil") || t.includes("perusahaan") || t.includes("company") || t.includes("bisnis") || t.includes("instansi")) {
        estimasi = p.webProfil;
        kategori = "Business Profile Website";
    }

    // Deteksi Web App / Sistem Kompleks
    if (t.includes("sistem") || t.includes("aplikasi") || t.includes("database") || t.includes("manajemen") || t.includes("admin panel")) {
        estimasi = p.webApp;
        kategori = "Custom Web Application";
    }

    // Deteksi Fitur Tambahan: Pembayaran (QRIS/Otomatis)
    if (t.includes("bayar") || t.includes("otomatis") || t.includes("qris") || t.includes("payment") || t.includes("checkout")) {
        estimasi += p.fiturPayment;
        kategori += " + Payment Integration";
    }

    // Deteksi Fitur Tambahan: Login/Akun Member
    if (t.includes("login") || t.includes("daftar") || t.includes("akun") || t.includes("member")) {
        estimasi += p.fiturLogin;
        kategori += " + User Auth System";
    }

    return { estimasi, kategori };
}

/**
 * PENYIMPANAN LOG KONSULTASI (FOR ADMIN)
 * Menyimpan data klien ke LocalStorage agar bisa dilihat di Admin Panel.
 */
function saveLog(data) {
    try {
        let logs = JSON.parse(localStorage.getItem('auraArray_logs') || "[]");
        // Tambahkan timestamp (waktu) saat klien mengisi form
        const newEntry = { 
            ...data, 
            id: Date.now(),
            date: new Date().toLocaleString('id-ID') 
        };
        logs.push(newEntry);
        localStorage.setItem('auraArray_logs', JSON.stringify(logs));
        console.log("Log saved for Elevatio Admin ✅");
    } catch (e) {
        console.error("Gagal menyimpan log:", e);
    }
}

/**
 * KEAMANAN ADMIN
 * Password untuk masuk ke halaman admin.html
 */
function validateAdmin(input) {
    const secureKey = "elevatio24"; // Silakan ganti password ini jika mau
    return input === secureKey;
}

/**
 * FORMATTER RUPIAH (PRO)
 * Mengubah angka menjadi format Rp 0.000.000
 */
const toIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(val);
};

// Console Branding
console.log("%c ELEVATIO - AURAARRAY CORE READY ", "background: #020617; color: #38bdf8; font-weight: bold; border: 1px solid #38bdf8; padding: 5px;");
