export interface ScheduleItem {
  category: string;
  title: string;
  datetime: string;
  location: string;
  detail: string;
  image_url?: string;
  registration_url?: string;
}

export interface RegistrationItem {
  button_text: string;
  url: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SettingsData {
  marquee_text: string;
  alert_text: string;
  wa_channel_url: string;
  telegram_channel_url: string;
  instagram_inam_url: string;
  instagram_mahabbah_url: string;
  maps_url: string;
  contact_wa_number: string;
  about_text_inam: string;
  about_text_mahabbah: string;
  image_url_inam: string;
  image_url_mahabbah: string;
}

// Konfigurasi Google Sheets (Ganti dengan ID spreadsheet Anda yang dipublikasikan ke Web sebagai CSV)
export const SHEETS_CONFIG = {
  spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID || "", // Contoh: 2PACX-1v...
  gids: {
    settings: process.env.NEXT_PUBLIC_GID_SETTINGS || "0",
    schedules: process.env.NEXT_PUBLIC_GID_SCHEDULES || "",
    registration: process.env.NEXT_PUBLIC_GID_REGISTRATION || "",
    faq: process.env.NEXT_PUBLIC_GID_FAQ || "",
  }
};

// Fungsi helper untuk generate URL CSV dari Google Sheets yang dipublikasikan
export function getCSVUrl(gid: string): string {
  if (!SHEETS_CONFIG.spreadsheetId) return "";
  return `https://docs.google.com/spreadsheets/d/e/${SHEETS_CONFIG.spreadsheetId}/pub?gid=${gid}&output=csv`;
}

// Data Cadangan (Mock Data) berkualitas premium yang digunakan jika Google Sheets belum terhubung
export const MOCK_SETTINGS: SettingsData = {
  marquee_text: "📢 Pengumuman: Dapatkan update kajian terbaru langsung di ponsel Anda dengan bergabung ke WhatsApp Channel dan Telegram Channel kami melalui menu Kontak!",
  alert_text: "MT. In'am Muslimah maupun Mahabbah Community tidak pernah meminta donasi melalui chat pribadi. Informasi resmi hanya melalui admin dan media sosial resmi. Hati-hati terhadap penipuan yang mengatasnamakan kami.",
  wa_channel_url: "https://chat.whatsapp.com/L1nkWaChannelInamMahabbah",
  telegram_channel_url: "https://t.me/InamMahabbahTelegramChannel",
  instagram_inam_url: "https://instagram.com/mt.inam.muslimah",
  instagram_mahabbah_url: "https://instagram.com/mahabbah.community",
  maps_url: "https://maps.app.goo.gl/9m2JtQExampleMap",
  contact_wa_number: "6281234567890", // Ganti dengan nomor WhatsApp panitia resmi
  about_text_inam: "Komunitas dakwah muslimah yang berkomitmen mencetak muslimah tangguh, berkualitas, dan berkarakter sesuai dengan tuntunan Al-Qur'an dan As-Sunnah melalui kajian ilmu syar'i dan bimbingan tahsin rutin.",
  about_text_mahabbah: "Event organizer dan komunitas muslimah kreatif yang menghadirkan berbagai kegiatan inspiratif, edukatif, sehat, dan bermanfaat guna mempererat ukhuwah serta meningkatkan potensi diri muslimah masa kini.",
  image_url_inam: "/inam_profile.jpg",
  image_url_mahabbah: "/mahabbah_profile.jpg"
};

export const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    category: "Kajian",
    title: "Kajian Ahad Dhuha: Menjadi Muslimah Produktif Sesuai Sunnah",
    datetime: "Ahad, 21 Juni 2026 | 08:00 - 10:00 WIB",
    location: "Masjid Baitul Makmur, Kebayoran Baru",
    detail: "Kajian khusus akhwat membahas cara menyeimbangkan amanah rumah tangga, karir, dan ibadah harian. Bersama Ustadzah Nafisah. Disediakan snack & ruang ber-AC ramah lansia.",
    image_url: "/kajian_activity.jpg",
    registration_url: "https://forms.gle/kajianAhadInam"
  },
  {
    category: "Tahsin",
    title: "Kelas Tahsin Al-Qur'an: Memperbaiki Makhraj & Tajwid Dasar",
    datetime: "Setiap Sabtu Sore | 16:00 - 17:30 WIB",
    location: "Gedung Pertemuan MT. In'am Lantai 2",
    detail: "Kelas intensif bimbingan membaca Al-Qur'an dari nol. Kurikulum terstruktur, diajar oleh ustadzah bersanad dengan metode interaktif dan setoran hafalan ringan.",
    image_url: "/tahsin_class.jpg",
    registration_url: "https://forms.gle/tahsinInam"
  },
  {
    category: "Workout",
    title: "Healthy Akhwat: Workout & Aerobik Muslimah Ceria",
    datetime: "Selasa & Jumat Pagi | 07:30 - 08:30 WIB",
    location: "Studio Mahabbah Fit (Indoor & Privat)",
    detail: "Olahraga kardio dan peregangan otot dipandu oleh instruktur profesional bersertifikat. Ruangan tertutup dan bebas pandangan luar, menjaga privasi aurat akhwat secara penuh.",
    image_url: "/workout_muslimah.jpg",
    registration_url: "https://forms.gle/workoutMahabbah"
  },
  {
    category: "Kajian",
    title: "Sharing Session: Temu Ukhuwah & Kupas Kitab Adab Akhwat",
    datetime: "Kamis, 25 Juni 2026 | 13:00 - 15:00 WIB",
    location: "Pendopo Mahabbah Community",
    detail: "Bincang santai ukhuwah sambil menikmati teh sore dan membedah kitab adab berpakaian serta bergaul bagi muslimah di era modern. Terbuka untuk umum dan gratis.",
    image_url: "/kajian_activity.jpg",
    registration_url: "https://forms.gle/sharingUkhuwah"
  }
];

