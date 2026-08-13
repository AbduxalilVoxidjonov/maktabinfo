/** Klass nomlarini birlashtiruvchi — bog'liqliksiz, `clsx` o'rniga */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | undefined | null>;

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const v of values) {
    if (!v) continue;
    if (typeof v === 'string' || typeof v === 'number') {
      out.push(String(v));
    } else {
      for (const [key, on] of Object.entries(v)) {
        if (on) out.push(key);
      }
    }
  }
  return out.join(' ');
}

/**
 * Telefonni maketdagi kabi formatlaydi: "+998 90 123 45 67".
 * Forma.dc.html `fmtPhone` mantiqidan aynan ko'chirilgan.
 */
export function formatPhone(raw: string): string {
  let d = String(raw ?? '').replace(/\D/g, '');
  if (d.startsWith('998')) d = d.slice(3);
  d = d.slice(0, 9);
  let out = '+998';
  if (d.length) out += ' ' + d.slice(0, 2);
  if (d.length > 2) out += ' ' + d.slice(2, 5);
  if (d.length > 5) out += ' ' + d.slice(5, 7);
  if (d.length > 7) out += ' ' + d.slice(7, 9);
  return out;
}

/** Telefon to'liq kiritilganmi (+998 va 9 raqam) */
export function isPhoneComplete(raw: string): boolean {
  return String(raw ?? '').replace(/\D/g, '').length >= 12;
}

/**
 * Summani "1 500 000" ko'rinishida formatlaydi (9 raqamgacha).
 * Forma.dc.html `fmtFee` mantiqidan aynan ko'chirilgan.
 */
export function formatFee(raw: string): string {
  const d = String(raw ?? '')
    .replace(/\D/g, '')
    .slice(0, 9);
  return d ? d.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
}

/**
 * Slayder tutqichi uchun ixcham summa: 0 → "0", 800000 → "800 ming",
 * 2400000 → "2.4 mln", 3000000 → "3 mln".
 */
export function formatFeeAmount(value: number): string {
  if (!value) return '0';
  if (value < 1_000_000) return `${Math.round(value / 1000)} ming`;
  return `${(value / 1_000_000).toFixed(1).replace('.0', '')} mln`;
}

/** Faqat lotin harflari, raqam, nuqta va pastki chiziq (IG/TG username) */
export function sanitizeUsername(raw: string): string {
  return String(raw ?? '').replace(/[^A-Za-z0-9._]/g, '');
}

/** "12.08.2026" ko'rinishidagi sana */
export function formatDate(date: Date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
}
