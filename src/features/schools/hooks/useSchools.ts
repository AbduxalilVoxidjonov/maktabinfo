import { useCallback, useEffect, useState } from 'react';
import type { School, SchoolFormValues } from '../../../domain/types/school';
import { STORAGE_KEY } from '../../../domain/entities/school';
import {
  SCHOOLS_EVENT,
  addSchool as addSchoolToStorage,
  loadSchools,
} from '../api/schoolsStorage';

export interface UseSchoolsResult {
  /** localStorage'dagi barcha maktablar (barcha statuslar) */
  schools: School[];
  /** Yangi ariza qo'shadi (status='pending') va yaratilgan yozuvni qaytaradi */
  addSchool: (values: SchoolFormValues) => School;
  /** localStorage'dan qayta o'qiydi */
  reload: () => void;
}

/**
 * Sahifalar uchun yagona ma'lumot manbai.
 * localStorage bilan sinxron: boshqa tab (`storage`) va shu tab (`SCHOOLS_EVENT`)
 * o'zgarishlarini eshitadi.
 */
export function useSchools(): UseSchoolsResult {
  const [schools, setSchools] = useState<School[]>(() => loadSchools());

  const reload = useCallback(() => {
    setSchools(loadSchools());
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) reload();
    };
    const onLocal = () => reload();
    window.addEventListener('storage', onStorage);
    window.addEventListener(SCHOOLS_EVENT, onLocal);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(SCHOOLS_EVENT, onLocal);
    };
  }, [reload]);

  const addSchool = useCallback((values: SchoolFormValues): School => {
    const created = addSchoolToStorage(values);
    setSchools(loadSchools());
    return created;
  }, []);

  return { schools, addSchool, reload };
}
