<script setup lang="ts">
import type { ToolDefinition } from "~/types/catalog";

/**
 The tools the device has for a setting, under it on the settings page:
 calibrating the accelerometer, showing on the device which side is set to
 be on top. Each is a button; started, it runs as an app does - the bar at
 the bottom tells of it too, and stops it - and what it says is shown here,
 with its own buttons (the calibration's Ready).
*/
const props = defineProps<{
  /** The id of the setting. */
  setting: string;
  /** The setting is changed on the page and not saved yet: the tools go by what is saved. */
  unsaved?: boolean;
}>();
const emit = defineEmits<{
  /** A tool has ended: it may have changed a setting itself. */
  ended: [];
}>();

const { catalog, findApp } = useCatalog();
const { status, reachable, refresh } = useCubeStatus();
const { startApp, control } = useAPI();
const { t, dt, appText } = useLanguage();

const tools = computed(() => (catalog.value?.tools ?? []).filter((tool) => tool.setting === props.setting));
const mine = (id: string | undefined): ToolDefinition | undefined => tools.value.find((tool) => tool.id === id);

/** The app or tool that runs now, whoever started it. */
const running = computed(() => status.value?.running ?? null);
/** The tool of this setting that runs now. */
const runningTool = computed(() => mine(running.value?.app));
/** What runs that is in the way of starting a tool, by its name. */
const inTheWay = computed(() => {
  if (!running.value) return "";
  const known = findApp(running.value.app) ?? catalog.value?.tools?.find((tool) => tool.id === running.value!.app);
  return known ? appText(known).title : running.value.title;
});

/**
 The tool that was seen running here, for what it said to stay once it has
 ended - not what some tool said days ago, which the device still knows.
*/
const seen = ref<string>();
const starting = ref<string>();
watch(
  runningTool,
  (now, before) => {
    if (now) seen.value = now.id;
    else if (before) emit("ended");
  },
  { immediate: true },
);
/** The tool that has ended, and how. */
const ended = computed(() => {
  const last = status.value?.ended;
  return !running.value && last && last.app === seen.value && mine(last.app) ? last : null;
});
/** The tool to tell of, running or ended, and what it said. */
const shown = computed(() => runningTool.value ?? mine(ended.value?.app));
const said = computed(() => (runningTool.value ? running.value?.said : ended.value?.said) ?? []);
const heading = computed(() => {
  if (!shown.value) return "";
  const tool = appText(shown.value).title;
  if (runningTool.value) return t("settings.toolRuns", { tool });
  if (ended.value?.failed) return t("settings.toolFailed", { tool });
  return t(ended.value?.code === 0 ? "settings.toolDone" : "settings.toolStopped", { tool });
});

// what a tool says is what to do next: asked for more often than the bar does
const { pause, resume } = useIntervalFn(refresh, 1000, { immediate: false });
watch(runningTool, (now) => (now ? resume() : pause()), { immediate: true });

/** The tool's own buttons, as the device gives them for what runs, each with its text. */
const buttons = computed(() => {
  const labels = new Map(
    (runningTool.value?.actions[0]?.controls ?? []).flatMap((one) => (typeof one !== "string" && one.label ? [[one.button, dt(one.label)] as const] : [])),
  );
  return (running.value?.controls ?? []).map((button) => ({ button, label: labels.get(button) ?? button }));
});

/** The newest line in view. */
const output = ref<HTMLElement>();
watch(said, async () => {
  await nextTick();
  if (output.value) output.value.scrollTop = output.value.scrollHeight;
});

async function start(tool: ToolDefinition): Promise<void> {
  starting.value = tool.id;
  seen.value = tool.id;
  try {
    await startApp(tool.id, tool.actions[0]!.id, {});
    await refresh();
  } catch {
    // useAPI has told the user already
  } finally {
    starting.value = undefined;
  }
}
</script>

<template>
  <div v-if="tools.length > 0" class="setting-tools">
    <div v-for="tool in tools" :key="tool.id" class="setting-tool">
      <button
        type="button"
        class="button is-small"
        :class="{ 'is-loading': starting === tool.id }"
        :disabled="unsaved || !!running || reachable === false || starting !== undefined"
        :title="running ? t('settings.busy', { app: inTheWay }) : undefined"
        @click="start(tool)"
      >
        <span class="icon"><i class="fa-solid" :class="`fa-${tool.icon}`"></i></span>
        <span>{{ appText(tool).title }}</span>
      </button>
      <p class="help">{{ appText(tool).description }}</p>
    </div>
    <p v-if="unsaved" class="help has-text-grey">{{ t("settings.saveFirst") }}</p>
    <p v-else-if="running && !runningTool" class="help has-text-grey">{{ t("settings.busy", { app: inTheWay }) }}</p>

    <div v-if="shown" class="tool-report" role="status">
      <p class="has-text-weight-semibold" :class="{ 'has-text-danger': ended?.failed }">{{ heading }}</p>
      <pre ref="output" class="tool-said">{{ said.length > 0 ? said.join("\n") : t("settings.toolSilent") }}</pre>
      <div v-if="runningTool" class="buttons mt-2 mb-0">
        <button v-for="one in buttons" :key="one.button" type="button" class="button is-primary" @click="control(one.button, 'tap')">
          {{ one.label }}
        </button>
        <StopButton />
      </div>
    </div>
  </div>
</template>

<style scoped>
.setting-tools {
  margin-top: 0.75rem;
}

.setting-tool:not(:last-child) {
  margin-bottom: 0.75rem;
}

.tool-report {
  margin-top: 0.75rem;
}

.tool-said {
  max-height: 14rem;
  margin-top: 0.25rem;
  padding: 0.75rem;
  overflow: auto;
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
