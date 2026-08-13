import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/format';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'new'
  | 'neutral'
  | 'accent'
  | 'onDark'
  | 'lang'
  | 'spec'
  | 'tag'
  | 'tagMatch';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> {
  variant?: BadgeVariant;
  children?: ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className, ...rest }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)} {...rest}>
      {children}
    </span>
  );
}
