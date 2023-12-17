<script setup>
const cubePictureDir = ref('emoji');
const loop = ref(false);
const loading = ref(false);
const { appDir, appSrcDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
  let command;
  if (loop.value) {
    // build command and command line options;
    const cubeAppPath = hZellerDir + 'utils/led-image-viewer';
    command = ['sudo', cubeAppPath, ...cubeOptions, '-f', '-w3', '-s'];
    if (cubePictureDir.value) {
      command.push(appDir + 'cube_pictures/' + cubePictureDir.value + '/*.png');
    }
  } else {
    // build command and command line options;
    command = ['ts-node', appSrcDir + 'cubePictures/showCubePictures.ts'];
    if (cubePictureDir.value) {
      command.push('--cubePictureDir');
      command.push(cubePictureDir.value);
    }
    command.push('--showTime');
    command.push(20);
  }
  return command;
})

async function showCubePictures() {
  loading.value = true;
  const response = await start(cubeAppCommand.value);
  console.log(response.data)
  loading.value = false;
}

</script>

<template>
  <div>
    <div class="field">
      <label class="label">Pictures directory:</label>
      <div class="select">
        <select v-model="cubePictureDir">
          <option value="family">family</option>
          <option value="chess_set">chess</option>
          <option value="emoji">emoji's</option>
          <option value="flag">flags</option>
          <option value="borg">borg</option>
        </select>
      </div>
      <!-- <span> TEST cubePictureDir: {{ cubePictureDir }}</span><br> -->
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="loop">
        Slide Show
      </label>
    </div>
    <div style="word-break: break-all;">{{ cubeAppCommand }}</div>
    <div class="field is-grouped">
      <p class="control">
        <button @click="showCubePictures" class="button is-primary" :class="{ 'is-loading': loading }">
          Show Pictures
        </button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>