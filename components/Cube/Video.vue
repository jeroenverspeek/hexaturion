<script setup lang="ts">
import { computed, ref } from "vue";

const movie = ref<string>("videos/rotto.mp4");
const animatedGif = ref<string>(
  "animated_gifs/birthday_animated_gif/happy-birthday.gif",
);
const loading = ref<boolean>(false);

const { appDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

const videoAppCommand = computed<string[]>(() => {
  const cubeAppPath = hZellerDir + "utils/video-viewer";
  const command: string[] = [cubeAppPath, ...cubeOptions];

  command.push(appDir + movie.value);

  return command;
});

const gifAppCommand = computed<string[]>(() => {
  const cubeAppPath = hZellerDir + "utils/led-image-viewer";
  const command: string[] = [cubeAppPath, ...cubeOptions];

  if (animatedGif.value) {
    command.push(appDir + animatedGif.value);
  }

  return command;
});

async function showVideo(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(videoAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}

async function showGif(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(gifAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <!-- Selectors -->
    <div class="field is-grouped">
      <p class="control">
        <span class="select">
          <select v-model="movie">
            <option value="videos/rotto.mp4">rotto</option>
            <option value="videos/space.mp4">space</option>
            <option value="videos/trippy1.mp4">trippy1</option>
            <option value="videos/trippy2.mp4">trippy2</option>
          </select>
        </span>
      </p>

      <p class="control">
        <span class="select">
          <select v-model="animatedGif">
            <option
              value="animated_gifs/birthday_animated_gif/happy-birthday.gif"
            >
              happy birthday
            </option>
            <option value="animated_gifs/fruit.gif">fruit</option>
            <option value="animated_gifs/galaxy.gif">galaxy</option>
            <option value="animated_gifs/globe.gif">globe</option>
            <option value="animated_gifs/pingpong.gif">pingpong</option>
            <option value="animated_gifs/psychedelic-kotdwara.gif">
              psychedelic
            </option>
            <option value="animated_gifs/space.gif">space</option>
            <option value="animated_gifs/spinning_colors.gif">
              spinning colors
            </option>
            <option value="animated_gifs/squares.gif">squares</option>
            <option value="animated_gifs/thingy.gif">thingy</option>
            <option
              value="animated_gifs/tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500.gif"
            >
              tumbler
            </option>
            <option value="animated_gifs/tunnel.gif">tunnel</option>
            <option value="animated_gifs/wolfenstein.gif">Wolfenstein</option>
          </select>
        </span>
      </p>
    </div>

    <!-- Action buttons -->
    <div class="field is-grouped">
      <p class="control">
        <button
          @click="showVideo"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show video
        </button>
      </p>

      <p class="control">
        <button
          @click="showGif"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show animated gif
        </button>
      </p>

      <p class="control">
        <button
          @click="stop"
          class="button is-danger"
          :class="{ 'is-loading': loading }"
        >
          Stop
        </button>
      </p>
    </div>
  </div>
</template>
