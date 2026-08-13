import {
  getFeeLabel,
  getFeePreviewValue,
  getFullAddress,
  getInstagramUrl,
  getSchoolTags,
  getTelegramUrl,
} from '../../../../domain/entities/school';
import type { SchoolFormValues } from '../../../../domain/types/school';
import { Card } from '../../../../shared/ui';
import { cn } from '../../../../shared/utils/format';
import styles from './PreviewCard.module.css';

export interface PreviewCardProps {
  values: SchoolFormValues;
  /** Sahifa tomonidan beriladigan qo'shimcha klass (tor ekranda yashirish) */
  className?: string;
}

/** Forma.dc.html o'ng ustuni: kiritilgan ma'lumot darhol aks etadigan kartochka */
export function PreviewCard({ values, className }: PreviewCardProps) {
  const mainPhoto = values.photos[0] ?? '';
  const tags = getSchoolTags(
    { langs: values.langs.length ? values.langs : ['—'], specs: values.specs },
    4,
  );

  return (
    <aside className={cn(styles.aside, className)}>
      <div className={styles.caption}>Kartochka ko'rinishi</div>

      <Card padding="none" radius="lg" clip className={styles.card}>
        <div className={styles.head}>
          <div className={styles.name}>{values.name || 'Maktab nomi'}</div>
          <div className={styles.address}>{getFullAddress(values) || 'Manzil kiritilmagan'}</div>
        </div>

        {mainPhoto ? (
          <div className={styles.photo} style={{ backgroundImage: `url(${mainPhoto})` }} />
        ) : null}

        <div className={styles.map} aria-hidden="true">
          <div className={styles.mapGrid} />
          <div className={styles.mapRoad} />
          <div className={styles.mapPin} />
        </div>

        <div className={styles.body}>
          <div className={styles.label}>Direktor</div>
          <div className={styles.director}>{values.director || 'Direktor F.I.SH.'}</div>

          <div className={styles.tags}>
            {values.grades.map((grade) => (
              <span key={grade} className={styles.tag}>
                {grade}
              </span>
            ))}
            {values.hasSports ? <span className={styles.tag}>Sport to'garagi</span> : null}
            {tags.map((tag, i) => (
              <span key={`${tag}-${i}`} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.footer}>
            <div>
              <div className={styles.label}>{getFeeLabel(values)}</div>
              <div className={styles.feeValue}>{getFeePreviewValue(values)}</div>
            </div>
            <div className={styles.socials}>
              {values.instagram ? (
                <a
                  className={styles.social}
                  href={getInstagramUrl(values.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  title={`instagram.com/${values.instagram}`}
                >
                  IG
                </a>
              ) : (
                <span className={styles.social}>IG</span>
              )}
              {values.telegram ? (
                <a
                  className={styles.social}
                  href={getTelegramUrl(values.telegram)}
                  target="_blank"
                  rel="noreferrer"
                  title={`t.me/${values.telegram}`}
                >
                  TG
                </a>
              ) : (
                <span className={styles.social}>TG</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <p className={styles.note}>Kiritilgan ma'lumot shu yerda darhol ko'rinadi.</p>
    </aside>
  );
}

export default PreviewCard;
