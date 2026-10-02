<script setup lang="ts">
/** In place of what the catalog would show, for as long as there is none. */
const { problem, loading, load } = useCatalog();
</script>

<template>
  <p v-if="loading" class="has-text-grey">Asking the cube for its apps...</p>
  <div v-else class="notification is-warning is-light">
    <p>The apps are the cube's to tell. {{ problem }}</p>
    <button type="button" class="button is-small mt-3" @click="load">Try again</button>
  </div>
</template>
