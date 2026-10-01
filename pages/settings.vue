<script setup lang="ts">
useHead({ title: "Settings" });

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
</style>
