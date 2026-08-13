/**
 * Domen modeli — DevCanvas maketlaridan (Katalog / Forma / Admin) olingan.
 * Maketda `id` maydoni yo'q edi; React tomonida barqaror kalit uchun qo'shildi.
 */

export type SchoolStatus = 'pending' | 'approved' | 'rejected';

export interface School {
  /** Maketda yo'q — crypto.randomUUID() bilan generatsiya qilinadi */
  id: string;
  name: string;
  director: string;
  /** Viloyat nomi — REGIONS ro'yxatidan, masalan "Namangan viloyati" */
  region: string;
  /** Tuman/shahar nomi — tanlangan viloyat ichidan, masalan "Chust tumani" */
  district: string;
  /** Ko'cha va uy raqami — viloyat/tumansiz qism */
  address: string;
  /** Maktabdagi ta'lim bosqichlari — GRADE_RANGES dan bir yoki bir nechtasi */
  grades: string[];
  /** Maktabda sport to'garaklari bor-yo'qligi */
  hasSports: boolean;
  /** true — pullik (xususiy), false — bepul (davlat) */
  paid: boolean;
  /** Formatlangan matn, masalan "2 400 000" (bo'sh bo'lishi mumkin) */
  fee: string;
  langs: string[];
  specs: string[];
  phone: string;
  /** Faqat username, masalan "maktab45" (to'liq URL emas) */
  instagram: string;
  /** Faqat username, masalan "maktab45" (to'liq URL emas) */
  telegram: string;
  mapUrl: string;
  /** data URL yoki blob URL ro'yxati, 6 tagacha */
  photos: string[];
  status: SchoolStatus;
  /** "12.08.2026" formatida */
  date: string;
  /** Maketdagi "YANGI" belgisi uchun ixtiyoriy bayroq */
  isNew?: boolean;
}

/** Forma qiymatlari — School'ning id/status/date/isNew'siz varianti */
export type SchoolFormValues = Omit<School, 'id' | 'status' | 'date' | 'isNew'>;

export type SchoolTypeFilter = 'all' | 'paid' | 'free';

/** Oylik to'lov oralig'i — "dan / gacha" slayderi qiymati (UZS) */
export interface FeeRange {
  min: number;
  max: number;
}
