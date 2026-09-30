/**
 * Маска российского телефона для полей ввода: «+7 (978) 123-45-67».
 *
 * Чистые функции без DOM — покрыты таблицей кейсов в e2e/phone-normalize.spec.ts.
 *
 * Зачем отдельный модуль: старая маска после фокуса («+7 ») принимала набор
 * «89781234567» как «+7 (897) 812-34-56» — искажённый номер проходил валидацию
 * и уходил менеджеру. Теперь считаем цифры НАЦИОНАЛЬНОЙ части (после кода 7).
 */

const NATIONAL_LEN = 10;

/** Первая цифра реального российского кода (3xx, 4xx, 8xx, 9xx). */
const RU_CODE_FIRST = /^[3489]/;

/** Цифры национальной части из того, что сейчас в поле (без нормализации длины). */
function nationalDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // В поле уже стоит наш префикс «+7» (или вставили номер с «+7») — первая 7 это код страны
  if (/^\s*\+\s*7/.test(raw)) return digits.slice(1);
  return digits;
}

/** «9781234567» → «+7 (978) 123-45-67»; частичный ввод форматируется по мере набора. */
export function formatRuNational(national: string): string {
  const d = national.replace(/\D/g, "").slice(0, NATIONAL_LEN);
  let result = "+7";
  if (d.length > 0) result += " (" + d.slice(0, 3);
  if (d.length >= 3) result += ") " + d.slice(3, 6);
  if (d.length >= 6) result += "-" + d.slice(6, 8);
  if (d.length >= 8) result += "-" + d.slice(8, 10);
  return result;
}

/**
 * Нормализует значение поля телефона после ввода/вставки.
 *
 * @param raw  то, что оказалось в input после действия пользователя
 * @param prev предыдущее (уже отформатированное) значение поля
 *
 * Правила:
 * - цифр национальной части 11+ и первая — 8 или 7 → человек набрал/вставил номер
 *   с «8»/«7» впереди, первую отбрасываем («89781234567» → 978 123-45-67);
 *   отбрасываем только если остаток начинается с реального кода РФ (3/4/8/9), иначе
 *   это лишняя цифра в конце уже полного номера на 8 (8692…, 800…, 812…) — её игнорируем;
 * - 10 и меньше — не трогаем: коды на 8 (8692, 812, 800) должны вводиться как есть;
 * - Backspace по разделителю маски («+7 (978) » → «+7 (978)») удаляет последнюю цифру,
 *   иначе маска тут же вернула бы разделитель и удаление «залипло» бы.
 */
export function normalizeRuPhoneInput(raw: string, prev = ""): string {
  let national = nationalDigits(raw);

  // Стёрли с конца только символ маски — цифры те же → снимаем последнюю цифру
  if (
    prev.length > raw.length &&
    prev.startsWith(raw) &&
    national.length > 0 &&
    national === nationalDigits(prev)
  ) {
    national = national.slice(0, -1);
  }

  if (national.length > NATIONAL_LEN && /^[78]/.test(national) && RU_CODE_FIRST.test(national.slice(1))) {
    national = national.slice(1);
  }

  return formatRuNational(national);
}

/** Полный номер: код страны + 10 национальных цифр. */
export function isValidRuPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 11;
}
