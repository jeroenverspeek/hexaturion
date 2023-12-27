
<script setup lang="ts">
const currentTab = ref('clock');
</script>

<template>
  <div class="box">
    <h1 class="title">Hexaturion</h1>
    <hr />
    <div class="tabs is-boxed">
      <ol>
        <ul>
          <li :class="{ 'is-active': currentTab === 'clock' }">
            <a @click="currentTab = 'clock'">
              <span class="icon is-small"><i class="fa-solid fa-clock"></i></span>
              <span>Clock</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'video' }">
            <a @click="currentTab = 'video'">
              <span class="icon is-small"><i class="fa-solid fa-video"></i></span>
              <span>Video</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'pictures' }">
            <a @click="currentTab = 'pictures'">
              <span class="icon is-small"><i class="fa-solid fa-image"></i></span>
              <span>Pictures</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'rubiksCube' }">
            <a @click="currentTab = 'rubiksCube'">
              <span class="icon is-small"><i class="fa-solid fa-cube"></i></span>
              <span>Rubik's cube</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'slidingPuzzle' }">
            <a @click="currentTab = 'slidingPuzzle'">
              <span class="icon is-small"><i class="fa-solid fa-cube"></i></span>
              <span>Sliding puzzle</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'celestialBodies' }">
            <a @click="currentTab = 'celestialBodies'">
              <span class="icon is-small"><i class="fa-solid fa-earth-europe"></i></span>
              <span>Celestial bodies</span>
            </a>
          </li>
          </ul>
          <ul>
          <li :class="{ 'is-active': currentTab === 'stockMarketQuotes' }">
            <a @click="currentTab = 'stockMarketQuotes'">
              <span class="icon is-small"><i class="fa-solid fa-money-bill-trend-up"></i></span>
              <span>Stock market quotes</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'welcome' }">
            <a @click="currentTab = 'welcome'">
              <span class="icon is-small"><i class="fa-solid fa-door-open"></i></span>
              <span>Welcome</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'demo' }">
            <a @click="currentTab = 'demo'">
              <span class="icon is-small"><i class="fa-solid fa-cube"></i></span>
              <span>Demo</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'fireworks' }">
            <a @click="currentTab = 'fireworks'">
              <span class="icon is-small"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <span>Fireworks</span>
            </a>
          </li>
          <li :class="{ 'is-active': currentTab === 'boss' }">
            <a @click="currentTab = 'boss'">
              <span class="icon is-small"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <span>BOSS</span>
            </a>
          </li>
        </ul>
      </ol>
    </div>
    <div>
      <CubeClock v-if="currentTab === 'clock'" />
      <CubeVideo v-if="currentTab === 'video'" />
      <CubePictures v-if="currentTab === 'pictures'" />
      <CubeRubiksCube v-if="currentTab === 'rubiksCube'" />
      <CubeSlidingPuzzle v-if="currentTab === 'slidingPuzzle'" />
      <CubeCelestialBodies v-if="currentTab === 'celestialBodies'" />
      <CubeStockMarketQuotes v-if="currentTab === 'stockMarketQuotes'" />
      <CubeWelcome v-if="currentTab === 'welcome'" />
      <CubeDemo v-if="currentTab === 'demo'" />
      <CubeFireworks v-if="currentTab === 'fireworks'" />
      <CubeBoss v-if="currentTab === 'boss'" />
    </div>
  </div>
</template>

<style lang="scss"></style>
