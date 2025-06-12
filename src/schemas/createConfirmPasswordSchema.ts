import { z } from "zod";
import type { TranslationArgsType } from "../types";

export const createConfirmPasswordSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    password: z
      .string()
      .nonempty(t("required", { field: t("Password"), ns: "validation" })),
  });

export type ConfirmPasswordDto = z.infer<
  ReturnType<typeof createConfirmPasswordSchema>
>;

export default createConfirmPasswordSchema;
