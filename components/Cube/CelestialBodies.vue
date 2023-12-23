<script setup>
const rotate = ref(false);
const celestialBody = ref('earth');
const loading = ref(false);
const { appSrcDir } = useConfig();
const { start, stop } = useAPI();

const cubeAppCommand = computed(() => {
// build command and command line options;
  const command = ['ts-node', appSrcDir + 'celestialBodies/showCubeLatlonmap.ts'];
    command.push('-i');
    command.push(celestialBody.value);
  if (rotate.value) {
    command.push('--rotate');
  }
  return command;
})


async function showCelestialBody() {
  loading.value = true;
  // build command and command line options;
  const response = await start(cubeAppCommand.value)
  console.log(response.data)

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
      <!-- <span> TEST language: {{ language }}</span><br> -->
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="rotate">
        Rotate 
      </label>
    </div>
    <div style="word-break: break-all;">{{ cubeAppCommand }}</div>
    <div class="field is-grouped">
      <p class="control">
        <button :disabled="!celestialBody" @click="showCelestialBody" class="button is-primary"
          :class="{ 'is-loading': loading }">Show celestial body</button>
      </p>
      <p class="control">
        <button @click="stop" class="button is-danger" :class="{ 'is-loading': loading }">Stop</button>
      </p>
    </div>
  </div>
</template>