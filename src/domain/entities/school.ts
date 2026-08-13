import type { School, SchoolFormValues } from '../types/school';
import { DEFAULT_REGION, IS_REGION_LOCKED } from './regions';
import { REAL_SCHOOLS } from './realSchools';

/** Maketdagi aynan ro'yxat (Katalog.dc.html / Forma.dc.html) */
export const LANGS: readonly string[] = [
  "O'zbek",
  'Rus',
  'Ingliz',
  'Qoraqalpoq',
  'Tojik',
  'Qozoq',
];

/** Umumiy ixtisoslashuv yo'nalishlari */
export const SPEC_DIRECTIONS: readonly string[] = [
  'Aniq fanlar',
  'Tabiiy fanlar',
  'Gumanitar fanlar',
  'Ijtimoiy fanlar',
  'Xorijiy tillar',
  'IT',
  'Sport',
];

/** Chuqurlashtirilgan alohida fanlar */
export const SPEC_SUBJECTS: readonly string[] = [
  'Matematika',
  'Fizika',
  'Kimyo',
  'Biologiya',
  'Tarix',
  'Ingliz tili',
  'Rus tili',
  'Xitoy tili',
];

/** Ixtisoslashuvning to'liq ro'yxati — yo'nalishlar + fanlar */
export const SPECS: readonly string[] = [...SPEC_DIRECTIONS, ...SPEC_SUBJECTS];

/**
 * Sinf oraliqlari. Oraliqlar bir-birini qamrab oladi (1-11 ichida 5-9 ham bor),
 * shuning uchun filtr matnni emas, sonli kesishuvni tekshiradi —
 * `gradeRangesOverlap` ga qarang.
 */
export const GRADE_RANGES: readonly string[] = [
  '1-4 sinflar',
  '1-9 sinflar',
  '1-11 sinflar',
  '5-9 sinflar',
  '5-11 sinflar',
  '10-11 sinflar',
];

/** Kartochkadagi sport to'garagi tegi — filtr bilan solishtirishda ham shu matn */
export const SPORTS_TAG_LABEL = "Sport to'garagi";

/** localStorage kaliti — v12: Chimyon school instagram username to'g'rilandi */
export const STORAGE_KEY = 'maktablar_v12';

/**
 * Rasmi hali yo'q maktablar uchun zaxira rasm (`public/schools/default.png`).
 * Ma'lumotga yozilmaydi — faqat ko'rsatishda o'rniga qo'yiladi, shunda haqiqiy
 * rasm kelganda hech narsani tozalash kerak bo'lmaydi.
 */
export const DEFAULT_SCHOOL_PHOTO = '/schools/default.png';

/** Bitta maktabga ruxsat etilgan maksimal rasm soni (Forma.dc.html) */
export const MAX_PHOTOS = 6;

/** Bitta rasm uchun maksimal hajm — 5 MB (Forma.dc.html) */
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

/** Portal aloqa raqami (header/footer/forma) */
export const SUPPORT_PHONE = '+998 90 632 39 00';
export const SUPPORT_PHONE_HREF = 'tel:+998906323900';

/** Loyihani qo'llab-quvvatlash uchun karta raqami — footerda ko'rsatiladi */
export const SUPPORT_CARD = '9860 3501 4679 1495';

/** Nusxa olinadigan variant — bo'shliqsiz, to'lov formalariga to'g'ridan-to'g'ri tushadi */
export const SUPPORT_CARD_PLAIN = SUPPORT_CARD.replace(/\s/g, '');

/** Katalog to'lov slayderining chegaralari va qadami (UZS/oy) */
export const FEE_MIN = 0;
export const FEE_MAX = 10_000_000;
export const FEE_STEP = 100_000;

/**
 * Katalogning boshlang'ich ro'yxati — Google Forma orqali kelgan haqiqiy
 * maktablar. Demo ma'lumotlar olib tashlandi, ro'yxat `realSchools.ts` da.
 */
export const SEED_SCHOOLS: readonly School[] = REAL_SCHOOLS;

/** Forma.dc.html dagi EMPTY obyekti */
export const EMPTY_SCHOOL_FORM: SchoolFormValues = {
  name: '',
  director: '',
  /** Viloyat qulflangan bo'lsa forma darhol shu qiymat bilan ochiladi */
  region: IS_REGION_LOCKED ? DEFAULT_REGION : '',
  district: '',
  address: '',
  mapUrl: '',
  grades: [],
  hasSports: false,
  paid: false,
  fee: '',
  langs: [],
  specs: [],
  phone: '',
  instagram: '',
  telegram: '',
  photos: [],
};

/** Forma boshlang'ich holati — maketda langs: ["O'zbek"] bilan boshlanadi */
export function createEmptyFormValues(): SchoolFormValues {
  return { ...EMPTY_SCHOOL_FORM, grades: [], langs: ["O'zbek"], specs: [], photos: [] };
}

