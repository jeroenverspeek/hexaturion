type APIResponse<T = unknown> = {
  data: T;
};

export const useCustomFetch = async <T = unknown>(
  url: string,
  options: Parameters<typeof $fetch<T>>[1] = {},
): Promise<APIResponse<T>> => {
  const data = await $fetch<T>(url, {
    baseURL: useRuntimeConfig().public.API_BASE_URL,
    ...options,
  });

  return {
    data,
  };
};
