<script setup lang="ts">
const { t } = useLanguage();
useHead({ title: () => t("settings.title") });

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

    <SettingsForm />

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

</style>
