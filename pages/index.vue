
<script setup lang="ts">
const currentTab = ref('clock');
</script>

<template>
  <div class="box">
    <h1 class="title">Hexaturion</h1>
    <hr />
    <div class="tabs is-boxed">
      <ul>
        <li :class="{ 'is-active': currentTab === 'clock' }">
          <a @click="currentTab = 'clock'">
            <span class="icon is-small"><i class="fa-solid fa-clock"></i></span>
            <span>Clock</span>
          </a>
        </li>
        <li :class="{ 'is-active': currentTab === 'pictures' }">
          <a @click="currentTab = 'pictures'">
            <span class="icon is-small"><i class="fa-solid fa-image"></i></span>
            <span>Pictures</span>
          </a>
        </li>
        <li :class="{ 'is-active': currentTab === 'celestialBodies' }">
          <a @click="currentTab = 'celestialBodies'">
            <span class="icon is-small"><i class="fa-solid fa-celestialBodies"></i></span>
            <span>Celestial bodies</span>
          </a>
        </li>
        <li :class="{ 'is-active': currentTab === 'stockMarketQuotes' }">
          <a @click="currentTab = 'stockMarketQuotes'">
            <span class="icon is-small"><i class="fa-solid fa-stockMarketQuotes"></i></span>
            <span>Stock market quotes</span>
          </a>
        </li>
        <li :class="{ 'is-active': currentTab === 'other' }">
          <a @click="currentTab = 'other'">
            <span class="icon is-small"><i class="fa-solid fa-bars"></i></span>
            <span>Other</span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <CubeClock v-if="currentTab === 'clock'" />
      <CubePictures v-if="currentTab === 'pictures'" />
      <CubeCelestialBodies v-if="currentTab === 'celestialBodies'" />
      <CubeStockMarketQuotes v-if="currentTab === 'stockMarketQuotes'" />
      <CubeOther v-else-if="currentTab === 'other'" />
    </div>
  </div>
</template>

<style lang="scss"></style>
