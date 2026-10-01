<script setup lang="ts">
import { findApp } from "~/catalog";
import type { ParamValues } from "~/catalog/types";

const route = useRoute();
const found = findApp(String(route.params.id));
if (!found) {
  throw createError({ statusCode: 404, statusMessage: "There is no such app", fatal: true });
}
const app = found;

useHead({ title: app.title });

const { startApp: askToStart } = useAPI();

/** What was on this app's page the last time, kept in the browser. */
const remembered = useLocalStorage<{ action?: string; values?: Record<string, unknown> }>(
  `hexaturion.app.${app.id}`,
  {},
);

const values = reactive<ParamValues>(initialValues(app, remembered.value.values));
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
    Object.assign(values, outOfChoice(app, values));
    remembered.value = { action: actionId.value, values: { ...values } };
  },
  { deep: true },
);

const shown = computed(() => actionParams(app, action.value, values).map(({ param }) => param));
const mainParams = computed(() => shown.value.filter((param) => !param.advanced));
const advancedParams = computed(() => shown.value.filter((param) => param.advanced));

/** The command as the cube's server will make it, to show under "Advanced". */
const command = computed(() => buildCommand(app, action.value, values));
/** What is sent to have it started: the values of the parameters that apply now. */
const params = computed<ParamValues>(() =>
  Object.fromEntries(shown.value.map((param) => [param.id, values[param.id] ?? null])),
);
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
  Object.assign(values, initialValues(app));
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
        :choices="choicesFor(param, values)"
      />

      <figure v-if="preview && preview !== brokenPreview" class="image preview">
        <img :src="preview" alt="" @error="brokenPreview = preview" />
      </figure>

      <details v-if="advancedParams.length > 0" class="advanced">
        <summary>Advanced</summary>
        <AppParamField
          v-for="param in advancedParams"
          :key="param.id"
          v-model="values[param.id]!"
          :param="param"
          :choices="choicesFor(param, values)"
        />
        <div class="field">
          <label class="label">Command</label>
          <pre class="command">{{ command.join(" ") }}</pre>
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
