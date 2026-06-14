# 📖 Panduan Lengkap Database Google Sheets (CMS)
### Portal Resmi MT. In'am Muslimah x Mahabbah Community

Dokumen ini menjelaskan konsep database berbasis Google Sheets, struktur tabel, cara pengisian data, serta langkah-langkah integrasi untuk Tim UI/UX, Data Engineer, maupun Klien.

---

## 💡 1. Konsep Dasar: Bagaimana Database Ini Bekerja?

Web portal ini dibangun sebagai aplikasi brosur digital dinamis yang hemat biaya (*Zero-Cost Setup*). Kita menggunakan **Google Sheets** sebagai *Admin Panel* (CMS). 

```
[Panitia/Admin] -> Menulis data di Google Sheets
       ↓
[Google Sheets] -> Dipublikasikan ke Web sebagai CSV
       ↓
[Next.js Portal] -> Membaca data CSV secara berkala (revalidate 60s)
       ↓
[Jamaah/User]   -> Melihat informasi terbaru di layar web
```

Keuntungan metode ini:
1. **Gratis & Aman:** Tidak memerlukan server database SQL berbayar.
2. **Sangat Mudah:** Klien tidak perlu belajar sistem admin panel yang rumit, cukup mengisi tabel seperti Excel biasa.
3. **Instan:** Perubahan data di Google Sheets akan langsung ter-update di web dalam waktu singkat setelah halaman di-refresh.

---

## 📊 2. Struktur 4 Tab Database (Skema Kolom)

Spreadsheet Google Sheets Anda harus memiliki **4 tab (sheet)** dengan nama dan kolom yang terstruktur secara persis sebagai berikut:

### 📑 Tab 1: `Settings`
Tab ini menampung teks konfigurasi umum dan tautan sosial media resmi. Format pengisian menggunakan pasangan **Key** (Kunci) di kolom A dan **Value** (Nilai) di kolom B.

> ⚠️ **PENTING:** Penulisan kunci di kolom **Key** wajib menggunakan huruf kecil dan menggunakan garis bawah (`_`) tanpa spasi, seperti daftar di bawah ini.

| Key (Kolom A) | Value (Kolom B) | Contoh Nilai | Menampilkan Apa di Web? |
| :--- | :--- | :--- | :--- |
| `marquee_text` | Teks Pengumuman | `📢 Dapatkan info kajian terbaru di WA Channel kami!` | Teks pengumuman berjalan di bagian paling atas halaman. |
| `alert_text` | Teks Peringatan | `MT. In'am tidak pernah meminta donasi via chat pribadi.` | Teks peringatan darurat anti-penipuan di halaman Beranda. |
| `wa_channel_url` | Tautan URL | `https://chat.whatsapp.com/Example` | Tautan tombol ketika mengklik "WhatsApp Channel". |
| `telegram_channel_url`| Tautan URL | `https://t.me/Example` | Tautan tombol ketika mengklik "Telegram Channel". |
| `instagram_inam_url` | Tautan URL | `https://instagram.com/mt.inam.muslimah` | Tautan tombol ketika mengklik "Instagram MT. In'am". |
| `instagram_mahabbah_url`| Tautan URL | `https://instagram.com/mahabbah.community`| Tautan tombol ketika mengklik "Instagram Mahabbah". |
| `maps_url` | Tautan URL | `https://maps.app.goo.gl/...` | Titik koordinat peta lokasi Google Maps sekretariat. |
| `contact_wa_number` | Angka | `6281234567890` | Nomor WhatsApp resmi admin (format internasional `62...`). |
| `about_text_inam` | Teks Deskripsi | `Komunitas dakwah muslimah yang berkomitmen...` | Ringkasan tentang MT. In'am Muslimah di halaman Beranda. |
| `about_text_mahabbah` | Teks Deskripsi | `Event organizer muslimah yang menghadirkan...` | Ringkasan tentang Mahabbah Community di halaman Beranda. |
| `image_url_inam` | Tautan Gambar | `/inam_profile.jpg` | Foto profil/sampul untuk MT. In'am di halaman Beranda. |
| `image_url_mahabbah` | Tautan Gambar | `/mahabbah_profile.jpg` | Foto profil/sampul untuk Mahabbah Community di Beranda. |

---

### 📑 Tab 2: `Schedules`
Tab ini menyimpan daftar semua program kajian, kelas tahsin, dan workout. Setiap baris baru yang Anda tambahkan di sheet ini akan memunculkan satu **Kartu Acara baru** di menu **Event**.

*Kolom header (baris pertama) harus bertuliskan:*
- Kolom A: `category` (Kategori acara: Kajian / Tahsin / Workout)
- Kolom B: `title` (Judul program acara)
- Kolom C: `datetime` (Hari, tanggal, dan jam pelaksanaan)
- Kolom D: `location` (Tempat atau nama gedung pelaksanaan)
- Kolom E: `detail` (Detail materi, nama penceramah, fasilitas, dll.)
- Kolom F: `image_url` (Foto ilustrasi acara, contoh: `/tahsin_class.jpg` atau link luar)
- Kolom G: `registration_url` (Tautan pendaftaran online seperti Google Form. *Jika kosong, tombol daftar tidak muncul*)

---

### 📑 Tab 3: `Registration`
Tab ini mengelola tombol pendaftaran cepat terpusat (Linktree-style) pada menu **Registrasi**.

