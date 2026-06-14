# 📑 Portal Resmi MT. In'am Muslimah x Mahabbah Community

Proyek ini adalah portal informasi *mobile-first* dinamis yang dirancang khusus untuk jamaah kajian MT. In'am Muslimah x Mahabbah Community. Halaman web ini berfungsi sebagai portal brosur digital interaktif, mudah digunakan oleh jamaah dari berbagai rentang usia (termasuk lansia), dan didukung oleh **Google Sheets sebagai CMS (Content Management System)** sehingga panitia dapat mengubah jadwal dan pengumuman secara langsung tanpa harus melakukan *coding* ulang.

---

## 🚀 Fitur Utama

1. **Mobile-First Responsive Layout:** Didesain khusus untuk perangkat mobile (`max-w-md mx-auto relative`) yang terlihat sangat premium baik saat dibuka di ponsel maupun di komputer dengan tema *glassmorphic dashboard*.
2. **5 Menu Utama (SPA Tab Navigation):**
   - **Beranda:** Profil ringkas penyelenggara, *marquee* pengumuman berjalan, tombol jalan pintas cepat, dan *Emergency Warning Box* anti-penipuan donasi yang mencolok.
   - **Event:** Daftar kegiatan kajian rutin, kelas tahsin, dan kelas *workout* khusus akhwat lengkap dengan tombol filter kategori dinamis dan pendaftaran langsung.
   - **Registrasi:** Kumpulan tombol pendaftaran program (bergaya Linktree) yang ramah jempol.
   - **FAQ:** Pertanyaan & jawaban yang paling sering diajukan dengan menu *accordion* tunggal (hanya satu pertanyaan terbuka dalam satu waktu agar layar tidak terlalu panjang).
   - **Hubungi Panitia:** Tautan cepat menuju WhatsApp Admin resmi, Telegram Channel, Instagram resmi masing-masing komunitas, dan Titik Lokasi Google Maps.
3. **Google Sheets CMS Integration:** Sinkronisasi data dinamis dari Google Sheets ke situs web dengan *fallback mock data* premium jika spreadsheet belum diatur atau terjadi kegagalan muat.
4. **Optimasi Aksesibilitas (Aturan Jempol Lansia):** Seluruh elemen klik, tombol navigasi, dan baris akordeon FAQ memiliki tinggi minimal `48px` hingga `56px` dengan ukuran teks dan kontras warna yang nyaman dibaca oleh lansia.

---

## 🛠️ Arsitektur Teknologi

- **Framework:** Next.js 16 (React 19, App Router)
- **Styling:** Tailwind CSS v4 (Menggunakan konfigurasi `@theme inline` di CSS-first system)
- **Ikon:** Lucide React (dan Custom SVG untuk ketahanan kompilasi)
- **CMS Database:** Google Sheets CSV Export

---

## 📂 Struktur File Utama

- [src/app/page.tsx](file:///E:/gemini_CLI/klien%201/src/app/page.tsx) — Halaman utama portal kajian, navigasi bawah, penanganan state tab, filter, akordeon, dan layout responsif.
- [src/app/globals.css](file:///E:/gemini_CLI/klien%201/src/app/globals.css) — Konfigurasi token warna Tailwind CSS v4, aturan background desktop navy-radial, efek glassmorphism, dan animasi marquee.
- [src/app/layout.tsx](file:///E:/gemini_CLI/klien%201/src/app/layout.tsx) — Kerangka layout aplikasi, optimasi viewport ramah mobile, pemisahan viewport metadata, dan integrasi font Inter & Plus Jakarta Sans.
- [src/config/sheetsConfig.ts](file:///E:/gemini_CLI/klien%201/src/config/sheetsConfig.ts) — Konfigurasi ID Spreadsheet, ID tab GID Google Sheets, serta penampung *premium mock data* sebagai cadangan.
- [src/utils/csvParser.ts](file:///E:/gemini_CLI/klien%201/src/utils/csvParser.ts) — Parser CSV mandiri standar RFC-4180 untuk menangani ekstraksi data dari Google Sheets tanpa library luar.
- [src/utils/dataFetcher.ts](file:///E:/gemini_CLI/klien%201/src/utils/dataFetcher.ts) — Pengambil data API yang mengoordinasikan pengambilan data CSV dari Google Sheets dan memetakannya ke objek TypeScript.

---

## 📊 Cara Menghubungkan Google Sheets CMS

Untuk menghubungkan data portal langsung ke Google Sheets Anda, ikuti langkah-langkah berikut:

1. Buat Google Sheet baru dengan **4 Tab (Sheet)** dengan nama dan struktur kolom berikut:
   
   - **Tab 1: `Settings`**
     Kolom: `Key`, `Value`
     Masukkan baris kunci (huruf kecil) dan nilainya:
     - `marquee_text` (Teks pengumuman berjalan)
     - `alert_text` (Peringatan keamanan donasi)
     - `wa_channel_url` (Link WhatsApp Channel)
     - `telegram_channel_url` (Link Telegram Channel)
     - `instagram_inam_url` (Link Instagram MT. In'am)
     - `instagram_mahabbah_url` (Link Instagram Mahabbah Community)
     - `maps_url` (Link Google Maps)
     - `contact_wa_number` (Nomor WhatsApp Admin - format internasional, contoh: `628123456789`)
     - `about_text_inam` (Deskripsi ringkas MT. In'am Muslimah)
     - `about_text_mahabbah` (Deskripsi ringkas Mahabbah Community)

   - **Tab 2: `Schedules`**
     Kolom header (baris pertama): `category`, `title`, `datetime`, `location`, `detail`, `registration_url`

   - **Tab 3: `Registration`**
     Kolom header (baris pertama): `button_text`, `url`, `description`

   - **Tab 4: `FAQ`**
     Kolom header (baris pertama): `question`, `answer`

2. Publikasikan Google Sheet Anda ke Web:
   - Di Google Sheets, klik **File > Share > Publish to web**.
   - Pilih **Entire Document** dan pilih format **Comma-separated values (.csv)**.
   - Klik **Publish** dan salin URL-nya.
   - Dapatkan ID Spreadsheet dari URL publikasi tersebut (terletak setelah `/d/e/` dan sebelum `/pub`).

3. Dapatkan **GID** untuk setiap tab:
   - Saat Anda memilih tab individual untuk dipublikasikan sebagai CSV di panel Google Sheets, URL publikasinya akan berisi parameter `&gid=XXXXX`.
   - Catat nilai `gid` untuk masing-masing tab (`Settings`, `Schedules`, `Registration`, dan `FAQ`).

4. Konfigurasikan file `.env.local` di root proyek Anda dengan variabel berikut:
   ```env
   NEXT_PUBLIC_SPREADSHEET_ID=ID_SPREADSHEET_ANDA_DISINI
   NEXT_PUBLIC_GID_SETTINGS=GID_TAB_SETTINGS
   NEXT_PUBLIC_GID_SCHEDULES=GID_TAB_SCHEDULES
   NEXT_PUBLIC_GID_REGISTRATION=GID_TAB_REGISTRATION
   NEXT_PUBLIC_GID_FAQ=GID_TAB_FAQ
   ```
   *Catatan: Jika variabel lingkungan di atas kosong, aplikasi akan otomatis memuat mock data premium yang siap pakai agar web tidak pernah terlihat rusak atau kosong.*

---

## 💻 Cara Menjalankan Secara Lokal

1. **Instal Dependensi:**
   ```bash
   npm install
   ```
2. **Jalankan Mode Pengembangan:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
4. **Jalankan Hasil Build:**
   ```bash
   npm run start
   ```
