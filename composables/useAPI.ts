import type { ParamValues } from "~/catalog/types";

type APIResponse = {
  data: unknown;
};

/** What to tell the user when the cube's server did not do as asked: its own reason, if it gave one. */
function reasonOf(e: unknown): string {
  const failure = e as { response?: unknown; data?: { error?: unknown } };
  if (typeof failure?.data?.error === "string") return failure.data.error;
  if (!failure?.response) return "The cube does not answer. Is it on, and on the same network as you?";
  return "Something went wrong! See console for details.";
}

export const useAPI = () => {
  const { refresh } = useCubeStatus();

  const post = async (url: string, body?: Record<string, unknown>): Promise<APIResponse> => {
    try {
      return await useCustomFetch<unknown>(url, {
        method: "POST",
        body,
      });
    } catch (e) {
      console.error(e);
      alert(reasonOf(e));
      throw e;
    } finally {
      // whatever was asked, and whether or not it was done: what runs now may have changed
      void refresh();
    }
  };

  /** Starts an app of the catalog: the server makes the command of it. */
  const startApp = (app: string, action: string, params: ParamValues): Promise<APIResponse> =>
    post("/start", { app, action, params });

  const stop = (): Promise<APIResponse> => post("/stop");

  const reboot = (): Promise<APIResponse> => post("/reboot");

  const shutdown = (): Promise<APIResponse> => post("/shutdown");

  return {
    startApp,
    stop,
    reboot,
    shutdown,
  };
};
