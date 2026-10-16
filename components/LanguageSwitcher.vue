<script setup lang="ts">
import { languages, type Language } from "~/utils/texts";

/** Two small flags, to speak English or Dutch; the one spoken stands out. */
const { language, choose, t } = useLanguage();
const flagOf: Record<Language, string> = { en: "gb", nl: "nl" };
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('language.choose')">
    <button
      v-for="one in languages"
      :key="one"
      type="button"
      class="flag"
      :class="{ 'is-chosen': one === language }"
      :aria-pressed="one === language"
      :title="t(`language.${one}`)"
      @click="choose(one)"
    >
      <svg v-if="flagOf[one] === 'nl'" viewBox="0 0 9 6" aria-hidden="true">
        <rect width="9" height="6" fill="#21468B" />
        <rect width="9" height="4" fill="#FFFFFF" />
        <rect width="9" height="2" fill="#AE1C28" />
      </svg>
      <svg v-else viewBox="0 0 60 30" aria-hidden="true">
        <clipPath id="flag-gb-saltire"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" stroke-width="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#flag-gb-saltire)" />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" stroke-width="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.5rem;
}

.flag {
  display: flex;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 2px;
  background: none;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.15s ease;

  svg {
    display: block;
    width: 1.35rem;
    height: 0.9rem;
  }
}

.flag:hover,
.flag:focus-visible {
  opacity: 0.8;
}

.flag.is-chosen {
  opacity: 1;
  border-color: rgba(0, 0, 0, 0.25);
}
</style>
