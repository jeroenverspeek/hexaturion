/**
 What to tell the user when the device's server did not do as asked: its own
 reason, if it gave one - in Dutch when Dutch is spoken and the device said
 it in Dutch too (nl), as the cube and the panel do.
*/
export function reasonOf(e: unknown): string {
  const failure = e as { response?: unknown; data?: { error?: unknown; nl?: unknown } };
  const { language, t } = useLanguage();
  if (language.value === "nl" && typeof failure?.data?.nl === "string") return failure.data.nl;
  if (typeof failure?.data?.error === "string") return failure.data.error;
  if (!failure?.response) return t("problem.noAnswer");
  return t("problem.wrong");
}
