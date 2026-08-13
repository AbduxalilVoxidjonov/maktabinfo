import { Link } from 'react-router-dom';
import { ROUTES } from '../app/router/routes';
import styles from './NotFoundPage.module.css';

/** 404 — mavjud bo'lmagan manzil */
export function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <p className={styles.text}>Bunday sahifa topilmadi.</p>
      <Link to={ROUTES.katalog}>Katalogga qaytish</Link>
    </div>
  );
}

export default NotFoundPage;
