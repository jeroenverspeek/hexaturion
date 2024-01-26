<script setup>
const cubePictureDir = ref('emoji');
const cubemap = ref('garage.jpg');
const loop = ref(false);
const loading = ref(false);
const { appDir, appSrcDir, hZellerDir, cubeOptions } = useConfig();
const { start, stop } = useAPI();

const cubePicturesAppCommand = computed(() => {
  let command;
  //if (loop.value) {
  //  // build command and command line options;
  //  const cubeAppPath = hZellerDir + 'utils/led-image-viewer';
  //  command = ['sudo', cubeAppPath, ...cubeOptions, '-f', '-w3', '-s'];
  //  if (cubePictureDir.value) {
  //     // werkt niet door wildcard:
  //     command.push(appDir + `cube_pictures/${cubePictureDir.value}/\*.png`);
  //    //command.push(appDir + 'cube_pictures/' + cubePictureDir.value + '/Laugh-icon.png');
  //}
  if (loop.value) {
    // build command and command line options;
    command = ['ts-node', appSrcDir + 'cubePictures/showBufferImage.ts'];
    if (cubePictureDir.value) {
      command.push('--cubePictureDir');
      command.push(cubePictureDir.value);
    }
    command.push('--tSlide');
    command.push(1);
    command.push('--showTime');
    command.push(20);
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
});

const cubeMapAppCommand = computed(() => {
    // build command and command line options;
    let command = ['ts-node', appSrcDir + 'cubemap/showCubemap.ts'];
    let cubemapLayout = '';
    if (cubemap.value) {
      if (cubemap.value == 'atlas1_CUBE.png') {
        cubemapLayout = '3x2';
      } else if (['garage.jpg', 'lake.png', 'temple.jpg'].includes(cubemap.value)) {
        cubemapLayout = 'cross';
      } else if (['canary', 'forbidden_city', 'unsplashed'].includes(cubemap.value)) {
        cubemapLayout = '6x1';
      } else {
      // ERROR cubemap not found
      }
      command.push('--cubemapLayout');
      command.push(cubemapLayout);
      command.push('--cubemap');
      command.push(cubemap.value);
    }
  return command;
});


async function showCubePictures() {
  loading.value = true;
  const response = await start(cubePicturesAppCommand.value);
  console.log(response.data)
  loading.value = false;
}

async function showCubeMap() {
  loading.value = true;
  const response = await start(cubeMapAppCommand.value);
  console.log(response.data)
  loading.value = false;
}


</script>

<template>
  <div>
    <div class="field is-grouped">
      <label class="label"></label>
      <div class="select">
        <select v-model="cubePictureDir">
          <option value="family">family</option>
          <option value="chess_set">chess</option>
          <option value="emoji">emoji's</option>
          <option value="flag">flags</option>
          <option value="borg">borg</option>
        </select>
      </div>

      <label class="label">...........</label>
      <div class="select">
        <select v-model="cubemap">
          <option value="atlas1_CUBE.png">atlas</option>
          <option value="canary">canary</option>
          <option value="forbidden_city">forbidden city</option>
          <option value="unsplashed">unsplashed</option>
          <option value="garage.jpg">garage</option>
          <option value="lake.png">lake</option>
          <option value="temple.jpg">temple</option>
        </select>
      </div>
      <!--<span> TEST cubePictureDir: {{ cubemap }}</span><br>-->
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="loop">
        Slide Show
      </label>
    </div>
    
    <div style="word-break: break-all;">{{ cubePicturesAppCommand }}</div>
    <div style="word-break: break-all;">{{ cubeMapAppCommand }}</div>
    
    <div class="field is-grouped">
      <p class="control">
        <button @click="showCubePictures" class="button is-primary" :class="{ 'is-loading': loading }">
          Show Pictures
        </button>
      </p>
      <p class="control">
        <button @click="showCubeMap" class="button is-primary" :class="{ 'is-loading': loading }">
          Show CubeMap
        </button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>