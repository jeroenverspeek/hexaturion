/** An app as the cube's server names it in its status. */
interface StatusApp {
  /** The ids of the app and its action in the catalog. */
  app: string;
  action: string;
  title: string;
}

export interface CubeStatus {
  /** The app that runs now, if it was started from the GUI. */
  running: (StatusApp & { pid: number; runningFor: number }) | null;
  /**
   When nothing runs: the app that was started last, and whether it failed -
   ended by itself, other than by being done. Its code is null when it was
   killed or crashed.
  */
  ended: (StatusApp & { code: number | null; failed: boolean }) | null;
}

/**
 What the cube is doing, as its server tells it: shared by every page, and
 asked anew by whoever calls refresh() - the bar at the bottom every few
 seconds, and useAPI after each thing it asks of the cube.
*/
export const useCubeStatus = () => {
  const status = useState<CubeStatus | null>("cubeStatus", () => null);
  /** Whether the cube answered the last time it was asked; null while it has not been asked yet. */
  const reachable = useState<boolean | null>("cubeReachable", () => null);
  const asking = useState("cubeStatusAsking", () => false);

  const refresh = async (): Promise<void> => {
    // one at a time: a cube that is off takes its time not to answer
    if (asking.value) return;
    asking.value = true;
    const asked = deviceStamp();
    try {
      const response = await useCustomFetch<CubeStatus>("/status", { timeout: 4000 });
      if (asked !== deviceStamp()) return;
      status.value = response.data;
      reachable.value = true;
    } catch {
      if (asked !== deviceStamp()) return;
      status.value = null;
      reachable.value = false;
    } finally {
      if (asked === deviceStamp()) asking.value = false;
    }
  };

  /** The GUI has turned to another device: nothing is known of what that one does. */
  const reset = (): void => {
    status.value = null;
    reachable.value = null;
    asking.value = false;
  };

  return { status, reachable, refresh, reset };
};