/**
 * Ko'rsatish uchun to'liq manzil: "Farg'ona viloyati, Rishton tumani, Navoiy ko'chasi 12".
 * Bo'sh qismlar tashlab yuboriladi.
 */
export function getFullAddress(
  school: Pick<School, 'region' | 'district' | 'address'>,
): string {
  return [school.region, school.district, school.address]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
}

/** "5-11 sinflar" → { from: 5, to: 11 }. Tanib bo'lmasa — null */
export function parseGradeRange(label: string): { from: number; to: number } | null {
  const match = /^(\d+)\s*-\s*(\d+)/.exec(String(label ?? '').trim());
  if (!match) return null;
  const from = Number(match[1]);
  const to = Number(match[2]);
  return Number.isFinite(from) && Number.isFinite(to) && from <= to ? { from, to } : null;
}

/**
 * Ikki sinf oralig'i kesishadimi.
 * Shu tufayli "1-11 sinflar" maktabi "5-9 sinflar" filtriga ham tushadi.
 */
export function gradeRangesOverlap(a: string, b: string): boolean {
  const left = parseGradeRange(a);
  const right = parseGradeRange(b);
  if (!left || !right) return false;
  return left.from <= right.to && right.from <= left.to;
}

/** Hudud satri — viloyat + tuman (ko'cha raqamisiz) */
export function getLocationLabel(school: Pick<School, 'region' | 'district'>): string {
  return [school.region, school.district].filter(Boolean).join(', ');
}

/**
 * "2 400 000" ko'rinishidagi to'lovni songa aylantiradi.
 * Bo'sh yoki noto'g'ri qiymat uchun 0 qaytadi.
 */
export function parseFee(fee: string): number {
  const digits = String(fee ?? '').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}

/** Kartochka sarlavhasidagi to'liq belgi (Katalog batafsil oynasi) */
export function getTypeBadgeLabel(paid: boolean): string {
  return paid ? 'Xususiy / Pullik' : 'Davlat / Bepul';
}

/** To'lov maydonining sarlavhasi */
export function getFeeLabel(school: Pick<School, 'paid'>): string {
  return school.paid ? "Oylik to'lov" : "To'lov";
}

/** To'lov maydonining qiymati — batafsil oyna uchun */
export function getFeeValue(school: Pick<School, 'paid' | 'fee'>): string {
  if (!school.paid) return 'Bepul';
  return school.fee ? `${school.fee} UZS` : 'Pullik';
}

/** Forma preview'idagi qiymat — bo'sh fee uchun boshqa matn */
export function getFeePreviewValue(
  values: Pick<SchoolFormValues, 'paid' | 'fee'>,
): string {
  if (!values.paid) return 'Bepul';
  return values.fee ? `${values.fee} UZS` : "To'lov kiritilmagan";
}

/** Ro'yxat kartochkasidagi qisqa summa: "2.4 mln/oy" / "Bepul" */
export function getFeeShort(school: Pick<School, 'paid' | 'fee'>): string {
  if (!school.paid) return 'Bepul';
  const n = parseInt(String(school.fee).replace(/\D/g, ''), 10);
  if (!n) return 'Pullik';
  return `${(n / 1_000_000).toFixed(1).replace('.0', '')} mln/oy`;
}

/**
 * Kartochkadagi teglar — tillar + ixtisoslar, `limit` tagacha.
 * `isHighlighted` berilsa, unga mos teglar ro'yxat boshiga suriladi:
 * shunda cheklov tufayli filtrga mos teg kesilib qolmaydi.
 */
export function getSchoolTags(
  school: Pick<School, 'langs' | 'specs'>,
  limit = 4,
  isHighlighted?: (tag: string) => boolean,
): string[] {
  const all = [...(school.langs ?? []), ...(school.specs ?? [])];
  if (!isHighlighted) return all.slice(0, limit);
  return [
    ...all.filter((tag) => isHighlighted(tag)),
    ...all.filter((tag) => !isHighlighted(tag)),
  ].slice(0, limit);
}

/**
 * Ko'rsatish uchun rasmlar ro'yxati. Maktabda rasm bo'lmasa —
 * bitta zaxira rasm qaytadi, shuning uchun natija hech qachon bo'sh emas.
 */
export function getSchoolPhotos(school: Pick<School, 'photos'>): string[] {
  const photos = school.photos ?? [];
  return photos.length ? [...photos] : [DEFAULT_SCHOOL_PHOTO];
}

/** Maktabning o'z rasmi bormi (zaxira rasm hisobga olinmaydi) */
export function hasOwnPhotos(school: Pick<School, 'photos'>): boolean {
  return (school.photos ?? []).length > 0;
}

export function getTelHref(phone: string): string {
  return `tel:${String(phone ?? '').replace(/\s/g, '')}`;
}

export function getInstagramUrl(username: string): string {
  return username ? `https://instagram.com/${username}` : '#';
}

export function getTelegramUrl(username: string): string {
  return username ? `https://t.me/${username}` : '#';
}
