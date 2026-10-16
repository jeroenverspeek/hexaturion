/** What to tell the user when the device's server did not do as asked: its own reason, if it gave one. */
export function reasonOf(e: unknown): string {
  const failure = e as { response?: unknown; data?: { error?: unknown } };
  if (typeof failure?.data?.error === "string") return failure.data.error;
  const { t } = useLanguage();
  if (!failure?.response) return t("problem.noAnswer");
  return t("problem.wrong");
}
