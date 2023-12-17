<script setup>
const cubePictureDir = ref('emoji');
const loading = ref(false);
const { appSrcDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

async function showCubePictures() {
  loading.value = true;
  // build command and command line options;
  const cubeAppCommand = ['ts-node', appSrcDir + 'cubePictures/showCubePictures.ts'];
  if (cubePictureDir.value) {
    cubeAppCommand.push('--cubePictureDir');
    cubeAppCommand.push(cubePictureDir.value);
  }
  cubeAppCommand.push('--showTime');
  cubeAppCommand.push(20);
  const response = await start(cubeAppCommand);
  console.log(response.data)
  loading.value = false;
}

async function loopCubePictures() {
  loading.value = true;
  const cubeAppPath = hZellerDir + 'utils/led-image-viewer';

  // build command and command line options;
  const cubeAppCommand = ['sudo', cubeAppPath, ...cubeOptions, '-f', '-w3', '-s'];
  if (cubePictureDir.value) {
    cubeAppCommand.push(appDir + 'cube_pictures/' + cubePictureDir.value + '/*.png');
  }
  const response = await start(cubeAppCommand);
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
    <div class="field is-grouped">
      <p class="control">
        <button @click="showCubePictures" class="button is-primary" :class="{ 'is-loading': loading }">
          Show Pictures
        </button>
      </p>
      <p class="control">
        <button @click="loopCubePictures" class="button is-primary" :class="{ 'is-loading': loading }">
          Show Slide Show
        </button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>