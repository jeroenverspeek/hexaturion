<script setup lang="ts">
defineProps<{ small?: boolean }>();

const { stop } = useAPI();
const stopping = ref(false);

async function stopApp(): Promise<void> {
  stopping.value = true;
  try {
    await stop();
  } catch {
    // useAPI has told the user already
  } finally {
    stopping.value = false;
  }
}
</script>

<template>
  <button
    type="button"
    class="button is-danger"
    :class="{ 'is-loading': stopping, 'is-small': small }"
    @click="stopApp"
  >
    <span class="icon"><i class="fa-solid fa-stop"></i></span>
    <span>Stop</span>
  </button>
</template>
