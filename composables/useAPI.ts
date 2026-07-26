export const useAPI = () => {
  const start = async (cubeAppCommand: string[]) => {
    try {
      return await useCustomFetch("/start", {
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

  const stop = async () => {
    try {
      return await useCustomFetch("/stop", {
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
