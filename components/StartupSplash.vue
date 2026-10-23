<script setup lang="ts">
/**
 What the site opens with: the device's picture, until the device has told
 its catalog - a second and a half at least, four at most, as a device that
 is off takes its time not to answer. A tap makes it go at once.
*/
const { loading } = useCatalog();

const shown = ref(true);
const leastOver = ref(false);
setTimeout(() => (leastOver.value = true), 1500);
setTimeout(() => (shown.value = false), 4000);
watchEffect(() => {
  if (leastOver.value && !loading.value) shown.value = false;
});
</script>

<template>
  <Transition name="fade">
    <div v-if="shown" class="startup-splash" @click="shown = false">
      <DevicePicture />
      <p class="title is-3 mt-4">Hexaturion</p>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.startup-splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--bulma-scheme-main);
  cursor: pointer;
}

.startup-splash :deep(img) {
  max-height: 65vh;
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
