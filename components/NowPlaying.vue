<script setup lang="ts">
const { findApp } = useCatalog();
const { status, reachable, refresh } = useCubeStatus();
const device = useDeviceName();

// Asked every few seconds, for as long as the page is looked at: an app can
// end by itself, or be started from another phone.
const { pause, resume } = useIntervalFn(refresh, 3000, { immediateCallback: true });
const visibility = useDocumentVisibility();
watch(visibility, (now) => (now === "visible" ? resume() : pause()));

const running = computed(() => status.value?.running ?? null);
/** The app that ended by giving up, rather than by being done or being stopped. */
const failed = computed(() => (status.value?.ended?.failed ? status.value.ended : null));
/** The app's icon; an app this GUI does not know yet gets a plain one. */
const icon = computed(() => (running.value && findApp(running.value.app)?.icon) || "play");

const runningFor = computed(() => {
  const minutes = Math.floor((running.value?.runningFor ?? 0) / 60);
  if (minutes < 1) return "just started";
  if (minutes < 60) return `for ${minutes} min`;
  return `for ${Math.floor(minutes / 60)} h ${minutes % 60} min`;
});
</script>

<template>
  <div v-if="reachable !== null" class="now-playing" role="status">
    <div class="container now-playing-row">
      <template v-if="!reachable">
        <span class="icon has-text-warning"><i class="fa-solid fa-plug-circle-xmark"></i></span>
        <span class="now-playing-text">The {{ device }} does not answer</span>
      </template>

      <template v-else>
        <template v-if="running">
          <span :key="icon" class="icon has-text-primary"><i class="fa-solid" :class="`fa-${icon}`"></i></span>
          <span class="now-playing-text">
            <NuxtLink :to="{ path: '/app', query: { id: running.app } }" class="has-text-weight-bold">{{ running.title }}</NuxtLink>
            <span class="now-playing-aside now-playing-time">{{ runningFor }}</span>
          </span>
        </template>
        <template v-else-if="failed">
          <span class="icon has-text-warning"><i class="fa-solid fa-triangle-exclamation"></i></span>
          <span class="now-playing-text">
            <NuxtLink :to="{ path: '/app', query: { id: failed.app } }" class="has-text-weight-bold">{{ failed.title }}</NuxtLink>
            stopped with an error
          </span>
        </template>
        <span v-else class="now-playing-text now-playing-aside">Nothing is running</span>

        <StopButton small />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.now-playing {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  padding: 0.5rem 1.5rem;
  background: var(--bulma-scheme-main);
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.12);
}

.now-playing-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2rem;
}

.now-playing-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.now-playing-aside {
  opacity: 0.7;
}

.now-playing-time {
  margin-left: 0.4em;
}
</style>
