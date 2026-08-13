import { useCallback, useEffect, useRef, useState } from 'react';
import { SUPPORT_CARD, SUPPORT_CARD_PLAIN } from '../../../domain/entities/school';
import { cn } from '../../utils/format';
import styles from './SupportCard.module.css';

type CopyState = 'idle' | 'copied' | 'error';

/** Nusxa olindi degan javob shuncha millisekunddan keyin so'nadi */
const RESET_DELAY = 1800;

/**
 * Clipboard API faqat xavfsiz kontekstda (https yoki localhost) ishlaydi.
 * Bo'lmasa — vaqtinchalik textarea orqali eski usul bilan nusxa olamiz.
 */
async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // zaxira usulga o'tamiz
    }
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export interface SupportCardProps {
  className?: string;
}

/**
 * Footerdagi "Loyihani qo'llab-quvvatlash" bloki: karta raqami bosilganda
 * bo'shliqsiz ko'rinishda buferga ko'chiriladi.
 */
export function SupportCard({ className }: SupportCardProps) {
  const [state, setState] = useState<CopyState>('idle');
  const timerRef = useRef<number | undefined>(undefined);

  // Komponent yo'q qilinganda taymer qolib ketmasin
  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    void copyText(SUPPORT_CARD_PLAIN).then((ok) => {
      setState(ok ? 'copied' : 'error');
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setState('idle'), RESET_DELAY);
    });
  }, []);

  const hint =
    state === 'copied' ? 'Nusxa olindi ✓' : state === 'error' ? "Nusxa olinmadi" : 'Nusxa olish';

  return (
    <div className={cn(styles.support, className)}>
      <span className={styles.label}>Loyihani qo'llab-quvvatlash</span>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(styles.card, state === 'copied' && styles.cardCopied)}
        aria-label={`Karta raqami ${SUPPORT_CARD} — nusxa olish`}
      >
        <span className={styles.number}>{SUPPORT_CARD}</span>
        <span className={styles.hint} aria-hidden="true">
          {hint}
        </span>
      </button>
      {/* Ekran o'quvchisi uchun — natija ovoz chiqarib aytiladi */}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {state === 'copied' ? 'Karta raqami nusxa olindi' : ''}
        {state === 'error' ? 'Nusxa olib bo‘lmadi, raqamni qo‘lda ko‘chiring' : ''}
      </span>
    </div>
  );
}

export default SupportCard;
