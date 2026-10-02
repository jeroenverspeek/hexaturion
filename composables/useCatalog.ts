import type { AppDefinition, Catalog } from "~/types/catalog";

const storageKey = "hexaturion.catalog";

/** The catalog as the cube gave it the last time, kept in the browser. */
function keptCatalog(): Catalog | null {
  try {
    const kept = JSON.parse(localStorage.getItem(storageKey) ?? "null");
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
    try {
      catalog.value = (await useCustomFetch<Catalog>("/apps", { timeout: 6000 })).data;
      problem.value = "";
      try {
        localStorage.setItem(storageKey, JSON.stringify(catalog.value));
      } catch {
        // a browser that keeps nothing: it is fetched again the next time
      }
    } catch (e) {
      problem.value = reasonOf(e);
    } finally {
      loading.value = false;
    }
  };

  const findApp = (id: string): AppDefinition | undefined => catalog.value?.apps.find((app) => app.id === id);

  return { catalog, problem, loading, load, findApp };
};
