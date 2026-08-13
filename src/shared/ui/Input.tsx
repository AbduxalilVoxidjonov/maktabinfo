import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../utils/format';
import styles from './Input.module.css';

export type InputVariant = 'default' | 'search';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'prefix'> {
  /** Maydon ustidagi sarlavha */
  label?: ReactNode;
  /** Maydon ostidagi izoh (xato bo'lmaganda ko'rinadi) */
  hint?: ReactNode;
  /** Xato matni — ko'rsatilsa chegara qizil bo'ladi */
  error?: ReactNode;
  /** Maydon ichidagi chap qo'shimcha, masalan "instagram.com/" */
  prefix?: ReactNode;
  /** Maydon ichidagi o'ng qo'shimcha, masalan "so'm / oy" */
  suffix?: ReactNode;
  variant?: InputVariant;
  /** Tashqi o'rovchi (label) uchun klass */
  className?: string;
  /** <input> elementining o'z klassi */
  inputClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  variant = 'default',
  className,
  inputClassName,
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className={cn(styles.field, variant === 'search' && styles.search, className)}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={cn(styles.wrap, hasError && styles.hasError)}>
        {prefix ? <span className={styles.prefix}>{prefix}</span> : null}
        <input
          id={inputId}
          aria-invalid={hasError || undefined}
          className={cn(styles.input, inputClassName)}
          {...rest}
        />
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
      {hasError ? (
        <span className={styles.error}>{error}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
}
