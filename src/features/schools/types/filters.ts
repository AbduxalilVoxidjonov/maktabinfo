import {
  FEE_MAX,
  FEE_MIN,
  SPORTS_TAG_LABEL,
  gradeRangesOverlap,
} from '../../../domain/entities/school';
import { DEFAULT_REGION, IS_REGION_LOCKED } from '../../../domain/entities/regions';
import type { FeeRange, SchoolTypeFilter } from '../../../domain/types/school';

/** Sport to'garaklari filtri: farqi yo'q / bor / yo'q */
export type SportsFilter = 'all' | 'yes' | 'no';

/**
 * Katalog filtr holati — Katalog.dc.html dagi `state` bo'yicha:
 * `q`, `fType`, `fLangs[]`, `fSpecs[]` + hudud va to'lov oralig'i.
 * Maketda til/ixtisos filtrlari KO'P TANLOVLI (toggleFilter), shuning uchun massiv.
 */
export interface CatalogFilters {
  /** Qidiruv matni — nom va manzil bo'yicha */
  query: string;
  type: SchoolTypeFilter;
  /** Viloyat nomi; bo'sh — barcha viloyatlar */
  region: string;
  /** Tuman/shahar nomi; bo'sh — viloyatning barcha tumanlari */
  district: string;
  /** Oylik to'lov oralig'i — faqat type === 'paid' bo'lganda qo'llanadi */
  fee: FeeRange;
  /** Sinf oraliqlari — ko'p tanlovli, bo'sh massiv barcha sinflarni bildiradi */
  grades: string[];
  /** Sport to'garaklari bor-yo'qligi */
  sports: SportsFilter;
  langs: string[];
  specs: string[];
}

/** To'lov slayderining boshlang'ich (to'liq ochiq) holati */
export const FULL_FEE_RANGE: FeeRange = { min: FEE_MIN, max: FEE_MAX };

/** Maketdagi boshlang'ich holat (va "Filtrlarni tozalash" natijasi) */
export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  query: '',
  type: 'all',
  /** Viloyat qulflangan bo'lsa filtr darhol shu viloyat bilan ochiladi */
  region: IS_REGION_LOCKED ? DEFAULT_REGION : '',
  district: '',
  fee: FULL_FEE_RANGE,
  grades: [],
  sports: 'all',
  langs: [],
  specs: [],
};

/** Maketdagi `typeFilters` ro'yxati */
export const TYPE_FILTER_OPTIONS: ReadonlyArray<{
  value: SchoolTypeFilter;
  label: string;
}> = [
  { value: 'all', label: 'Barchasi' },
  { value: 'free', label: 'Bepul' },
  { value: 'paid', label: 'Pullik' },
];

/** Sport to'garaklari filtri variantlari */
export const SPORTS_FILTER_OPTIONS: ReadonlyArray<{
  value: SportsFilter;
  label: string;
}> = [
  { value: 'all', label: 'Farqi yo‘q' },
  { value: 'yes', label: 'Bor' },
  { value: 'no', label: "Yo'q" },
];

/** Massivda qiymatni qo'shadi/olib tashlaydi (maketdagi `toggleFilter`) */
export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Maktabning sinf oraliqlari filtrga mos keladimi (kesishuv bo'yicha) */
export function matchesGrades(schoolGrades: readonly string[], filters: CatalogFilters): boolean {
  if (!filters.grades.length) return true;
  return filters.grades.some((selected) =>
    schoolGrades.some((grade) => gradeRangesOverlap(selected, grade)),
  );
}

/**
 * Kartochkadagi teg joriy filtrga mos tushdimi — yashil ajratish uchun.
 * Til/ixtisos/sport aynan mos kelishi, sinf oraliqlari esa kesishishi tekshiriladi.
 */
export function getTagHighlighter(filters: CatalogFilters): (tag: string) => boolean {
  const exact = new Set<string>([...filters.langs, ...filters.specs]);
  if (filters.sports === 'yes') exact.add(SPORTS_TAG_LABEL);
  const { grades } = filters;

  return (tag) =>
    exact.has(tag) || grades.some((selected) => gradeRangesOverlap(selected, tag));
}

/**
 * Nechta filtr faol — telefonda yopiq panel tugmasidagi belgi uchun.
 * Qidiruv matni hisobga olinmaydi: u alohida maydonda ko'rinib turadi.
 */
export function countActiveFilters(filters: CatalogFilters): number {
  let count = 0;
  if (!IS_REGION_LOCKED && filters.region) count += 1;
  if (filters.district) count += 1;
  if (filters.type !== 'all') count += 1;
  if (filters.type === 'paid' && !isFullFeeRange(filters.fee)) count += 1;
  if (filters.sports !== 'all') count += 1;
  return count + filters.grades.length + filters.langs.length + filters.specs.length;
}

/** To'lov oralig'i tegilmaganmi (butun diapazon tanlangan) */
export function isFullFeeRange(range: FeeRange): boolean {
  return range.min === FEE_MIN && range.max === FEE_MAX;
}
