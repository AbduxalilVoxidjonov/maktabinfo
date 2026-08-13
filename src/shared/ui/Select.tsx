import type { ReactNode, SelectHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from '../utils/format';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'size' | 'children'> {
  /** Maydon ustidagi sarlavha */
  label?: ReactNode;
  /** Maydon ostidagi izoh (xato bo'lmaganda ko'rinadi) */
  hint?: ReactNode;
  /** Xato matni — ko'rsatilsa chegara qizil bo'ladi */
  error?: ReactNode;
  /** Bo'sh qiymat uchun birinchi variant, masalan "Barcha viloyatlar" */
  placeholder?: string;
  options: ReadonlyArray<SelectOption | string>;
  size?: SelectSize;
  /** Tashqi o'rovchi uchun klass */
  className?: string;
}

function toOption(option: SelectOption | string): SelectOption {
  return typeof option === 'string' ? { value: option, label: option } : option;
}

/** Input bilan bir xil uslubdagi ochiluvchi ro'yxat (viloyat / tuman) */
export function Select({
  label,
  hint,
  error,
  placeholder,
  options,
  size = 'md',
  className,
  id,
  disabled,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className={cn(styles.field, className)}>
      {label ? (
        <label className={styles.label} htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          styles.wrap,
          size === 'sm' && styles.sm,
          hasError && styles.hasError,
          disabled && styles.disabled,
        )}
      >
        <select
          id={selectId}
          className={styles.select}
          aria-invalid={hasError || undefined}
          disabled={disabled}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => {
            const { value, label: text } = toOption(option);
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <span className={styles.arrow} aria-hidden="true">
          ▾
        </span>
      </div>
      {hasError ? (
        <span className={styles.error}>{error}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
}

export default Select;
