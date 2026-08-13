import { useId } from 'react';
import { cn } from '../utils/format';
import styles from './RangeSlider.module.css';

export interface RangeValue {
  min: number;
  max: number;
}

export interface RangeSliderProps {
  /** Slayderning eng chap qiymati */
  min: number;
  /** Slayderning eng o'ng qiymati */
  max: number;
  step?: number;
  /** Joriy oraliq — ikkita tutqich holati */
  value: RangeValue;
  onChange: (value: RangeValue) => void;
  /** Qiymatni matnga aylantirish, masalan "2 400 000 so'm" */
  formatValue?: (value: number) => string;
  /** Chap tutqich uchun screen-reader nomi */
  minLabel?: string;
  /** O'ng tutqich uchun screen-reader nomi */
  maxLabel?: string;
  className?: string;
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

/**
 * Ikki tutqichli oraliq slayderi ("dan — gacha").
 * Ikkita <input type="range"> bir-birining ustiga qo'yiladi: track'lar shaffof,
 * faqat tutqichlar bosiladi (pointer-events CSS'da).
 */
export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (n) => String(n),
  minLabel = 'Boshlang‘ich qiymat',
  maxLabel = 'Yakuniy qiymat',
  className,
}: RangeSliderProps) {
  const id = useId();
  const span = max - min || 1;

  const low = clamp(value.min, min, max);
  const high = clamp(value.max, min, max);

  const leftPercent = ((low - min) / span) * 100;
  const rightPercent = ((high - min) / span) * 100;

  const handleMin = (raw: number) => {
    onChange({ min: clamp(Math.min(raw, high), min, max), max: high });
  };

  const handleMax = (raw: number) => {
    onChange({ min: low, max: clamp(Math.max(raw, low), min, max) });
  };

  /** Tutqichlar ustma-ust tushganda ostidagisini ham ushlash mumkin bo'lsin */
  const minOnTop = low === high && low > (min + max) / 2;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.slider}>
        <div className={styles.track} />
        <div
          className={styles.fill}
          style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
        />
        <input
          id={`${id}-min`}
          type="range"
          className={styles.input}
          style={{ zIndex: minOnTop ? 5 : 3 }}
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => handleMin(Number(e.target.value))}
          aria-label={minLabel}
          aria-valuetext={formatValue(low)}
        />
        <input
          id={`${id}-max`}
          type="range"
          className={styles.input}
          style={{ zIndex: 4 }}
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => handleMax(Number(e.target.value))}
          aria-label={maxLabel}
          aria-valuetext={formatValue(high)}
        />
      </div>

      <div className={styles.values}>
        <span className={styles.value}>{formatValue(low)}</span>
        <span className={styles.value}>{formatValue(high)}</span>
      </div>
    </div>
  );
}

export default RangeSlider;
