
---

# 📑 PRODUCT REQUIREMENTS DOCUMENT (PRD) - FINAL

**Nama Proyek:** Web Portal Informasi MT. In'am Muslimah x Mahabbah Community
**Project Manager:** R. Achmad Fadhil I'Tishom
**Sifat Proyek:** *Rush Development* (Pembuatan Kilat 24 Jam)
**Target Live Production:** Senin, 15 Juni 2026
**Platform:** Mobile-First Web Application (SPA)

---

## 1. Ringkasan Proyek

Kita akan membangun sebuah *landing page* dinamis untuk jamaah kajian muslimah. Website ini berfungsi seperti aplikasi brosur digital. Karena menargetkan pengguna dari remaja hingga lansia, antarmuka harus sangat mudah digunakan (*user-friendly*).

Sistem akan menggunakan **Google Sheets sebagai CMS (Admin Panel)**. Klien/Panitia tidak perlu *login* ke *dashboard* khusus; mereka cukup mengubah teks atau jadwal di Google Sheets, dan website akan otomatis ter-*update*.

---

## 2. Pembagian Peran Tim

* **Fadhil (Project Manager & Data Engineer):** Bertanggung jawab atas infrastruktur Vercel, *repository* GitHub, merakit Google Sheets CMS, menulis *script Fetch API* & *Parser* CSV untuk menarik data, optimasi SEO, dan memastikan proyek rilis tepat waktu.
* **Tim UI (Frontend Developer):** Bertanggung jawab menerjemahkan PRD ini menjadi barisan kode HTML/React dan **Tailwind CSS**. Fokus pada tata letak, komponen desain (kartu, tombol, navigasi), responsivitas layar HP, dan animasi interaksi.

---

## 3. Arsitektur Teknologi (Zero-Cost Setup)

* **Frontend:** Kerangka React/Next.js atau HTML/JS murni (ditentukan oleh PM).
* **Styling:** Tailwind CSS (Wajib, untuk efisiensi dan konsistensi).
* **Hosting & CI/CD:** Vercel (Gratis, sangat cepat, *auto-SSL/HTTPS*).
* **Database:** Google Sheets yang dipublikasikan menjadi *endpoint* CSV.

---

## 4. Strategi UI & UX (SANGAT PENTING DIBACA TIM UI)

Desain kita menggunakan pendekatan **Clean Minimalist (SaaS Vibe)**. Harus rapi, bersih, dan profesional.

### A. Panduan UX (Pengalaman Pengguna)

1. **Navigasi Satu Tangan:** Dilarang menggunakan menu "Hamburger" di atas layar. Wajib menggunakan **Fixed Bottom Navigation Bar** (menu menempel di bagian bawah layar seperti aplikasi Instagram).
2. **Aturan Jempol Lansia:** Semua tombol, menu *accordion*, atau area yang bisa diklik harus berukuran besar. Tinggi minimal `48px` agar tidak meleset saat ditekan oleh pengguna lansia.
3. **Fokus Keamanan Darurat:** Peringatan "Anti-Penipuan Donasi" di halaman Beranda wajib dibuat mencolok (gunakan warna *border* kontras) agar langsung terlihat oleh jamaah.

### B. Panduan UI (Visual & Tailwind)

1. **Mobile-First Layout:** Seluruh isi web wajib dibungkus dalam kontainer maksimal selebar HP (`max-w-md mx-auto relative min-h-screen`). Jangan sampai desain melebar penuh jika dibuka di layar laptop.
2. **Ruang Bernapas (Whitespace):** Jangan menumpuk elemen. Gunakan `padding` (misal `p-4` atau `p-6`) yang lega pada setiap komponen *card*.
3. **Bentuk Lembut:** Hindari ujung bersudut tajam. Gunakan lengkungan (`rounded-xl` atau `rounded-2xl`) pada kartu dan tombol.
4. **Bayangan Halus (Elevation):** Gunakan efek bayangan tipis (`shadow-sm` atau `shadow-md`) untuk memisahkan kartu konten dari warna latar belakang.

### C. Kode Warna (Wajib masuk `tailwind.config.js`)

