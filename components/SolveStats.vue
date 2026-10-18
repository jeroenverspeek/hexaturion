<script setup lang="ts">
import type { ActionDefinition, AppDefinition, ParamDefinition, ParamValues } from "~/types/catalog";
import type { SolveStat } from "~/composables/useSolveStats";

/**
 How the app has done at solving by itself lately, as the device counts it,
 for the puzzle chosen on the form: the solver, the size and the goal it was
 recorded under. Of its last few solves how often it succeeded, in how many
 moves and how much time on average - moving averages. One row, shown for an
 action that sends what the solves were recorded under - the Rubik's cube's
 Solve, not its Pattern - and only once that puzzle has been solved.
*/
const props = defineProps<{ app: AppDefinition; action: ActionDefinition; values: ParamValues }>();

const { stats, windowSize, refresh } = useSolveStats();
const { status } = useCubeStatus();
const { t, dt, language } = useLanguage();

// Asked when the page opens, when an app starts or ends, and now and then:
// a solve of the super demo, say, ends without anything else to show it.
onMounted(refresh);
watch(() => JSON.stringify([status.value?.running?.app, status.value?.ended]), () => void refresh());
useIntervalFn(refresh, 20000);

/** The action's parameters by the flag they are sent under: all of them, also those not shown now. */
const byFlag = computed(() => {
  const found = new Map<string, ParamDefinition[]>();
  for (const ref of props.action.params) {
    const id = typeof ref === "string" ? ref : ref.id;
    const param = props.app.params.find((one) => one.id === id);
    if (!param) continue;
    const flag = typeof ref === "string" ? param.flag : ref.flag;
    found.set(flag, [...(found.get(flag) ?? []), param]);
  }
  return found;
});

/**
 The app's row for what the form has chosen: one that this action could have
 made (nothing in it that it does not send), with the form's options. Where
 more than one fits - one recorded without the goal, from before the device
 recorded it, beside one with it - the one with the most options.
*/
const rows = computed(() =>
  stats.value
    .filter((row) => row.app === props.app.id && Object.keys(row.options).every((flag) => byFlag.value.has(flag)) && isChosen(row))
    .sort((a, b) => Object.keys(b.options).length - Object.keys(a.options).length)
    .slice(0, 1),
);

/** The options the rows have, in the order the action has them. */
const columns = computed(() => [...byFlag.value.keys()].filter((flag) => rows.value.some((row) => flag in row.options)));

type Row = SolveStat;

/** The values the form would have for a row: its own, with the row's options in place. */
function valuesOf(row: Row): ParamValues {
  const values: ParamValues = { ...props.values };
  for (const [flag, value] of Object.entries(row.options)) {
    for (const param of byFlag.value.get(flag) ?? []) values[param.id] = value;
  }
  return values;
}

/** The parameter an option of a row is: the one that applies with the row's values (the sliding puzzle has two goals). */
function paramOf(flag: string, values: ParamValues): ParamDefinition | undefined {
  const params = byFlag.value.get(flag) ?? [];
  return params.find((param) => holds(param.showIf, values)) ?? params[0];
}

/** A row's option as the form calls it. */
function optionOf(row: Row, flag: string): string {
  const value = row.options[flag];
  if (value === undefined) return "";
  const values = valuesOf(row);
  const param = paramOf(flag, values);
  const choice = (param ? choicesFor(param, values) : []).find((one) => String(one.value) === String(value));
  return choice ? dt(choice.label ?? String(choice.value)) : String(value);
}

/** A column's heading: what the form calls the option - both names, where two parameters send it. */
const heading = (flag: string): string => [...new Set((byFlag.value.get(flag) ?? []).map((param) => dt(param.label)))].join(" / ");

/** Whether a row is what the form has chosen: the solver, the size and the goal. An option the form does not send now is left to the app's default: that does not count against it. */
function isChosen(row: Row): boolean {
  return Object.entries(row.options).every(([flag, value]) => {
    const applying = (byFlag.value.get(flag) ?? []).filter((param) => holds(param.showIf, props.values));
    return applying.length === 0 || applying.some((param) => String(props.values[param.id]) === String(value));
  });
}

const number = (value: number, digits: number): string =>
  new Intl.NumberFormat(language.value === "nl" ? "nl-NL" : "en-GB", { maximumFractionDigits: digits }).format(value);

const percent = (rate: number): string => `${Math.round(rate * 100)}%`;

const moves = (average: number | null): string => (average === null ? "-" : number(average, average < 10 ? 1 : 0));

function time(ms: number | null): string {
  if (ms === null) return "-";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  if (ms < 60000) return `${number(ms / 1000, ms < 10000 ? 1 : 0)} s`;
  const seconds = Math.round(ms / 1000);
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
}
</script>

<template>
  <section v-if="rows.length > 0" class="solve-stats box">
    <h2 class="title is-6">{{ t("stats.title") }}</h2>
    <div class="table-container">
      <table class="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th v-for="flag in columns" :key="flag">{{ heading(flag) }}</th>
            <th class="has-text-right">{{ t("stats.solves") }}</th>
            <th class="has-text-right">{{ t("stats.solved") }}</th>
            <th class="has-text-right">{{ t("stats.moves") }}</th>
            <th class="has-text-right">{{ t("stats.time") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="JSON.stringify(row.options)">
            <td v-for="flag in columns" :key="flag" class="option">{{ optionOf(row, flag) }}</td>
            <td class="has-text-right">{{ row.solves }}</td>
            <td class="has-text-right">{{ percent(row.successRate) }}</td>
            <td class="has-text-right">{{ moves(row.averageMoves) }}</td>
            <td class="has-text-right">{{ time(row.averageMs) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="help">{{ t("stats.note", { window: windowSize }) }}</p>
  </section>
</template>

<style scoped lang="scss">
.solve-stats {
  margin-top: 1.5rem;
}

td,
th {
  white-space: nowrap;
}

// the solvers' names are long: they take two lines on a phone, the numbers stay in view
td.option {
  white-space: normal;
}
</style>