export const MOCK_REGISTRATION: RegistrationItem[] = [
  {
    button_text: "Daftar Kajian Ahad Dhuha (Gratis)",
    url: "https://forms.gle/kajianAhadInam",
    description: "Kajian Ahad Dhuha: Menjadi Muslimah Produktif (21 Juni 2026)"
  },
  {
    button_text: "Daftar Kelas Tahsin Al-Qur'an",
    url: "https://forms.gle/tahsinInam",
    description: "Pendaftaran kelas tajwid & makharijul huruf rutin"
  },
  {
    button_text: "Daftar Workout Muslimah",
    url: "https://forms.gle/workoutMahabbah",
    description: "Kelas olahraga khusus wanita setiap Selasa & Jumat"
  },
  {
    button_text: "Daftar Sharing Session & Kupas Kitab",
    url: "https://forms.gle/sharingUkhuwah",
    description: "Temu ukhuwah & bedah buku adab akhwat (25 Juni 2026)"
  }
];

export const MOCK_FAQ: FAQItem[] = [
  {
    question: "Apakah semua kegiatan ini khusus untuk wanita (akhwat) saja?",
    answer: "Ya, seluruh kegiatan yang diselenggarakan oleh MT. In'am Muslimah dan Mahabbah Community bersifat khusus untuk muslimah (akhwat) demi menjaga kenyamanan bersama dan kesesuaian syariat Islam."
  },
  {
    question: "Bagaimana cara mendaftar kegiatan?",
    answer: "Anda dapat mendaftar dengan menekan menu 'Registrasi' di navigasi bawah halaman ini, kemudian pilih tombol pendaftaran sesuai dengan program yang ingin Anda ikuti."
  },
  {
    question: "Apakah kajian rutin ini berbayar?",
    answer: "Sebagian besar kajian umum kami bersifat gratis (tanpa dipungut biaya) dan terbuka untuk umum. Namun, beberapa kelas khusus (seperti kelas tahsin intensif) atau acara tertentu mungkin membutuhkan kontribusi administrasi ringan yang akan selalu diumumkan secara transparan."
  },
  {
    question: "Bagaimana jika saya ingin mengajukan pertanyaan khusus terkait jadwal?",
    answer: "Anda dapat menghubungi tim admin/panitia kami melalui menu 'Hubungi Panitia' di navigasi bawah. Terdapat tombol WhatsApp yang langsung tersambung ke admin kami yang bertugas."
  },
  {
    question: "Apakah MT. In'am Muslimah menerima donasi untuk dakwah?",
    answer: "Kami tidak pernah meminta donasi secara personal melalui chat pribadi. Peringatan keras: hati-hati terhadap segala bentuk penipuan yang mengatasnamakan MT. In'am Muslimah atau Mahabbah Community. Informasi donasi resmi hanya disampaikan melalui pengumuman terpusat di akun media sosial resmi kami."
  }
];
