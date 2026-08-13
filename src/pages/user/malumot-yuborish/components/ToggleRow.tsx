import type { ReactNode } from 'react';
import { cn } from '../../../../shared/utils/format';
import styles from './ToggleRow.module.css';

export interface ToggleRowProps {
  checked: boolean;
  onToggle: () => void;
  /** Almashtirgich yonidagi sarlavha */
  title: ReactNode;
  /** Sarlavha ostidagi izoh */
  hint?: ReactNode;
  className?: string;
}

/** Forma.dc.html uslubidagi "switch" qatori — sarlavha, izoh va almashtirgich */
export function ToggleRow({ checked, onToggle, title, hint, className }: ToggleRowProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(styles.row, className)}
      onClick={onToggle}
    >
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </span>
      <span className={cn(styles.track, checked && styles.trackOn)}>
        <span className={styles.knob} />
      </span>
    </button>
  );
}

export default ToggleRow;
