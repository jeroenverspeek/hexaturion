export function useConfig() {
  const appDir = '/home/pi/led-hexahedron/apps/';
  const appSrcDir = appDir + 'src/';
  //const pictureBaseDir = appDir + 'cube_pictures/'
  const hZellerDir = '/home/pi/rpi-rgb-led-matrix/';
  // led-cube specific options
  // no leading or trailing spaces allowed:
  const cubeOptions = ['--led-rows', '64',
    '--led-cols', '64',
    '--led-chain', '2',
    '--led-parallel', '3',
    '--led-slowdown-gpio', '3'
  ];
  return { appDir, appSrcDir, hZellerDir, cubeOptions }
}