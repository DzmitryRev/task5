/**
 * if you want to add new locale to you app - just add it in SUPPORTED_LOCALES
 * if UsableLocale don't support value from SUPPORTED_LOCALES const -
 * they should be ignore
 * import { UsableLocale } from "@faker-js/faker"
 */
export const SUPPORTED_LOCALES = ["en", "ru", "de", "cz", "pl"] as const;

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type SupportedLocalesType = ElementType<typeof SUPPORTED_LOCALES>;
