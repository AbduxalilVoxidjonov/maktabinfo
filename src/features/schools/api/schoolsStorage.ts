import type { School, SchoolFormValues } from '../../../domain/types/school';
import { SEED_SCHOOLS, STORAGE_KEY } from '../../../domain/entities/school';

/** localStorage o'zgarganda ishlaydigan maxsus hodisa (bir tab ichida) */
export const SCHOOLS_EVENT = 'maktablar:changed';

function hasStorage(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

function cloneSeed(): School[] {
  return SEED_SCHOOLS.map((s) => ({
    ...s,
    grades: [...s.grades],
    langs: [...s.langs],
    specs: [...s.specs],
    photos: [...s.photos],
  }));
}

function isSchoolLike(value: unknown): value is Partial<School> {
  return typeof value === 'object' && value !== null;
}

/** Eski/nomukammal yozuvlarni to'liq School'ga keltiradi (id yo'q bo'lsa qo'shadi) */
function normalize(raw: unknown, index: number): School {
  const s = isSchoolLike(raw) ? raw : {};
  return {
    id: typeof s.id === 'string' && s.id ? s.id : `school-${index}-${createId()}`,
    name: typeof s.name === 'string' ? s.name : '',
    director: typeof s.director === 'string' ? s.director : '',
    region: typeof s.region === 'string' ? s.region : '',
    district: typeof s.district === 'string' ? s.district : '',
    address: typeof s.address === 'string' ? s.address : '',
    grades: Array.isArray(s.grades)
      ? s.grades.filter((x): x is string => typeof x === 'string')
      : [],
    hasSports: s.hasSports === true,
    paid: s.paid === true,
    fee: typeof s.fee === 'string' ? s.fee : '',
    langs: Array.isArray(s.langs) ? s.langs.filter((x): x is string => typeof x === 'string') : [],
    specs: Array.isArray(s.specs) ? s.specs.filter((x): x is string => typeof x === 'string') : [],
    phone: typeof s.phone === 'string' ? s.phone : '',
    instagram: typeof s.instagram === 'string' ? s.instagram : '',
    telegram: typeof s.telegram === 'string' ? s.telegram : '',
    mapUrl: typeof s.mapUrl === 'string' ? s.mapUrl : '',
    photos: Array.isArray(s.photos) ? s.photos.filter((x): x is string => typeof x === 'string') : [],
    status: s.status === 'approved' || s.status === 'rejected' ? s.status : 'pending',
    date: typeof s.date === 'string' ? s.date : '',
    isNew: s.isNew === true ? true : undefined,
  };
}

/** Barqaror ID — crypto.randomUUID mavjud bo'lmasa zaxira variant */
export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Maketdagi sana formati: "12.08.2026" */
export function formatToday(date: Date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
}

/**
 * Ro'yxatni o'qiydi. Bo'sh yoki buzuq bo'lsa SEED bilan urug'lantiradi.
 */
export function loadSchools(): School[] {
  if (!hasStorage()) return cloneSeed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.map((item, i) => normalize(item, i));
      }
    }
  } catch {
    // JSON buzuq — SEED'ga qaytamiz
  }
  const seeded = cloneSeed();
  saveSchools(seeded);
  return seeded;
}

/**
 * Ro'yxatni saqlaydi. Kvota to'lsa — rasmlarni qisqartirib qayta urinadi.
 * @returns saqlash muvaffaqiyatli bo'lsa true
 */
export function saveSchools(list: School[]): boolean {
  if (!hasStorage()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    notifyChanged();
    return true;
  } catch {
    try {
      const light = list.map((s) => ({ ...s, photos: (s.photos ?? []).slice(0, 1) }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(light));
      notifyChanged();
      return true;
    } catch {
      return false;
    }
  }
}

function notifyChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SCHOOLS_EVENT));
}

/**
 * Yangi ariza qo'shadi: status='pending', bugungi sana, ro'yxat boshiga.
 * @returns yaratilgan School yozuvi
 */
export function addSchool(values: SchoolFormValues): School {
  const school: School = {
    ...values,
    langs: [...values.langs],
    specs: [...values.specs],
    photos: [...values.photos],
    id: createId(),
    status: 'pending',
    date: formatToday(),
    isNew: true,
  };
  saveSchools([school, ...loadSchools()]);
  return school;
}

/** Bitta maktabni id bo'yicha topadi */
export function getSchoolById(id: string): School | undefined {
  return loadSchools().find((s) => s.id === id);
}

/** Test/debug uchun: saqlangan ma'lumotni tozalab, SEED'ga qaytaradi */
export function resetSchools(): School[] {
  const seeded = cloneSeed();
  saveSchools(seeded);
  return seeded;
}
