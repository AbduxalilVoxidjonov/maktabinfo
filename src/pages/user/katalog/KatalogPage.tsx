import { useMemo, useState } from 'react';
import { getFullAddress, parseFee } from '../../../domain/entities/school';
import type { School } from '../../../domain/types/school';
import { SchoolCard, SchoolFiltersPanel } from '../../../features/schools/components';
import type { CatalogFilters } from '../../../features/schools/types';
import {
  EMPTY_CATALOG_FILTERS,
  getTagHighlighter,
  isFullFeeRange,
  matchesGrades,
} from '../../../features/schools/types';
import { useSchools } from '../../../features/schools/hooks/useSchools';
import { EmptyState, Input } from '../../../shared/ui';
import styles from './KatalogPage.module.css';

/**
 * "Pullik" filtri ostidagi to'lov oralig'i.
 * To'lov ko'rsatilmagan maktab faqat oraliq to'liq ochiq bo'lganda ko'rinadi.
 */
function matchesFee(school: School, filters: CatalogFilters): boolean {
  if (filters.type !== 'paid' || isFullFeeRange(filters.fee)) return true;
  const fee = parseFee(school.fee);
  if (!fee) return false;
  return fee >= filters.fee.min && fee <= filters.fee.max;
}

/** Katalog.dc.html `renderVals` dagi filtrlash mantiqi */
function matches(school: School, filters: CatalogFilters, query: string): boolean {
  if (school.status !== 'approved') return false;
  if (query && !`${school.name} ${getFullAddress(school)}`.toLowerCase().includes(query)) {
    return false;
  }
  if (filters.type === 'free' && school.paid) return false;
  if (filters.type === 'paid' && !school.paid) return false;
  if (filters.region && school.region !== filters.region) return false;
  if (filters.district && school.district !== filters.district) return false;
  if (!matchesFee(school, filters)) return false;
  if (!matchesGrades(school.grades, filters)) return false;
  if (filters.sports === 'yes' && !school.hasSports) return false;
  if (filters.sports === 'no' && school.hasSports) return false;
  if (filters.langs.length && !filters.langs.some((l) => school.langs.includes(l))) return false;
  if (filters.specs.length && !filters.specs.some((s) => school.specs.includes(s))) return false;
  return true;
}

/** Maktablar katalogi — ommaviy ro'yxat (faqat tasdiqlangan maktablar) */
export function KatalogPage() {
  const { schools } = useSchools();
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS);

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return schools.filter((school) => matches(school, filters, query));
  }, [schools, filters]);

  /** Kartochkada qaysi teg yashil ajratilishini hal qiladi */
  const isHighlighted = useMemo(() => getTagHighlighter(filters), [filters]);

  return (
    <div>
      <div className={styles.topBar}>
        <p className={styles.resultLabel}>{results.length} maktab topildi</p>
        <Input
          variant="search"
          className={styles.search}
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          placeholder="Maktab nomi yoki tuman bo'yicha qidirish"
          aria-label="Maktab qidirish"
          type="search"
        />
      </div>

      <div className={styles.layout}>
        <SchoolFiltersPanel
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(EMPTY_CATALOG_FILTERS)}
        />

        <div className={styles.results}>
          {results.map((school) => (
            <SchoolCard key={school.id} school={school} isHighlighted={isHighlighted} />
          ))}
          {results.length === 0 ? (
            <EmptyState title="Bunday maktab topilmadi. Filtrlarni o'zgartirib ko'ring." />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default KatalogPage;
