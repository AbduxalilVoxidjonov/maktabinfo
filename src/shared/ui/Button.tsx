import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/format';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'onDark'
  | 'onDarkSolid';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export interface ButtonLinkProps
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> {
  /** Ichki marshrut yoki (external=true bo'lsa) to'liq URL / tel: havola */
  to: string;
  /** true bo'lsa oddiy <a> sifatida render qilinadi */
  external?: boolean;
}

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
): string {
  return cn(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className);
}

function content(children: ReactNode, iconLeft?: ReactNode, iconRight?: ReactNode): ReactNode {
  return (
    <>
      {iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      {children}
      {iconRight ? <span className={styles.icon}>{iconRight}</span> : null}
    </>
  );
}

export function Button({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, fullWidth, className)} {...rest}>
      {content(children, iconLeft, iconRight)}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  className,
  to,
  external = false,
  ...rest
}: ButtonLinkProps) {
  const cls = classes(variant, size, fullWidth, className);
  const inner = content(children, iconLeft, iconRight);

  if (external) {
    return (
      <a href={to} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
