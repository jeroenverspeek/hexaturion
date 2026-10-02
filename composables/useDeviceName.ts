/**
 What to call the device the GUI talks to, in a sentence: "cube", or "panel"
 for the single panel - as its catalog says. One that has not said so yet
 goes by what it is called in the list of devices.
*/
export const useDeviceName = () => {
  const { catalog } = useCatalog();
  const { active } = useDevices();
  return computed(() => catalog.value?.device?.name ?? active.value.label.toLowerCase());
};
