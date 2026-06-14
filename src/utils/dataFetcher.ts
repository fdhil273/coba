import { 
  SHEETS_CONFIG, 
  getCSVUrl, 
  ScheduleItem, 
  RegistrationItem, 
  FAQItem, 
  SettingsData,
  MOCK_SETTINGS,
  MOCK_SCHEDULES,
  MOCK_REGISTRATION,
  MOCK_FAQ
} from "@/config/sheetsConfig";
import { csvToObjects, csvToKeyValueMap } from "./csvParser";

export interface PortalData {
  settings: SettingsData;
  schedules: ScheduleItem[];
  registration: RegistrationItem[];
  faq: FAQItem[];
}

export async function fetchPortalData(): Promise<PortalData> {
  const result: PortalData = {
    settings: { ...MOCK_SETTINGS },
    schedules: [...MOCK_SCHEDULES],
    registration: [...MOCK_REGISTRATION],
    faq: [...MOCK_FAQ],
  };

  // Jika spreadsheetId kosong, gunakan mock data langsung
  if (!SHEETS_CONFIG.spreadsheetId) {
    return result;
  }

  // Fetch Settings
  try {
    const settingsUrl = getCSVUrl(SHEETS_CONFIG.gids.settings);
    if (settingsUrl) {
      const res = await fetch(settingsUrl, { next: { revalidate: 60 } }); // revalidate setiap 60 detik di server side
      if (res.ok) {
        const text = await res.text();
        const kv = csvToKeyValueMap(text);
        
        // Map keys safely
        if (kv.marquee_text) result.settings.marquee_text = kv.marquee_text;
        if (kv.alert_text) result.settings.alert_text = kv.alert_text;
        if (kv.wa_channel_url) result.settings.wa_channel_url = kv.wa_channel_url;
        if (kv.telegram_channel_url) result.settings.telegram_channel_url = kv.telegram_channel_url;
        if (kv.instagram_inam_url) result.settings.instagram_inam_url = kv.instagram_inam_url;
        if (kv.instagram_mahabbah_url) result.settings.instagram_mahabbah_url = kv.instagram_mahabbah_url;
        if (kv.maps_url) result.settings.maps_url = kv.maps_url;
        if (kv.contact_wa_number) result.settings.contact_wa_number = kv.contact_wa_number;
        if (kv.about_text_inam) result.settings.about_text_inam = kv.about_text_inam;
        if (kv.about_text_mahabbah) result.settings.about_text_mahabbah = kv.about_text_mahabbah;
        if (kv.image_url_inam) result.settings.image_url_inam = kv.image_url_inam;
        if (kv.image_url_mahabbah) result.settings.image_url_mahabbah = kv.image_url_mahabbah;
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data Settings dari Google Sheets:", error);
  }

  // Fetch Schedules
  try {
    const schedulesUrl = getCSVUrl(SHEETS_CONFIG.gids.schedules);
    if (schedulesUrl) {
      const res = await fetch(schedulesUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const text = await res.text();
        const list = csvToObjects<Record<string, string>>(text);
        if (list.length > 0) {
          result.schedules = list.map(item => ({
            category: item.category || "Umum",
            title: item.title || "Tanpa Judul",
            datetime: item.datetime || "",
            location: item.location || "",
            detail: item.detail || "",
            image_url: item.image_url || undefined,
            registration_url: item.registration_url || undefined
          }));
        }
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data Schedules dari Google Sheets:", error);
  }

  // Fetch Registration
  try {
    const regUrl = getCSVUrl(SHEETS_CONFIG.gids.registration);
    if (regUrl) {
      const res = await fetch(regUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const text = await res.text();
        const list = csvToObjects<Record<string, string>>(text);
        if (list.length > 0) {
          result.registration = list.map(item => ({
            button_text: item.button_text || "Daftar",
            url: item.url || "#",
            description: item.description || undefined
          }));
        }
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data Registration dari Google Sheets:", error);
  }

  // Fetch FAQ
  try {
    const faqUrl = getCSVUrl(SHEETS_CONFIG.gids.faq);
    if (faqUrl) {
      const res = await fetch(faqUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const text = await res.text();
        const list = csvToObjects<Record<string, string>>(text);
        if (list.length > 0) {
          result.faq = list.map(item => ({
            question: item.question || "Pertanyaan",
            answer: item.answer || "Jawaban"
          }));
        }
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data FAQ dari Google Sheets:", error);
  }

  return result;
}
