/**
 * NEXALYST CORE ENGINE v1.0
 * Developed for: Rizky Tanjung
 * Logic: Smart Calculation, Admin Synchronization, and Security.
 */

// 1. DATABASE HARGA DEFAULT
// Ini digunakan jika Anda belum pernah mengatur harga di Panel Admin.
const defaultPrices = {
    landing: 2500000,
    webProfil: 3500000,
    webApp: 7000000,
    featLogin: 500000,
    featPay: 1000000,
    featAdmin: 1500000
};

// 2. FUNGSI AMBIL HARGA AKTIF
// Sistem akan mengecek apakah ada harga kustom di LocalStorage (dari Admin Panel).
function getActivePrices() {
    const saved = localStorage.getItem('myProjectPrices');
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultPrices;
}

// 3. LOGIKA VALIDASI ADMIN
// Password rahasia Anda. Ganti "admin123" sesuai keinginan Anda.
function validateAdmin(inputPass) {
    const secureKey = "admin123"; 
    return inputPass === secureKey;
}

// 4. MESIN PENGHITUNG RANGE HARGA (THE CALCULATOR)
// Fungsi ini menghitung total biaya dan memberikan rentang (Range) harga.
function calculateRange(base, featuresTotal, multiplier) {
    const rawTotal = (base + featuresTotal) * multiplier;
    
    // Memberikan margin 10% ke bawah dan 10% ke atas agar negosiasi lebih fleksibel.
    const minRange = Math.round(rawTotal * 0.9);
    const maxRange = Math.round(rawTotal * 1.1);

    return {
        min: minRange,
        max: maxRange,
        fixed: rawTotal
    };
}

// 5. FORMATTER MATA UANG (RUPIAH)
// Mengubah angka 5000000 menjadi Rp 5.000.000 agar terlihat profesional.
const toIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(val);
};

// 6. LOG CONSOLE (Untuk Debugging)
console.log("%cNexalyst Engine: Active", "color: #00d4ff; font-weight: bold; font-size: 14px;");