* `primary` (`#102A6B` - Silent Navy): Teks judul utama, *header*, ikon menu aktif.
* `secondary` (`#015185` - Blue Current): Tombol pendaftaran utama (*Call to Action*).
* `accent` (`#CEA273` - Sandy Amber): *Border* peringatan keamanan, *badge* kategori acara (misal "Kajian" atau "Tahsin").
* `background` (`#FCEDD3` - Light Cream): Latar belakang utama *body* atau kanvas.
* `muted` (`#5990C0` - Soft Blue): Teks deskripsi sekunder, garis batas tipis.
* **Font:** Inter atau Plus Jakarta Sans.

---

## 5. Spesifikasi 5 Menu Utama (MVP Scope)

Website terdiri dari 5 *tab* yang bisa diakses via *Bottom Navigation*. (Data teks akan ditarik dinamis oleh PM, Tim UI cukup buatkan *layout* kasarnya dulu).

### 📱 Menu 1: Beranda (`/`)

* **Header:** Logo penyelenggara di posisi atas tengah.
* **Pengumuman (Marquee):** Teks berjalan untuk info *update*.
* **Kotak Peringatan:** Kotak visual dengan warna `accent` berisi teks: *"MT. In'am Muslimah maupun Mahabbah Community tidak pernah meminta donasi melalui chat pribadi. Hati-hati terhadap penipuan!"*

### 📱 Menu 2: Event (`/event`)

* **Profil:** Teks perkenalan singkat tentang MT. In'am dan Mahabbah.
* **Daftar Jadwal (Cards):** Tampilan daftar kegiatan. Tiap kartu memiliki: *Badge* kategori acara, Judul Acara, Tanggal & Waktu, dan Deskripsi detail.

### 📱 Menu 3: Registrasi (`/registrasi`)

* Halaman menyerupai *Linktree*.
* Terdapat tumpukan tombol besar menuju tautan Google Form pendaftaran. Warna dominan tombol adalah `secondary`.

### 📱 Menu 4: FAQ (`/faq`)

* Daftar pertanyaan yang paling sering ditanyakan jamaah.
* Menggunakan komponen **Accordion**. Hanya boleh satu pertanyaan yang terbuka dalam satu waktu agar layar tidak kepanjangan.

### 📱 Menu 5: Kontak (`/kontak`)

* Tautan berbentuk *List* (daftar rapi) berisi ikon menuju WhatsApp Channel, Telegram, dan Instagram.
* Satu tombol khusus yang diarahkan ke Titik Lokasi Google Maps.

---

## 6. Skema Integrasi Data (Catatan Khusus PM)

Fadhil akan menyiapkan 1 file Google Sheets dengan 4 Tab:

1. `Settings` (Untuk teks berjalan, link sosmed, teks peringatan).
2. `Schedules` (Kategori, Judul Acara, Tanggal, Detail).
3. `Registration` (Nama Tombol, URL Tujuan).
4. `FAQ` (Pertanyaan, Jawaban).

*Instruksi Integrasi:* Saat UI Dev selesai membuat komponen (*slicing*), PM akan menyuntikkan data JSON hasil ekstrak dari CSV Sheets tersebut ke dalam *props* komponen.

---

## 7. SEO & Optimasi (Catatan Khusus PM)

Pastikan elemen `<Head>` dilengkapi agar web terindeks dengan baik pada Senin pagi:

* **Title:** `Portal Resmi MT. In'am Muslimah x Mahabbah Community`
* **Meta Description:** Penjelasan singkat kegiatan kajian dan kelas tahsin.
* **Open Graph (OG) Image:** Logo/Banner agar cantik saat dibagikan ke grup WhatsApp.

---

## 8. Timeline Eksekusi Sprint (Minggu, 14 Juni)

* **06:30 - 08:00:** PM inisialisasi Repo, Vercel, & Google Sheets. Tim UI memulai *slicing layout* utama & *Bottom Navigation*.
* **08:00 - 12:00:** Tim UI fokus membangun Komponen Detail (Card, Accordion, Tombol). PM memecahkan *logic Fetch API* untuk konversi CSV ke JSON.
* **13:00 - 15:00:** Tahap *Merge* & Integrasi (Menghubungkan UI statis dengan data dinamis PM).
* **15:00 - 17:00:** QA, *Testing mobile responsive*, merapikan *padding/margin*, pengecekan CMS (ubah data di Sheets pastikan web berubah).
* **18:00:** *Push to Production* (Vercel) & Pendaftaran ke Google Search Console. Kirim *link preview* ke klien.