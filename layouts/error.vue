<template>
  <div class="has-text-centered mt-6">
    <h1 v-if="error.statusCode === 404" class="title">{{ t("error.notFound") }}</h1>
    <h1 v-else class="title">{{ t("error.other") }}</h1>
    <nuxt-link to="/" class="button">{{ t("error.home") }}</nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>();
const { t } = useLanguage();
</script>
