```vue
<script setup lang="ts">
type RubikSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Solver = "reversedPath" | "aStar" | "best-first";

type Heuristic = "taxiCube3D" | "taxiCubeReduced3D" | "euclidian3D";

const nRubik = ref<RubikSize>(3);
const pattern = ref<string>("solved");
const solver = ref<Solver>("reversedPath");
const heuristic = ref<Heuristic>("taxiCube3D");
const nSteps = ref<number>(20);

const loading = ref<boolean>(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const imageDir = "/images/";

const patternImage = computed<string>(() => {
  return `${imageDir}${nRubik.value}x${nRubik.value}/${pattern.value}.${nRubik.value}x${nRubik.value}.png`;
});

const slidingPuzzleCubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  const command: string[] = [
    "node_modules/.bin/tsx",
    appSrcDir + "rubiksQube/slidingPuzzleSolve.ts",
  ];

  command.push("--nRubik");
  command.push(String(nRubik.value));

  command.push("--solver");
  command.push(solver.value);

  if (solver.value !== "reversedPath") {
    command.push("--heuristic");
    command.push(heuristic.value);
  }

  command.push("--nSlides");
  command.push(String(nSteps.value));

  return command;
});

function resetPattern(): void {
  pattern.value = "solved";
}

async function slidingPuzzleSolve(): Promise<void> {
  loading.value = true;

  try {
    const response = await start(slidingPuzzleCubeAppCommand.value);

    console.log(response.data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="field">
      nRubik:

      <select v-model="nRubik" @change="resetPattern">
        <option :value="1">1x1</option>
        <option :value="2">2x2</option>
        <option :value="3">3x3</option>
        <option :value="4">4x4</option>
        <option :value="5">5x5</option>
        <option :value="6">6x6</option>
        <option :value="7">7x7</option>
        <option :value="8">8x8</option>
        <option :value="9">9x9</option>
      </select>
    </div>

    <div class="field">
      Solver:

      <select v-model="solver">
        <option value="reversedPath">reversed path</option>
        <option value="aStar">a* shortest path</option>
        <option value="best-first">best first</option>
      </select>
    </div>

    <div class="field">
      Heuristic:

      <select v-model="heuristic" :disabled="solver === 'reversedPath'">
        <option value="taxiCube3D">taxicube</option>
        <option value="taxiCubeReduced3D">taxicube reduced</option>
        <option value="euclidian3D">Euclidian</option>
      </select>
    </div>
  </div>

  <br />

  <div>
    <img :src="patternImage" alt="image not found" width="300" height="300" />
  </div>

  Number of steps:
  <input type="number" v-model.number="nSteps" :min="1" />

  <br />
  <br />

  <!--
  <span> TEST pattern: {{ pattern }}</span><br>
  <span> TEST patternImage: {{ patternImage }}</span><br>
  <div style="word-break: break-all;">
    {{ slidingPuzzleCubeAppCommand }}
  </div>
  -->

  <div class="field is-grouped">
    <p class="control">
      <button
        @click="slidingPuzzleSolve"
        class="button is-primary"
        :class="{ 'is-loading': loading }"
      >
        Solve
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
</template>
```
