<script setup lang="ts">
/**
 The device's picture over the whole page: as the site opens, until the
 device has told its catalog - a second and a half at least, four at most,
 as a device that is off takes its time not to answer - and briefly, for a
 second, when the GUI turns to another device. A tap makes it go at once.
*/
const { loading } = useCatalog();
const { active } = useDevices();

const shown = ref(false);
/** Ends the watching and the timers of the last show(), for a new one not to be cut short by them. */
let forget = (): void => {};

/** Shows it for `least` ms at least, and until the catalog is in, but `most` ms at most. */
function show(least: number, most: number): void {
  forget();
  shown.value = true;
  const leastOver = ref(false);
  const stop = watchEffect(() => {
    if (leastOver.value && !loading.value) shown.value = false;
  });
  const timers = [setTimeout(() => (leastOver.value = true), least), setTimeout(() => (shown.value = false), most)];
  forget = () => {
    stop();
    timers.forEach(clearTimeout);
  };
}

show(1500, 4000);
watch(() => active.value.id, () => show(1000, 1000));
onBeforeUnmount(() => forget());
</script>

<template>
  <Transition name="fade">
    <div v-if="shown" class="device-splash" @click="shown = false">
      <DevicePicture />
      <p class="title is-3 mt-4">Hexaturion</p>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.device-splash {
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

.device-splash :deep(img) {
  max-height: 65vh;
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
