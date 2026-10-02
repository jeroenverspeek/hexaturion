<script setup lang="ts">
import { apps, categories } from "~/catalog";

const shelves = categories
  .map((category) => ({
    ...category,
    apps: apps.filter((app) => app.category === category.id),
  }))
  .filter((shelf) => shelf.apps.length > 0);
</script>

<template>
  <div>
    <h1 class="title is-4">Apps</h1>

    <section v-for="shelf in shelves" :key="shelf.id" class="shelf">
      <h2 class="subtitle is-6 has-text-weight-semibold">{{ shelf.title }}</h2>
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
