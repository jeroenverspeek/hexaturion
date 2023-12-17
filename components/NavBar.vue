<template>
  <nav class="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="~assets/img/logo.svg" /> <b class="title is-6 has-text-primary ml-2">HEXATURION</b>
        </nuxt-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{ 'is-active': showMenu }"
          @click="showMenu = !showMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMenu }">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item" exact-active-class="is-active" @click="showMenu = false">
            Home
          </nuxt-link>

          <nuxt-link to="/about" class="navbar-item" exact-active-class="is-active" @click="showMenu = false">
            About
          </nuxt-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link to="/another-page" class="button is-primary">
                <strong>Another Page</strong>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const showMenu = ref(false);
</script>