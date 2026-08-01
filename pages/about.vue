<script setup lang="ts">
const { version } = useConfig();
</script>

<template>
  <div class="container">
    <h1 class="title">About Hexaturion</h1>
    <h2 class="subtitle">version {{ version }}</h2>

    <h3 class="title is-4">Commander of the six faces</h3>

    <figure>
      <img
        src="/gallery/cube_rubikscube_pattern.jpg"
        alt="Hexaturion cube"
        width="300"
        height="300"
      />
    </figure>

    <div class="content">
      <p>A Verspeek production</p>
      <p>Contact: hexaturion@gmail.com</p>
      <p>
        <NuxtLink to="/">Back to Home page</NuxtLink>
      </p>
    </div>
  </div>
</template>
