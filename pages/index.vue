<script setup lang="ts">
import { dutchCategories } from "~/utils/texts";

const { catalog } = useCatalog();
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
