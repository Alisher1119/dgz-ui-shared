import { type TOptionsBase } from 'i18next';
// @ts-expect-error module exists
import type { $Dictionary } from 'i18next/typescript/helpers';

/**
 * Type definition for arguments passed to the i18next translation function.
 */
export type TranslationArgsType = [
  key: string | string[],
  options?: TOptionsBase & $Dictionary,
];
