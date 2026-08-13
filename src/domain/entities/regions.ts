/**
 * O'zbekiston ma'muriy-hududiy bo'linishi — 12 viloyat, Qoraqalpog'iston
 * Respublikasi va Toshkent shahri. Har bir hudud ichida tumanlar va
 * viloyatga bo'ysunuvchi shaharlar bitta ro'yxatda beriladi (filtr uchun).
 */

export interface Region {
  /** Dropdown qiymati va School.region'da saqlanadigan matn */
  name: string;
  /** Tumanlar + viloyatga bo'ysunuvchi shaharlar */
  districts: readonly string[];
}

export const REGIONS: readonly Region[] = [
  {
    name: "Qoraqalpog'iston Respublikasi",
    districts: [
      'Amudaryo tumani',
      'Beruniy tumani',
      "Bo'zatov tumani",
      'Chimboy tumani',
      "Ellikqal'a tumani",
      'Kegeyli tumani',
      "Mo'ynoq tumani",
      'Nukus tumani',
      "Qanliko'l tumani",
      "Qo'ng'irot tumani",
      "Qorao'zak tumani",
      'Shumanay tumani',
      "Taxtako'pir tumani",
      "To'rtko'l tumani",
      "Xo'jayli tumani",
      'Nukus shahri',
      'Taxiatosh shahri',
    ],
  },
  {
    name: 'Andijon viloyati',
    districts: [
      'Andijon tumani',
      'Asaka tumani',
      'Baliqchi tumani',
      "Bo'z tumani",
      'Buloqboshi tumani',
      'Izboskan tumani',
      'Jalaquduq tumani',
      "Qo'rg'ontepa tumani",
      'Marhamat tumani',
      "Oltinko'l tumani",
      'Paxtaobod tumani',
      'Shahrixon tumani',
      "Ulug'nor tumani",
      "Xo'jaobod tumani",
      'Andijon shahri',
      'Asaka shahri',
      'Xonobod shahri',
    ],
  },
  {
    name: 'Buxoro viloyati',
    districts: [
      'Buxoro tumani',
      "G'ijduvon tumani",
      'Jondor tumani',
      'Kogon tumani',
      'Olot tumani',
      'Peshku tumani',
      "Qorako'l tumani",
      'Qorovulbozor tumani',
      'Romitan tumani',
      'Shofirkon tumani',
      'Vobkent tumani',
      'Buxoro shahri',
      'Kogon shahri',
    ],
  },
  {
    name: "Farg'ona viloyati",
    districts: [
      'Beshariq tumani',
      "Bog'dod tumani",
      'Buvayda tumani',
      "Dang'ara tumani",
      "Farg'ona tumani",
      'Furqat tumani',
      'Oltiariq tumani',
      "O'zbekiston tumani",
      "Qo'shtepa tumani",
      'Quva tumani',
      'Rishton tumani',
      "So'x tumani",
      'Toshloq tumani',
      "Uchko'prik tumani",
      'Yozyovon tumani',
      "Farg'ona shahri",
      "Marg'ilon shahri",
      "Qo'qon shahri",
      'Quvasoy shahri',
    ],
  },
  {
    name: 'Jizzax viloyati',
    districts: [
      'Arnasoy tumani',
      'Baxmal tumani',
      "Do'stlik tumani",
      'Forish tumani',
      "G'allaorol tumani",
      "Mirzacho'l tumani",
      'Paxtakor tumani',
      'Sharof Rashidov tumani',
      'Yangiobod tumani',
      'Zafarobod tumani',
      'Zarbdor tumani',
      'Zomin tumani',
      'Jizzax shahri',
    ],
  },
  {
    name: 'Namangan viloyati',
    districts: [
      'Chortoq tumani',
      'Chust tumani',
      'Davlatobod tumani',
      'Kosonsoy tumani',
      'Mingbuloq tumani',
      'Namangan tumani',
      'Norin tumani',
      'Pop tumani',
      "To'raqo'rg'on tumani",
      "Uchqo'rg'on tumani",
      'Uychi tumani',
      "Yangiqo'rg'on tumani",
      'Namangan shahri',
    ],
  },
  {
    name: 'Navoiy viloyati',
    districts: [
      'Karmana tumani',
      'Konimex tumani',
      'Navbahor tumani',
      'Nurota tumani',
      'Qiziltepa tumani',
      'Tomdi tumani',
      'Uchquduq tumani',
      'Xatirchi tumani',
      'Navoiy shahri',
      'Zarafshon shahri',
    ],
  },
  {
    name: 'Qashqadaryo viloyati',
    districts: [
      'Chiroqchi tumani',
      'Dehqonobod tumani',
      "G'uzor tumani",
      'Kasbi tumani',
      'Kitob tumani',
      "Ko'kdala tumani",
      'Koson tumani',
      'Mirishkor tumani',
      'Muborak tumani',
      'Nishon tumani',
      'Qamashi tumani',
      'Qarshi tumani',
      'Shahrisabz tumani',
      "Yakkabog' tumani",
      'Qarshi shahri',
      'Shahrisabz shahri',
    ],
  },
  {
    name: 'Samarqand viloyati',
    districts: [
      "Bulung'ur tumani",
      'Ishtixon tumani',
      'Jomboy tumani',
      "Kattaqo'rg'on tumani",
      'Narpay tumani',
      'Nurobod tumani',
      'Oqdaryo tumani',
      "Past darg'om tumani",
      'Paxtachi tumani',
      'Payariq tumani',
      "Qo'shrabot tumani",
      'Samarqand tumani',
      'Toyloq tumani',
      'Urgut tumani',
      "Kattaqo'rg'on shahri",
      'Samarqand shahri',
    ],
  },
  {
    name: 'Sirdaryo viloyati',
    districts: [
      'Boyovut tumani',
      'Guliston tumani',
      'Mirzaobod tumani',
      'Oqoltin tumani',
      'Sardoba tumani',
      'Sayxunobod tumani',
      'Sirdaryo tumani',
      'Xovos tumani',
      'Guliston shahri',
      'Shirin shahri',
      'Yangiyer shahri',
    ],
  },
  {
    name: 'Surxondaryo viloyati',
    districts: [
      'Angor tumani',
      'Bandixon tumani',
      'Boysun tumani',
      'Denov tumani',
      "Jarqo'rg'on tumani",
      'Muzrabot tumani',
      'Oltinsoy tumani',
      'Qiziriq tumani',
      "Qumqo'rg'on tumani",
      'Sariosiyo tumani',
      'Sherobod tumani',
      "Sho'rchi tumani",
      'Termiz tumani',
      'Uzun tumani',
      'Termiz shahri',
    ],
  },
  {
    name: 'Toshkent viloyati',
    districts: [
      'Bekobod tumani',
      "Bo'ka tumani",
      "Bo'stonliq tumani",
      'Chinoz tumani',
      'Ohangaron tumani',
      "Oqqo'rg'on tumani",
      "O'rtachirchiq tumani",
      'Parkent tumani',
      'Piskent tumani',
      'Qibray tumani',
      'Quyichirchiq tumani',
      'Toshkent tumani',
      "Yangiyo'l tumani",
      'Yuqorichirchiq tumani',
      'Zangiota tumani',
      'Angren shahri',
      'Bekobod shahri',
      'Chirchiq shahri',
      'Nurafshon shahri',
      'Ohangaron shahri',
      'Olmaliq shahri',
      "Yangiyo'l shahri",
    ],
  },
  {
    name: 'Xorazm viloyati',
    districts: [
      "Bog'ot tumani",
      'Gurlan tumani',
      'Hazorasp tumani',
      "Qo'shko'pir tumani",
      'Shovot tumani',
      "Tuproqqal'a tumani",
      'Urganch tumani',
      'Xiva tumani',
      'Xonqa tumani',
      'Yangiariq tumani',
      'Yangibozor tumani',
      'Urganch shahri',
      'Xiva shahri',
    ],
  },
  {
    name: 'Toshkent shahri',
    districts: [
      'Bektemir tumani',
      'Chilonzor tumani',
      'Mirobod tumani',
      "Mirzo Ulug'bek tumani",
      'Olmazor tumani',
      'Sergeli tumani',
      'Shayxontohur tumani',
      'Uchtepa tumani',
      'Yakkasaroy tumani',
      'Yangihayot tumani',
      'Yashnobod tumani',
      'Yunusobod tumani',
    ],
  },
];

