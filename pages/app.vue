<script setup lang="ts">
/** The page of the app named in the address: /app?id=clock. */
const route = useRoute();
const { catalog, loading, findApp } = useCatalog();
const { active } = useDevices();
const { t } = useLanguage();

const app = computed(() => findApp(String(route.query.id ?? "")));

/**
 The app as the catalog describes it, in short: the page is made anew when
 that changes - the catalog of the last time is shown first, and the
 device's of now may have another action, such as a Play that is new.
*/
const version = computed(() => {
  const text = JSON.stringify(app.value ?? null);
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  return hash.toString(36);
});
</script>

<template>
  <AppPage v-if="app" :key="`${active.id} ${app.id} ${version}`" :app="app" />
  <CatalogMissing v-else-if="!catalog" />
  <div v-else>
    <h1 class="title is-4">{{ t("app.none") }}</h1>
    <p v-if="loading" class="has-text-grey">{{ t("app.askingWhether") }}</p>
    <p><NuxtLink to="/">{{ t("apps.all") }}</NuxtLink></p>
  </div>
</template>
