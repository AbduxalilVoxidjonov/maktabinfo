/** Ilova marshrutlari — bitta manba */
export const ROUTES = {
  root: '/',
  katalog: '/katalog',
  katalogDetail: '/katalog/:id',
  malumotYuborish: '/malumot-yuborish',
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Ariza hozircha Google Forms orqali qabul qilinadi — "Ma'lumot yuborish"
 * tugmasi shu manzilga olib boradi.
 * Ichki formaga (`/malumot-yuborish`) qaytarish uchun bu qiymatni '' qilish kifoya.
 */
export const EXTERNAL_FORM_URL: string = 'https://forms.gle/puY7c3CTrP5894HJ6';

/** /katalog/:id uchun to'liq yo'l */
export function katalogDetailPath(id: string): string {
  return `/katalog/${encodeURIComponent(id)}`;
}
