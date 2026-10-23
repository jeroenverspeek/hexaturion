<script setup lang="ts">
import { dutchCategories } from "~/utils/texts";

const { catalog, load } = useCatalog();
const { reachable, refresh } = useCubeStatus();
const { language, t } = useLanguage();

/** A category's heading in the language spoken: the device's own in English. */
const titleOf = (category: { id: string; title: string }): string =>
  (language.value === "nl" && dutchCategories[category.id]) || category.title;

const shelves = computed(() =>
  (catalog.value?.categories ?? [])
    .map((category) => ({
      ...category,
      apps: catalog.value!.apps.filter((app) => app.category === category.id),
    }))
    .filter((shelf) => shelf.apps.length > 0),
);
</script>

<template>
  <div>
    <h1 class="title is-4">{{ t("apps.title") }}</h1>

    <CatalogMissing v-if="!catalog" />
    <!-- the apps of the last time are shown below, but the device is not there to start them -->
    <div v-else-if="reachable === false" class="mb-5">
      <div class="notification is-warning is-light">
        <p>{{ t("problem.noAnswer") }}</p>
        <button type="button" class="button is-small mt-3" @click="refresh(); load()">{{ t("apps.tryAgain") }}</button>
      </div>
      <DevicePicture />
    </div>

    <section v-for="shelf in shelves" :key="shelf.id" class="shelf">
      <h2 class="subtitle is-6 has-text-weight-semibold">{{ titleOf(shelf) }}</h2>
      <div class="app-grid">
        <AppTile v-for="app in shelf.apps" :key="app.id" :app="app" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.shelf {
  margin-bottom: 2rem;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  gap: 0.75rem;
}
</style>
