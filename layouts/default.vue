<template>
  <div id="app" class="with-now-playing">
    <nav-bar />
    <div class="section">
      <div id="content" class="container">
        <slot />
      </div>
    </div>
    <site-footer />
    <NowPlaying />
  </div>
</template>

<script setup lang="ts">
// the catalog of now, for every page: until it is there the pages go by the one kept from the last time
const { load } = useCatalog();
onMounted(load);
</script>

<style lang="scss">
// room for the bar at the bottom, so that it never lies over the end of a page
.with-now-playing {
  padding-bottom: 3.5rem;
}
</style>
