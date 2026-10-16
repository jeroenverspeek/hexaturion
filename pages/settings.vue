<script setup lang="ts">
const { t, dt } = useLanguage();
useHead({ title: () => t("settings.title") });

import type { SettingDefinition, SettingValue } from "~/types/catalog";

// --- The device's settings: which there are and what they are is the device's to tell

const { definitions, values, load, save } = useCubeSettings();
const { active } = useDevices();

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
// another device has settings of its own
watch(
  () => `${active.value.id} ${active.value.address}`,
  () => {
    for (const id of Object.keys(form)) delete form[id];
    saved.value = false;
    void fetchSettings();
  },
);

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

const powerQuestions = computed<Record<PowerAction, string>>(() => ({
  reboot: t("settings.rebootQuestion"),
  shutdown: t("settings.shutdownQuestion"),
}));

const busy = ref<PowerAction>();

async function power(action: PowerAction): Promise<void> {
  if (!window.confirm(powerQuestions.value[action])) return;
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
    <h1 class="title is-4">{{ t("settings.of") }}</h1>

    <div v-if="problem" class="notification is-danger is-light">
      {{ problem }}
      <button v-if="!definitions" type="button" class="button is-small ml-2" :class="{ 'is-loading': loading }" @click="fetchSettings">
        {{ t("apps.tryAgain") }}
      </button>
    </div>

    <form v-if="groups.length > 0" @submit.prevent="saveSettings">
      <section v-for="group in groups" :key="group.title" class="box">
        <h2 class="title is-5">{{ dt(group.title) }}</h2>
        <div v-for="setting in group.settings" :key="setting.id" class="setting">
          <SettingField v-model="form[setting.id]!" :setting="setting" />
          <button
            v-if="!same(form[setting.id], setting.default)"
            type="button"
            class="button is-ghost is-small back-to-default"
            @click="form[setting.id] = copy(setting.default)"
          >
            {{ t("settings.default") }}
          </button>
        </div>
      </section>

      <div class="field is-grouped is-align-items-center mb-5">
        <p class="control">
          <button type="submit" class="button is-primary" :class="{ 'is-loading': saving }" :disabled="!changed">
            <span class="icon"><i class="fa-solid fa-floppy-disk"></i></span>
            <span>{{ t("settings.save") }}</span>
          </button>
        </p>
        <p v-if="saved" class="has-text-success">{{ t("settings.saved") }}</p>
        <p v-else-if="changed" class="has-text-grey">{{ t("settings.notSaved") }}</p>
      </div>
    </form>
    <p v-else-if="loading" class="has-text-grey mb-5">{{ t("settings.asking") }}</p>

    <section class="box">
      <h2 class="title is-5">{{ t("settings.devices") }}</h2>
      <DeviceList />
    </section>

    <section class="box">
      <h2 class="title is-5">{{ t("settings.power") }}</h2>
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
            <span>{{ t("settings.reboot") }}</span>
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
            <span>{{ t("settings.shutdown") }}</span>
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
