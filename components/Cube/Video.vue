<script setup>
const movie = ref("videos/rotto.mp4");
const animatedGif = ref("animated_gifs/birthday_animated_gif/happy-birthday.gif");
const loading = ref(false);
const { ledCubeDir, appDir, appSrcDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

const videoAppCommand = computed(() => {
  // build command and command line options;
  let command;
  //const cubeAppPath = '$videoviewer';
  //command = [cubeAppPath];
  const cubeAppPath = hZellerDir + 'utils/video-viewer';
  command = [cubeAppPath, ...cubeOptions];
  command.push(appDir + movie.value);
  return command;
});

const gifAppCommand = computed(() => {
  // build command and command line options;
  let command;
  //const cubeAppPath = '$led-image-viewer';
  //command = [cubeAppPath];
  const cubeAppPath = hZellerDir + 'utils/led-image-viewer';
  command = [cubeAppPath, ...cubeOptions];
  if (animatedGif) {
    command.push(appDir + animatedGif.value);
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
    <div class="field is-grouped">
    <select v-model="movie">
      <option value="videos/rotto.mp4">rotto</option>
      <option value="videos/space.mp4">space</option>
      <option value="videos/trippy1.mp4">trippy1</option>
      <option value="videos/trippy2.mp4">trippy2</option>
    </select>
    ...............
    <select v-model="animatedGif">
        <option value="animated_gifs/birthday_animated_gif/happy-birthday.gif">happy birthday</option>
        <option value="animated_gifs/fruit.gif">fruit</option>
        <option value="animated_gifs/galaxy.gif">galaxy</option>
        <option value="animated_gifs/globe.gif">globe</option>
        <option value="animated_gifs/pingpong.gif">pingpong</option>
        <option value="animated_gifs/psychedelic-kotdwara.gif">psychedelic</option>
        <option value="animated_gifs/space.gif">space</option>
        <option value="animated_gifs/spinning_colors.gif">spinning colors</option>
        <option value="animated_gifs/squares.gif">squares</option>
        <option value="animated_gifs/thingy.gif">thingy</option>
        <option value="animated_gifs/tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500.gif">tumbler</option>
        <option value="animated_gifs/tunnel.gif">tunnel</option>
        <option value="animated_gifs/wolfenstein.gif">Wolfenstein</option>
      </select>
    </div>
    .
  </div>
  <div>
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