*Kolom header (baris pertama) harus bertuliskan:*
- Kolom A: `button_text` (Tulisan tebal pada tombol pendaftaran, contoh: `Gabung Kelas Tahsin Al-Qur'an`)
- Kolom B: `url` (Tautan Google Form tujuan pendaftaran)
- Kolom C: `description` (Keterangan kecil di atas tombol untuk memperjelas nama kelas)

---

### 📑 Tab 4: `FAQ`
Tab ini mengelola daftar pertanyaan yang sering diajukan di menu **FAQ** menggunakan sistem akordeon (klik pertanyaan untuk membuka jawaban).

*Kolom header (baris pertama) harus bertuliskan:*
- Kolom A: `question` (Pertanyaan dari jamaah)
- Kolom B: `answer` (Jawaban lengkap panitia, mendukung enter/baris baru)

---

## 🛠️ 3. Panduan Langkah Inisialisasi Database (Setup Google Sheets)

Ikuti panduan 5 langkah berikut untuk menyiapkan Google Sheets Anda:

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com).
2. Buat dokumen kosong baru, beri nama sesuai proyek (contoh: `Database Portal MT Inam x Mahabbah`).
3. Buat **4 tab** baru di bagian bawah. Ubah namanya secara persis menjadi: `Settings`, `Schedules`, `Registration`, dan `FAQ`.

### Langkah 2: Impor Template CSV Lokal
Agar meminimalkan kesalahan nama kolom, gunakan berkas CSV template yang telah disediakan di folder proyek Anda:
1. Klik tab **Settings** di Google Sheets Anda.
2. Klik **File > Import > Upload**, lalu pilih berkas template Anda:
   📁 [Settings.csv](file:///E:/gemini_CLI/klien%201/document/templates_database_csv/Settings.csv)
3. Pilih opsi **"Replace current sheet"** lalu klik **Import Data**.
4. Ulangi hal yang sama untuk tab **Schedules**, **Registration**, dan **FAQ** menggunakan berkas template masing-masing:
   - 📁 [Schedules.csv](file:///E:/gemini_CLI/klien%201/document/templates_database_csv/Schedules.csv)
   - 📁 [Registration.csv](file:///E:/gemini_CLI/klien%201/document/templates_database_csv/Registration.csv)
   - 📁 [FAQ.csv](file:///E:/gemini_CLI/klien%201/document/templates_database_csv/FAQ.csv)

### Langkah 3: Publikasikan Dokumen ke Web
1. Di Google Sheets Anda, klik menu **File > Share > Publish to web**.
2. Pada panel yang terbuka:
   - Ubah dropdown pertama yang bertuliskan **"Web page"** menjadi **"Comma-separated values (.csv)"**.
   - Ubah dropdown kedua yang bertuliskan **"Entire Document"** menjadi tetap **"Entire Document"**.
   - Klik tombol **Publish** dan konfirmasi dengan klik **OK**.
3. Setelah diterbitkan, silakan tutup jendela dialog tersebut.

### Langkah 4: Dapatkan Spreadsheet ID Anda
Spreadsheet ID dapat ditemukan pada bilah alamat browser Anda (URL).
- Contoh URL Google Sheets Anda:
  `https://docs.google.com/spreadsheets/d/1A2b3C4d5E6f7G8h9I0jKLMnOpQr/edit#gid=0`
- Maka **Spreadsheet ID** Anda adalah:
  `1A2b3C4d5E6f7G8h9I0jKLMnOpQr` *(karakter antara `/d/` dan `/edit`)*.

### Langkah 5: Catat Nilai GID Setiap Tab
Tiap tab memiliki kode identitas unik yang disebut **GID**. Anda bisa melihatnya di bagian ujung URL browser setelah tulisan `gid=`:
1. Klik tab **Settings**: perhatikan ujung URL browser (contoh: `gid=0`).
2. Klik tab **Schedules**: perhatikan ujung URL browser (contoh: `gid=1345678`).
3. Klik tab **Registration**: perhatikan ujung URL browser.
4. Klik tab **FAQ**: perhatikan ujung URL browser.

---

## 🔐 4. Menghubungkan ke Kode Web Portal

Buka berkas konfigurasi **[src/config/sheetsConfig.ts](file:///E:/gemini_CLI/klien%201/src/config/sheetsConfig.ts)** pada editor VS Code Anda. Masukkan kode ID dan GID yang sudah Anda catat pada baris berikut:

```typescript
export const SHEETS_CONFIG = {
  spreadsheetId: "TEMPEL_SPREADSHEET_ID_ANDA_DISINI", 
  gids: {
    settings: "TEMPEL_GID_SETTINGS_DISINI",     // biasanya "0"
    schedules: "TEMPEL_GID_SCHEDULES_DISINI",
    registration: "TEMPEL_GID_REGISTRATION_DISINI",
    faq: "TEMPEL_GID_FAQ_DISINI",
  }
};
```

*Tip Keamanan/Skalabilitas: Di lingkungan produksi (seperti Vercel), nilai ini juga dapat dikonfigurasi melalui Environment Variables menggunakan kunci `NEXT_PUBLIC_SPREADSHEET_ID`, `NEXT_PUBLIC_GID_SETTINGS`, dst., sehingga aman dari kebocoran berkas publik.*
