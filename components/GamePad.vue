<script setup lang="ts">
import type { Button } from "~/composables/useCubeStatus";

/**
 The buttons of an app that is played from here, on a phone or a tablet: the
 arrows in a cross, and fire, start and pause beside them, of those the app
 has. A button tells when it goes down and when it comes up again; the app
 says what that does. The arrow keys of a keyboard work them too.
*/
const props = defineProps<{ controls: string[] }>();

const { control } = useAPI();
const { t } = useLanguage();

const arrows: { button: Button; icon: string }[] = [
  { button: "up", icon: "chevron-up" },
  { button: "left", icon: "chevron-left" },
  { button: "right", icon: "chevron-right" },
  { button: "down", icon: "chevron-down" },
];
const others: { button: Button; icon: string }[] = [
  { button: "fire", icon: "crosshairs" },
  { button: "start", icon: "play" },
  { button: "pause", icon: "pause" },
];
const has = (button: Button): boolean => props.controls.includes(button);
const shownArrows = computed(() => arrows.filter((one) => has(one.button)));
const shownOthers = computed(() => others.filter((one) => has(one.button)));

/** The buttons that are down now, to show them pressed and to let each go once. */
const down = reactive(new Set<Button>());

// One after the other, so that the app gets a release after its press, even
// when the second request would have overtaken the first.
let sending: Promise<void> = Promise.resolve();
const send = (button: Button, how: "press" | "release" | "tap"): void => {
  sending = sending.then(() => control(button, how));
};

function press(button: Button): void {
  if (down.has(button)) return;
  down.add(button);
  send(button, "press");
}

function release(button: Button): void {
  if (!down.delete(button)) return;
  send(button, "release");
}

function pointerDown(button: Button, event: PointerEvent): void {
  // the finger may slide off the button: it is let go where it comes up
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  press(button);
}

/** Worked from a keyboard on the button itself (Enter, space): one tap. */
function clicked(button: Button, event: MouseEvent): void {
  if (event.detail === 0) send(button, "tap");
}

// The keys of a terminal on the device (games/keyboard.ts there): the arrows
// or w / a / s / d, space for fire, enter for start, p for pause.
const keys: Record<string, Button> = {
  ArrowUp: "up", w: "up",
  ArrowDown: "down", s: "down",
  ArrowLeft: "left", a: "left",
  ArrowRight: "right", d: "right",
  " ": "fire",
  Enter: "start",
  p: "pause",
};

/**
 The key's button, when it is one of this app's and the key is not typed
 into a field - nor, for space and enter, working the button or link that
 has the focus (Stop, say).
*/
function buttonOf(event: KeyboardEvent): Button | undefined {
  if (event.ctrlKey || event.altKey || event.metaKey) return undefined;
  const target = event.target as HTMLElement | null;
  if (target?.closest("input, select, textarea, [contenteditable]")) return undefined;
  if ((event.key === " " || event.key === "Enter") && target?.closest("button, a, summary")) return undefined;
  const button = keys[event.key.length === 1 ? event.key.toLowerCase() : event.key];
  return button && has(button) ? button : undefined;
}

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  const button = buttonOf(event);
  if (!button) return;
  // the arrows would scroll the page as well
  event.preventDefault();
  press(button);
});
useEventListener(window, "keyup", (event: KeyboardEvent) => {
  const button = buttonOf(event);
  if (button) release(button);
});

// a button held while the window loses sight of it would never come up
useEventListener(window, "blur", () => [...down].forEach(release));
onBeforeUnmount(() => [...down].forEach(release));
</script>

<template>
  <section class="box game-pad">
    <h2 class="title is-6 mb-2">{{ t("pad.title") }}</h2>
    <p class="help mb-4">{{ t("pad.hint") }}</p>
    <div class="pad-row">
      <div v-if="shownArrows.length" class="pad-cross">
        <button
          v-for="one in shownArrows"
          :key="one.button"
          type="button"
          class="button pad-button"
          :class="[`pad-${one.button}`, { 'is-primary': down.has(one.button) }]"
          :aria-label="t(`pad.${one.button}`)"
          @pointerdown.prevent="pointerDown(one.button, $event)"
          @pointerup="release(one.button)"
          @pointercancel="release(one.button)"
          @click="clicked(one.button, $event)"
          @contextmenu.prevent
        >
          <span class="icon is-medium"><i class="fa-solid fa-xl" :class="`fa-${one.icon}`"></i></span>
        </button>
      </div>
      <div v-if="shownOthers.length" class="pad-others">
        <button
          v-for="one in shownOthers"
          :key="one.button"
          type="button"
          class="button pad-button"
          :class="{ 'is-primary': down.has(one.button) }"
          :aria-label="t(`pad.${one.button}`)"
          @pointerdown.prevent="pointerDown(one.button, $event)"
          @pointerup="release(one.button)"
          @pointercancel="release(one.button)"
          @click="clicked(one.button, $event)"
          @contextmenu.prevent
        >
          <span class="icon is-medium"><i class="fa-solid fa-lg" :class="`fa-${one.icon}`"></i></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// the others in a row under the arrows: side by side they would not fit on a phone
.pad-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.pad-cross {
  display: grid;
  grid-template-areas:
    ". up ."
    "left . right"
    ". down .";
  grid-template-columns: repeat(3, 4.5rem);
  grid-template-rows: repeat(3, 4.5rem);
  gap: 0.4rem;
}

.pad-up { grid-area: up; }
.pad-down { grid-area: down; }
.pad-left { grid-area: left; }
.pad-right { grid-area: right; }

.pad-others {
  display: flex;
  gap: 0.6rem;
}

.pad-button {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 1rem;
  // a finger on it is a press, not the start of a scroll, a zoom or a selection
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
