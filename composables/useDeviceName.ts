import { dutch, english, type TextKey } from "~/utils/texts";

/**
 What to call the device the GUI talks to, in a sentence: "cube", or "panel"
 for the single panel - as its catalog says, in the language spoken
 ("kubus", "paneel"). One that has not said so yet goes by what it is called
 in the list of devices.
*/
export const useDeviceName = () => {
  const { catalog } = useCatalog();
  const { active } = useDevices();
  const { language } = useLanguage();
  return computed(() => {
    const name = catalog.value?.device?.name ?? active.value.label.toLowerCase();
    const known = `device.${name}` as TextKey;
    return known in english ? (language.value === "nl" ? dutch : english)[known] : name;
  });
};
