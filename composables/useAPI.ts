type APIResponse = {
  data: unknown;
};

export const useAPI = () => {
  const start = async (cubeAppCommand: string[]): Promise<APIResponse> => {
    try {
      return await useCustomFetch<unknown>("/start", {
        method: "POST",
        body: {
          cubeAppCommand,
        },
      });
    } catch (e) {
      console.error(e);
      alert("Something went wrong! See console for details.");
      throw e;
    }
  };

  const stop = async (): Promise<APIResponse> => {
    try {
      return await useCustomFetch<unknown>("/stop", {
        method: "POST",
      });
    } catch (e) {
      console.error(e);
      alert("Something went wrong! See console for details.");
      throw e;
    }
  };

  return {
    start,
    stop,
  };
};
