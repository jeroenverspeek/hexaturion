<script setup lang="ts">
import type { AppDefinition, ParamValues } from "~/types/catalog";

/** The page of one app: its options, as the catalog describes them, and Start. */
const props = defineProps<{ app: AppDefinition }>();
// the page is made anew for another app (it is keyed by the app's id), so this one stays
const app = props.app;

useHead({ title: app.title });

const { startApp: askToStart } = useAPI();

/** What was on this app's page the last time, kept in the browser. */
const remembered = useLocalStorage<{ action?: string; values?: Record<string, unknown> }>(
  `hexaturion.app.${app.id}`,
  {},
);

// The cube's settings: the parameters that go by one start at what is set there.
const { values: cubeSettings, load: loadSettings } = useCubeSettings();
// when the cube does not tell them, the page goes by the catalog's defaults
loadSettings().catch(() => {});

const values = reactive<ParamValues>(initialValues(app, remembered.value.values, cubeSettings.value));

// The settings may come in after the page is there, or differ from what was
// known: the parameters that go by one move along, unless they were touched.
watch(cubeSettings, (now, before) => {
  const fresh = initialValues(app, {}, now);
  const stale = initialValues(app, {}, before);
  for (const param of app.params) {
    if (param.setting === undefined) continue;
    if (JSON.stringify(values[param.id]) === JSON.stringify(stale[param.id])) values[param.id] = fresh[param.id] ?? null;
  }
});
const actionId = ref(
  app.actions.some((action) => action.id === remembered.value.action)
    ? remembered.value.action!
    : app.actions[0]!.id,
);
const action = computed(() => app.actions.find((one) => one.id === actionId.value)!);

watch(
  [values, actionId],
  () => {
    // a parameter's choices can depend on another one: the Rubik's patterns on the size
    Object.assign(values, outOfChoice(app, values, cubeSettings.value));
    remembered.value = { action: actionId.value, values: { ...values } };
  },
  { deep: true },
);

const shown = computed(() => actionParams(app, action.value, values).map(({ param }) => param));
const mainParams = computed(() => shown.value.filter((param) => !param.advanced));
const advancedParams = computed(() => shown.value.filter((param) => param.advanced));

/** What is sent to have it started: the values of the parameters that apply now. */
const params = computed<ParamValues>(() =>
  Object.fromEntries(shown.value.map((param) => [param.id, values[param.id] ?? null])),
);

// The command the cube's server would run for what is on the page - or why it
// would not - asked of the server itself, while "Advanced" is open.
const advancedOpen = ref(false);
const command = ref("");
const commandRefused = ref("");
const askForCommand = useDebounceFn(async () => {
  const asked = JSON.stringify([actionId.value, params.value]);
  try {
    const { data } = await useCustomFetch<{ command: string[] }>("/command", {
      method: "POST",
      body: { app: app.id, action: actionId.value, params: params.value },
      timeout: 4000,
    });
    // the page may have changed while the cube was asked: then this answer is not for it
    if (asked !== JSON.stringify([actionId.value, params.value])) return;
    command.value = data.command.join(" ");
    commandRefused.value = "";
  } catch (e) {
    if (asked !== JSON.stringify([actionId.value, params.value])) return;
    command.value = "";
    commandRefused.value = reasonOf(e);
  }
}, 300);
watch([advancedOpen, actionId, params], () => {
  if (advancedOpen.value) void askForCommand();
});
const canStart = computed(() => unmetParams(app, action.value, values).length === 0);

const preview = computed(() => previewUrl(action.value, values));
/** The preview that failed to load: not every Rubik's pattern has a picture. */
const brokenPreview = ref<string>();

const starting = ref(false);

async function startApp(): Promise<void> {
  // enter in a field submits the form too, whatever the button says
  if (!canStart.value) return;
  starting.value = true;
  try {
    const response = await askToStart(app.id, action.value.id, params.value);
    console.log(response.data);
  } catch {
    // useAPI has told the user already
  } finally {
    starting.value = false;
  }
}

function reset(): void {
  Object.assign(values, initialValues(app, {}, cubeSettings.value));
}
</script>

<template>
  <div class="app-page">
    <p class="mb-4">
      <NuxtLink to="/">
        <span class="icon is-small"><i class="fa-solid fa-chevron-left"></i></span>
        All apps
      </NuxtLink>
    </p>

    <div class="media mb-5">
      <div class="media-left">
        <span class="icon is-large has-text-primary">
          <i class="fa-solid fa-2x" :class="`fa-${app.icon}`"></i>
        </span>
      </div>
      <div class="media-content">
        <h1 class="title is-4">{{ app.title }}</h1>
        <p class="subtitle is-6">{{ app.description }}</p>
      </div>
    </div>

    <div v-if="app.actions.length > 1" class="tabs is-toggle is-small">
      <ul>
        <li v-for="one in app.actions" :key="one.id" :class="{ 'is-active': one.id === actionId }">
          <a @click="actionId = one.id">{{ one.label }}</a>
        </li>
      </ul>
    </div>

    <form class="box" @submit.prevent="startApp">
      <AppParamField
        v-for="param in mainParams"
        :key="param.id"
        v-model="values[param.id]!"
        :param="param"
        :choices="choicesFor(param, values, cubeSettings)"
      />

      <figure v-if="preview && preview !== brokenPreview" class="image preview">
        <img :src="preview" alt="" @error="brokenPreview = preview" />
      </figure>

      <details class="advanced" @toggle="advancedOpen = ($event.target as HTMLDetailsElement).open">
        <summary>Advanced</summary>
        <AppParamField
          v-for="param in advancedParams"
          :key="param.id"
          v-model="values[param.id]!"
          :param="param"
          :choices="choicesFor(param, values, cubeSettings)"
        />
        <div class="field">
          <label class="label">Command</label>
          <pre v-if="command" class="command">{{ command }}</pre>
          <p v-else-if="commandRefused" class="help is-danger">{{ commandRefused }}</p>
        </div>
        <button type="button" class="button is-small" @click="reset">Back to the defaults</button>
      </details>

      <div class="field is-grouped mt-5">
        <p class="control">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': starting }"
            :disabled="!canStart"
          >
            <span class="icon"><i class="fa-solid fa-play"></i></span>
            <span>{{ action.label }}</span>
          </button>
        </p>
        <p class="control">
          <StopButton />
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.app-page {
  max-width: 40rem;
}

.preview {
  max-width: 300px;
  margin-bottom: 0.75rem;
}

.advanced {
  margin-top: 1rem;

  summary {
    margin-bottom: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }
}

.command {
  padding: 0.75rem;
  font-size: 0.75rem;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
