import type { ReactNode } from 'react';
import { Card } from '../../../../shared/ui';
import { cn } from '../../../../shared/utils/format';
import styles from './FormSection.module.css';

export interface FormSectionProps {
  /** Bo'lim tartib raqami (maketdagi kvadrat belgi) */
  step: number;
  title: string;
  /** Sarlavha ostidagi izoh (5-bo'limda ishlatiladi) */
  description?: ReactNode;
  children: ReactNode;
}

/**
 * Forma.dc.html dagi raqamlangan oq bo'lim:
 * `background:#fff;border:1px solid #E2E8F0;border-radius:14px;padding:20px`.
 */
export function FormSection({ step, title, description, children }: FormSectionProps) {
  return (
    <Card padding="lg" radius="md" className={styles.section}>
      <div className={cn(styles.head, description && styles.headTight)}>
        <div className={styles.step}>{step}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </Card>
  );
}

export default FormSection;
