/**
 What to call the device the GUI talks to, in a sentence: "cube", or "panel"
 for the single panel - as its catalog says. A device that has not said so
 yet is taken for the cube.
*/
export const useDeviceName = () => {
  const { catalog } = useCatalog();
  return computed(() => catalog.value?.device?.name ?? "cube");
};
