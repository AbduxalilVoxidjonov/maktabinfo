import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/format';
import styles from './EmptyState.module.css';

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'title'> {
  /** Asosiy matn, masalan "Bunday maktab topilmadi." */
  title: ReactNode;
  /** Qo'shimcha izoh */
  description?: ReactNode;
  /** Ixtiyoriy belgi/emoji */
  icon?: ReactNode;
  /** Tugma yoki havola */
  action?: ReactNode;
  /** Kichikroq variant */
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  compact = false,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={cn(styles.empty, compact && styles.compact, className)} {...rest}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
