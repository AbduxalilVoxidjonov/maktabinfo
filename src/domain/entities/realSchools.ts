import type { School } from '../types/school';

/**
 * Google Forma orqali kelgan HAQIQIY maktab ma'lumotlari.
 *
 * Xom satrlar `School` modeliga quyidagi qoidalar bilan moslashtirildi:
 * - `region` — hozircha barchasi "Farg'ona viloyati" (IS_REGION_LOCKED)
 * - `district` — xom manzildan ajratildi; koordinata/plus-code bo'lsa taxminiy
 *   (TODO belgisi qo'yilgan — tasdiqlash kerak)
 * - `instagram` / `telegram` — faqat username saqlanadi (@ va URL olib tashlanadi)
 * - `fee` — "1.500.000" → "1 500 000"; qiymat bo'lsa `paid: true`
 * - `langs` / `specs` — LANGS va SPECS ro'yxatlaridagi aniq matnlarga keltirildi
 *
 * Formada berilmagan maydonlar bo'sh qoldirildi: `phone`, `grades`, `photos`,
 * `hasSports`. Ularni maktablardan alohida so'rab to'ldirish kerak.
 *
 * `photos` bo'sh bo'lsa interfeys `DEFAULT_SCHOOL_PHOTO` ni ko'rsatadi — shuning
 * uchun bu yerga zaxira rasm yozilmaydi.
 */
export const REAL_SCHOOLS: School[] = [
  {
    id: 'jurayev-school',
    name: 'Jurayev school',
    director: "Ahmadjonov Qahramonjon Qayumjon o'g'li",
    region: "Farg'ona viloyati",
    district: "Qo'qon shahri",
    address: "Qo'qon Aeroporti yonida",
    // Xom qiymat "9-11 sinflar" edi — ro'yxatdagi eng yaqin oraliq "10-11 sinflar"
    grades: ['1-4 sinflar', '5-9 sinflar', '10-11 sinflar'],
    hasSports: false, // TODO: formada berilmagan
    paid: true,
    // Bosqichma-bosqich narx: 1-4 sinf — 1,5 mln (maktab+nonushta+tushlik);
    // 5-7 sinf — 1,5 mln (maktab+tushlik); 8-11 sinf — 2 mln
    // (maktab+yotoqxona+3 mahal ovqat). Filtr bitta son bilan ishlagani uchun
    // pastki chegara olindi. TODO: modelga `feeNote` qo'shilsa to'liq yozish.
    fee: '1 500 000',
    langs: ["O'zbek", 'Ingliz'],
    specs: ['Matematika', 'Ingliz tili', 'Kimyo', 'Biologiya'],
    phone: '', // TODO: formada berilmagan
    instagram: 'jurayev.school',
    telegram: 'Jurayev_school',
    mapUrl: '',
    // Drive havolasi o'rniga yuklab olingan rasm — `public/schools/` dan xizmat qiladi
    photos: ['/schools/jurayev-school.jpg'],
    status: 'approved',
    date: '12.08.2026',
  },
  {
    id: 'chimyon-school',
    name: 'Chimyon school',
    director: "G'aniyev Nodirbek Ravshanjon o'g'li",
    region: "Farg'ona viloyati",
    district: "Farg'ona tumani",
    address: "Chimyon qishlog'i",
    grades: [], // TODO: formada berilmagan
    hasSports: false, // TODO: formada berilmagan
    paid: true,
    fee: '1 500 000',
    langs: ["O'zbek"],
    specs: ['Matematika', 'Ingliz tili', 'Tarix', 'Kimyo', 'Biologiya'],
    phone: '', // TODO: formada berilmagan
    instagram: 'chimyon_xususiy_maktab',
    telegram: 'chimyon_xususiy_maktabi',
    mapUrl: '',
    photos: [],
    status: 'approved',
    date: '12.08.2026',
  },
  {
    id: 'sunway-edu-city',
    name: 'Sunway Edu City',
    director: 'Mamayusupov Sanjarbek Taxirovich',
    region: "Farg'ona viloyati",
    district: "Qo'qon shahri",
    address: "Shayxon MFY, Temur Malik ko'chasi",
    grades: [], // TODO: formada berilmagan
    hasSports: false, // TODO: formada berilmagan
    paid: true,
    // Xom qiymat "1500-2000" (ya'ni 1.5–2 mln oralig'i) — filtr bitta son bilan
    // ishlagani uchun pastki chegara olindi. TODO: aniq summani tasdiqlash.
    fee: '1 500 000',
    langs: ["O'zbek", 'Ingliz', 'Rus'],
    specs: [
      'Matematika',
      'Ingliz tili',
      'Rus tili',
      'Xitoy tili',
      'Fizika',
      'Tarix',
      'Kimyo',
      'Biologiya',
    ],
    phone: '', // TODO: formada berilmagan
    instagram: 'sunwayeducity',
    telegram: '',
    mapUrl: '',
    photos: [],
    status: 'approved',
    date: '12.08.2026',
  },
  {
    id: 'shams-xususiy-maktabi',
    name: 'SHAMS xususiy maktabi',
    director: "Rahmonov Shamsiddin Baxrom o'g'li",
    region: "Farg'ona viloyati",
    // TODO: xom ma'lumotda faqat koordinata bor edi (40.459783, 71.214031) —
    // tuman koordinatadan taxmin qilindi, tasdiqlash kerak.
    district: "Bog'dod tumani",
    address: '',
    grades: [], // TODO: formada berilmagan
    hasSports: false, // TODO: formada berilmagan
    paid: true,
    fee: '1 700 000',
    langs: ["O'zbek", 'Ingliz', 'Rus'],
    specs: [
      'Aniq fanlar',
      'Tabiiy fanlar',
      'Xorijiy tillar',
      'Ijtimoiy fanlar',
      'Matematika',
      'Ingliz tili',
      'Rus tili',
      'Fizika',
      'Tarix',
      'Kimyo',
      'Biologiya',
    ],
    phone: '', // TODO: formada berilmagan
    instagram: 'shams_xm',
    telegram: 'shams_xm',
    mapUrl: 'https://maps.google.com/?q=40.459783,71.214031',
    photos: [],
    status: 'approved',
    date: '12.08.2026',
  },
  {
    id: 'glorious-mind-school',
    name: 'Glorious Mind school',
    director: 'Ibragimov Elyorjon Muhammadyahyoyevich',
    region: "Farg'ona viloyati",
    // TODO: xom manzil "C694+Q8X, Pandygan" (plus-code) — tuman taxminiy.
    district: "Farg'ona tumani",
    address: "Pandigan qishlog'i",
    grades: [], // TODO: formada berilmagan
    hasSports: false, // TODO: formada berilmagan
    // TODO: to'lov maydoni bo'sh kelgan — bepul yoki pullikligini aniqlash kerak.
    paid: false,
    fee: '',
    langs: ["O'zbek"],
    specs: [
      'Matematika',
      'Ingliz tili',
      'Rus tili',
      'Fizika',
      'Tarix',
      'Kimyo',
      'Biologiya',
    ],
    phone: '', // TODO: formada berilmagan
    instagram: '',
    telegram: '',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=C694%2BQ8X%20Pandygan',
    photos: [],
    status: 'approved',
    date: '12.08.2026',
  },
];
