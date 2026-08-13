import type { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { EXTERNAL_FORM_URL, ROUTES } from '../../../app/router/routes';
import {
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
} from '../../../domain/entities/school';
import { ButtonLink } from '../../ui';
import { SupportCard } from './SupportCard';
import styles from './UserLayout.module.css';

export interface UserLayoutProps {
  /** Header sarlavhasini almashtirish (default — marshrutga qarab) */
  title?: string;
  /** Header ostki matni */
  subtitle?: string;
  /** Header o'ng tomonidagi element (default — marshrutga qarab) */
  action?: ReactNode;
  /** <Outlet /> o'rniga to'g'ridan-to'g'ri mazmun */
  children?: ReactNode;
}

export function UserLayout({ title, subtitle, action, children }: UserLayoutProps) {
  const { pathname } = useLocation();
  const isForm = pathname.startsWith(ROUTES.malumotYuborish);

  const headerTitle = title ?? (isForm ? "Ma'lumot yuborish" : 'Maktablar katalogi');
  const headerSubtitle = subtitle ?? "Viloyat maktablari ma'lumot portali";

  const headerAction =
    action ??
    (isForm ? (
      <ButtonLink to={ROUTES.katalog} variant="onDark" size="md" className={styles.headerAction}>
        ← Katalog
      </ButtonLink>
    ) : EXTERNAL_FORM_URL ? (
      <ButtonLink
        to={EXTERNAL_FORM_URL}
        external
        target="_blank"
        rel="noreferrer"
        variant="onDarkSolid"
        size="md"
        className={styles.headerAction}
        iconLeft="＋"
      >
        Ma'lumot yuborish
      </ButtonLink>
    ) : (
      <ButtonLink
        to={ROUTES.malumotYuborish}
        variant="onDarkSolid"
        size="md"
        className={styles.headerAction}
        iconLeft="＋"
      >
        Ma'lumot yuborish
      </ButtonLink>
    ));

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to={ROUTES.katalog} className={styles.brand}>
          <div className={styles.logo}>M</div>
          <div className={styles.titles}>
            <div className={styles.title}>{headerTitle}</div>
            <div className={styles.subtitle}>{headerSubtitle}</div>
          </div>
        </Link>
        {headerAction}
      </header>

      <main className={styles.main}>
        <div className={styles.container}>{children ?? <Outlet />}</div>
      </main>

      <footer className={styles.footer}>
        <div>Viloyat maktablari ma'lumot portali · 2026</div>
        <div className={styles.footerLinks}>
          {isForm ? <span>Ma'lumot moderatsiyadan o'tadi</span> : null}
          <a href={SUPPORT_PHONE_HREF} className={styles.footerPhone}>
            {SUPPORT_PHONE}
          </a>
          <SupportCard />
        </div>
      </footer>
    </div>
  );
}

export default UserLayout;
