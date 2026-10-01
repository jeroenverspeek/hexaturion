interface CubeConfig {
  version: string;
}

export const useConfig = (): CubeConfig => {
  const version = "1.0.0";

  return {
    version,
  };
};
