import type { ChangeEvent } from 'react';
import styles from './PhotoUploader.module.css';

export interface PhotoUploaderProps {
  /** data URL ro'yxati */
  photos: string[];
  /** Cheklovlar buzilganda ko'rsatiladigan xabar */
  error: string;
  onSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
}

/** Forma.dc.html 5-bo'limi: dashed yuklash maydoni + kichik rasm ro'yxati */
export function PhotoUploader({ photos, error, onSelect, onRemove }: PhotoUploaderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Bir xil faylni qayta tanlash mumkin bo'lishi uchun (maketdagi e.target.value = '')
    e.target.value = '';
    if (files.length) onSelect(files);
  };

  return (
    <>
      <label className={styles.dropzone}>
        <span className={styles.icon}>↑</span>
        <span className={styles.action}>Rasm yuklash</span>
        <span className={styles.limits}>JPG yoki PNG · bittasi 5 MB gacha</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className={styles.input}
          onChange={handleChange}
        />
      </label>

      {photos.length > 0 ? (
        <div className={styles.grid}>
          {photos.map((src, i) => (
            <div key={`${i}-${src.slice(-24)}`} className={styles.thumb}>
              <div className={styles.image} style={{ backgroundImage: `url(${src})` }} />
              {i === 0 ? <span className={styles.main}>ASOSIY</span> : null}
              <button
                type="button"
                className={styles.remove}
                aria-label={`${i + 1}-rasmni o'chirish`}
                onClick={() => onRemove(i)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {error ? <div className={styles.error}>{error}</div> : null}
    </>
  );
}

export default PhotoUploader;
