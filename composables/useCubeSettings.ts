import type { SettingDefinition, SettingValue, SettingValues } from "~/types/catalog";

interface SettingsAnswer {
  settings: SettingDefinition[];
  values: SettingValues;
}

/**
 The cube's settings - what is set once for it, rather than each time an app
 is started - as its server keeps them: shared by every page. They are not
 known until load() has had its answer, nor when the cube does not answer.
*/
export const useCubeSettings = () => {
  /** Which settings there are. */
  const definitions = useState<SettingDefinition[] | null>("cubeSettingDefinitions", () => null);
  /** What each is set to now. */
  const values = useState<SettingValues | null>("cubeSettingValues", () => null);

  const take = (answer: SettingsAnswer): void => {
    definitions.value = answer.settings;
    values.value = answer.values;
  };

  /** Asks the device for its settings. Leaves what was known as it is when that fails, and throws. */
  const load = async (): Promise<void> => {
    const asked = deviceStamp();
    const { data } = await useCustomFetch<SettingsAnswer>("/settings", { timeout: 4000 });
    if (asked === deviceStamp()) take(data);
  };

  /** Changes settings: the ones named, with null for one to go back to its default. */
  const save = async (changes: Record<string, SettingValue | null>): Promise<void> => {
    const asked = deviceStamp();
    const { data } = await useCustomFetch<SettingsAnswer>("/settings", { method: "PUT", body: changes });
    if (asked === deviceStamp()) take(data);
  };

  /** The GUI has turned to another device: that one's settings are not known yet. */
  const reset = (): void => {
    definitions.value = null;
    values.value = null;
  };

  return { definitions, values, load, save, reset };
};
