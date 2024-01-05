<script setup>
const { version } = useConfig();
</script>

<style lang="scss" scoped></style>


<template>
  <div>
    <h1 class="title">About Hexaturion</h1>
    <h2 class="subtitle">version {{version}}</h2>
    <h3>Commander of the six faces</h3><br>

    <h4>
    A graphical user interface for the led-hexahedron<br><br><br>

    <div>
      <img src="/gallery/cube_rubikscube_pattern.jpg" alt="image not found" width="300px" height="300px" />
    </div>


    A Verspeek production<br><br>

    Contact: hexaturion@gmail.com<br><br>
    </h4>
    <nuxt-link to="/">Back to Home page</nuxt-link>
    <br>
  </div>
</template>