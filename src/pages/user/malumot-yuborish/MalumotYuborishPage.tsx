import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  EMPTY_SCHOOL_FORM,
  GRADE_RANGES,
  LANGS,
  MAX_PHOTOS,
  MAX_PHOTO_SIZE,
  SPEC_DIRECTIONS,
  SPEC_SUBJECTS,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  createEmptyFormValues,
} from '../../../domain/entities/school';
import {
  IS_REGION_LOCKED,
  SELECTABLE_REGIONS,
  getDistricts,
} from '../../../domain/entities/regions';
import type { SchoolFormValues } from '../../../domain/types/school';
import { useSchools } from '../../../features/schools/hooks/useSchools';
import { Button, Chip, Input, Select } from '../../../shared/ui';
import { cn, formatFee, formatPhone, isPhoneComplete, sanitizeUsername } from '../../../shared/utils/format';
import {
  FormSection,
  PaidToggle,
  PhotoUploader,
  PreviewCard,
  SuccessScreen,
  ToggleRow,
} from './components';
import styles from './MalumotYuborishPage.module.css';

type ErrorKey =
  | 'name'
  | 'director'
  | 'region'
  | 'district'
  | 'address'
  | 'grades'
  | 'fee'
  | 'langs'
  | 'phone';
type FormErrors = Partial<Record<ErrorKey, boolean>>;

/** Ko'p tanlovli maydonlar (bosqichlar / tillar / ixtisoslar) */
type MultiKey = 'grades' | 'langs' | 'specs';

/** Maketdagi `resetForm`: EMPTY (langs bo'sh) holatiga qaytaradi */
function createResetValues(): SchoolFormValues {
  return { ...EMPTY_SCHOOL_FORM, grades: [], langs: [], specs: [], photos: [] };
}

function scrollToTop(): void {
  window.scrollTo(0, 0);
}

/**
 * Forma.dc.html — 6 bosqichli ariza formasi, jonli kartochka preview'i
 * va yuborilgandan keyingi muvaffaqiyat ekrani.
 * Sahifa faqat ichki mazmunni beradi — header/footer/o'ram UserLayout'da.
 */
