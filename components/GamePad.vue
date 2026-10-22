<script setup lang="ts">
import type { Button } from "~/composables/useCubeStatus";

/**
 The buttons of an app that is played from here, on a phone or a tablet.
 A game's are laid out as a game pad: the arrows in a cross, and fire, start
 and pause under them, of those the app has; each tells when it goes down
 and when it comes up again, and the app says what that does. Any other
 button has its name on it - the Rubik's cube's moves, F, F' - and is one
 tap each; an app that takes a typed move (typed) has a field for that.
 A keyboard works them too: the arrow keys, and the letter of a move.
*/
const props = defineProps<{ controls: string[]; typed?: boolean; help?: string }>();

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
const gameButtons: string[] = [...arrows, ...others].map((one) => one.button);
const has = (button: string): boolean => props.controls.includes(button);
const shownArrows = computed(() => arrows.filter((one) => has(one.button)));
const shownOthers = computed(() => others.filter((one) => has(one.button)));
/** The buttons that are not a game's, in the order the app gives them. */
const named = computed(() => props.controls.filter((button) => !gameButtons.includes(button)));

/** The buttons that are down now, to show them pressed and to let each go once. */
const down = reactive(new Set<string>());

// One after the other, so that the app gets a release after its press, even
// when the second request would have overtaken the first.
let sending: Promise<void> = Promise.resolve();
const send = (button: string, how: "press" | "release" | "tap"): void => {
  sending = sending.then(() => control(button, how));
};

/** A game's button goes down: it stays down until it comes up. Any other is a tap, shown down for a moment. */
function press(button: string): void {
  if (down.has(button)) return;
  down.add(button);
  if (gameButtons.includes(button)) {
    send(button, "press");
  } else {
    send(button, "tap");
    setTimeout(() => down.delete(button), 150);
  }
}

function release(button: string): void {
  if (!gameButtons.includes(button) || !down.delete(button)) return;
  send(button, "release");
}

function pointerDown(button: string, event: PointerEvent): void {
  // the finger may slide off the button: it is let go where it comes up
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  press(button);
}

/** Worked from a keyboard on the button itself (Enter, space): one tap. */
function clicked(button: string, event: MouseEvent): void {
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
 A move as the Rubik's cube's terminal has it (rubiksCube/solvers/manual
 there): the letter of a face or a slice for that move, x / y / z for the
 whole cube, with Shift the other way round - f is F, Shift+f F'.
*/
function moveOf(event: KeyboardEvent): string | undefined {
  const letter = event.key.toLowerCase();
  if (!/^[fudlrbmesxyz]$/.test(letter)) return undefined;
  const base = "xyz".includes(letter) ? letter : letter.toUpperCase();
  return event.shiftKey ? `${base}'` : base;
}

/**
 The key's button, when it is one of this app's and the key is not typed
 into a field - nor, for space and enter, working the button or link that
 has the focus (Stop, say).
*/
function buttonOf(event: KeyboardEvent): string | undefined {
  if (event.ctrlKey || event.altKey || event.metaKey) return undefined;
  const target = event.target as HTMLElement | null;
  if (target?.closest("input, select, textarea, [contenteditable]")) return undefined;
  if ((event.key === " " || event.key === "Enter") && target?.closest("button, a, summary")) return undefined;
  const button = keys[event.key.length === 1 ? event.key.toLowerCase() : event.key];
  if (button && has(button)) return button;
  const move = moveOf(event);
  return move && has(move) ? move : undefined;
}

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  const button = buttonOf(event);
  if (!button) return;
  // the arrows would scroll the page as well
  event.preventDefault();
  // a key held down repeats: that is one press of a game's button, and a move each time
  if (event.repeat && gameButtons.includes(button)) return;
  press(button);
});
useEventListener(window, "keyup", (event: KeyboardEvent) => {
  const button = buttonOf(event);
  if (button) release(button);
});

// a button held while the window loses sight of it would never come up
useEventListener(window, "blur", () => [...down].forEach(release));
onBeforeUnmount(() => [...down].forEach(release));

/** A move typed, for what has no button: the app says whether it is one. */
const typedMove = ref("");
function sendTyped(): void {
  const move = typedMove.value.trim();
  if (!move) return;
  send(move, "tap");
  typedMove.value = "";
}
</script>

<template>
  <section class="box game-pad">
    <h2 class="title is-6 mb-2">{{ t("pad.title") }}</h2>
    <p class="help mb-2">{{ shownArrows.length ? t("pad.hint") : t("pad.hintKeys") }}</p>
    <p v-if="help" class="help mb-4">{{ help }}</p>
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
      <div v-if="named.length" class="pad-named">
        <button
          v-for="button in named"
          :key="button"
          type="button"
          class="button pad-name"
          :class="{ 'is-primary': down.has(button) }"
          @pointerdown.prevent="pointerDown(button, $event)"
          @click="clicked(button, $event)"
          @contextmenu.prevent
        >
          {{ button }}
        </button>
      </div>
      <form v-if="typed" class="pad-typed" @submit.prevent="sendTyped">
        <label class="label is-small" for="pad-typed">{{ t("pad.typed") }}</label>
        <div class="field has-addons">
          <p class="control">
            <input
              id="pad-typed"
              v-model="typedMove"
              class="input"
              type="text"
              maxlength="12"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              :placeholder="t('pad.typedPlaceholder')"
            />
          </p>
          <p class="control">
            <button type="submit" class="button is-primary" :disabled="!typedMove.trim()">{{ t("pad.turn") }}</button>
          </p>
        </div>
      </form>
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

// a move and its other way side by side: F F' U U' R R', six to a row
// - narrower on a phone, where six of them would not fit
.pad-named {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.4rem;
  width: 100%;
  max-width: 21.5rem;
}

.pad-button,
.pad-name {
  // a finger on it is a press, not the start of a scroll, a zoom or a selection
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

.pad-button {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 1rem;
}

.pad-name {
  height: 3.25rem;
  min-width: 0;
  padding: 0;
  border-radius: 0.75rem;
  font-weight: 600;
}

.pad-typed .input {
  width: 9rem;
}
</style>
