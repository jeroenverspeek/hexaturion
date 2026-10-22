<script setup lang="ts">
import type { SettingDefinition, SettingValue } from "~/types/catalog";

/**
 The device's settings, to change and save: on the settings page those that
 belong to no app, and on an app's page those set with it (a setting's app:
 the stock market's ticker symbols). Either way they are kept on the device,
 in its settings file.
*/
const props = defineProps<{
  /** The app whose settings these are; without one, the settings of the device itself. */
  app?: string;
  /** Over the settings, instead of the headings of their groups. */
  heading?: string;
}>();

const { t, dt } = useLanguage();

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

/** The settings this form is for. */
const mine = (setting: SettingDefinition): boolean => (setting.app ?? undefined) === props.app;

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

/** The settings under their headings, in the order the device gives them. */
const groups = computed(() => {
  const found: { title: string; settings: SettingDefinition[] }[] = [];
  for (const setting of definitions.value ?? []) {
    // one the page has no value for cannot be shown
    if (!mine(setting) || form[setting.id] === undefined) continue;
    let group = found.find((one) => one.title === setting.group);
    if (!group) found.push((group = { title: setting.group, settings: [] }));
    group.settings.push(setting);
  }
  return found;
});

/** What the page has that the device has not, of this form's settings: only that is sent. */
const changes = computed(() =>
  Object.fromEntries(
    (definitions.value ?? [])
      .filter((setting) => mine(setting) && form[setting.id] !== undefined && !same(form[setting.id], values.value?.[setting.id]))
      .map((setting) => [setting.id, form[setting.id]!]),
  ),
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
</script>

<template>
  <div class="settings-form">
    <!-- on an app's page only what went wrong saving: that the device does not answer, the bar says -->
    <div v-if="problem && (!app || definitions)" class="notification is-danger is-light">
      {{ problem }}
      <button v-if="!definitions" type="button" class="button is-small ml-2" :class="{ 'is-loading': loading }" @click="fetchSettings">
        {{ t("apps.tryAgain") }}
      </button>
    </div>

    <form v-if="groups.length > 0" @submit.prevent="saveSettings">
      <section v-for="group in groups" :key="group.title" class="box">
        <h2 class="title is-5">{{ heading ?? dt(group.title) }}</h2>
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
    <p v-else-if="loading && !app" class="has-text-grey mb-5">{{ t("settings.asking") }}</p>
  </div>
</template>

<style scoped>
.setting:not(:last-child) {
  margin-bottom: 1.25rem;
}

.back-to-default {
  padding-left: 0;
}
</style>
