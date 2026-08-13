import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/format';
import styles from './Chip.module.css';

export type ChipSize = 'sm' | 'md';

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Tanlangan holat — to'ldirilgan yashil pill */
  selected?: boolean;
  size?: ChipSize;
  children?: ReactNode;
  className?: string;
}

export function Chip({
  selected = false,
  size = 'md',
  children,
  className,
  type = 'button',
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(styles.chip, size === 'sm' && styles.sm, selected && styles.selected, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
