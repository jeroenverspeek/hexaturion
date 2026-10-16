<script setup lang="ts">
/** The page of the app named in the address: /app?id=clock. */
const route = useRoute();
const { catalog, loading, findApp } = useCatalog();
const { active } = useDevices();
const { t } = useLanguage();

const app = computed(() => findApp(String(route.query.id ?? "")));
</script>

<template>
  <AppPage v-if="app" :key="`${active.id} ${app.id}`" :app="app" />
  <CatalogMissing v-else-if="!catalog" />
  <div v-else>
    <h1 class="title is-4">{{ t("app.none") }}</h1>
    <p v-if="loading" class="has-text-grey">{{ t("app.askingWhether") }}</p>
    <p><NuxtLink to="/">{{ t("apps.all") }}</NuxtLink></p>
  </div>
</template>
