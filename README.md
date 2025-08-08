# Tugas Sesi 9 - Web UI Automation Fundamental

Proyek ini merupakan implementasi **Web UI Automation Testing** menggunakan **Selenium WebDriver** dan **Mocha** pada situs [SauceDemo](https://www.saucedemo.com/).  
Pengujian dilakukan untuk memverifikasi skenario login dan pengurutan produk (sort) A-Z.

## 📌 Teknologi yang Digunakan
- [Node.js](https://nodejs.org/) (Runtime JavaScript)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)
- [Mocha](https://mochajs.org/) (Test framework)
- [Mochawesome](https://www.npmjs.com/package/mochawesome) (HTML Report)
- [Mocha Simple HTML Reporter](https://www.npmjs.com/package/mocha-simple-html-reporter)

## 📂 Struktur Proyek
```
.
├── tests/
│   └── test_sesi9.js     # File utama pengujian
├── package.json          # Konfigurasi proyek & dependencies
└── README.md             # Dokumentasi proyek
```

## ⚙️ Instalasi
1. Pastikan Node.js sudah terinstall:
   ```bash
   node -v
   npm -v
   ```
2. Clone repository atau simpan file project ini.
3. Install dependencies:
   ```bash
   npm install
   ```

## ▶️ Menjalankan Test
### 1. Jalankan test biasa (tanpa reporter khusus)
```bash
npm test
```

### 2. Jalankan test dengan **Mochawesome Report**
```bash
npm run test:mochawesome
```
Hasil report akan tersimpan di folder `mochawesome-report/`.

### 3. Jalankan test dengan **Mocha Simple HTML Reporter**
```bash
npm run test:simple-html
```
Hasil report akan tersimpan di file `report.html`.

## 🧪 Skenario Pengujian
### 1. **User berhasil login**
- Masuk ke halaman login `https://www.saucedemo.com`
- Input **username**: `standard_user`
- Input **password**: `secret_sauce`
- Klik tombol login
- Verifikasi ikon cart tampil
- Verifikasi teks logo adalah **Swag Labs**

### 2. **User berhasil sort produk A-Z**
- Login seperti skenario pertama
- Pilih dropdown sort `Name (A to Z)`
- Ambil semua nama produk
- Pastikan produk terurut sesuai alfabet A-Z

## ✍️ Author
**Aman Swasono**  
_Tugas Sesi 9 - Web UI Automation Fundamental_
