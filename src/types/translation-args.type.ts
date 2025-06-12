import { type TOptionsBase } from "i18next";
// @ts-expect-error module exists
import type { $Dictionary } from "i18next/typescript/helpers";

export type TranslationArgsType = [
  key: string | string[],
  options?: TOptionsBase & $Dictionary,
];
