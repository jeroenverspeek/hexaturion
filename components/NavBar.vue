<template>
  <nav
    class="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="~assets/img/logo.svg" />
          <b class="title is-6 has-text-primary ml-2 brand-name">HEXATURION</b>
        </nuxt-link>

        <DeviceSwitcher />
        <LanguageSwitcher />

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': showMenu }"
          @click="showMenu = !showMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMenu }"
      >
        <div class="navbar-start">
          <nuxt-link
            to="/"
            class="navbar-item"
            exact-active-class="is-active"
            @click="showMenu = false"
          >
            {{ t("nav.home") }}
          </nuxt-link>

          <nuxt-link
            to="/gallery"
            class="navbar-item"
            exact-active-class="is-active"
            @click="showMenu = false"
          >
            {{ t("nav.gallery") }}
          </nuxt-link>

          <nuxt-link
            to="/settings"
            class="navbar-item"
            exact-active-class="is-active"
            @click="showMenu = false"
          >
            {{ t("nav.settings") }}
          </nuxt-link>

          <nuxt-link
            to="/about"
            class="navbar-item"
            exact-active-class="is-active"
            @click="showMenu = false"
          >
            {{ t("nav.about") }}
          </nuxt-link>
        </div>

        <!--About
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link to="/another-page" class="button is-primary">
                <strong>Another Page</strong>
              </nuxt-link>
            </div>
          </div>
        </div>
-->
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const showMenu = ref(false);
const { t } = useLanguage();
</script>

<style scoped>
/* on a phone the logo alone: the device and language switchers need the room, the menu button too */
@media (max-width: 480px) {
  .brand-name {
    display: none;
  }
}

/* the switchers take the room between the name and the menu button, and sit next to the button */
:deep(.language-switcher) + .navbar-burger {
  margin-left: 0;
}
</style>
