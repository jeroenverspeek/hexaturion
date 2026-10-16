<script setup lang="ts">
const { version } = useConfig();
const { t } = useLanguage();
</script>

<template>
  <div class="container">
    <h1 class="title">{{ t("about.title") }}</h1>
    <h2 class="subtitle">{{ t("about.version", { version }) }}</h2>

    <h3 class="title is-4">{{ t("about.motto") }}</h3>

    <figure>
      <img
        src="/gallery/cube_rubikscube_pattern.jpg"
        :alt="t('about.picture')"
        width="300"
        height="300"
      />
    </figure>

    <div class="content">
      <p>{{ t("about.production") }}</p>
      <p>{{ t("about.contact", { address: "hexaturion@gmail.com" }) }}</p>
      <p>
        <NuxtLink to="/">{{ t("about.back") }}</NuxtLink>
      </p>
    </div>
  </div>
</template>
