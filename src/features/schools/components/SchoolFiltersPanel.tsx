import { useId, useMemo, useState } from 'react';
import {
  FEE_MAX,
  FEE_MIN,
  FEE_STEP,
  GRADE_RANGES,
  LANGS,
  SPEC_DIRECTIONS,
  SPEC_SUBJECTS,
} from '../../../domain/entities/school';
import {
  IS_REGION_LOCKED,
  SELECTABLE_REGIONS,
  getDistricts,
} from '../../../domain/entities/regions';
import type { FeeRange, SchoolTypeFilter } from '../../../domain/types/school';
import { Card, Chip, RangeSlider, Select } from '../../../shared/ui';
import { cn, formatFeeAmount } from '../../../shared/utils/format';
import type { CatalogFilters, SportsFilter } from '../types/filters';
import {
  FULL_FEE_RANGE,
  SPORTS_FILTER_OPTIONS,
  TYPE_FILTER_OPTIONS,
  countActiveFilters,
  toggleValue,
} from '../types/filters';
import styles from './SchoolFiltersPanel.module.css';

export interface SchoolFiltersPanelProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onClear: () => void;
  className?: string;
}

/** Slayder ostidagi qiymat: "2.4 mln so'm" / "10 mln+ so'm" */
function formatFeeHandle(value: number): string {
  if (value >= FEE_MAX) return `${formatFeeAmount(FEE_MAX)}+`;
  return formatFeeAmount(value);
}

/**
 * Filtr paneli: hudud + maktab turi + oylik to'lov oralig'i + sinflar +
 * sport to'garaklari + ta'lim tili + ixtisoslashuv.
 * Keng ekranda doim ochiq; telefonda sarlavha tugmasi bilan yig'iladi
 * va sukut bo'yicha yopiq turadi.
 */
export function SchoolFiltersPanel({
  filters,
  onChange,
  onClear,
  className,
}: SchoolFiltersPanelProps) {
  const districts = useMemo(() => getDistricts(filters.region), [filters.region]);
  const activeCount = countActiveFilters(filters);

  /** Faqat tor ekranda ishlaydi — keng ekranda mazmun doim ko'rinadi */
  const [isOpen, setIsOpen] = useState(false);
  const bodyId = useId();

  const setType = (type: SchoolTypeFilter) =>
    // "Pullik" dan chiqilganda to'lov oralig'i ham tiklanadi
    onChange({
      ...filters,
      type,
      fee: type === 'paid' ? filters.fee : FULL_FEE_RANGE,
    });

  /** Viloyat almashsa tuman tanlovi kuchini yo'qotadi */
  const setRegion = (region: string) => onChange({ ...filters, region, district: '' });
  const setDistrict = (district: string) => onChange({ ...filters, district });
  const setFee = (fee: FeeRange) => onChange({ ...filters, fee });

  const setSports = (sports: SportsFilter) => onChange({ ...filters, sports });

  const toggleGrade = (grade: string) =>
    onChange({ ...filters, grades: toggleValue(filters.grades, grade) });
  const toggleLang = (lang: string) =>
    onChange({ ...filters, langs: toggleValue(filters.langs, lang) });
  const toggleSpec = (spec: string) =>
    onChange({ ...filters, specs: toggleValue(filters.specs, spec) });

  return (
    <Card padding="lg" radius="lg" className={cn(styles.panel, className)}>
      <div className={styles.title}>Filtrlar</div>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <span className={styles.toggleLabel}>
          Filtrlar
          {activeCount ? <span className={styles.count}>{activeCount}</span> : null}
        </span>
        <span className={cn(styles.chevron, isOpen && styles.chevronOpen)} aria-hidden="true">
          ▾
        </span>
      </button>

      <div id={bodyId} className={cn(styles.body, isOpen && styles.bodyOpen)}>
        <div className={styles.groupLabel}>Hudud</div>
        <div className={styles.selects}>
          <Select
            size="sm"
            placeholder={IS_REGION_LOCKED ? undefined : 'Barcha viloyatlar'}
            aria-label="Viloyat"
            options={SELECTABLE_REGIONS}
            value={filters.region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={IS_REGION_LOCKED}
          />
          <Select
            size="sm"
            placeholder={filters.region ? 'Barcha tumanlar' : 'Avval viloyatni tanlang'}
            aria-label="Tuman yoki shahar"
            options={districts}
            value={filters.district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!filters.region}
          />
        </div>

        <div className={styles.groupLabel} id="filter-type">
          Maktab turi
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-type">
          {TYPE_FILTER_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              size="sm"
              selected={filters.type === option.value}
              onClick={() => setType(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>

        {filters.type === 'paid' ? (
          <div className={styles.feeGroup}>
            <div className={styles.groupLabel}>Oylik to'lov (so'm)</div>
            <RangeSlider
              min={FEE_MIN}
              max={FEE_MAX}
              step={FEE_STEP}
              value={filters.fee}
              onChange={setFee}
              formatValue={formatFeeHandle}
              minLabel="Boshlang'ich to'lov summasi"
              maxLabel="Yakuniy to'lov summasi"
            />
          </div>
        ) : null}

        <div className={styles.groupLabel} id="filter-grades">
          Sinflar
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-grades">
          {GRADE_RANGES.map((grade) => (
            <Chip
              key={grade}
              size="sm"
              selected={filters.grades.includes(grade)}
              onClick={() => toggleGrade(grade)}
            >
              {grade}
            </Chip>
          ))}
        </div>

        <div className={styles.groupLabel} id="filter-sports">
          Sport to'garaklari
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-sports">
          {SPORTS_FILTER_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              size="sm"
              selected={filters.sports === option.value}
              onClick={() => setSports(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>

        <div className={styles.groupLabel} id="filter-lang">
          Ta'lim tili
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-lang">
          {LANGS.map((lang) => (
            <Chip
              key={lang}
              size="sm"
              selected={filters.langs.includes(lang)}
              onClick={() => toggleLang(lang)}
            >
              {lang}
            </Chip>
          ))}
        </div>

        <div className={styles.groupLabel} id="filter-spec">
          Ixtisoslashuv yo'nalishi
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-spec">
          {SPEC_DIRECTIONS.map((spec) => (
            <Chip
              key={spec}
              size="sm"
              selected={filters.specs.includes(spec)}
              onClick={() => toggleSpec(spec)}
            >
              {spec}
            </Chip>
          ))}
        </div>

        <div className={styles.groupLabel} id="filter-subject">
          Chuqurlashtirilgan fanlar
        </div>
        <div className={styles.chips} role="group" aria-labelledby="filter-subject">
          {SPEC_SUBJECTS.map((subject) => (
            <Chip
              key={subject}
              size="sm"
              selected={filters.specs.includes(subject)}
              onClick={() => toggleSpec(subject)}
            >
              {subject}
            </Chip>
          ))}
        </div>

        <button type="button" className={styles.clear} onClick={onClear}>
          Filtrlarni tozalash
        </button>
      </div>
    </Card>
  );
}

export default SchoolFiltersPanel;
