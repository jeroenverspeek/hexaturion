<script setup lang="ts">
useHead({ title: "Settings" });

import type { SettingDefinition, SettingValue } from "~/types/catalog";

// --- The cube's settings: which there are and what they are is the cube's to tell

const { definitions, values, load, save } = useCubeSettings();

/** The settings as they stand on the page, to be saved. */
const form = reactive<Record<string, SettingValue>>({});
/** Why the settings could not be fetched or saved. */
const problem = ref("");
const loading = ref(true);
const saving = ref(false);
const saved = ref(false);

const copy = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

async function fetchSettings(): Promise<void> {
  loading.value = true;
  problem.value = "";
  try {
    await load();
    Object.assign(form, copy(values.value ?? {}));
  } catch (e) {
    problem.value = reasonOf(e);
  } finally {
    loading.value = false;
  }
}
onMounted(fetchSettings);

/** The settings under their headings, in the order the cube gives them. */
const groups = computed(() => {
  const found: { title: string; settings: SettingDefinition[] }[] = [];
  for (const setting of definitions.value ?? []) {
    // one the page has no value for cannot be shown
    if (form[setting.id] === undefined) continue;
    let group = found.find((one) => one.title === setting.group);
    if (!group) found.push((group = { title: setting.group, settings: [] }));
    group.settings.push(setting);
  }
  return found;
});

/** What the page has that the cube has not: only that is sent. */
const changes = computed(() =>
  Object.fromEntries(Object.entries(form).filter(([id, value]) => !same(value, values.value?.[id]))),
);
const changed = computed(() => Object.keys(changes.value).length > 0);
watch(changed, (now) => {
  if (now) saved.value = false;
});

async function saveSettings(): Promise<void> {
  saving.value = true;
  problem.value = "";
  try {
    await save(changes.value);
    Object.assign(form, copy(values.value ?? {}));
    saved.value = true;
  } catch (e) {
    problem.value = reasonOf(e);
  } finally {
    saving.value = false;
  }
}

// --- Power

const api = useAPI();

type PowerAction = "reboot" | "shutdown";

const powerQuestions: Record<PowerAction, string> = {
  reboot: "Reboot the cube?",
  shutdown: "Shut the cube down? It takes the power switch to start it again.",
};

const busy = ref<PowerAction>();

async function power(action: PowerAction): Promise<void> {
  if (!window.confirm(powerQuestions[action])) return;
  busy.value = action;
  try {
    const response = await api[action]();
    console.log(response.data);
  } catch {
    // useAPI has told the user already
  } finally {
    busy.value = undefined;
  }
}
</script>

<template>
  <div class="settings-page">
    <h1 class="title is-4">Settings</h1>

    <div v-if="problem" class="notification is-danger is-light">
      {{ problem }}
      <button v-if="!definitions" type="button" class="button is-small ml-2" :class="{ 'is-loading': loading }" @click="fetchSettings">
        Try again
      </button>
    </div>

    <form v-if="groups.length > 0" @submit.prevent="saveSettings">
      <section v-for="group in groups" :key="group.title" class="box">
        <h2 class="title is-5">{{ group.title }}</h2>
        <div v-for="setting in group.settings" :key="setting.id" class="setting">
          <SettingField v-model="form[setting.id]!" :setting="setting" />
          <button
            v-if="!same(form[setting.id], setting.default)"
            type="button"
            class="button is-ghost is-small back-to-default"
            @click="form[setting.id] = copy(setting.default)"
          >
            Back to the default
          </button>
        </div>
      </section>

      <div class="field is-grouped is-align-items-center mb-5">
        <p class="control">
          <button type="submit" class="button is-primary" :class="{ 'is-loading': saving }" :disabled="!changed">
            <span class="icon"><i class="fa-solid fa-floppy-disk"></i></span>
            <span>Save</span>
          </button>
        </p>
        <p v-if="saved" class="has-text-success">Saved on the cube</p>
        <p v-else-if="changed" class="has-text-grey">Not saved yet</p>
      </div>
    </form>
    <p v-else-if="loading" class="has-text-grey mb-5">Asking the cube for its settings...</p>

    <section class="box">
      <h2 class="title is-5">Power</h2>
      <div class="field is-grouped">
        <p class="control">
          <button
            type="button"
            class="button"
            :class="{ 'is-loading': busy === 'reboot' }"
            :disabled="busy !== undefined"
            @click="power('reboot')"
          >
            <span class="icon"><i class="fa-solid fa-rotate-right"></i></span>
            <span>Reboot cube</span>
          </button>
        </p>
        <p class="control">
          <button
            type="button"
            class="button is-danger is-outlined"
            :class="{ 'is-loading': busy === 'shutdown' }"
            :disabled="busy !== undefined"
            @click="power('shutdown')"
          >
            <span class="icon"><i class="fa-solid fa-power-off"></i></span>
            <span>Shut down cube</span>
          </button>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 40rem;
}

.setting:not(:last-child) {
  margin-bottom: 1.25rem;
}

.back-to-default {
  padding-left: 0;
}
</style>