export function MalumotYuborishPage() {
  const { addSchool } = useSchools();

  const [values, setValues] = useState<SchoolFormValues>(() => createEmptyFormValues());
  const [errors, setErrors] = useState<FormErrors>({});
  const [photoError, setPhotoError] = useState('');
  const [sentName, setSentName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const setField = useCallback(
    <K extends keyof SchoolFormValues>(key: K, value: SchoolFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  /** Viloyat almashsa oldingi tuman kuchini yo'qotadi */
  const setRegion = useCallback((region: string) => {
    setValues((prev) => ({ ...prev, region, district: '' }));
  }, []);

  const districts = useMemo(() => getDistricts(values.region), [values.region]);

  const toggleIn = useCallback((key: MultiKey, value: string) => {
    setValues((prev) => {
      const list = prev[key];
      const next = list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
      return { ...prev, [key]: next };
    });
  }, []);

  /** Maketdagi `validate()` — aynan shu oltita qoida */
  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = true;
    if (!values.director.trim()) next.director = true;
    if (!values.region) next.region = true;
    if (!values.district) next.district = true;
    if (!values.address.trim()) next.address = true;
    if (!values.grades.length) next.grades = true;
    if (values.paid && !values.fee.trim()) next.fee = true;
    if (!values.langs.length) next.langs = true;
    if (!isPhoneComplete(values.phone)) next.phone = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    addSchool(values);
    setSentName(values.name);
    setIsSuccess(true);
    scrollToTop();
  }, [addSchool, validate, values]);

  const handleReset = useCallback(() => {
    setValues(createResetValues());
    setErrors({});
    setPhotoError('');
  }, []);

  const handleNewSchool = useCallback(() => {
    setValues(createEmptyFormValues());
    setErrors({});
    setPhotoError('');
    setSentName('');
    setIsSuccess(false);
    scrollToTop();
  }, []);

  /** Maketdagi `onPhotos` — hajm/tur/son cheklovlari va FileReader */
  const photoCount = values.photos.length;
  const handlePhotos = useCallback(
    (files: File[]) => {
      const room = MAX_PHOTOS - photoCount;
      if (room <= 0) {
        setPhotoError(`Ko'pi bilan ${MAX_PHOTOS} ta rasm yuklash mumkin.`);
        return;
      }

      const accepted: File[] = [];
      const messages: string[] = [];
      for (const file of files.slice(0, room)) {
        if (!/^image\//.test(file.type)) {
          messages.push(`${file.name} — rasm fayli emas`);
          continue;
        }
        if (file.size > MAX_PHOTO_SIZE) {
          messages.push(`${file.name} — 5 MB dan katta`);
          continue;
        }
        accepted.push(file);
      }
      if (files.length > room) messages.push(`Faqat ${room} ta rasm qabul qilindi.`);
      setPhotoError(messages.join(' · '));

      for (const file of accepted) {
        const reader = new FileReader();
        reader.onload = () => {
          const src = typeof reader.result === 'string' ? reader.result : '';
          if (!src) return;
          setValues((current) => ({
            ...current,
            photos: [...current.photos, src].slice(0, MAX_PHOTOS),
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    [photoCount],
  );

  const handleRemovePhoto = useCallback((index: number) => {
    setValues((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
    setPhotoError('');
  }, []);

  if (isSuccess) {
    return <SuccessScreen name={sentName} onNewSchool={handleNewSchool} />;
  }

  const onText =
    (key: 'name' | 'director' | 'address' | 'mapUrl') => (e: ChangeEvent<HTMLInputElement>) =>
      setField(key, e.target.value);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>Maktab vakillari uchun</div>
          <h1 className={styles.title}>Maktab ma'lumotlarini yuborish</h1>
          <p className={styles.lead}>
            Formani to'ldiring — ma'lumot moderatsiyadan so'ng katalogda maktab kartochkasi
            sifatida chiqadi. To'ldirish 3-4 daqiqa vaqt oladi.
          </p>
        </div>

        <FormSection step={1} title="Maktab va rahbariyat">
          <div className={styles.pair}>
            <Input
              label="Maktab nomi yoki raqami"
              placeholder="45-umumta'lim maktabi"
              value={values.name}
              onChange={onText('name')}
              error={errors.name ? 'Maktab nomini kiriting' : undefined}
            />
            <Input
              label="Direktorning F.I.SH."
              placeholder="Familiya Ism Sharifi"
              value={values.director}
              onChange={onText('director')}
              error={errors.director ? 'Direktor F.I.SH. ni kiriting' : undefined}
            />
          </div>
        </FormSection>

        <FormSection step={2} title="Manzil va xarita">
          <div className={styles.pair}>
            <Select
              label="Viloyat"
              placeholder={IS_REGION_LOCKED ? undefined : 'Viloyatni tanlang'}
              options={SELECTABLE_REGIONS}
              value={values.region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={IS_REGION_LOCKED}
              hint={IS_REGION_LOCKED ? 'Portal hozircha shu viloyat bo‘yicha ishlaydi' : undefined}
              error={errors.region ? 'Viloyatni tanlang' : undefined}
            />
            <Select
              label="Tuman yoki shahar"
              placeholder={values.region ? 'Tumanni tanlang' : 'Avval viloyatni tanlang'}
              options={districts}
              value={values.district}
              onChange={(e) => setField('district', e.target.value)}
              disabled={!values.region}
              error={errors.district ? 'Tumanni tanlang' : undefined}
            />
          </div>
          <Input
            className={styles.stack}
            label="Ko'cha va uy raqami"
            placeholder="Navoiy ko'chasi 12"
            value={values.address}
            onChange={onText('address')}
            error={errors.address ? 'Manzilni kiriting' : undefined}
          />
          <Input
            label="Xarita havolasi — Google Maps yoki Yandex Maps"
            placeholder="https://yandex.uz/maps/..."
            value={values.mapUrl}
            onChange={onText('mapUrl')}
            inputMode="url"
          />
          <p className={styles.hint}>
            Havola kartochkada kichik xarita oynasi ko'rinishida chiqadi.
          </p>
        </FormSection>

        <FormSection step={3} title="Sinflar, maktab turi va to'lov">
          <div className={styles.groupLabel}>O'qitiladigan sinflar</div>
          <div className={styles.chips}>
            {GRADE_RANGES.map((grade) => (
              <Chip
                key={grade}
                selected={values.grades.includes(grade)}
                onClick={() => toggleIn('grades', grade)}
              >
                {grade}
              </Chip>
            ))}
          </div>
          <p className={styles.gradesHint}>
            Maktabingizga mos oraliqni tanlang. Kerak bo'lsa bir nechtasini belgilash mumkin.
          </p>
          {errors.grades ? (
            <span className={styles.fieldError}>Sinf oralig'ini tanlang</span>
          ) : null}

          <PaidToggle paid={values.paid} onToggle={() => setField('paid', !values.paid)} />
          {values.paid ? (
            <Input
              className={styles.feeField}
              label="Oylik to'lov miqdori (UZS)"
              placeholder="1 500 000"
              value={values.fee}
              onChange={(e) => setField('fee', formatFee(e.target.value))}
              suffix="so'm / oy"
              inputMode="numeric"
              error={errors.fee ? "To'lov miqdorini kiriting" : undefined}
            />
          ) : null}
        </FormSection>

        <FormSection step={4} title="Ta'lim tili va ixtisoslashuv">
          <div className={styles.groupLabel}>Darslar olib boriladigan tillar</div>
          <div className={cn(styles.chips, styles.chipsGap)}>
            {LANGS.map((lang) => (
              <Chip
                key={lang}
                selected={values.langs.includes(lang)}
                onClick={() => toggleIn('langs', lang)}
              >
                {lang}
              </Chip>
            ))}
          </div>

          <div className={styles.groupLabel}>Ixtisoslashuv yo'nalishlari</div>
          <div className={cn(styles.chips, styles.chipsGap)}>
            {SPEC_DIRECTIONS.map((spec) => (
              <Chip
                key={spec}
                selected={values.specs.includes(spec)}
                onClick={() => toggleIn('specs', spec)}
              >
                {spec}
              </Chip>
            ))}
          </div>

          <div className={styles.groupLabel}>Chuqurlashtirilgan fanlar</div>
          <div className={styles.chips}>
            {SPEC_SUBJECTS.map((subject) => (
              <Chip
                key={subject}
                selected={values.specs.includes(subject)}
                onClick={() => toggleIn('specs', subject)}
              >
                {subject}
              </Chip>
            ))}
          </div>

          {errors.langs ? (
            <span className={styles.fieldError}>Kamida bitta ta'lim tilini tanlang</span>
          ) : null}

          <ToggleRow
            className={styles.sportsToggle}
            checked={values.hasSports}
            onToggle={() => setField('hasSports', !values.hasSports)}
            title="Sport to'garaklari"
            hint={
              values.hasSports
                ? 'Maktabda sport to‘garaklari faoliyat yuritadi'
                : "Sport to'garaklari yo'q"
            }
          />
        </FormSection>

        <FormSection
          step={5}
          title="Maktab rasmlari"
          description="Bino, sinfxona va hovli rasmlari — 6 tagacha. Birinchi rasm kartochkaning asosiy rasmi bo'ladi."
        >
          <PhotoUploader
            photos={values.photos}
            error={photoError}
            onSelect={handlePhotos}
            onRemove={handleRemovePhoto}
          />
        </FormSection>

        <FormSection step={6} title="Aloqa ma'lumotlari">
          <Input
            label="Telefon raqami"
            placeholder="+998 90 123 45 67"
            value={values.phone}
            onChange={(e) => setField('phone', formatPhone(e.target.value))}
            inputMode="tel"
            inputClassName={styles.phoneInput}
            error={errors.phone ? "To'liq raqam kiriting: +998 va 9 raqam" : undefined}
          />

          <div className={styles.callout}>
            <div className={styles.calloutIcon}>i</div>
            <div className={styles.calloutText}>
              Qo'shimcha ma'lumot olish uchun:{' '}
              <a href={SUPPORT_PHONE_HREF} className={styles.calloutLink}>
                {SUPPORT_PHONE}
              </a>{' '}
              raqamidan bog'lanishimiz mumkin
            </div>
          </div>

          <div className={styles.pair}>
            <Input
              label="Instagram sahifasi"
              placeholder="maktab45"
              prefix="instagram.com/"
              value={values.instagram}
              onChange={(e) => setField('instagram', sanitizeUsername(e.target.value))}
            />
            <Input
              label="Telegram sahifasi"
              placeholder="maktab45"
              prefix="t.me/"
              value={values.telegram}
              onChange={(e) => setField('telegram', sanitizeUsername(e.target.value))}
            />
          </div>
        </FormSection>

        <div className={styles.actions}>
          {hasErrors ? (
            <span className={styles.summaryError}>Ba'zi maydonlar to'ldirilmagan</span>
          ) : null}
          <Button variant="secondary" onClick={handleReset}>
            Tozalash
          </Button>
          <Button onClick={handleSubmit} iconRight="→">
            Ma'lumotni yuborish
          </Button>
        </div>
      </div>

      <PreviewCard values={values} className={styles.preview} />
    </div>
  );
}

export default MalumotYuborishPage;
