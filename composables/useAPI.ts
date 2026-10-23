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

  /**
   Uploads a picture for a parameter that takes them (its upload): the
   device makes a choice of it - a cube map - and answers with its value.
   Made small first, here on the phone.
  */
  const upload = async (app: string, param: string, file: File): Promise<string> => {
    try {
      const picture = await shrinkPicture(file);
      const { data } = await useCustomFetch<{ value: string }>("/upload", {
        method: "POST",
        query: { app, param, name: file.name },
        body: picture,
        headers: { "Content-Type": picture.type || "image/jpeg" },
        // the device makes a cube map of it, and reads its catalog again
        timeout: 120000,
      });
      return data.value;
    } catch (e) {
      console.error(e);
      alert(reasonOf(e));
      throw e;
    }
  };

  /** Deletes a choice that was uploaded. */
  const deleteUpload = async (app: string, param: string, value: string): Promise<void> => {
    try {
      await useCustomFetch("/upload", { method: "DELETE", query: { app, param, value }, timeout: 60000 });
    } catch (e) {
      console.error(e);
      alert(reasonOf(e));
      throw e;
    }
  };

  const reboot = (): Promise<APIResponse> => post("/reboot");

  const shutdown = (): Promise<APIResponse> => post("/shutdown");

  /**
   A button of the app being played went down (press) or came up again
   (release): the server passes it on to the app. Not told with an alert, as
   a press is one of many: one the app has ended for makes the bar look again.
  */
  const control = async (button: string, how: "press" | "release" | "tap"): Promise<void> => {
    try {
      await useCustomFetch("/control", { method: "POST", body: { button, how }, timeout: 3000 });
    } catch (e) {
      console.error(e);
      void refresh();
    }
  };

  return {
    startApp,
    stop,
    upload,
    deleteUpload,
    reboot,
    shutdown,
    control,
  };
};
