type APIResponse<T = unknown> = {
  data: T;
};

/** Asks the server of the device the GUI talks to now. */
export const useCustomFetch = async <T = unknown>(
  url: string,
  options: Parameters<typeof $fetch<T>>[1] = {},
): Promise<APIResponse<T>> => {
  const data = await $fetch<T>(url, {
    baseURL: useDevices().active.value.address,
    ...options,
  });

  return {
    data,
  };
};
