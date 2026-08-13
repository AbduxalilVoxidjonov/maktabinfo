import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../app/router/routes';
import { SchoolDetailCard } from '../../../features/schools/components';
import { useSchools } from '../../../features/schools/hooks/useSchools';
import { ButtonLink, EmptyState } from '../../../shared/ui';
import styles from './KatalogDetailPage.module.css';

/** Bitta maktabning batafsil oynasi — /katalog/:id */
export function KatalogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { schools } = useSchools();

  const school = schools.find((s) => s.id === id && s.status === 'approved');

  if (!school) {
    return (
      <EmptyState
        icon="🔍"
        title="Maktab topilmadi"
        description="Bu maktab o'chirilgan yoki hali tasdiqlanmagan bo'lishi mumkin."
        action={
          <ButtonLink to={ROUTES.katalog} variant="secondary" size="md">
            Katalogga qaytish
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div>
      <Link to={ROUTES.katalog} className={styles.back}>
        ← Ro'yxatga qaytish
      </Link>
      <SchoolDetailCard school={school} />
    </div>
  );
}

export default KatalogDetailPage;
