```vue
<script setup lang="ts">
type CubePictureDir = "family" | "chess_set" | "emoji" | "flag" | "borg";

type Cubemap =
  | "atlas1_CUBE.png"
  | "canary"
  | "forbidden_city"
  | "unsplashed"
  | "garage.jpg"
  | "lake.png"
  | "temple.jpg";

type CubemapLayout = "3x2" | "cross" | "6x1";

const cubePictureDir = ref<CubePictureDir>("emoji");
const cubemap = ref<Cubemap>("garage.jpg");
const loop = ref<boolean>(false);
const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubePicturesAppCommand = computed<string[]>(() => {
  let command: string[];

  if (loop.value) {
    command = ["ts-node", appSrcDir + "cubePictures/showBufferImage.ts"];

    if (cubePictureDir.value) {
      command.push("--cubePictureDir");
      command.push(cubePictureDir.value);
    }

    command.push("--tSlide");
    command.push("1");

    command.push("--showTime");
    command.push("20");
  } else {
    command = ["ts-node", appSrcDir + "cubePictures/showCubePictures.ts"];

    if (cubePictureDir.value) {
      command.push("--cubePictureDir");
      command.push(cubePictureDir.value);
    }

    command.push("--showTime");
    command.push("20");
  }

  return command;
});

const cubeMapAppCommand = computed<string[]>(() => {
  const command: string[] = ["ts-node", appSrcDir + "cubemap/showCubemap.ts"];

  let cubemapLayout: CubemapLayout | undefined;

  if (cubemap.value === "atlas1_CUBE.png") {
    cubemapLayout = "3x2";
  } else if (["garage.jpg", "lake.png", "temple.jpg"].includes(cubemap.value)) {
    cubemapLayout = "cross";
  } else if (
    ["canary", "forbidden_city", "unsplashed"].includes(cubemap.value)
  ) {
    cubemapLayout = "6x1";
  }

  if (cubemapLayout !== undefined) {
    command.push("--cubemapLayout");
    command.push(cubemapLayout);

    command.push("--cubemap");
    command.push(cubemap.value);
  }

  return command;
});

async function showCubePictures(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(cubePicturesAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}

async function showCubeMap(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(cubeMapAppCommand.value);
    console.log(response.data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="picture-grid">
      <!-- Picture selection -->
      <div class="select">
        <select v-model="cubePictureDir">
          <option value="family">family</option>
          <option value="chess_set">chess</option>
          <option value="emoji">emoji's</option>
          <option value="flag">flags</option>
          <option value="borg">borg</option>
        </select>
      </div>

      <!-- Cubemap selection -->
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

      <!-- Empty third column -->
      <div></div>

      <!-- Show Pictures -->
      <p class="control">
        <button
          @click="showCubePictures"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show Pictures
        </button>
      </p>

      <!-- Show CubeMap -->
      <p class="control">
        <button
          @click="showCubeMap"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show CubeMap
        </button>
      </p>

      <!-- Stop -->
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

    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="loop" />
        Slide Show
      </label>
    </div>

    <!-- TEST: show generated commands
    <div style="word-break: break-all;">
      {{ cubePicturesAppCommand }}
    </div>

    <div style="word-break: break-all;">
      {{ cubeMapAppCommand }}
    </div>
    -->
  </div>
</template>

<style scoped>
.picture-grid {
  display: grid;
  grid-template-columns: max-content max-content max-content;
  column-gap: 20px;
  row-gap: 10px;
  align-items: center;
}

.picture-grid .select,
.picture-grid .control {
  margin: 0;
}

.picture-grid select,
.picture-grid button {
  width: 100%;
}
</style>
