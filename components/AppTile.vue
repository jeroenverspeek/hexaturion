<script setup lang="ts">
import type { AppDefinition } from "~/catalog/types";

defineProps<{ app: AppDefinition }>();
</script>

<template>
  <NuxtLink :to="`/apps/${app.id}`" class="box app-tile">
    <span class="icon is-large has-text-primary">
      <i class="fa-solid fa-2x" :class="`fa-${app.icon}`"></i>
    </span>
    <span class="app-tile-title">{{ app.title }}</span>
    <span class="app-tile-description">{{ app.description }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.app-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 1rem 0.75rem;
  text-align: center;
  color: inherit;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.app-tile:hover,
.app-tile:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.app-tile-title {
  margin-top: 0.25rem;
  font-weight: 700;
}

.app-tile-description {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.3;
  opacity: 0.7;
}
</style>
