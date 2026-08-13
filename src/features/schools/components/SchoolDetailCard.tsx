import { useState } from 'react';
import {
  getFeeLabel,
  getFeeValue,
  getFullAddress,
  getInstagramUrl,
  getSchoolPhotos,
  getTelHref,
  getTelegramUrl,
  getTypeBadgeLabel,
  hasOwnPhotos,
} from '../../../domain/entities/school';
import type { School } from '../../../domain/types/school';
import { Badge, ButtonLink, Card } from '../../../shared/ui';
import { cn } from '../../../shared/utils/format';
import styles from './SchoolDetailCard.module.css';

export interface SchoolDetailCardProps {
  school: School;
  className?: string;
}

/** Maketdagi kabi — bo'sh ro'yxat o'rniga "—" ko'rsatiladi */
function orDash(list: string[]): string[] {
  return list.length ? list : ['—'];
}

/**
 * Maktab batafsil kartochkasi: navy sarlavha, ma'lumotlar, aloqa tugmalari
 * va rasm galereyasi (Katalog.dc.html `isCard`).
 *
 * Xarita bloki vaqtincha olib tashlangan — maktablardan location kelganda
 * qaytariladi (`MapPreview` komponenti shu maqsadda saqlanib turibdi).
 */
export function SchoolDetailCard({ school, className }: SchoolDetailCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  /** Rasmi yo'q maktabga zaxira rasm qo'yiladi — ro'yxat bo'sh bo'lmaydi */
  const photos = getSchoolPhotos(school);
  const isOwnPhoto = hasOwnPhotos(school);
  const activeIndex = Math.min(photoIndex, photos.length - 1);
  const mainPhoto = photos[activeIndex];
  const firstSpec = school.specs[0] ?? '';

  return (
    <Card padding="none" radius="xl" shadow clip className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>{school.name}</h1>
          <div className={styles.address}>{getFullAddress(school)}</div>
        </div>
        <div className={styles.headerBadges}>
          <Badge variant="onDark">{getTypeBadgeLabel(school.paid)}</Badge>
          {school.grades.map((grade) => (
            <Badge key={grade} variant="onDark">
              {grade}
            </Badge>
          ))}
          {firstSpec ? <Badge variant="accent">{firstSpec}</Badge> : null}
        </div>
      </div>

      <div className={styles.body}>
        <div>
          <div className={styles.facts}>
            <div>
              <div className={styles.label}>Direktor</div>
              <div className={styles.director}>{school.director}</div>
            </div>
            <div>
              <div className={styles.label}>{getFeeLabel(school)}</div>
              <div className={styles.fee}>{getFeeValue(school)}</div>
            </div>
            <div>
              <div className={styles.label}>Sport to'garaklari</div>
              <div className={styles.director}>{school.hasSports ? 'Bor' : "Yo'q"}</div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Ta'lim tillari</div>
          <div className={styles.pills}>
            {orDash(school.langs).map((lang) => (
              <Badge key={lang} variant="lang">
                {lang}
              </Badge>
            ))}
          </div>

          <div className={styles.sectionLabel}>Ixtisoslashuv</div>
          <div className={cn(styles.pills, styles.pillsLast)}>
            {orDash(school.specs).map((spec) => (
              <Badge key={spec} variant="spec">
                {spec}
              </Badge>
            ))}
          </div>

          <div className={styles.actions}>
            <ButtonLink to={getTelHref(school.phone)} external variant="primary" iconLeft="☎">
              {school.phone}
            </ButtonLink>
            <ButtonLink
              to={getInstagramUrl(school.instagram)}
              external
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className={styles.socialButton}
              iconLeft={
                <span className={styles.igIcon}>
                  <span className={styles.igDot} />
                </span>
              }
            >
              Instagram
            </ButtonLink>
            <ButtonLink
              to={getTelegramUrl(school.telegram)}
              external
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className={styles.socialButton}
              iconLeft="➤"
            >
              Telegram
            </ButtonLink>
          </div>
        </div>

        <div>
          <div className={styles.gallery}>
            <div
              className={styles.mainPhoto}
              style={{ backgroundImage: `url(${mainPhoto})` }}
              role="img"
              aria-label={
                isOwnPhoto
                  ? `${school.name} — rasm ${activeIndex + 1}`
                  : `${school.name} — rasm yuklanmagan`
              }
            />
            {photos.length > 1 ? (
              <div className={styles.thumbs}>
                {photos.map((photo, index) => (
                  <button
                    key={`${photo.slice(0, 32)}-${index}`}
                    type="button"
                    className={cn(styles.thumb, index === activeIndex && styles.thumbActive)}
                    style={{ backgroundImage: `url(${photo})` }}
                    aria-label={`Rasm ${index + 1}`}
                    aria-pressed={index === activeIndex}
                    onClick={() => setPhotoIndex(index)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SchoolDetailCard;
