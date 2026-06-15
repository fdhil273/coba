"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Home as HomeIcon, 
  Calendar, 
  ClipboardList, 
  HelpCircle, 
  PhoneCall, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  MessageCircle, 
  Send, 
  ExternalLink,
  RefreshCw,
  Info,
  X,
  User,
  Phone,
  Hash
} from "lucide-react";
import { fetchPortalData, PortalData } from "@/utils/dataFetcher";
import { ScheduleItem } from "@/config/sheetsConfig";

// Custom SVG untuk Instagram Icon karena masalah ekspor dari bundel lucide-react
const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

type TabType = "beranda" | "event" | "registrasi" | "faq" | "kontak";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<TabType>("beranda");
  const [data, setData] = useState<PortalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [eventFilter, setEventFilter] = useState<string>("Semua");

  // State untuk Detail Event Modal
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  // State untuk Form Registrasi Modal
  const [isRegistering, setIsRegistering] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    whatsapp: "",
    age: "",
    program: ""
  });

  // Load data dari Google Sheets (atau fallback ke Mock Data)
  const loadData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const portalData = await fetchPortalData();
      setData(portalData);
    } catch (error) {
      console.error("Gagal memuat data portal:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md bg-[#d9eefa] min-h-screen flex flex-col items-center justify-center p-6 text-[#102A6B]">
        <div className="animate-spin mb-4">
          <RefreshCw size={36} className="text-[#015185]" />
        </div>
        <p className="font-semibold text-lg animate-pulse text-center">
          Memuat Informasi Kajian...
        </p>
        <p className="text-xs text-[#5990C0] mt-2 text-center">
          Menghubungkan ke Google Sheets CMS
        </p>
      </div>
    );
  }

  // Fallback jika terjadi kegagalan data ekstrem
  const portalData = data || {
    settings: {
      marquee_text: "Mengunduh pengumuman resmi...",
      alert_text: "Waspada terhadap penipuan donasi yang mengatasnamakan penyelenggara.",
      wa_channel_url: "#",
      telegram_channel_url: "#",
      instagram_inam_url: "#",
      instagram_mahabbah_url: "#",
      maps_url: "#",
      contact_wa_number: "",
      about_text_inam: "",
      about_text_mahabbah: "",
      image_url_inam: "/inam_profile.jpg",
      image_url_mahabbah: "/mahabbah_profile.jpg"
    },
    schedules: [],
    registration: [],
    faq: []
  };

  const { settings, schedules, registration, faq } = portalData;

  // Mendapatkan semua kategori unik untuk filter Event
  const categories = ["Semua", ...Array.from(new Set(schedules.map(s => s.category)))];

  const filteredSchedules = eventFilter === "Semua" 
    ? schedules 
    : schedules.filter(s => s.category === eventFilter);

  // Helper untuk format WhatsApp URL
  const getWhatsAppLink = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Membuka form pendaftaran in-app
  const handleOpenRegistration = (programTitle: string) => {
    setRegForm({
      name: "",
      whatsapp: "",
      age: "",
      program: programTitle
    });
    setIsRegistering(true);
  };

  // Mengirim pendaftaran via WhatsApp
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textMessage = `*FORMULIR PENDAFTARAN RESMI*
MT. In'am Muslimah x Mahabbah Community

*Nama Lengkap:* ${regForm.name}
*Nomor WhatsApp:* ${regForm.whatsapp}
*Usia:* ${regForm.age} Tahun
*Program/Kajian:* ${regForm.program}

Mohon konfirmasi kehadiran dan pendaftaran saya. Terima kasih.
Wassalamu'alaikum Wr. Wb.`;

    const adminPhone = settings.contact_wa_number || "6281234567890";
    const waLink = getWhatsAppLink(adminPhone, textMessage);
    window.open(waLink, "_blank");
    setIsRegistering(false);
    setSelectedEvent(null);
  };

  return (
    <div className="w-full md:max-w-4xl lg:max-w-5xl bg-[#d9eefa] min-h-screen md:min-h-[85vh] md:my-8 md:rounded-3xl md:shadow-2xl md:border md:border-[#CEA273]/20 relative flex flex-col pb-20 md:pb-8 select-none overflow-hidden mx-auto">
      
      {/* Teks Berjalan (Marquee) */}
      <div className="bg-[#102A6B] text-[#d9eefa] py-2 text-xs font-semibold overflow-hidden border-b border-[#CEA273]/30 shrink-0 sticky top-0 z-40 shadow-sm">
        <div className="whitespace-nowrap inline-block animate-marquee pl-[100%] pr-10">
          {settings.marquee_text}
        </div>
      </div>

      {/* Header Utama (Responsive) */}
      <header className="bg-white/85 backdrop-blur-md py-4 px-6 flex flex-col md:flex-row items-center justify-between border-b border-[#CEA273]/20 shrink-0 sticky top-[33px] z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 overflow-hidden bg-transparent rounded-full flex items-center justify-center border border-[#102A6B]/10">
            <Image 
              src="/logo_white_removebg.png" 
              alt="Logo Penyelenggara" 
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h1 className="font-extrabold text-sm tracking-wide text-[#102A6B]">
              MT. IN&apos;AM MUSLIMAH
            </h1>
            <p className="text-[10px] font-bold text-[#015185] tracking-wider uppercase">
              x Mahabbah Community
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0 bg-[#d9eefa]/40 p-1 rounded-2xl border border-[#CEA273]/20">
          {(["beranda", "event", "registrasi", "faq", "kontak"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setFaqOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all active:scale-95 duration-100 min-h-[40px] flex items-center ${
                activeTab === tab 
                  ? "bg-[#102A6B] text-white shadow-sm" 
                  : "text-[#5990C0] hover:text-[#102A6B] hover:bg-[#102A6B]/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-2 text-[#102A6B] hover:bg-[#102A6B]/5 rounded-full transition-colors active:scale-95 duration-100 disabled:opacity-50"
          title="Segarkan data"
        >
          <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
        </button>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">

        {/* ==================== TAB 1: BERANDA ==================== */}
        {activeTab === "beranda" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 animate-fadeIn items-start">
            
            {/* Left Column (col-span-3): Hero & Profile */}
            <div className="md:col-span-3 space-y-6">
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-[#102A6B] to-[#015185] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none">
                  <Image src="/logo_white_removebg.png" alt="" width={240} height={240} />
                </div>
                <span className="bg-[#CEA273] text-[#102A6B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Portal Jamaah Resmi
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold mt-4 leading-tight tracking-tight">
                  Selamat Datang di Portal Informasi Digital Muslimah
                </h2>
                <p className="text-xs text-[#d9eefa]/80 mt-2 font-medium leading-relaxed">
                  Komitmen kami melahirkan muslimah yang tangguh, berkualitas, dan beradab sesuai Al-Qur&apos;an dan As-Sunnah.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button 
                    onClick={() => setActiveTab("event")} 
                    className="bg-[#CEA273] text-[#102A6B] hover:bg-[#c29566] text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 duration-100 min-h-[48px]"
                  >
                    <Calendar size={14} />
                    Lihat Acara
                  </button>
                  <button 
                    onClick={() => setActiveTab("registrasi")} 
                    className="bg-white text-[#102A6B] hover:bg-zinc-100 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 duration-100 min-h-[48px]"
                  >
                    <ClipboardList size={14} />
                    Daftar Kelas
                  </button>
                </div>
              </div>

              {/* Profile Penyelenggara */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-[#102A6B] text-base border-l-4 border-[#015185] pl-3">
                  Tentang Penyelenggara
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Card MT. In'am */}
                  <div className="glass-card rounded-2xl shadow-sm border border-white/60 overflow-hidden flex flex-col justify-between h-full group">
                    {settings.image_url_inam && (
                      <div className="relative w-full h-36 shrink-0 bg-zinc-100 overflow-hidden">
                        <Image 
                          src={settings.image_url_inam} 
                          alt="Profil MT. In'am Muslimah" 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-[#102A6B]/15 text-[#102A6B] p-1.5 rounded-lg font-extrabold text-xs shrink-0">
                            MT
                          </div>
                          <h4 className="font-extrabold text-[#102A6B] text-sm">MT. In&apos;am Muslimah</h4>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {settings.about_text_inam}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Mahabbah */}
                  <div className="glass-card rounded-2xl shadow-sm border border-white/60 overflow-hidden flex flex-col justify-between h-full group">
                    {settings.image_url_mahabbah && (
                      <div className="relative w-full h-36 shrink-0 bg-zinc-100 overflow-hidden">
                        <Image 
                          src={settings.image_url_mahabbah} 
                          alt="Profil Mahabbah Community" 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-[#015185]/15 text-[#015185] p-1.5 rounded-lg font-extrabold text-xs shrink-0">
                            MC
                          </div>
                          <h4 className="font-extrabold text-[#102A6B] text-sm">Mahabbah Community</h4>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {settings.about_text_mahabbah}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (col-span-2): Warning & Channels */}
            <div className="md:col-span-2 space-y-6">
              {/* Kotak Peringatan Anti-Penipuan */}
              <div className="border-2 border-[#CEA273] bg-[#d9eefa]/90 rounded-2xl p-5 shadow-md flex items-start gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#CEA273]" />
                <div className="bg-red-100 p-2 rounded-xl text-red-600 shrink-0 animate-pulse">
                  <AlertTriangle size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-[#102A6B] text-sm tracking-tight flex items-center gap-1.5">
                    INFORMASI KEAMANAN PENYELENGGARA
                  </h3>
                  <p className="text-xs text-red-800 leading-relaxed font-bold">
                    {settings.alert_text}
                  </p>
                </div>
              </div>

              {/* Quick Access Channels */}
              <div className="bg-white/50 border border-white/80 rounded-2xl p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold text-xs text-[#5990C0] tracking-wider uppercase mb-1">
                  Saluran Informasi Tercepat
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                  <a 
                    href={settings.wa_channel_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white hover:bg-[#20ba59] p-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95 duration-100 min-h-[48px]"
                  >
                    <MessageCircle size={15} />
                    WhatsApp Channel
                  </a>
                  <a 
                    href={settings.telegram_channel_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#229ED9] text-white hover:bg-[#1e8dbf] p-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95 duration-100 min-h-[48px]"
                  >
                    <Send size={15} />
                    Telegram Channel
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: EVENT ==================== */}
        {activeTab === "event" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="text-center py-2 space-y-1">
              <h2 className="text-xl font-extrabold text-[#102A6B] md:text-2xl">Jadwal Acara & Kajian</h2>
              <p className="text-xs text-[#5990C0] font-medium">
                Temukan kajian bermanfaat dan kelas interaktif terdekat kami.
              </p>
            </div>

            {/* Kategori Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar justify-start md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 duration-100 min-h-[48px] border shrink-0 flex items-center ${
                    eventFilter === cat
                      ? "bg-[#102A6B] text-white border-[#102A6B]"
                      : "bg-white text-[#102A6B] border-white hover:bg-zinc-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Daftar Event Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredSchedules.length === 0 ? (
                <div className="col-span-full text-center py-12 glass-card rounded-2xl border border-white/60 text-gray-500">
                  <Info size={32} className="mx-auto mb-2 text-[#5990C0]" />
                  <p className="text-xs font-bold">Belum ada jadwal untuk kategori ini.</p>
                </div>
              ) : (
                filteredSchedules.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedEvent(item)}
                    className="bg-white rounded-3xl border border-white shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md h-full group cursor-pointer"
                  >
                    {/* Activity photo at the top */}
                    {item.image_url && (
                      <div className="relative w-full h-48 sm:h-40 md:h-48 shrink-0 bg-zinc-100 overflow-hidden">
                        <Image 
                          src={item.image_url} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105 duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="bg-[#CEA273]/20 text-[#102A6B] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#CEA273]/30">
                            {item.category}
                          </span>
                          {item.registration_url && (
                            <span className="bg-[#25D366]/10 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20">
                              Buka Pendaftaran
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-extrabold text-[#102A6B] text-base leading-snug tracking-tight">
                          {item.title}
                        </h3>

                        {/* Waktu & Tempat Ringkas */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <Clock size={13} className="text-[#015185]" />
                            <span className="truncate">{item.datetime}</span>
                          </div>
                        </div>

                        {/* Cuplikan Deskripsi */}
                        <p className="text-xs text-gray-600 line-clamp-2 pt-2 border-t border-gray-100">
                          {item.detail}
                        </p>
                      </div>

                      {/* Tombol Detail Lengkap */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(item);
                        }}
                        className="w-full bg-[#015185]/5 hover:bg-[#015185]/10 text-[#015185] py-3 px-4 text-center font-bold text-xs rounded-xl transition-all duration-100 min-h-[44px]"
                      >
                        Detail & Daftar Acara
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ==================== TAB 3: REGISTRASI ==================== */}
        {activeTab === "registrasi" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="text-center py-2 space-y-1">
              <h2 className="text-xl font-extrabold text-[#102A6B] md:text-2xl">Pendaftaran Program</h2>
              <p className="text-xs text-[#5990C0] font-medium">
                Pilih program di bawah untuk bergabung melalui formulir resmi.
              </p>
            </div>

            {/* List button stack (Membuka Form Registrasi In-App) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
              {registration.length === 0 ? (
                <div className="col-span-full text-center py-12 glass-card rounded-2xl border border-white/60 text-gray-500">
                  <p className="text-xs font-bold">Belum ada formulir pendaftaran aktif.</p>
                </div>
              ) : (
                registration.map((item, index) => (
                  <div key={index} className="space-y-1 flex flex-col justify-end">
                    {item.description && (
                      <p className="text-[10px] font-bold text-[#102A6B]/70 px-2 uppercase tracking-wide">
                        {item.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleOpenRegistration(item.button_text)}
                      className="w-full bg-[#015185] hover:bg-[#01416b] text-white px-5 py-4 rounded-2xl shadow-sm hover:shadow flex items-center justify-between transition-all active:scale-[0.98] duration-100 min-h-[56px] border border-white/15 cursor-pointer text-left"
                    >
                      <span className="font-extrabold text-sm tracking-tight">
                        {item.button_text}
                      </span>
                      <ChevronRight size={18} className="text-[#CEA273] shrink-0" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white/40 border border-white/60 p-4 rounded-2xl mt-4 max-w-xl mx-auto">
              <div className="flex gap-2">
                <Info size={16} className="text-[#015185] shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                  <strong>Pemberitahuan:</strong> Mengisi formulir ini akan membantu admin merekap kehadiran Anda secara resmi. Setelah menekan tombol kirim, Anda akan diarahkan ke admin WhatsApp resmi.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 4: FAQ ==================== */}
        {activeTab === "faq" && (
          <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto w-full">
            
            <div className="text-center py-2 space-y-1">
              <h2 className="text-xl font-extrabold text-[#102A6B] md:text-2xl">Tanya Jawab (FAQ)</h2>
              <p className="text-xs text-[#5990C0] font-medium">
                Pertanyaan yang paling sering ditanyakan oleh jamaah kami.
              </p>
            </div>

            {/* Accordion Component */}
            <div className="space-y-3">
              {faq.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl border border-white/60 text-gray-500">
                  <p className="text-xs font-bold">Belum ada daftar FAQ.</p>
                </div>
              ) : (
                faq.map((item, index) => {
                  const isOpen = faqOpenIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl shadow-sm border border-white/60 overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between text-[#102A6B] font-extrabold text-sm gap-3 transition-colors hover:bg-zinc-50 active:bg-zinc-100 min-h-[52px]"
                      >
                        <span className="leading-snug">{item.question}</span>
                        {isOpen ? (
                          <ChevronDown size={18} className="text-[#CEA273] shrink-0 rotate-180 transition-transform duration-200" />
                        ) : (
                          <ChevronDown size={18} className="text-[#CEA273] shrink-0 transition-transform duration-200" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-700 leading-relaxed border-t border-gray-50 animate-slideDown">
                          <p className="font-medium whitespace-pre-line">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ==================== TAB 5: KONTAK ==================== */}
        {activeTab === "kontak" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="text-center py-2 space-y-1">
              <h2 className="text-xl font-extrabold text-[#102A6B] md:text-2xl">Hubungi Panitia</h2>
              <p className="text-xs text-[#5990C0] font-medium">
                Hubungi kami atau ikuti media sosial resmi penyelenggara.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Left Column: WA Admin & Maps */}
              <div className="space-y-6">
                {/* WhatsApp Admin Button */}
                {settings.contact_wa_number && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#102A6B]/70 px-2 uppercase tracking-wide">
                      Kontak Respon Cepat
                    </p>
                    <a
                      href={getWhatsAppLink(
                        settings.contact_wa_number,
                        "Assalamu'alaikum Admin MT. In'am Muslimah x Mahabbah Community, saya ingin bertanya..."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-2xl shadow-md flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-[0.98] duration-100 min-h-[56px]"
                    >
                      <MessageCircle size={20} />
                      Hubungi Admin WhatsApp Resmi
                    </a>
                  </div>
                )}

                {/* Google Maps Location Button */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#102A6B]/70 px-2 uppercase tracking-wide">
                    Lokasi Sekretariat & Kajian Rutin
                  </p>
                  <a
                    href={settings.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#015185] hover:bg-[#01416b] text-white p-4 rounded-2xl shadow-md flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-[0.98] duration-100 min-h-[56px]"
                  >
                    <MapPin size={18} className="text-[#CEA273]" />
                    Lihat Titik Lokasi di Google Maps
                  </a>
                </div>
              </div>

              {/* Right Column: Social Media */}
              <div className="bg-white rounded-2xl border border-white/60 p-5 shadow-sm space-y-4">
                <h3 className="font-extrabold text-xs text-[#5990C0] uppercase tracking-wider border-b border-gray-100 pb-2">
                  Media Sosial & Saluran Resmi
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href={settings.wa_channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 hover:bg-zinc-50 rounded-xl transition-all border border-gray-50 active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#25D366]/10 text-[#25D366] p-2 rounded-lg shrink-0">
                        <MessageCircle size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#102A6B]">WhatsApp Channel Resmi</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>

                  <a 
                    href={settings.telegram_channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 hover:bg-zinc-50 rounded-xl transition-all border border-gray-50 active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#229ED9]/10 text-[#229ED9] p-2 rounded-lg shrink-0">
                        <Send size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#102A6B]">Telegram Channel Resmi</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>

                  <a 
                    href={settings.instagram_inam_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 hover:bg-zinc-50 rounded-xl transition-all border border-gray-50 active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-100 text-pink-600 p-2 rounded-lg shrink-0">
                        <InstagramIcon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#102A6B]">Instagram MT. In&apos;am</span>
                        <span className="text-[10px] text-gray-500 font-medium">@mt.inam.muslimah</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>

                  <a 
                    href={settings.instagram_mahabbah_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 hover:bg-zinc-50 rounded-xl transition-all border border-gray-50 active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-100 text-pink-600 p-2 rounded-lg shrink-0">
                        <InstagramIcon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#102A6B]">Instagram Mahabbah Community</span>
                        <span className="text-[10px] text-gray-500 font-medium">@mahabbah.community</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Fixed Bottom Navigation Bar (Responsive) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 glass-nav h-16 flex items-center justify-around px-2 shadow-lg rounded-t-3xl md:hidden">
        <button
          onClick={() => {
            setActiveTab("beranda");
            setFaqOpenIndex(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 duration-100 min-h-[48px] ${
            activeTab === "beranda" ? "text-[#102A6B]" : "text-[#5990C0]"
          }`}
        >
          <HomeIcon size={20} className={activeTab === "beranda" ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
          <span className="text-[9px] font-extrabold mt-1 tracking-tight">Beranda</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("event");
            setFaqOpenIndex(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 duration-100 min-h-[48px] ${
            activeTab === "event" ? "text-[#102A6B]" : "text-[#5990C0]"
          }`}
        >
          <Calendar size={20} className={activeTab === "event" ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
          <span className="text-[9px] font-extrabold mt-1 tracking-tight">Event</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("registrasi");
            setFaqOpenIndex(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 duration-100 min-h-[48px] ${
            activeTab === "registrasi" ? "text-[#102A6B]" : "text-[#5990C0]"
          }`}
        >
          <ClipboardList size={20} className={activeTab === "registrasi" ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
          <span className="text-[9px] font-extrabold mt-1 tracking-tight">Registrasi</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("faq");
            setFaqOpenIndex(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 duration-100 min-h-[48px] ${
            activeTab === "faq" ? "text-[#102A6B]" : "text-[#5990C0]"
          }`}
        >
          <HelpCircle size={20} className={activeTab === "faq" ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
          <span className="text-[9px] font-extrabold mt-1 tracking-tight">FAQ</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("kontak");
            setFaqOpenIndex(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 duration-100 min-h-[48px] ${
            activeTab === "kontak" ? "text-[#102A6B]" : "text-[#5990C0]"
          }`}
        >
          <PhoneCall size={20} className={activeTab === "kontak" ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
          <span className="text-[9px] font-extrabold mt-1 tracking-tight">Kontak</span>
        </button>
      </nav>

      {/* ==================== MODAL 1: DETAIL EVENT ==================== */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh] rounded-3xl border border-gray-100">
            {/* Image Banner */}
            {selectedEvent.image_url && (
              <div className="relative w-full h-48 shrink-0 bg-zinc-100">
                <Image 
                  src={selectedEvent.image_url} 
                  alt={selectedEvent.title} 
                  fill 
                  className="object-cover"
                  sizes="400px"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute right-4 top-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors active:scale-95 duration-100"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Info Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {!selectedEvent.image_url && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors active:scale-95 duration-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              
              <div className="space-y-2">
                <span className="bg-[#CEA273]/20 text-[#102A6B] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#CEA273]/30">
                  {selectedEvent.category}
                </span>
                <h3 className="font-extrabold text-[#102A6B] text-lg leading-snug tracking-tight">
                  {selectedEvent.title}
                </h3>
              </div>

              {/* Lokasi & Waktu Card */}
              <div className="bg-[#d9eefa]/40 border border-[#d9eefa] rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-700 font-bold">
                  <Clock size={15} className="text-[#015185] shrink-0" />
                  <span>{selectedEvent.datetime}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-700 font-bold">
                  <MapPin size={15} className="text-[#CEA273] shrink-0 mt-0.5" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Detail Deskripsi */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-extrabold text-[#5990C0] uppercase tracking-wider">
                  Deskripsi Kegiatan
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                  {selectedEvent.detail}
                </p>
              </div>
            </div>

            {/* Footer Action (Tinggi minimal 48px) */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 bg-white hover:bg-gray-50 text-[#102A6B] border border-gray-200 py-3.5 px-4 text-center font-bold text-xs rounded-2xl transition-all active:scale-95 duration-100 min-h-[48px]"
              >
                Tutup
              </button>
              <button
                onClick={() => handleOpenRegistration(selectedEvent.title)}
                className="flex-1 bg-[#015185] hover:bg-[#01416b] text-white py-3.5 px-4 text-center font-bold text-xs rounded-2xl transition-all active:scale-95 duration-100 min-h-[48px]"
              >
                Daftar Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: IN-APP FORM REGISTRASI ==================== */}
      {isRegistering && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh] rounded-3xl border border-gray-100">
            {/* Header Form */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#102A6B] to-[#015185] text-white">
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm tracking-tight">Formulir Pendaftaran</h3>
                <p className="text-[10px] text-[#FCEDD3]/80 font-bold uppercase tracking-wider">
                  Kajian x Mahabbah
                </p>
              </div>
              <button
                onClick={() => setIsRegistering(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Input Body */}
            <form onSubmit={handleRegisterSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Info Program Terpilih */}
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-1">
                <span className="text-[9px] font-extrabold text-[#5990C0] uppercase tracking-wider">
                  Program yang Diikuti:
                </span>
                <p className="text-xs font-bold text-[#102A6B] leading-tight">
                  {regForm.program}
                </p>
              </div>

              {/* Input Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">
                  Nama Lengkap (Sesuai KTP)
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5990C0]" />
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap Anda"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#015185] focus:bg-white min-h-[48px] transition-all"
                  />
                </div>
              </div>

              {/* Input Nomor WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">
                  Nomor WhatsApp Aktif
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5990C0]" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={regForm.whatsapp}
                    onChange={(e) => setRegForm({ ...regForm, whatsapp: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#015185] focus:bg-white min-h-[48px] transition-all"
                  />
                </div>
              </div>

              {/* Input Usia */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block">
                  Usia (Tahun)
                </label>
                <div className="relative">
                  <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5990C0]" />
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 25"
                    min="1"
                    max="120"
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#015185] focus:bg-white min-h-[48px] transition-all"
                  />
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-2xl shadow-md flex items-center justify-center gap-2 font-bold text-xs transition-all active:scale-[0.98] duration-100 min-h-[52px] mt-6"
              >
                <MessageCircle size={18} />
                Kirim Pendaftaran via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
