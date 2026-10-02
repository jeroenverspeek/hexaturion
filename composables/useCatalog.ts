import type { AppDefinition, Catalog } from "~/types/catalog";

/** Each device has its own catalog, kept under its id. */
const storageKey = (): string => `hexaturion.catalog.${useDevices().active.value.id}`;

/** The catalog as the device gave it the last time, kept in the browser. */
function keptCatalog(): Catalog | null {
  try {
    const kept = JSON.parse(localStorage.getItem(storageKey()) ?? "null");
    return Array.isArray(kept?.apps) && Array.isArray(kept?.categories) ? kept : null;
  } catch {
    return null;
  }
}

/**
 The catalog of apps: the cube's to tell (its server hands it out at /apps),
 shared by every page. The one from the last time is kept in the browser, so
 that the tiles are there at once, and also while the cube does not answer;
 load() asks the cube for the one of now.
*/
export const useCatalog = () => {
  const catalog = useState<Catalog | null>("catalog", keptCatalog);
  /** Why the cube's catalog could not be fetched the last time it was asked. */
  const problem = useState("catalogProblem", () => "");
  const loading = useState("catalogLoading", () => false);

  const load = async (): Promise<void> => {
    if (loading.value) return;
    loading.value = true;
    const asked = deviceStamp();
    try {
      const { data } = await useCustomFetch<Catalog>("/apps", { timeout: 6000 });
      if (asked !== deviceStamp()) return;
      catalog.value = data;
      problem.value = "";
      try {
        localStorage.setItem(storageKey(), JSON.stringify(data));
      } catch {
        // a browser that keeps nothing: it is fetched again the next time
      }
    } catch (e) {
      if (asked === deviceStamp()) problem.value = reasonOf(e);
    } finally {
      if (asked === deviceStamp()) loading.value = false;
    }
  };

  /** The GUI has turned to another device: what is known is that one's catalog of the last time, if any. */
  const reset = (): void => {
    catalog.value = keptCatalog();
    problem.value = "";
    loading.value = false;
  };

  const findApp = (id: string): AppDefinition | undefined => catalog.value?.apps.find((app) => app.id === id);

  return { catalog, problem, loading, load, reset, findApp };
};
