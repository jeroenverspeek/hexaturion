```vue
<script setup lang="ts">
type Zenith = "U" | "LBU";

type CelestialBody =
  | "earth.jpg"
  | "sun.jpg"
  | "moon.jpg"
  | "mercury.jpg"
  | "venus.jpg"
  | "mars.jpg"
  | "jupiter.jpg"
  | "blackhole.jpg";

const zenith = ref<Zenith>("U");
const celestialBody = ref<CelestialBody>("earth.jpg");
const rotate = ref(false);
const showDayNight = ref(false);
const loading = ref(false);

const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed<string[]>(() => {
  // Build command and command line options
  if (celestialBody.value === "earth.jpg" && showDayNight.value) {
    const command: string[] = [
      "node_modules/.bin/tsx",
      appSrcDir + "celestialBodies/showDayNightMap.ts",
    ];

    command.push("--fixedSun");

    if (zenith.value) {
      command.push("--zenith");
      command.push(zenith.value);
    }

    return command;
  } else {
    const command: string[] = [
      "node_modules/.bin/tsx",
      appSrcDir + "celestialBodies/showCubeLatLonMap.ts",
    ];

    command.push("-i");
    command.push(celestialBody.value);

    if (rotate.value) {
      command.push("--rotate");
    }

    if (zenith.value) {
      command.push("--zenith");
      command.push(zenith.value);
    }

    return command;
  }
});

async function showCelestialBody(): Promise<void> {
  loading.value = true;

  const response = await start(cubeAppCommand.value);

  console.log(response.data);

  loading.value = false;
}
</script>

<template>
  <div>
    <div class="field">
      <label class="label">Celestial body:</label>

      <div class="select">
        <select v-model="celestialBody">
          <option value="earth.jpg">earth</option>
          <option value="sun.jpg">sun</option>
          <option value="moon.jpg">moon</option>
          <option value="mercury.jpg">mercury</option>
          <option value="venus.jpg">venus</option>
          <option value="mars.jpg">mars</option>
          <option value="jupiter.jpg">jupiter</option>
          <option value="blackhole.jpg">blackhole</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Cube orientation:</label>

      <div class="control">
        <label class="radio">
          <input type="radio" id="U" value="U" v-model="zenith" />
          on a side
        </label>

        <label class="radio">
          <input type="radio" id="LBU" value="LBU" v-model="zenith" />
          on a corner
        </label>
      </div>
    </div>

    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="rotate" />
        Rotate
      </label>
    </div>

    <div class="field">
      <label class="checkbox">
        <input
          type="checkbox"
          v-model="showDayNight"
          :disabled="celestialBody !== 'earth.jpg'"
        />
        day/night
      </label>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <button
          :disabled="!celestialBody"
          @click="showCelestialBody"
          class="button is-primary"
          :class="{ 'is-loading': loading }"
        >
          Show celestial body
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
```
