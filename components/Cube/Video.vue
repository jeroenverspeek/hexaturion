<script setup>
const movie = ref('');
const animatedGif = ref('');
const loop = ref(false);
const loading = ref(false);
const { appDir, appSrcDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

const videoAppCommand = computed(() => {
  // build command and command line options;
  let command;
  const cubeAppPath = hZellerDir + 'utils/video-viewer';
  command = ['sudo', cubeAppPath, ...cubeOptions];
  command.push(movie.value);
  return command;
});

const gifAppCommand = computed(() => {
  // build command and command line options;
  let command;
  const cubeAppPath = hZellerDir + 'utils/led-image-viewer';
  command = ['sudo', cubeAppPath, ...cubeOptions];
  if (animatedGif) {
    command.push(animatedGif.value);
  }
  return command;
});


async function showVideo() {
  loading.value = true;
  const response = await start(videoAppCommand.value);
  console.log(response.data)
  loading.value = false;
}

async function showGif() {
  loading.value = true;
  const response = await start(gifAppCommand.value);
  console.log(response.data)
  loading.value = false;
}


</script>

<template>
  <div>
    <div class="field">
      <select v-model="movie">
      <option value="apps/videos/rotto.mp4">rotto</option>
      <option value="apps/videos/space.mp4">space</option>
      <option value="apps/videos/trippy1.mp4">trippy1</option>
      <option value="apps/videos/trippy2.mp4">trippy2</option>
    </select>
    </div>
    <div class="field">
      <select v-model="animatedGif">
        <option value="apps/animated_gifs/birthday_animated_gif/happy-birthday.gif">happy birthday</option>
        <option value="apps/animated_gifs/fruit.gif">fruit</option>
        <option value="apps/animated_gifs/galaxy.gif">galaxy</option>
        <option value="apps/animated_gifs/globe.gif">globe</option>
        <option value="apps/animated_gifs/pingpong.gif">pingpong</option>
        <option value="apps/animated_gifs/psychedelic-kotdwara.gif">psychedelic</option>
        <option value="apps/animated_gifs/space.gif">space</option>
        <option value="apps/animated_gifs/spinning_colors.gif">spinning colors</option>
        <option value="apps/animated_gifs/squares.gif">squares</option>
        <option value="apps/animated_gifs/thingy.gif">thingy</option>
        <option value="apps/animated_gifs/tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500.gif">tumbler</option>
        <option value="apps/animated_gifs/tunnel.gif">tunnel</option>
        <option value="apps/animated_gifs/wolfenstein.gif">Wolfenstein</option>
      </select>
    </div>
    <!--
    <div style="word-break: break-all;">{{ videoAppCommand }}</div>
    <div style="word-break: break-all;">{{ gifAppCommand }}</div>
    -->
    <div class="field is-grouped">
      <p class="control">
        <button @click="showVideo" class="button is-primary" :class="{ 'is-loading': loading }">
          Show video
        </button>
      </p>
      <p class="control">
        <button @click="showGif" class="button is-primary" :class="{ 'is-loading': loading }">
          Show animated gif
        </button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>