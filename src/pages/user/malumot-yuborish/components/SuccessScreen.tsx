import { ROUTES } from '../../../../app/router/routes';
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from '../../../../domain/entities/school';
import { Button, ButtonLink, Card } from '../../../../shared/ui';
import styles from './SuccessScreen.module.css';

export interface SuccessScreenProps {
  /** Yuborilgan maktab nomi */
  name: string;
  /** "Yana maktab qo'shish" — formani tozalab qaytaradi */
  onNewSchool: () => void;
}

/** Forma.dc.html muvaffaqiyat ekrani */
export function SuccessScreen({ name, onNewSchool }: SuccessScreenProps) {
  return (
    <Card padding="none" radius="xl" className={styles.wrap}>
      <div className={styles.check}>✓</div>
      <h1 className={styles.title}>Ma'lumot yuborildi</h1>
      <p className={styles.text}>
        Moderator tekshirgach <b className={styles.name}>{name}</b> kartochkasi katalogda paydo
        bo'ladi. Odatda 1-2 ish kuni.
      </p>
      <div className={styles.actions}>
        <ButtonLink to={ROUTES.katalog}>Katalogga o'tish</ButtonLink>
        <Button variant="secondary" onClick={onNewSchool}>
          Yana maktab qo'shish
        </Button>
      </div>
      <div className={styles.support}>
        Savollar bo'lsa:{' '}
        <a href={SUPPORT_PHONE_HREF} className={styles.supportLink}>
          {SUPPORT_PHONE}
        </a>
      </div>
    </Card>
  );
}

export default SuccessScreen;
