import type { ParamValues } from "~/types/catalog";

type APIResponse = {
  data: unknown;
};

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
