import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/format';
import styles from './Card.module.css';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  padding?: CardPadding;
  radius?: CardRadius;
  /** Hover'da navy chegara + soya (ro'yxat kartochkasi) */
  interactive?: boolean;
  /** Doimiy soya (batafsil panel) */
  shadow?: boolean;
  /** overflow: hidden — ichki sarlavha to'liq to'ldirilganda */
  clip?: boolean;
  children?: ReactNode;
  className?: string;
}

const PAD: Record<CardPadding, string> = {
  none: styles.padNone,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

const RADIUS: Record<CardRadius, string> = {
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
};

export function Card({
  padding = 'md',
  radius = 'md',
  interactive = false,
  shadow = false,
  clip = false,
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        PAD[padding],
        RADIUS[radius],
        interactive && styles.interactive,
        shadow && styles.shadow,
        clip && styles.clip,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
