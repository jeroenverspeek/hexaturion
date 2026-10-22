/** An option a solve was started with, under its command line flag: { "--solver": "walton", "--nRubik": 4 }. */
export type SolveOptions = Record<string, string | number>;

/**
 How an app that solves a puzzle by itself has done lately with one set of
 options, as the device counts it (common/src/catalog/solveStats.ts there):
 moving averages, of its last few solves.
*/
export interface SolveStat {
  app: string;
  options: SolveOptions;
  /** In all. */
  solves: number;
  /** Of the last solves, the ones the averages are of: at most the window. */
  recentSolves: number;
  recentSuccesses: number;
  /** recentSuccesses / recentSolves, 0 to 1. */
  successRate: number;
  /** Of the recent successful solves; null when there are none. */
  averageMoves: number | null;
  /** The solver's thinking, not the moves shown afterwards. */
  averageMs: number | null;
}

/**
 The device's solve statistics, as its server hands them out at /stats:
 shared by every page, and asked anew by whoever calls refresh(). A device
 that does not have them - an older server - has none.
*/
export const useSolveStats = () => {
  const known = useState<{ device: string; stats: SolveStat[]; window: number } | null>("solveStats", () => null);

  /** The statistics of the device talked to now; none while they are not known. */
  const stats = computed<SolveStat[]>(() => (known.value?.device === deviceStamp() ? known.value.stats : []));
  /** Of how many of the last solves the averages are. */
  const windowSize = computed(() => known.value?.window ?? 0);

  /** Asks the device for its statistics; what was known stays when it does not answer. */
  const refresh = async (): Promise<void> => {
    const asked = deviceStamp();
    try {
      const { data } = await useCustomFetch<{ stats: SolveStat[]; window: number }>("/stats", { timeout: 4000 });
      if (asked === deviceStamp()) known.value = { device: asked, stats: data.stats, window: data.window };
    } catch {
      // not known, or none: the page goes on without them
    }
  };

  return { stats, windowSize, refresh };
};
