<script setup lang="ts">
import type { Language } from "~/utils/texts";

/** The flag of a language: the Dutch one, or the British one for English. */
defineProps<{ language: Language }>();
// the British flag's clip path needs an id of its own on the page: there can be two of them
const clipId = `flag-gb-${Math.random().toString(36).slice(2, 8)}`;
</script>

<template>
  <svg v-if="language === 'nl'" class="flag" viewBox="0 0 9 6" aria-hidden="true">
    <rect width="9" height="6" fill="#21468B" />
    <rect width="9" height="4" fill="#FFFFFF" />
    <rect width="9" height="2" fill="#AE1C28" />
  </svg>
  <svg v-else class="flag" viewBox="0 0 60 30" aria-hidden="true">
    <clipPath :id="clipId"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" stroke-width="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" :clip-path="`url(#${clipId})`" />
    <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" stroke-width="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
  </svg>
</template>

<style scoped>
.flag {
  display: block;
  width: 1.35rem;
  height: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}
</style>
