interface CubeConfig {
  version: string;
  ledCubeDir: string;
  appDir: string;
  appSrcDir: string;
  hZellerDir: string;
  cubeOptions: string[];
}

export const useConfig = (): CubeConfig => {
  const version = "1.0.0";

  const ledCubeDir = "/home/ledcube64/led-hexahedron/";
  const appDir = `${ledCubeDir}apps/`;
  const appSrcDir = `${appDir}src/`;
  const hZellerDir = "/home/ledcube64/rpi-rgb-led-matrix/";

  const cubeOptions: string[] = [
    "--led-rows",
    "64",
    "--led-cols",
    "64",
    "--led-chain",
    "2",
    "--led-parallel",
    "3",
    "--led-slowdown-gpio",
    "3",
  ];

  return {
    version,
    ledCubeDir,
    appDir,
    appSrcDir,
    hZellerDir,
    cubeOptions,
  };
};
