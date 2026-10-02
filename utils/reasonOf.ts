/** What to tell the user when the device's server did not do as asked: its own reason, if it gave one. */
export function reasonOf(e: unknown): string {
  const failure = e as { response?: unknown; data?: { error?: unknown } };
  if (typeof failure?.data?.error === "string") return failure.data.error;
  if (!failure?.response) return `The ${useDeviceName().value} does not answer. Is it on, and on the same network as you?`;
  return "Something went wrong! See console for details.";
}
