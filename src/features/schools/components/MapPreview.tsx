import { cn } from '../../../shared/utils/format';
import styles from './MapPreview.module.css';

export type MapPreviewSize = 'sm' | 'lg';

export interface MapPreviewProps {
  /** sm — ro'yxat kartochkasi (--card-media-h), lg — batafsil oyna (210px) */
  size?: MapPreviewSize;
  className?: string;
}

/**
 * Maketdagi dekorativ xarita bloki (haqiqiy xarita emas).
 * Katalog.dc.html: ro'yxatda rasm bo'lmaganda va batafsil oynada ishlatiladi.
 */
export function MapPreview({ size = 'sm', className }: MapPreviewProps) {
  return (
    <div className={cn(styles.map, styles[size], className)} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.road} />
      {size === 'lg' ? <div className={styles.street} /> : null}
      <div className={styles.pin} />
    </div>
  );
}

export default MapPreview;
