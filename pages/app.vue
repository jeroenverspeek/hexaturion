<script setup lang="ts">
/** The page of the app named in the address: /app?id=clock. */
const route = useRoute();
const { catalog, loading, findApp } = useCatalog();
const device = useDeviceName();

const app = computed(() => findApp(String(route.query.id ?? "")));
</script>

<template>
  <AppPage v-if="app" :key="app.id" :app="app" />
  <CatalogMissing v-else-if="!catalog" />
  <div v-else>
    <h1 class="title is-4">There is no such app</h1>
    <p v-if="loading" class="has-text-grey">Asking the {{ device }} whether it has one by now...</p>
    <p><NuxtLink to="/">All apps</NuxtLink></p>
  </div>
</template>
