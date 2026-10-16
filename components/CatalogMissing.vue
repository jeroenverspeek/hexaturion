<script setup lang="ts">
/** In place of what the catalog would show, for as long as there is none. */
const { problem, loading, load } = useCatalog();
const { t } = useLanguage();
</script>

<template>
  <p v-if="loading" class="has-text-grey">{{ t("apps.asking") }}</p>
  <div v-else class="notification is-warning is-light">
    <p>{{ t("apps.theirs", { problem }) }}</p>
    <button type="button" class="button is-small mt-3" @click="load">{{ t("apps.tryAgain") }}</button>
  </div>
</template>