/** Faqat viloyat nomlari — to'liq ro'yxat */
export const REGION_NAMES: readonly string[] = REGIONS.map((r) => r.name);

/** Portal hozircha faqat shu viloyat bo'yicha ishlaydi */
export const DEFAULT_REGION = "Farg'ona viloyati";

/**
 * true — viloyat tanlovi qulflangan, faqat DEFAULT_REGION ishlatiladi.
 * Boshqa viloyatlarni ochish uchun shuni `false` qilish kifoya:
 * REGIONS ro'yxati to'liq holicha turibdi.
 */
export const IS_REGION_LOCKED: boolean = true;

/** Dropdownda tanlash mumkin bo'lgan viloyatlar */
export const SELECTABLE_REGIONS: readonly string[] = IS_REGION_LOCKED
  ? [DEFAULT_REGION]
  : REGION_NAMES;

/** Tanlangan viloyat tumanlari; viloyat topilmasa — bo'sh ro'yxat */
export function getDistricts(regionName: string): readonly string[] {
  return REGIONS.find((r) => r.name === regionName)?.districts ?? [];
}

/** Tuman shu viloyatga tegishlimi (viloyat almashganda tekshirish uchun) */
export function isDistrictOf(regionName: string, districtName: string): boolean {
  return getDistricts(regionName).includes(districtName);
}
