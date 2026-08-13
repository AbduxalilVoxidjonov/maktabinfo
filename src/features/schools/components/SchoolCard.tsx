import { Link } from 'react-router-dom';
import { katalogDetailPath } from '../../../app/router/routes';
import {
  SPORTS_TAG_LABEL,
  getFeeShort,
  getFullAddress,
  getSchoolPhotos,
  getSchoolTags,
} from '../../../domain/entities/school';
import type { School } from '../../../domain/types/school';
import type { BadgeVariant } from '../../../shared/ui';
import { Badge, Card } from '../../../shared/ui';
import { cn } from '../../../shared/utils/format';
import styles from './SchoolCard.module.css';

export interface SchoolCardProps {
  school: School;
  /** Teg joriy filtrga mos keladimi — mos teglar yashil ajratiladi */
  isHighlighted?: (tag: string) => boolean;
  className?: string;
}

/**
 * Ro'yxatdagi bitta maktab kartochkasi.
 * Maketda butun kartochka bosiladigan edi — bu yerda ham butun kartochka <Link>.
 */
export function SchoolCard({ school, isHighlighted, className }: SchoolCardProps) {
  /** Rasmi yo'q maktab uchun ham zaxira rasm qaytadi — bo'sh bo'lmaydi */
  const photo = getSchoolPhotos(school)[0];
  const tags = getSchoolTags(school, 4, isHighlighted);

  /** Filtrga mos teg — yashil, qolgani — kulrang */
  const tagVariant = (value: string): BadgeVariant =>
    isHighlighted?.(value) ? 'tagMatch' : 'tag';

  return (
    <Link
      to={katalogDetailPath(school.id)}
      className={cn(styles.link, className)}
      aria-label={`${school.name} — batafsil`}
    >
      <Card padding="md" radius="lg" interactive className={styles.card}>
        <div
          className={styles.photo}
          style={{ backgroundImage: `url(${photo})` }}
          aria-hidden="true"
        />

        <div className={styles.body}>
          <div className={styles.titleRow}>
            <span className={styles.name}>{school.name}</span>
            {school.isNew ? <Badge variant="new">YANGI</Badge> : null}
          </div>
          <div className={styles.meta}>
            <div>{getFullAddress(school)}</div>
            <div className={styles.director}>Direktor: {school.director}</div>
          </div>
          <div className={styles.tags}>
            {school.grades.map((grade) => (
              <Badge key={grade} variant={tagVariant(grade)}>
                {grade}
              </Badge>
            ))}
            {school.hasSports ? (
              <Badge variant={tagVariant(SPORTS_TAG_LABEL)}>{SPORTS_TAG_LABEL}</Badge>
            ) : null}
            {tags.map((tag) => (
              <Badge key={tag} variant={tagVariant(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.fee}>{getFeeShort(school)}</div>
          <div className={styles.more}>Batafsil →</div>
        </div>
      </Card>
    </Link>
  );
}

export default SchoolCard;
