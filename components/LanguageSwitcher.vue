<script setup lang="ts">
import { languages, type Language } from "~/utils/texts";

/**
 The language the site speaks: the flag of the one spoken, which opens a
 menu of the languages, each with its flag and its name.
*/
const { language, choose, t } = useLanguage();
const open = ref(false);
const switcher = ref<HTMLElement>();
onClickOutside(switcher, () => (open.value = false));

function pick(one: Language): void {
  choose(one);
  open.value = false;
}
</script>

<template>
  <div ref="switcher" class="language-switcher dropdown is-right" :class="{ 'is-active': open }" @keydown.esc="open = false">
    <div class="dropdown-trigger">
      <button
        type="button"
        class="language-button"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-label="`${t('language.choose')}: ${t(`language.${language}`)}`"
        :title="t('language.choose')"
        @click="open = !open"
      >
        <LanguageFlag :language="language" />
        <span class="icon is-small"><i class="fa-solid fa-chevron-down fa-2xs"></i></span>
      </button>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          v-for="one in languages"
          :key="one"
          class="dropdown-item language-item"
          :class="{ 'is-active': one === language }"
          role="menuitemradio"
          :aria-checked="one === language"
          href="#"
          @click.prevent="pick(one)"
        >
          <LanguageFlag :language="one" />
          <span>{{ t(`language.${one}`) }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  align-self: center;
  padding: 0 0.5rem;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.2rem;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
}

.dropdown-menu {
  min-width: 9rem;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
