const useCustomFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig()
  return useFetch(request, { baseURL: config.public.API_BASE_URL, ...opts })
}

function useAPI() {
  const start = async (cubeAppCommand: Array<string>) => {
    try {
      return await useCustomFetch('/start', {
        method: 'POST',
        body: {
          cubeAppCommand
        }
      })
    } catch (e) {
      console.error(e);
      alert('something went wrong! see console')
    }
  }

  const stop = async () => {
    try {
      return await useCustomFetch('/stop')
    } catch (e) {
      console.error(e);
      alert('something went wrong! see console')
    }
  }
  return {
    start,
    stop
  }
}

export {
  useCustomFetch,
  useAPI
}